---
title: "GitHub Actionsのスケジューラ実行を利用して定期的にビルドする"
date: 2021-01-09T15:53:36+09:00
lastmod: 2023-05-05T01:24:10+09:00
published: true
category: ["Tech"]
tags: ["GitHub","GitHub Actions","Hugo"]
slug: "building-periodically-with-scheduler-of-gitHub-actions"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto/v1594902885/tech_ben4sq.png"
---

`GitHub Actions`のスケジューラ実行で、`Hugo`などのサイトを定期ビルドし、データを最新化する方法を調べたときのメモです。

{{% toc %}}

<!--more-->
{{% googleadsense %}}


## GitHub Actionsでスケジューラ実行

`on`には`GitHub Actions`のトリガーを記載します。
通常は`git push`したときに`Action`が実行されるように`push`のみを指定しますが、スケジューラ実行する際は、`schedule`を追加します。

実行タイミングは`cron`で指定します。

私は、`crontab`の書式をいつも忘れるのですが、以下のサイトを利用するとグラフィカルに表示されわかりやすいです。

![crontabの書式確認](https://res.cloudinary.com/meganii/image/upload/v1610177786/crontab_guru_ohmm02.png "=1440x766")

[Crontab\.guru \- The cron schedule expression editor](https://crontab.guru/)


```yaml
on:
  push:
    branches:
      - main
  schedule:
    - cron: '30 10 * * *'

・・・
```


## 定期ビルド

2021年1月9日現在、このブログは静的サイトジェネレーター`Hugo`を利用しています。
`GitHub Actions`の`Scheduler`で、1日1回定期的にサイトをビルドできるようになりました。

### gh-pages.yml

```yaml
name: github pages

on:
  push:
    branches:
      - main
  schedule:
    - cron: '30 10 * * *'

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - name: Clone module
        uses: actions/checkout@v2
        with:
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.77.0'

      - name: Build
        run: HUGO_ENV="production" NODE_ENV="production" hugo --gc

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

## 参考

- [Events that trigger workflows \- GitHub Docs](https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows)
- [Multiple event triggers with config \- Code to Cloud / GitHub Actions \- GitHub Support Community](https://github.community/t/multiple-event-triggers-with-config/16408)


{{% amazon 4844379208 %}}

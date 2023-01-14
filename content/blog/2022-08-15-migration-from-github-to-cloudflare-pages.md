---
title: "GitHub PagesからCloudflare Pagesへの移行"
date: 2022-08-14T15:07:29+09:00
lastmod: 2022-08-17T11:00:07+09:00
published: true
category: ["Tech"]
tags: ["Blog", "Cloudflare","Cloudflare Pages", "Hugo"]
comment: true
slug: "migration-from-github-to-cloudflare-pages"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto/v1594902885/tech_ben4sq.png"
---

`Github Pages`から[Cloudflare Pages](https://pages.cloudflare.com/)に移行したときのメモを以下に記す。

{{% toc %}}

<!--more-->
{{% googleadsense %}}

## 背景

本ブログは、`GitHub`でソース管理し、静的サイトジェネレーター`Hugo`で静的サイトを生成し、`GitHub Pages`で公開している。


過去には、静的サイトホスティングサービスとして、`Netlify`と`Cloudflare Pages`を使ったことがあったが、それぞれ次の理由で採用を見送っていた。

- `Netlify`: CDNのエッジサーバが日本になく、アクセスが遅い
- `Cloudflare Pages`： ビルド開始までに時間が掛かる（数分レベル）

しかし、2022年5月10日の記事[A new era for Cloudflare Pages builds](https://blog.cloudflare.com/cloudflare-pages-build-improvements/)で`Cloudflare Pages`のビルド時間が改善したということを読んだ。
試してみると、確かにビルド時間が大幅に改善していたので、これを機会に`Cloudflare Pages`に移行した。



CDNの設定もうまくいっていなかったので今回合わせて対応した。


## Cloudflare Pages側の操作

任意のGitHubリポジトリを選択するだけで、`Cloudflare Pages`と連携できるのは`Netlify`同様ありがたい。
次の手順で設定した。

### Pagesの`Create a project > Connect to Git`を選択

![Connect to Git](https://res.cloudinary.com/meganii/image/upload/v1660638411/ksj4kggulmmwjdyzeg3j.png "=1289x362")

### 「Deploy a site from your account」からHugoのリポジトリを選択

![Deploy a site from your account - Cloudflare Pages](https://res.cloudinary.com/meganii/image/upload/v1660717388/npbbtjyqwkufmsyfvuvj.png "=805x907")


### Set up build and deployments

![Set up build and deployments - Cloudflare Pages](https://res.cloudinary.com/meganii/image/upload/v1660717458/ep9kdirmtmfzoygrrhwy.png "=1081x521")

![Set up build and deployments - Cloudflare Pages](https://res.cloudinary.com/meganii/image/upload/v1660717483/giuzmm4wmtr2xasijzq9.png "=1066x780")

### Building and deploying

![ALT](https://res.cloudinary.com/meganii/image/upload/v1660717514/kmtm5luiudojeyg4czom.png "=1119x614")

![ALT](https://res.cloudinary.com/meganii/image/upload/v1660717608/xokt2ghljvzeuynqpsvg.png "=1103x556")

![ALT](https://res.cloudinary.com/meganii/image/upload/v1660717626/tw91om4m2fdfu9upgwse.png "=1060x507")


### Hugo versionの指定

`Hugo`で`TailwindCSS v3`を利用する場合、現時点ではNode.js 16系が必要となるため、`HUGO_VERSION`と合わせて`NODE_VERSION`、`NPM_VERSION`を、`Settings > Environment variables`から指定した。

![Cloudflare Pages Environment variables](https://res.cloudinary.com/meganii/image/upload/v1660723920/j5o8vibmbmwjwgmq32fc.png "=792x409")



### Webhook APIの生成

いまのところ、`Cloudflare Pages`単体ではスケジュールビルドは実施できない。
そのため、スケジュールビルドのために`GitHub Action`を継続利用する。

`Cloudfare Pages`では、Webhook APIが用意されている。
このWebhook APIを`GitHub Action`から叩くことで、`Cloudflare Pages`のビルドをキックする。

![Webhook API](https://res.cloudinary.com/meganii/image/upload/v1660733967/oi9jxvztaxw4jnjfkanu.png "=828x494")


## GitHub（GitHub Pages）側の操作


### GitHub Pagesへのpushデプロイを停止（Cloudflare Page側の自動ビルドに任せる）

[https://github.com/meganii/www.meganii.com/commit/a98b16d5e95414583cbecbebfb39d88091d3082a](https://github.com/meganii/www.meganii.com/commit/a98b16d5e95414583cbecbebfb39d88091d3082a)


### GitHub ActionでCloudflare PagesのWebhookを叩く

```yaml
name: cloudflare pages

on:
 schedule:
 - cron: '30 10 * * *'

jobs:
 deploy:
 runs-on: ubuntu-20.04
 steps:
 - name: Deploy
 run: curl -X POST "${{ secrets.CLOUDFLARE_PAGES_WEBHOOK }}"
```


### GitHub Pagesの停止とドメイン切り替え

この部分は順番が前後している可能性もあるが、次の対応をした。

- GitHub Pagesの`Unpublish site`
- Custom Domainの削除


![GitHub Pagesの停止とドメイン切り替え](https://res.cloudinary.com/meganii/image/upload/v1660725166/icj8dsef1zxhdqs5dexo.png "=1195x735")


## まとめ

- `Cloudflare Pages`は個人ブログとして使う分には申し分ない
- Origin ServerとCDNをCloudflareにまとめることで、CDN配信周りを少し理解できた
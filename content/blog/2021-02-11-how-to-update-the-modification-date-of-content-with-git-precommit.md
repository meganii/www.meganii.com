---
title: "Git pre-commitフックでFrontmatterの「更新日時」を自動更新する"
date: 2021-02-11T11:23:06+09:00
lastmod: 2022-09-01T22:53:28+09:00
category: ["Tech"]
tags: ["Hugo", "Git"]
comment: true
slug: "how-to-update-the-modification-date-of-content-with-git-precommit"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto/v1594902885/tech_ben4sq.png"
---

今までブログ記事コンテンツの「更新日時」は`git`の履歴情報を元にしていました。
たとえば、`Hugo`の場合は`enableGitInfo = true`とすると、Gitの履歴情報からMarkdownの最終更新日時を自動で取得して`lastmod`として割り当てられていました。

しかし、`GitHub Actions`でHugoのビルドを行う際に、全履歴を取得するのをやめたことで、`Markdown`の`lastmod`の項目を見るように変更しています。

今後は`lastmod`をメンテナンスする必要があるため、いちいち「更新日時」を手動更新するのではなく、`git`の`pre-commit`フックを利用して更新日時を自動更新する方法を調べました。


{{% toc %}}

<!--more-->
{{% googleadsense %}}


## Git hooksとは


`git hooks`とは特定のアクションが発生した時に、カスタムスクリプトを実行する方法を指します。

`git hooks`は、クライアントサイドとサーバーサイドの2つに分類できます。

クライアントサイドのコミット時フック（コミットプロセスに関する）には主な4つがあります。

- `pre-commit`
  - コミットメッセージが入力される前に実行
- `prepare-commit-msg`
  - コミットメッセージエディターが起動する直前、デフォルトメッセージが生成された直後に実行
- `commit-msg`
  - コミットメッセージを保存した一時ファイルへのパスをパラメータに取る
- `post-commit`
  - コミットプロセスが全て完了した後に実行

今回は`pre-commit`フックを利用して、対象のMarkdownファイルをCommitした際に、更新日時を自動的に更新させます。

## pre-commit shell script

次の`Shell Script`を`.git/hooks/pre-commit`として作成して、`chmod +x`などで実行権限を付与します。
あとは、`git commit`コマンドを実行した際には、自動的に`lastmod`が更新されるようになります。

```sh
 #!/bin/sh
 
 # Read YAML front matter in all the modified files for committing,
 # and replace "lastmod:" line to "lastmod: current date and time"
 
 git diff --cached --name-status | grep "^M" | while read a b; do
   cat $b | sed "/---.*/,/---.*/s/^lastmod:.*$/lastmod: $(TZ=Asia/Tokyo date "+%Y-%m-%dT%T")+09:00/" > tmp
   mv tmp $b
   git add $b
 done
```

### Windowsの場合

ファイル先頭が`#!/bin/sh`だと`error: cannot spawn .git/hooks/pre-commit: No such file or directory`というエラーが発生しました。
`#!/bin/bash`に変更することで動作することを確認しました。

```bash
#!/bin/bash 

git diff --cached --name-status | grep "^M" | while read a b; do
  cat $b | sed "/---.*/,/---.*/s/^lastmod:.*$/lastmod: $(TZ=Asia/Tokyo date "+%Y-%m-%dT%T")+09:00/" > tmp
  mv tmp $b
  git add $b
done
```

#### 参考
- [Git pre\-commit hook is not running on Windows \- Stack Overflow](https://stackoverflow.com/questions/20609816/git-pre-commit-hook-is-not-running-on-windows)

## まとめ

面倒でついつい更新をサボってしまうような処理は自動化するのがよいですね。
今回このスクリプトを用意したことで、今後は意識せずとも更新日時が更新されるようになります。


## 参考

- [最終更新日の表示](https://sekika.github.io/2015/11/18/last-update/)
- [How to show the modification date of a file in Jekyll? \- Stack Overflow](https://stackoverflow.com/questions/14978474/how-to-show-the-modification-date-of-a-file-in-jekyll)
- [Git \- Git フック](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA-Git-%E3%83%95%E3%83%83%E3%82%AF)

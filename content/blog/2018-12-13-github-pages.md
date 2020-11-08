---
title: "GitHub Pagesで複数の独自ドメインサイトを運用する"
date: 2018-12-13T06:59:48+09:00
lastmod: 2018-12-13T06:59:48+09:00
comments: true
category: ['Tech']
tags: ['GitHub', 'GithHub Pages', 'Blog']
published: true
slug: github-pages
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto/v1594902885/tech_ben4sq.png"
---

`GitHub Pages`を利用する上で、公式ドキュメントやいろんな人のブログを読みつつ、自分で試行錯誤した結果を残しておきます。

{{% toc %}}
<!--more-->
{{% googleadsense %}}

## GitHub Pagesの始め方　個人的なおすすめ

- {user}.github.ioリポジトリを作る
- {user}.github.ioリポジトリには直接Custom Domainを割り当てない

`{user}.github.io`リポジトリを作成すると、自動的にREADMEファイルが[https://meganii.github.io/](https://meganii.github.io/)として公開されます。

独自ドメインのブログを`GitHub Pages`で公開する場合、この`{user}.github.io`に直接ブログを配置できます。
しかし、`{user}.github.io`に直接独自ドメインを割り当てた場合、次に新しく作成したリポジトリをGitHub Pagesで公開する場合に困ったことが発生します。

例えばrepoAというリポジトリを作成し公開設定を行うことを考えてみます。
この場合、既に`{user}.github.io`に独自ドメインが割り当たっているため、`{CustumDomain}/repoA`でアクセスできるようになります。
この動作がよい場合もありますが、GitHub Pagesで複数ドメインを利用する場合、この方法は向いていません。
（1つのGitHubアカウントに対して1つの独自ドメインしか割り当てられなくなるため）


よって、GitHub Pagesで複数ドメインを利用する場合は次の点が大切です。

 - `{user}.github.io`リポジトリに直接独自ドメイン（Sustom Domain）の設定をしない
 - `{user}.github.io`以外の個別のリポジトリに対して独自ドメイン（Custom Domin）を設定する


## 参考

- [GitHub Pagesで複数の独自ドメインのHTTPS(TLS,SSL)サイトを運用する - このすみろぐ](https://www.konosumi.net/entry/2018/07/01/190200)
- [GitHub PagesからNetlifyに変更した3つの理由 \| よしかわーるど](https://yoshikawataiki.net/posts/netlify/)
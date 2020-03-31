---
title: "GitHub Pagesで複数の独自ドメインサイトを運用する"
date: 2018-12-13T06:59:48+09:00
lastmod: 2018-12-13T06:59:48+09:00
comments: true
category: ['Tech']
tags: ['GitHub', 'GithHub Pages', 'Blog']
published: true
slug: github-pages
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---


GitHub Pagesを利用する上で、公式ドキュメントやいろんな人のブログを読みつつ、自分で試行錯誤した結果を残しておきます。


{{% toc %}}


<!--more-->
{{% googleadsense %}}



## GitHub Pagesの始め方　個人的なおすすめ

1. アカウント名.github.io でリポジトリを作る
2. アカウント名.github.ioにはCustom Domainを割り当てない

こうすることで、新たに作成したサイトは`アカウント名.github.io/hogehoge`とサブディレクトリでアクセスできる。ブログなどを公開したい場合は、ブログのドメイン名のリポジトリを作成する（例えば、`www.meganii.com`）。

このリポジトリのmasterを公開する設定にして、ブログを運用する。

`アカウント名.github.io`に直接ブログを配置してもよいのだが、そうすると新しく作成したリポジトリにも影響してしまう。

例えば、repoA というリポジトリを作成し、公開設定をすると、www.meganii.com/repoAでアクセスできるようになる。この動作がよい場合もあるが、GitHub Pagesから移行した場合、URLがかわってしまう。


すると、https://meganii.github.io/ で公開される
リポジトリ www.meganii.com を作成 (プロジェクトサイト)
このリポジトリのmasterにHugoの生成物をpush
Custom Domainの設定で、www.meganii.com を指定（CNAMEファイルが作成される）

DNSの設定
Custom Domainをmeganii.github.io に向ける
しばらく待つ（設定直後は表示されない）
Force HTTPSの設定
デフォルトだと httpになっているため、Force HTTPSの設定を有効にする。



## 参考

- [GitHub Pagesで複数の独自ドメインのHTTPS(TLS,SSL)サイトを運用する - このすみろぐ](https://www.konosumi.net/entry/2018/07/01/190200)



## 逆に


- [GitHub PagesからNetlifyに変更した3つの理由 \| よしかわーるど](https://yoshikawataiki.net/posts/netlify/)
---
title: "静的サイトジェネレータ「Hugo」で快適ブログ生活"
date: 2017-01-08T15:58:45+09:00
lastmod: 2017-01-16T22:58:45+09:00
comments: true
category: ['Tech']
tags: ['Hugo','Blog','Jekyll']
published: true
slug: static-site-generator-hugo
img: "/images/hugo_s.png"
---

Jekyll, OctpressからHugoに移行して、快適なブログ生活に近づいてきました。W

## 静的サイトジェネレータの『静的』って？

静的サイトジェネレータとは、その名の通り、静的なサイトを作り出すジェネレータです。

一方、「静的」の反対は「動的」ですが、Wordpressなどユーザからのリクエストに応じて毎回ページを生成する方法です。

<!--more-->
{{% googleadsense %}}

### メリット

- テキストファイルだけなので、管理が楽
- Wordpressのように定期的にパッチを当てなくても大丈夫
- 基本的にHTML+CSS+JSだけなのでサイトが軽い

自分の観測範囲だと、Wordpressから静的サイトジェネレータに移行する方が結構いるように思います。


### デメリット

- ユーザのリクエストに対して、動的に表示することができない
- 関連記事の表示などに苦労する
- WebUIの管理画面がないので、外出先から更新できない

静的サイトのデメリットは、staticなので一度生成したサイトはユーザに合わせて変更することはできません。サイトを変更する際は、再ビルドが必要です。

ユーザに合わせて動的にサイト(ページ)を生成できないため、関連記事の表示などWordpressではプラグインを入れれば比較的簡単にできることが、なかなか難しいです。また、WebUIの管理画面はないので、外出先から更新することができません。


## 静的サイトジェネレータの種類

https://www.staticgen.com/ に静的サイトジェネレータの一覧があります。
いままで使ってみた静的サイトジェネレータを

| Name                                              | Language    | Description                            |
|:--------------------------------------------------|:------------|:---------------------------------------|
| [Hugo](https://gohugo.io/)                        | Go          | ☆☆☆　おすすめ！                           |
| [Jekyll](https://jekyllrb.com/)                   | Ruby        | ☆☆　 初めて利用した静的サイトジェネレータ。おすすめ |
| [Octopress](http://octopress.org/)                | Ruby        | ☆☆   Jekyllを高機能にしたもの。使ってました      |
| [Middleman](https://middlemanapp.com/jp/)         | Ruby        | ☆    Jekyllを高機能にしたもの。使ってました 　　　|
| [Hexo](https://hexo.io/)                          | JavaScript  | ?    JavaScriptのフレームワークでよく聞くもの |


## Hugoの魅力

- 圧倒的にビルド速度が早い
- 開発が活発である

静的サイトジェネレータは、Jekyll -> Octopress -> Middleman-> Hugoと使ってきましたが、Hugoはダントツ、圧倒的に生成時間が短いです。Hugoにする前は、Jekyll、Octopressを使っていても、生成速度に不満を持ったことはなく、こんなもんかと思ってました。しかし、Hugoに変えたところ、快適すぎてもう元に戻れません。「速さは、正義」。これこそ、Hugoを使うメリットでしょう。

以下のURLを参考すると、やはり`Hugo`がダントツですね。

[静的サイトジェネレータの生成時間比較: 嵐の小舟より](http://tamura.goga.co.jp/article/429818193.html)


次に、「開発が活発である」ことが魅力です。[Hugo Discussion](https://discuss.gohugo.io/)では、Hugoを使うときの質問やTipsなどが日々飛び交っています。また、github[spf13/hugo: A Fast and Flexible Static Site Generator built with love in GoLang](https://github.com/spf13/hugo)を見てもわかるように、日々新機能の更新、メンテナンスのコミットがあります。この勢いがあれば、使い始めたけれど、メンテナンスされなくなったということはないでしょう。

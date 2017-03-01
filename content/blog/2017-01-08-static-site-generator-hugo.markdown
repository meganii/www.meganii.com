---
title: "静的サイトジェネレータ「Hugo」でシンプルブログサイトを構築"
date: 2017-01-08T15:58:45+09:00
lastmod: 2017-01-18T22:58:45+09:00
comments: true
category: ['Tech']
tags: ['Hugo','Blog','Jekyll']
published: true
slug: static-site-generator-hugo
img: "/images/hugo_s.png"
---

自分でサイトを構築するとしたら、どんな選択肢があるでしょうか？HTMLを自分でぽちぽち作るのは大変なので、CMS(Content Management System)を利用することになりますが、そのCMSにもさまざまな種類がありどれを選んだらよいのでしょうか？

私自身、[Lokka][](Ruby), [WordPress][](PHP), [Jekyll][](Ruby), [Octopress][](Ruby)、[Middleman][](Ruby)と利用してきましたが、[Hugo][](golang)に移行したところ、シンプルなブログサイトを構築できましたので、おすすめします。

[Lokka]: http://lokka.org/
[WordPress]: https://ja.wordpress.org
[Jekyll]: https://jekyllrb.com/
[Octopress]: http://octopress.org/
[Middleman]: https://middlemanapp.com/jp/
[Hugo]: https://gohugo.io/

## Hugoとは？

[Hugo][]とは、Golangで書かれている。静的サイトジェネレータのひとつです。他の静的サイトジェネレータと比べてビルドが高速であることが特徴です。


## 静的サイトジェネレータの『静的』って？

静的サイトジェネレータとは、その名の通り静的なサイトを作り出すジェネレータです。

一方、「静的」の反対は「動的」ですが、[WordPress][]などユーザからのリクエストに応じて毎回ページを生成する方法です。

<!--more-->
{{% googleadsense %}}

## 静的サイトジェネレータのメリット・デメリット
### メリット

- テキストファイルだけなので、管理が楽
- WordPressのように定期的にパッチを当てなくても大丈夫
- 基本的にHTML+CSS+Javascriptだけなのでサイトが軽い


### デメリット

- ユーザのリクエストに対して、動的に表示を制御できない
- 関連記事の表示などに苦労する
- WebUIの管理画面がないので、外出先から更新できない

ユーザに合わせて動的にサイト(ページ)を生成できないため、関連記事の表示などWordPressではプラグインを入れれば比較的簡単にできることが難しいです。また、WebUIの管理画面はないので、外出先から更新することができません。


## 静的サイトジェネレータの種類

https://www.staticgen.com/ に静的サイトジェネレータの一覧があります。
いままで使ってみた静的サイトジェネレータを下表にまとめてみました。

| Name                                              | Language    | Description                            |
|:--------------------------------------------------|:------------|:---------------------------------------|
| [Hugo](https://gohugo.io/)                        | Go          | ☆☆☆　おすすめ！                           |
| [Jekyll](https://jekyllrb.com/)                   | Ruby        | ☆☆　 初めて利用した静的サイトジェネレータ。おすすめ |
| [Octopress](http://octopress.org/)                | Ruby        | ☆☆   Jekyllを高機能にしたもの。使ってました      |
| [Middleman](https://middlemanapp.com/jp/)         | Ruby        | ☆    Jekyllを高機能にしたもの。使ってました 　　　|
| [Hexo](https://hexo.io/)                          | JavaScript  | ?    JavaScriptのフレームワークでよく聞くもの |


## 静的サイトジェネレータ「Hugo」の魅力

- 圧倒的にビルド速度が早い
- 開発が活発である

静的サイトジェネレータは、Jekyll -> Octopress -> Middleman-> Hugoと使ってきましたが、Hugoはダントツ、圧倒的に生成時間が短いです。Hugoにする前は、Jekyll、Octopressを使っていても、生成速度に不満を持ったことはなく、こんなもんかと思ってました。しかし、Hugoに変えたところ、快適すぎてもう元に戻れません。「速さは、正義」。これこそ、Hugoを使うメリットでしょう。

以下のURLを参考すると、やはり[Hugo][]がダントツですね。

[静的サイトジェネレータの生成時間比較: 嵐の小舟より](http://tamura.goga.co.jp/article/429818193.html)


次に、「開発が活発である」ことが魅力です。[Hugo Discussion](https://discuss.gohugo.io/)では、Hugoを使うときの質問やTipsなどが日々飛び交っています。また、github[spf13/hugo: A Fast and Flexible Static Site Generator built with love in GoLang](https://github.com/spf13/hugo)を見てもわかるように、日々新機能の更新、メンテナンスのコミットがあります。この勢いがあれば、使い始めたけれど、メンテナンスされなくなったということはないでしょう。

## どんな人におすすめできる？

- Jekyll, Octpressを利用していてビルド時間に不満がある人
- WordPressから
- Markdownで気軽にブログを書きたい人


## どんな人には向いていない

- 自分でサイトを管理したくない
- 

## まとめ

Golangで書かれているとは言え、利用する分にはGolangの知識はほとんど必要ありません。もしも、拡張したいと思ったり、コントリビュートしたいと思ったときにはGolang
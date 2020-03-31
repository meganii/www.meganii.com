---
title: "静的サイトジェネレータ「Hugo」でシンプルブログサイトを構築する"
date: 2017-01-08T15:58:45+09:00
lastmod: 2018-01-26T19:22:45+09:00
comments: true
category: ['Tech']
tags: ['Hugo','Blog','Jekyll','静的サイトジェネレータ']
published: true
slug: static-site-generator-hugo
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514036568/thumbnail_hugo_icon.png"
---

{{% img src="https://res.cloudinary.com/meganii/image/upload/q_auto,f_auto/v1511562368/yjhod8fty2uwipjwyiyt.png" w="685" h="368" %}}

今、自分でブログ・サイトを構築するとしたら、どんな選択肢があるでしょうか？

さすがにHTMLを自分で手打ちするのは大変なので、なんらかのCMS(Content Management System コンテンツ管理システム)を利用することになりますが、そのCMSにもさまざまな種類があり、どれを選んだらよいのでしょうか？


私自身、CMSとしては[Lokka][](Ruby), [WordPress][](PHP), [Jekyll][](Ruby), [Octopress][](Ruby)、[Middleman][](Ruby)と利用してきました。

どのCMSも一長一短ですが、Ruby, PHPなどの動的スクリプトで構成されるCMSは共通してビルドの遅さを感じます。

そこで、ビルドが高速という噂の[Hugo][](Golang)に移行したところ、快適でシンプルなブログサイトを構築できましたので、今回はその[Hugo][]の紹介をします。

[Lokka]: http://lokka.org/
[WordPress]: https://ja.wordpress.org
[Jekyll]: https://jekyllrb.com/
[Octopress]: http://octopress.org/
[Middleman]: https://middlemanapp.com/jp/
[Hugo]: https://gohugo.io/

<!--more-->
{{% googleadsense %}}


## Hugoとは？

[Hugo][]とはGolangで書かれている**静的サイトジェネレータ**のひとつです。他の静的サイトジェネレータと比べてビルドが高速であることが特徴です。


## 静的サイトジェネレータの『静的』って？

静的サイトジェネレータとは、その名の通り「静的」なサイトを作り出すジェネレータです。「静的」なサイトとは、素のHTML, CSSのWebページを想像していただくとその認識に近いと思います。

冒頭でも書きましたが、静的なサイトを作るためにいちいちHTMLタグを手打ちしているのでは効率が悪いです。そこで、サイトの土台となるテンプレートを元にサイトを生成するのが静的サイトジェネレータの仕事です。

一方、「静的」の反対である「動的」なジェネレータとして代表的なものは、[WordPress][]です。[WordPress][]はユーザからのリクエストに応じて毎回ページを動的に生成することで、より豊富な情報をユーザに表示させることができます。その反面、デメリットもあり、一般的にサイト表示速度が遅いことが挙げられます。

「静的」と「動的」どちらもメリット、デメリットがあるのですが、ここでは「静的」サイトジェネレータをオススメしています。この静的サイトジェネレータには、どのようなメリットとデメリットがあるのでしょうか？

## 静的サイトジェネレータのメリット・デメリット
### メリット

- テキストファイルだけなので、**管理が楽**
- WordPressのように定期的にセキュリティのためのパッチを当てなくても大丈夫
- 基本的にHTML+CSS+JavaScriptだけなのでサイト全体が軽い


### デメリット

- ユーザのリクエストに対して、動的に表示を制御できない
- 関連記事の表示などに苦労する
- WebUIの管理画面がないので、外出先から更新できない

ユーザからのリクエストに合わせて動的にサイト(ページ)を生成できないため、関連記事の表示などWordPressではプラグインを入れれば比較的簡単にできることが難しいです。また、記事投稿の管理画面はないので、外出先から気軽に更新することができません。

2017/10/7追記  
Hugoに`Related Content`という関連記事を表示する機能が追加されました。
{{% related src="https://www.meganii.com/blog/2017/10/07/hugo-related-content/" title="HugoのRelated Contentを利用して関連記事を表示する - SIS Lab" %}}

## 静的サイトジェネレータの種類

[Top Open\-Source Static Site Generators \- StaticGen](https://www.staticgen.com/)に静的サイトジェネレータの一覧があります。
いままで使ってみた静的サイトジェネレータを下表にまとめてみました。

| Name                                              | Language    | Description                            |
|:--------------------------------------------------|:------------|:---------------------------------------|
| [Hugo](https://gohugo.io/)                        | Go          | ☆☆☆　おすすめ！                           |
| [Jekyll](https://jekyllrb.com/)                   | Ruby        | ☆☆　 初めて利用した静的サイトジェネレータ。おすすめ |
| [Octopress](http://octopress.org/)                | Ruby        | ☆☆   Jekyllを高機能にしたもの。使ってました      |
| [Middleman](https://middlemanapp.com/jp/)         | Ruby        | ☆    Jekyllを高機能にしたもの。使ってました 　　　|
| [Hexo](https://hexo.io/)                          | JavaScript  | ?    JavaScriptの静的ジェネレータでよく聞くもの |


## 静的サイトジェネレータ「Hugo」の魅力

私が感じるHugoの魅力は以下2点です。

- 圧倒的に**ビルド速度が早い(生成時間が短い)**
- **開発が活発**である

1つ目のポイントは「ビルド速度」です。

静的サイトジェネレータは、[Jekyll][] -> [Octopress][] -> [Middleman][]-> [Hugo][]と使ってきましたが、この中でもHugoは圧倒的に生成時間が短いです。

Hugoへの移行前は、[Jekyll][]、[Octopress][]を使っていても、生成速度に不満を持ったことはなく、こんなもんかと思ってました。しかし、Hugoに変えたところ、快適すぎてもう元に戻れません。**「速さは、正義」**。これこそHugoを使うメリットでしょう。

以下のURLを参考すると、生成時間はやはり[Hugo][]がダントツですね。  
[静的サイトジェネレータの生成時間比較: 嵐の小舟より](http://tamura.goga.co.jp/article/429818193.html)


2つ目のポイントは「開発が活発である」ことです。

[Hugo Discussion](https://discuss.gohugo.io/)には、Hugoを使うときの質問やTipsが日々飛び交っています。また、[spf13/hugo: A Fast and Flexible Static Site Generator built with love in GoLang \[github\]](https://github.com/spf13/hugo)を見てもわかるように、日々新機能の更新、メンテナンスのコミットがあります。

この勢いがあれば、使い始めたけれどメンテナンスされなくなるという心配は不要でしょう。

## Hugoはどんな人におすすめできる？

- Jekyll, Octpressを利用していてビルド速度(生成時間)に不満がある人
- WordPressの管理に疲れた人(PHPのバージョンアップ、WordPressのバージョンアップ)
- Markdownで気軽にブログを書きたい人


## Hugoはどんな人には向いていない？

- 自分でサイトを管理したくない人
- Webの管理画面からで記事を書きたい人
- 絶対に[WordPress][]を使いたい人


## まとめ

HugoはGolangで書かれていますが、利用する分にはGolangの知識は必要ないでご心配なく。

静的サイトジェネレータ変更、[WordPress][]から静的サイトジェネレータへの移行を検討されている方は、ぜひHugoも試してみてください！


Hugoインストール方法の記事は[↓こちら](https://www.meganii.com/blog/2017/01/08/installing-hugo/)から

{{% related src="https://www.meganii.com/blog/2017/01/08/installing-hugo/" title="静的サイトジェネレータ「Hugo」インストール" %}}
---
title: "ぐだぐだ言ってないでコードを書けよ、自分！ - 「Webサービスのつくり方」"
date: 2014-09-04T22:43:00+09:00
lastmod: 2023-05-05T01:23:56+09:00
category: ['Tech']
tags: ['book', 'WebService']
slug: create-web-service
img: "https://m.media-amazon.com/images/I/51jdbeo+rmL.jpg"
---

個人的にちょうど「Webサービスのつくり方」ってキーワードがアツかったので読んでみた。心に響いた部分を抜粋する。読んでいたら、何かWebサービスを作りたくなった。

{{% amazon 4774154075 %}}


{{% googleadsense %}}


## ぐだぐだ言ってないでコードを書けよ、ハゲ

![](https://res.cloudinary.com/meganii/image/upload/v1594888330/4466482623_6aea29d90a_z_rhauum.jpg "=640x425")
<span>Code / Riebart</span>


「あれが欲しい」「これが欲しい」「このサービスをもっとこうしたほうがいい」と批判するのは簡単であり、自分のアイデアの方がすごいと自慢する場合もある。しかし、実現していない、カタチになっていないものにはあまり価値がない。


「そこに1,000人いたとして、アイデアを思いつくのが100人、アイデアを実現するのが10人、アイデアで成功する人は1人。」

アイデアを思いつく人はそもそも、少なく、アイデアをカタチにする人はもっと少ない。さらに、成功する人はごくわずかである。アイデアを思いついたら、手を動かしてコードを書くことで成功へのハードルに一歩近づくことができる。



>だけど最終的には、唯一重要なものは現実のコードと技術そのものだよ。向上心もなくコードも書こうとしない人でもコメントはできるし、こうするべきだとか、ああするべきだとか、そうしちゃいけないとかいうこともできるけど、結局はそういった声は問題にならない。唯一重要なものはコードなんだ。 リーナス・トーバルズ



自分も、こんなWebサービスあったらいいのになぁとか、こういうことしたいのになぁとか思うことがあっても結局自分で作るまで至らないことが多い。ないのなら自分で作るエンジニアになりたい。


## なければつくる

![](https://res.cloudinary.com/meganii/image/upload/v1594888369/14477908267_79bbdb0def_z_aruuwp.jpg "=640x481")
<span>wheels / jasleen_kaur</span>

>車輪の再発明　・・・　ある目的を果たすためのライブラリや先行事例があるにもかかわらず、同じことを叶えるためについつい自分で作ってしまう行為。

車輪の再発明は一般的には非効率だが、勉強のためならよいのではないか。既存の似たようなものを参考にできるため、学ぶことが多くある。

「車輪の再開発はしないで車輪を利用したほうが早い。けれども、それがなかった場合は自分で作る」という精神は持ちたい。それができるだけの技術力は持ちたい。


## 実装までにつくる「企画」の全て

![](https://res.cloudinary.com/meganii/image/upload/v1594888388/8624484494_664924de8d_z_jud1xw.jpg "=640x427")
<span>180/365² Sin ideas / anieto2k</span>

1. 哲学
2. アイデア
3. テーマ
4. コンセプト
5. 名前
6. デザイン
7. 内部設計

### 1.哲学

個々人が持っている、特定の興味に関する揺るがない気持ちのこと。この気持ちがサービスやアプリをつくる原動力になる。

>iPadを開発した人の根底にあるのはきっと、「音楽をもっと楽しみたい」という揺るがない気持ちがあったからであろう。そこに「なぜ音楽を楽しむ必要があるのか？」といった問いに対する論理的な理由は存在しなくてよい。『音楽が好きだから』もっと身近に楽しめていいじゃないかと、反論できればいいじゃないか。 (若干意訳)

### 2.アイデア
哲学を叶えるための個別の具体的なアイデア。

「これが欲しい」という哲学から発想していくのがよい。個別の具体的なアイデアをたくさん持っておき、あとで吟味する。


### 3.テーマ
哲学をより具体的にした、勝負する領域のこと。アイデアを出していく過程で固まっていくことが多い。
同じテーマの既存サービスやアプリを調査するために、テーマを定めることは重要である。

iPadの場合は「携帯音楽プレイヤー」がテーマと言える。

### 4.コンセプト
テーマに沿った、アイデアを形成するための骨格のようなもの。何をつくるかを一言で表したもの。

iPadの場合、コンセプトは以下のような文章になる。
専用の音楽ソフトを経由して、所有する曲全てを持ち運べる携帯型音楽プレイヤー


テーマ、コンセプト、アイデアと分けて考えることで、抽象的な内容から具体的な内容へと順を追って説明できるため、人に説明しやすくなる。


### 5.名前
プロダクトのサービス、アプリの名前を決めるのは非常に重要なことである。
これからつくろうとしているものを自分で呼ぶのに名前がないと気持ちが入れない。

これは、「名前重要」というフレーズもあるぐらいなので、実感できるであろう。


### 6.デザイン
全体のディテールを詳細に決めていく作業。

コンセプトやアイデアを洗練させていくと無駄なものが削ぎ落とされ、サービスやアプリに対する最低限の機能が抽出される。それらに対して、ユーザがどのように使っていくかを具体的なイラストなどを元に試行錯誤していく。


### 7.内部設計
内部的にどのように実現するかを設計していく。





## やりたくなったこと

- 何かWebサービスをつくる
- Jekyllのプラグインをつくる
- さくらVPSをもっと使い倒す
- Railsのテストを勉強する



読んだら自然と何かをつくりたくなる、やりたくなる本でした。なんか作りたいんだけど・・・って人は一度読んでみたらどうだろうか？

## 今日の積読本消化

{{% amazon 4774154075 %}}


## 参考

- [「Webサービスのつくり方」 のつくり方](http://www.slideshare.net/yusukebe/web-16710062)
- [個人で出来るWebサービスの作り方(YAPC::ASIA 2013) // Speaker Deck](https://speakerdeck.com/koba04/ge-ren-dechu-lai-ruwebsabisufalsezuo-rifang-yapc-asia-2013)

---
title: "D3.jsチュートリアル"
date: 2016-02-06T12:46:18+09:00
comments: true
category: ['Tech']
tags: ['JavaScript','d3js','データ可視化']
published: true
slug: d3js-tutorial
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

以前から着手してみたかったD3.jsによる可視化の方法を学ぶために、ドットインストールにちょうど良い教材があったためそれを見ながら、確認していく。

[D3.js入門 (全17回) - プログラミングならドットインストール](http://dotinstall.com/lessons/basic_d3js)

<!--more-->
{{% googleadsense %}}


## D3.jsとは

データ・ドリブン・ドキュメント（Data Driven Documents）の頭文字で、`D3.js`。

> 「データに基づいてドキュメントを操作するための JavaScript ライブラリである。

データを描画する場合は、存在するデータごとに「どこに」「どうやって」描画するかを1つ1つのデータに対して指定しなければならない。例えば、for loopで存在するデータ分だけ指定するなど。

しかし、d3.jsはLoopの記述をすることなく、データを描画できる。それは、データ自身が、どこに描画されるかという情報を持っているからである。

触ってみた感じだと、jQueryっぽくDOMを操作しながら、Dataを起点として可視化を行うことができる。データが追加、削除されたからといって、コードを修正するのではなく、再描画するだけ。


## update, enter, exit関数とは

`data`を使った瞬間に仮想領域が作られる。

- update: 対応する要素がある場合 -> text, style
- enter : 対応する要素が足りない場合 -> append
- exit  : 対応する要素が余った場合　-> remove

サンプルコードを読む中で上記の関数（`update`,`enter`,`exit`)を利用しているコードがあった。

このレッスンを受けるまでは意味が分からなかったが、データセットと一致しない場合の処理を記述していただけであることを理解した。


## d3.jsを利用して、どんなことがしたいのか

- GoogleMapsの地図上にデータをマッピングする
- 売上データなどを可視化する


## 参考
- [D3.js入門 (全17回) - プログラミングならドットインストール](http://dotinstall.com/lessons/basic_d3js)
- [D3.js入門 – 「データ・ドリブン」という特徴について ｜ Developers.IO](http://dev.classmethod.jp/ria/html5/d3-js_data_driven/)

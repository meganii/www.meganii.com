---
title: "[コツコツ勉強]よくわからないままJavaScriptを使っている自分へ"
date: 2014-11-28T23:32:00+09:00
comments: true
category: ['Tech']
tags: ['JavaScript']
published: true 
slug: javascript
img: "https://images-na.ssl-images-amazon.com/images/I/51c9uCrhHgL._SL160_.jpg"
---

jQuery、AngularJSとかサンプルを触ってみるけど、いまいちJavaScript自身がわかっていないので全然ピンと来ないので、巷でうわさの「サイ本」を読んでみる。

{{% amazon 4873115736 %}}

{{% googleadsense %}}


## 学んだ点


- スコープ
- 関数
- オブジェクト

### スコープ

関数スコープ・・・変数は、その変数が定義された関数と、その関数に入れ子にされている関数痛からアクセスできる。


### 関数

- JavaScriptでは、関数はオブジェクト
- 変数には関数そのものをいれることができる。
- 関数の入れ子ができる
- クロージャー
- 無名関数

グローバル変数をむやみに増やさないために、関数でラップしているイメージ。

### オブジェクト

- 不変な基本型と、可変なオブジェクト参照
- プロトタイプ (すべてのJavaScriptオブジェクトにはもうひとつ別のオブジェクトが関連付けられる)
- 暗黙の参照
	- メモリの使用量を節約する
	- メンバの追加・変更をインスタンスがリアルタイムに反映できる



{{% img src="https://i.gyazo.com/9edc5cbcac919d8f1e243f3716a1096f.jpg" w="400" h="300"%}}


{{% img src="https://i.gyazo.com/d43a749b9fd9567bbb5471695cd6476c.jpg" w="400" h="300" %}}


## 参考

- [JavaScript 徹底入門のための資料＆書籍まとめ - 酒と泪とRubyとRailsと](http://morizyun.github.io/blog/javascript-learning-tech-yourself_01/)
- [jQueryのソースコードを読むための参考サイト２０選 - DQNEO起業日記](http://dqn.sakusakutto.jp/2012/05/jquery-sourcecode-reading.html)
- [[JavaScript]　猿でもわかるクロージャ超入門　まとめ - DQNEO起業日記](http://dqn.sakusakutto.jp/2009/01/javascript_5.html)


## 感想

受験のときに、手にした「化学の新研究」並の万能感を得られました。
何かを学ぶときには、ネットの情報をちまちま読むよりは、ちゃんとした書籍を読んだ方がいいなと思いました。


{{% amazon 4873115736 %}}

{{% amazon 4385260923 %}}
---
title: "Nightmare.jsでAmazonアフィリエイトのレポートを取得する"
date: 2016-02-01T22:52:47+09:00
comments: true
category: ['Tech']
tags: ['Nightmare','JavaScript']
published: true
slug: how-to-get-amazon-affiliate-reports-with-nightmarejs
img: 'https://images-na.ssl-images-amazon.com/images/I/61DHJGf1uSL._SL160_.jpg'
---

この本を読んで、Ruby, Capybaraから取得することはできていたが、そもそもCapybaraは、PhantomJS/PoltergeistというJavaScriptライブラリのラッパーであり、JavaScriptから直接操作するにはどんな方法があり、どんな書き方になるのかを知りたかったので、調べてみました。これを機会に、JavaScriptを書けるようになりたいとも願いつつ。。。


<div class="booklink-box"><div class="booklink-image"><a href="http://www.amazon.co.jp/exec/obidos/asin/B00TO6KMEK/meganii-22/" target="_blank" ><img src="https://images-na.ssl-images-amazon.com/images/I/51Pyh8Z7bjL._SL160_.jpg" style="border: none;" /></a></div><div class="booklink-info"><div class="booklink-name"><a href="http://www.amazon.co.jp/exec/obidos/asin/B00TO6KMEK/meganii-22/" target="_blank" >Rubyによるクローラー開発技法　巡回・解析機能の実装と21の運用例[Kindle版]</a><div class="booklink-powered-date">posted with <a href="http://yomereba.com" rel="nofollow" target="_blank">ヨメレバ</a></div></div><div class="booklink-detail">るびきち SBクリエイティブ 2015-03-02    </div><div class="booklink-link2"><div class="shoplinkkindle"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B00TO6KMEK/meganii-22/" target="_blank" >Kindle</a></div><div class="shoplinkamazon"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4797380357/meganii-22/" target="_blank" >Amazon[書籍版]</a></div>                              	  	  	      </div></div><div class="booklink-footer"></div></div>

{{% googleadsense %}}


## Nightmareとは？

Nightmare.jsは、ブラウザの挙動を自動化できるJavaScriptライブラリです。以前は、PhantomJSのラッパーだったみたいだが、現在は内部的にElectronを利用するようになった。

[segmentio/nightmare: A high-level browser automation library.](https://github.com/segmentio/nightmare)

```
npm install nightmare
```



## Amazon アフィリエイトの前日のレポートを取得する

まずは、完成品をどうぞ。

```
var Nightmare = require('nightmare');
var vo = require('vo');

vo(function* () {
  var nightmare = Nightmare({ show: false });
  var link = yield nightmare
	  .goto('https://affiliate.amazon.co.jp/')
		.type('input#username', 'USERID')
		.type('input#password', 'PASSWORD')
		.click('#signin > input[type="image"]')
		.wait('#mini-report')
		.evaluate(function () {
			return document.querySelector('#mini-report > div.line-item-total > div.data').textContent;
		});
	yield nightmare.end();
  return link;
})(function (err, result) {
  if (err) return console.log(err);
  console.log(result);
});
```

## サンプルコードを動かす

```
npm install nightmare vo
node --harmony yahoo.js
```

JavaScript初心者な自分にとっては、まず下記のサンプルコードが動かせなかったし、何が原因かわからなかった。よくよくJavaScriptの背景と現状を追ってみると、'function* ', 'yield'などのコードを含むのは、ES2015(ES6)のバージョンの書き方であり、Node.jsのバージョンが古いと動かせないことがわかった。

Node.jsのバージョンをv5.5.0に上げて、再実行したところ、Electronが立ち上がり、yahoo.comに検索しに行くのを確認できる。

```
var Nightmare = require('nightmare');
var vo = require('vo');

vo(function* () {
  var nightmare = Nightmare({ show: true });
  var link = yield nightmare
    .goto('http://yahoo.com')
    .type('input[title="Search"]', 'github nightmare')
    .click('.searchsubmit')
    .wait('.ac-21th')
    .evaluate(function () {
      return document.getElementsByClassName('ac-21th')[0].href;
    });
  yield nightmare.end();
  return link;
})(function (err, result) {
  if (err) return console.log(err);
  console.log(result);
});
```

### Genaratar function* って？

ここ数日の自分の理解だと、「非同期処理を同期的に記述する」ための記述方法であるという理解。`yield`によって処理を途中で止めることができる。
(もう少し理解がまとまったら、追記したい)


## 参考

- [Nightmareがv2(Electronベース)になり、使いやすく感動したのでLIGブログのPV/UUデータ取得を自動化してみた。 - Qiita](http://qiita.com/n0bisuke/items/8a7a52321380e5cf0379)
- [ChatOps + NightmareでメトリクスグラフとBIレポートをSlackに投げるようにした - Glide Note - グライドノート](http://blog.glidenote.com/blog/2015/10/01/nightmare-screenshots/)
- [Nightmare.jsでQiitaのコントリビューション数をスクレイピング - Qiita](http://qiita.com/n0bisuke/items/75b238ec88c96aa0dee8)
- [Web scraping with Nightmare.js | azurelogic.com](https://azurelogic.com/posts/web-scraping-with-nightmare-js/) (PhantomJSの時の例)

## 参考図書

<div class="booklink-box"><div class="booklink-image"><a href="http://www.amazon.co.jp/exec/obidos/asin/4883379930/meganii-22/" target="_blank" ><img src="https://images-na.ssl-images-amazon.com/images/I/61DHJGf1uSL._SL160_.jpg" style="border: none;" /></a></div><div class="booklink-info"><div class="booklink-name"><a href="http://www.amazon.co.jp/exec/obidos/asin/4883379930/meganii-22/" target="_blank" >JS+Node.jsによるWebクローラー/ネットエージェント開発テクニック</a><div class="booklink-powered-date">posted with <a href="http://yomereba.com" rel="nofollow" target="_blank">ヨメレバ</a></div></div><div class="booklink-detail">クジラ飛行机 ソシム 2015-08-31    </div><div class="booklink-link2"><div class="shoplinkamazon"><a href="http://www.amazon.co.jp/exec/obidos/asin/4883379930/meganii-22/" target="_blank" >Amazon</a></div><div class="shoplinkkindle"><a href="http://www.amazon.co.jp/gp/search?keywords=JS%2BNode.js%82%C9%82%E6%82%E9Web%83N%83%8D%81%5B%83%89%81%5B%2F%83l%83b%83g%83G%81%5B%83W%83F%83%93%83g%8AJ%94%AD%83e%83N%83j%83b%83N&__mk_ja_JP=%83J%83%5E%83J%83i&url=node%3D2275256051&tag=meganii-22" target="_blank" >Kindle</a></div><div class="shoplinkrakuten"><a href="http://hb.afl.rakuten.co.jp/hgc/13e181b2.b5761023.13e181b3.cbc7b217/?pc=http%3A%2F%2Fbooks.rakuten.co.jp%2Frb%2F13377786%2F%3Fscid%3Daf_ich_link_urltxt%26m%3Dhttp%3A%2F%2Fm.rakuten.co.jp%2Fev%2Fbook%2F" target="_blank" >楽天ブックス</a></div>                  	  	  	      </div></div><div class="booklink-footer"></div></div>

<div class="booklink-box"><div class="booklink-image"><a href="http://www.amazon.co.jp/exec/obidos/asin/B00TO6KMEK/meganii-22/" target="_blank" ><img src="https://images-na.ssl-images-amazon.com/images/I/51Pyh8Z7bjL._SL160_.jpg" style="border: none;" /></a></div><div class="booklink-info"><div class="booklink-name"><a href="http://www.amazon.co.jp/exec/obidos/asin/B00TO6KMEK/meganii-22/" target="_blank" >Rubyによるクローラー開発技法　巡回・解析機能の実装と21の運用例[Kindle版]</a><div class="booklink-powered-date">posted with <a href="http://yomereba.com" rel="nofollow" target="_blank">ヨメレバ</a></div></div><div class="booklink-detail">るびきち SBクリエイティブ 2015-03-02    </div><div class="booklink-link2"><div class="shoplinkkindle"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B00TO6KMEK/meganii-22/" target="_blank" >Kindle</a></div><div class="shoplinkamazon"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4797380357/meganii-22/" target="_blank" >Amazon[書籍版]</a></div>                              	  	  	      </div></div><div class="booklink-footer"></div></div>

<div class="booklink-box"><div class="booklink-image"><a href="http://www.amazon.co.jp/exec/obidos/asin/4798131113/meganii-22/" target="_blank" ><img src="https://images-na.ssl-images-amazon.com/images/I/51nSK4pE-RL._SL160_.jpg" style="border: none;" /></a></div><div class="booklink-info"><div class="booklink-name"><a href="http://www.amazon.co.jp/exec/obidos/asin/4798131113/meganii-22/" target="_blank" >Effective JavaScript</a><div class="booklink-powered-date">posted with <a href="http://yomereba.com" rel="nofollow" target="_blank">ヨメレバ</a></div></div><div class="booklink-detail">David Herman 翔泳社 2013-02-19    </div><div class="booklink-link2"><div class="shoplinkamazon"><a href="http://www.amazon.co.jp/exec/obidos/asin/4798131113/meganii-22/" target="_blank" >Amazon</a></div><div class="shoplinkkindle"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B00EESW7JQ/meganii-22/" target="_blank" >Kindle</a></div><div class="shoplinkrakuten"><a href="http://hb.afl.rakuten.co.jp/hgc/13e181b2.b5761023.13e181b3.cbc7b217/?pc=http%3A%2F%2Fbooks.rakuten.co.jp%2Frb%2F12215141%2F%3Fscid%3Daf_ich_link_urltxt%26m%3Dhttp%3A%2F%2Fm.rakuten.co.jp%2Fev%2Fbook%2F" target="_blank" >楽天ブックス</a></div>                  	  	  	      </div></div><div class="booklink-footer"></div></div>

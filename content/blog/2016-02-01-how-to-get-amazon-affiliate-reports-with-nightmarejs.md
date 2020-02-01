---
title: "Nightmare.jsでAmazonアフィリエイトのレポートを取得する"
date: 2016-02-01T22:52:47+09:00
lastmod: 2016-02-01T22:52:47+09:00
comments: true
category: ['Tech']
tags: ['Nightmare','JavaScript', 'スクレイピング']
published: true
slug: how-to-get-amazon-affiliate-reports-with-nightmarejs
img: 'https://images-na.ssl-images-amazon.com/images/I/61DHJGf1uSL._SL160_.jpg'
---

[次の本](https://amzn.to/2OjNtaz)を読み進めることで、`Ruby`のライブラリである`Capybara`, `Poltergeist`を利用してスクレイピングを行うことができました。`Poltergeist`は`PhantomJS`というHeadless Browserを操作するための`Capybara`用Driverです。

`PhantomJS`は`JavaScript`ライブラリということで、`JavaScript`から`PhantomJS`を操作するにはどのような方法があるのか調べてみました。これを機会に`JavaScript`を書けるようになりたい。


{{% amazon B00TO6KMEK %}}

<!--more-->
{{% googleadsense %}}


## Nightmareとは

`Nightmare.js`は、ブラウザの挙動を自動化できる`JavaScript`ライブラリです。以前は、`PhantomJS`のラッパーでしたが、現在は内部的に`Electron`を利用するようになりました。

[segmentio/nightmare: A high-level browser automation library.](https://github.com/segmentio/nightmare)

```
npm install nightmare
```



## Amazonアフィリエイトの前日のレポートを取得する

まずは、完成品をどうぞ。

```javascript
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

`JavaScript`初心者の自分は、まず下記のサンプルコードが動かせず、何が原因かわかりませんでした。


`JavaScript`の背景と現状を追ってみると、次のことがわかりました。

- `function*`, `yield`などのコードを含むのは、`ES2015(ES6)`のバージョンの書き方である
- `Node.js`のバージョンが古いと`ES2015(ES6)`で書かれたコードを動かせないこと

`Node.js`のバージョンを`v5.5.0`に上げて、再実行したところ、Electronが立ち上がり、yahoo.comを検索するのを確認できます。

```javascript
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

### Genaratar function*とは何か

ここ数日の自分の理解だと、「非同期処理を同期的に記述する」ための記述方法であるという理解です。`yield`によって処理を途中で止めることができます。
(もう少し理解がまとまったら、追記したい）


## 参考

- [Nightmareがv2(Electronベース)になり、使いやすく感動したのでLIGブログのPV/UUデータ取得を自動化してみた。 - Qiita](http://qiita.com/n0bisuke/items/8a7a52321380e5cf0379)
- [ChatOps + NightmareでメトリクスグラフとBIレポートをSlackに投げるようにした - Glide Note - グライドノート](http://blog.glidenote.com/blog/2015/10/01/nightmare-screenshots/)
- [Nightmare.jsでQiitaのコントリビューション数をスクレイピング - Qiita](http://qiita.com/n0bisuke/items/75b238ec88c96aa0dee8)
- [Web scraping with Nightmare.js | azurelogic.com](https://azurelogic.com/posts/web-scraping-with-nightmare-js/) (PhantomJSの時の例）

## 参考図書

{{% amazon 4883379930 %}}
{{% amazon B00TO6KMEK %}}
{{% amazon 4798131113 %}}
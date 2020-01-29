---
title: "PuppeteerのwaitForNavigationで正しくページ遷移を待つ"
date: 2020-01-30T07:11:59+09:00
lastmod: 2020-01-30T07:11:59+09:00
comments: true
category: ['Tech']
tags: ['Puppeteer', 'スクレイピング']
published: true
slug: puppeteer-wait-for-navigation
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_75/v1514031264/thumbnail_tech.png"
---

[「Puppeteer入門 スクレイピング+Web操作自動処理プログラミング」](https://amzn.to/2RXyTqt)を読むまで、`Puppeteer`の`waitForNavigation`の動きを誤って理解していました。


ここでは、`Puppeteer`を利用して「ページ遷移を待つ」というよくある処理における誤った実装と正しい実装を紹介します。

<!--more-->
{{% googleadsense %}}


## 誤った実装　やりがちなNGパターン

`Puppeteer`で非同期処理を同期的に記述する`await`を用いて、click後にページ遷移を待つという処理を思い浮かべた場合、次のような書き方をしがちです。

```JavaScript
await page.click('.some .a');
await page.waitForNavigation({ waitUntil: 'load'});
```

`waitForNavigation`とは、「**waitForNavigationを呼び出してから次の遷移を待つ**」という意味の処理です。

上記の書き方だと、`waitForNavigation`を呼び出した時には、すでにclickによるページ遷移処理は終わっています。よって、`Navigation Timeout Exceeded`エラーになってしまいます。

私は、この`waitForNavigation`をずっと理解しないまま利用していて、しばしばエラーに悩まされていました。



## 正しくページ遷移を待つ処理

正しい実装としては、`Promise.all`を利用して、`waitForNavigation`と`click`を同時に呼び出すことで、クリックしてページ遷移を待つ処理となります。

```JavaScript
await page.goto('http://example.com');
await Promise.all([
    page.awaitForNavigation({ waitUntil: 'load'}),
    page.click('.some .a'),
]);
```


## 参考

- [puppeteer/api\.md at v1\.20\.0 · puppeteer/puppeteer](https://github.com/puppeteer/puppeteer/blob/v1.20.0/docs/api.md#pagewaitfornavigationoptions)

{{% amazon 4798055204 %}}
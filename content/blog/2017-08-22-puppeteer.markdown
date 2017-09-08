---
title: "puppeteerでAmazonアフィリエイトのレポートを取得する"
date: 2017-08-22T21:43:50+09:00
lastmod: 2017-09-08T21:43:50+09:00
comments: true
category: ['Tech']
tags: ['headless']
published: true
slug: puppeteer
---


[GoogleChrome/puppeteer: Headless Chrome Node API](https://github.com/GoogleChrome/puppeteer) というHeadless Chromeを操作するJavaScriptライブラリが出たので使ってみた。


<!--more-->
{{% googleadsense %}}


何度も実行してロボット判定されてしまったので、実際にはHeadlessで動作確認していないが(おそらく)こんな感じで取得できるはず。

## インストール

```
yarn add puppeteer
```

## コード

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://affiliate.amazon.co.jp/');
  await page.click('#a-autoid-0-announce');
  await page.waitFor(2000);

  await page.focus('#ap_email');
  await page.type('MAIL_ADDRESS');

  await page.focus('#ap_password');
  await page.type('PASSWORD');

  await page.click('#signInSubmit');
  await page.waitForSelector('#a-page > div.ac-page.ac-page-wrapper > div:nth-child(2) > div.a-column.a-span4.a-spacing-none.a-ws-span4.a-ws-spacing-none.a-span-last.a-ws-span-last > div.ac-card > div.ac-card-content.ac-card-content-normal.ac-card-content-normal-alt > div.ac-home-summary-data > div:nth-child(2) > div.a-column.a-span5.a-spacing-none.a-ws-span5.a-ws-spacing-none.a-span-last.a-ws-span-last');

  const result = await page.evaluate(() => {
    return document.querySelector('#a-page > div.ac-page.ac-page-wrapper > div:nth-child(2) > div.a-column.a-span4.a-spacing-none.a-ws-span4.a-ws-spacing-none.a-span-last.a-ws-span-last > div.ac-card > div.ac-card-content.ac-card-content-normal.ac-card-content-normal-alt > div.ac-home-summary-data > div:nth-child(2) > div.a-column.a-span5.a-spacing-none.a-ws-span5.a-ws-spacing-none.a-span-last.a-ws-span-last').textContent;
  });

  console.log(result);

  await page.waitFor(30000);
  await page.screenshot({path: 'amazon.png'});

  browser.close();
})();
```


[Nightmare\.jsでAmazonアフィリエイトのレポートを取得する \- SIS Lab](https://www.meganii.com/blog/2016/02/01/how-to-get-amazon-affiliate-reports-with-nightmarejs/)

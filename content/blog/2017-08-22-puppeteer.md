---
title: "PuppeteerでAmazonアフィリエイトのレポートを取得する"
date: 2017-08-22T21:43:50+09:00
lastmod: 2017-09-10T21:43:50+09:00
comments: true
category: ['Tech']
tags: ['headless', 'Puppeteer']
published: true
slug: puppeteer
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---


[GoogleChrome/puppeteer: Headless Chrome Node API](https://github.com/GoogleChrome/puppeteer) というHeadless Chromeを操作するJavaScriptライブラリが出たので使ってみました。


<!--more-->
{{% googleadsense %}}


何度も実行してロボット判定されてしまったので、実際にはHeadlessで動作確認していないが(おそらく)こんな感じで取得できるはず。


### 2017/09/10追記

デバッグモード以外では毎回ロボット判定されてしまうため、Cookieからログインする方法に変えました。
初回ログイン時は、デバッグモードで動かし、Cookieを保存し、2回目以降はCookieからログインする。


## インストール

```
yarn add puppeteer
```

## コード

```javascript
const puppeteer = require('puppeteer');
const fs = require('fs');

const cookies_path = './cookies_amazon.json';
const {AMAZON_ID, AMAZON_PW} = require('./config');

/**
 * debugモードでログイン
 */
async function login(page) {
  await page.goto('https://affiliate.amazon.co.jp/');
  await page.click('#a-autoid-0-announce');
  await page.waitFor(2000);

  await page.focus('#ap_email');
  await page.type(AMAZON_ID);
  await page.waitFor(2000);
  await page.focus('#ap_password');
  await page.type(AMAZON_PW);
  await page.waitFor(2000);

  await page.click('#signInSubmit');
  await page.waitFor(5000);
  await page.screenshot({path: 'images/amazon_logined.png'});
}

/**
 * Cookieを利用してログイン
 */
async function loginWithCookie(page) {
  const cookies = JSON.parse(fs.readFileSync(cookies_path, 'utf-8'));
  for (let cookie of cookies) {
    await page.setCookie(cookie);
  }
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({width: 1280, height: 700});

  // await login(page);
  await loginWithCookie(page);
  await page.goto('https://affiliate.amazon.co.jp/home');
  await page.screenshot({path: 'images/amazon_login.png'});

  await page.goto('https://affiliate.amazon.co.jp/home/reports?ac-ms-src=summaryforthismonth');
  await page.waitForSelector('#ac-report-commission-commision-total');
  const commission = await page.evaluate(() => {
    return document.querySelector('#ac-report-commission-commision-total').textContent;
  });
  console.log(commission);

  await page.screenshot({path: 'images/amazon_after.png'});
  const afterCookies = await page.cookies();
  fs.writeFileSync('cookies_amazon.json', JSON.stringify(afterCookies));

  browser.close();
})();
```


## Cookie操作

### Cookie保存

```javascript
const cookies = await page.cookies();
fs.writeFileSync('cookies_amazon.json', JSON.stringify(cookies));
```

### Cookie取得・設定

```javascript
const cookies_path = './cookies_amazon.json';
const cookies = JSON.parse(fs.readFileSync(cookies_path, 'utf-8'));
for (let cookie of cookies) {
  await page.setCookie(cookie);
}
```

こんな感じで保存したCookieを設定してあげることで、2回目以降Cookieを使ってログインできました。



{{% amazon 4873117836 %}}



## 参考

- [\-\-headless時代の本命？ Chrome を Node\.jsから操作するライブラリ puppeteer について \- Qiita](http://qiita.com/Quramy/items/26058e83e898ec2ec078)
- [Nightmare\.jsでAmazonアフィリエイトのレポートを取得する \- SIS Lab](https://www.meganii.com/blog/2016/02/01/how-to-get-amazon-affiliate-reports-with-nightmarejs/)

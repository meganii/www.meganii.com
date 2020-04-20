---
title: "Puppeteerを使ってQrunchへクロス投稿する"
date: 2020-04-20T19:45:50+09:00
lastmod: 2020-04-20T19:45:50+09:00
comments: true
category: ['Tech']
tags: ['Puppeteer']
published: true
slug: blog-cross-posting-to-qrunch-automatically-by-puppeteer
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

[QrunchとMediumに技術メモをクロス投稿する \- SIS Lab](https://www.meganii.com/blog/2018/11/03/cross-posting-to-qrunch-and-medium/)で「Qrunchに自動投稿できる仕組みを作る」という課題があったので、`Puppeteer`で自動投稿できるようにしました。

<!--more-->
{{% googleadsense %}}

`Qrunch API`みたいなものがないか少し探してみましたが、なさそうだったので`Puppeteer`で実装しました。

何の変哲も無く、ただ、`Qrunch`へログインして投稿するだけです。
ただ、ブログを書いた後に以下の作業を行うのは非常に面倒だったので、`Qrunch`への投稿のハードルが低くなりました。

- `Qrunch`へログイン
- Markdownをコピペ
- Hugo用のShortCodes変換
- Canonical URLにコピペする


```js
(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  });

  const page = (await browser.pages())[0] || (await browser.newPage());
  await page.setViewport({ width: 1280, height: 800 });
  
  // Login to Qrunch
  await page.goto('https://qrunch.net/login');
  await page.type('#login_user_email', QRUNCH_ID);
  await page.type('#login_user_password', QRUNCH_PW);
  await page.click('input[type=submit]');
  await page.waitFor(3000);

  // Edit new post
  console.log('start posting');
  await page.goto('https://qrunch.net/dashboard/entries/edit');
  await page.type('#entry-title', title);
  await page.evaluate( (markdown) => {
    document.querySelector('#edit-box').textContent = markdown;
  }, markdown);
  
  await page.type('input[name=canonical_url]', `${BLOG_URL}blog/${dateformat}/${slug}/`);
  await page.click('#submit-button-icon');
  await page.click('div[mode="draft"].submit-mode-child');
  await page.click('#submit-button-icon');
  await page.click('#submit-button-text');
```

サンプルは、以下のリポジトリをご覧ください。

[meganii/puppeteer\-qrunch: Auto posting tool for Qrunch](https://github.com/meganii/puppeteer-qrunch)

## 参考

{{% amazon 4798055204 %}}
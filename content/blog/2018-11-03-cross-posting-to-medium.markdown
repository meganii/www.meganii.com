---
title: "QrunchとMediumに技術メモをクロス投稿する"
date: 2018-11-03T14:10:16+09:00
lastmod: 2018-11-03T14:10:16+09:00
comments: true
category: ['Tech']
tags: ['Blog', 'Medium', 'Qrunch']
published: true
slug: cross-posting-to-qrunch-and-medium
img: 
---

もっと気軽にアウトプットできる技術ブログサービス「[Qrunch（クランチ）](https://qrunch.io/」では、重複コンテンツの心配をせずにクロス投稿ができることを知った。

これが可能なのは、Canonicalに元のブログURLを指定できるためです。Canonicalに参照元のURLを明示的に示してあげることで、検索エンジンにコピー記事ではないことを伝えることができます！

普通、世の中のブログ系サービスは、自サービスにユーザーを囲いたいため、わざわざそんなことはしませんが、そこがQrunchの良い部分。自分のコンテンツは、自分の管理下に置くことができます。

エンジニア向けの情報発信のプラットフォームとして、Qiitaもありますが、ブログと同時投稿するとどうしても、記事重複が気になってしまいます。Qiita側が重複と見なされる分にはよいのですが、SEO的には圧倒的にQiitaが強いので、弱小個人ブログ側がまけそうです。

なので、ブログに書いた内容は、Qiitaに投稿するのが憚れるし、逆にQiitaに書いたものはブログにしづらい。そこで出てきたのが、[Qrunch]だと思っています。

<!--more-->
{{% googleadsense %}}


「クロス投稿」について調べてみると、[Medium]も同じことができそうです。
[https://help.medium.com/hc/en-us/articles/217991468-SEO-and-duplicate-content SEO and duplicate content – Medium Support]


## やりたいこと
- Scrapboxで雑にメモ書き
- Markdownでブログ(https://www.meganii.com)投稿
- 同時に、QrunchとMediumに投稿
    - かつ、Canonicalはwww.meganii.comに向ければ、SEO的にもバッチリ



## Medium APIで記事を更新する

```javascript
 const request = require('request');
 const options = { headers: { Authorization: `Bearer ${token}` }};
 request.get('https://api.medium.com/v1/me', options, (err, res, body) => {
   console.log(body);
 });
```


```javascript
 const request = require('request');
 const token = 'hogehoge';
 const title = 'test 2';
 const content = 'test content';
 const url = 'https://www.meganii.com/hogehoge';
 const publishStatus = 'draft';
 
 const options = {
   json: true,
   headers: {
     Authorization: `Bearer ${token}`
   },
   body: {
     title,
     notifyFollowers: true,
     contentFormat: 'html',
     content: `<h1>${title}</h1>\n${content}`,
     tags: [],
     publishStatus,
     canonicalUrl: url,
   }
 } 
 request.post(`https://api.medium.com/v1/users/${userId}/posts`, options, (err, res, body) => {
   console.log(body);
 });
```
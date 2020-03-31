---
title: "QrunchとMediumに技術メモをクロス投稿する"
date: 2018-11-03T14:10:16+09:00
lastmod: 2018-11-03T14:10:16+09:00
comments: true
category: ['Tech']
tags: ['Blog', 'Medium', 'Qrunch']
published: true
slug: cross-posting-to-qrunch-and-medium
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

もっと気軽にアウトプットできる技術ブログサービス「[Qrunch（クランチ）](https://qrunch.io/)」では、重複コンテンツの心配をせずにクロス投稿ができることを知りました。

<!--more-->
{{% googleadsense %}}


クロス投稿が可能なのは、Canonicalに元のブログURLを指定できるためです。Canonicalに参照元のURLを明示することで、検索エンジンにコピー記事ではないことを伝えることができます。

一般的に考えて、世の中のブログ系サービスは自サービスにユーザーを囲いたいため、わざわざCanonical設定などしません。しかしそこをあえて設定できるという部分が、Qrunchの良いポイントです。これにより、自分のコンテンツは自分の管理下に置くことができます。

エンジニア向けの情報発信のプラットフォームとしてはQiitaもありますが、ブログと同時投稿するとどうしても、記事の重複が気になってしまいます。Qiita側が重複コンテンツと見なされる分にはよいのですが、SEO的には圧倒的にQiitaが強いので、弱小個人ブログ側が負けそうです。

なので、ブログに書いた内容はQiitaに投稿するのが憚れるし、逆にQiitaに書いたものはブログにしづらい。そこで出てきたのが、[Qrunch](https://qrunch.io/)だと思っています。


「クロス投稿」について調べてみると、[Medium](https://medium.com/)も同じことができそうです。  
[SEO and duplicate content – Medium Support](https://help.medium.com/hc/en-us/articles/217991468-SEO-and-duplicate-content)


## やりたい流れ

- 1.Scrapboxで雑にメモ書き
- 2.Markdownでブログ投稿
- 3.QrunchとMediumにクロス投稿(Canonicalは www.meganii.com に向ければ、SEO的にもバッチリなはず)

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

## Next Action

- [x] MediumにAPI経由で投稿する
- [ ] Qrunchに自動投稿できる仕組みを作る
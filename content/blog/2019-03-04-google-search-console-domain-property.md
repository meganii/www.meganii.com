---
title: "Google Search Consoleドメインプロパティ機能"
date: 2019-03-04T22:56:48+09:00
lastmod: 2023-05-05T01:24:05+09:00
comments: true
category: ['Tech']
tags: ['Google Search Console']
slug: google-search-console-domain-property
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto/v1594902885/tech_ben4sq.png"
---

ドメインプロパティ機能がリリースされたとのことなので試してみました。

- [Official Google Webmaster Central Blog: Announcing domain-wide data in Search Console](https://webmasters.googleblog.com/2019/02/announcing-domain-wide-data-in-search.html)
- [新Search Consoleにドメインプロパティ機能が追加、wwwありなしとhttp/httpsを自動でまとめてレポート | 海外SEO情報ブログ](https://www.suzukikenichi.com/blog/google-introduces-domain-property-in-new-search-console/)
- [使用するドメインの設定（www の有無） - Search Console ヘルプ](https://support.google.com/webmasters/answer/44231?hl=ja)


<!--more-->
{{% googleadsense %}}

プロパティを新規追加しようとすると下図の通り新しく`Domain`が増えている。`URL prefix`は以前同様のプロパティ。

![](https://i.gyazo.com/thumb/1000/9e34f6db8ea4137e5a712b3af570dce6-png.png "=632x502")

`Domain`に自分が保有しているドメインを登録し、CONTINUEボタンをクリックすると、Ownership auto verifiedと表示される。

![](https://i.gyazo.com/thumb/1000/0ad7912fe14caa9258716370030179e6-png.png "=652x295")


![](https://i.gyazo.com/thumb/1000/2b099101e8801ff9ab35c2e0503e7dbf-png.png "=509x502")


- `Domain property`が登録された

![](https://i.gyazo.com/thumb/1000/7d49b9a8c71a2907e994d79fd71f5e7d-png.png "=314x125")



こうすると、[http://meganii.com](http://meganii.com/) でも [https://meganii.com/](https://meganii.com/) でも[https://www.meganii.com/](https://www.meganii.com/) でもまとめて見ることができる。逆に、サブドメインごとに結果を確認したい場合はあまりおすすめできないかも。


---
title: "Google Search Consoleドメインプロパティ機能"
date: 2019-03-04T22:56:48+09:00
lastmod: 2019-03-04T22:56:48+09:00
comments: true
category: ['Tech']
tags: ['Google Search Console']
published: true
slug: google-search-console-domain-property
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

ドメインプロパティ機能がリリースされたとのことなので試してみました。

- [Official Google Webmaster Central Blog: Announcing domain-wide data in Search Console](https://webmasters.googleblog.com/2019/02/announcing-domain-wide-data-in-search.html)
- [新Search Consoleにドメインプロパティ機能が追加、wwwありなしとhttp/httpsを自動でまとめてレポート | 海外SEO情報ブログ](https://www.suzukikenichi.com/blog/google-introduces-domain-property-in-new-search-console/)
- [使用するドメインの設定（www の有無） - Search Console ヘルプ](https://support.google.com/webmasters/answer/44231?hl=ja)


<!--more-->
{{% googleadsense %}}

プロパティを新規追加しようとすると下図の通り新しく`Domain`が増えている。`URL prefix`は以前同様のプロパティ。

{{% img src="https://i.gyazo.com/thumb/1000/9e34f6db8ea4137e5a712b3af570dce6-png.png" w="632" h="502" %}}

`Domain`に自分が保有しているドメインを登録し、CONTINUEボタンをクリックすると、Ownership auto verifiedと表示される。

{{% img src="https://i.gyazo.com/thumb/1000/0ad7912fe14caa9258716370030179e6-png.png" w="652" h="295" %}}


{{% img src="https://i.gyazo.com/thumb/1000/2b099101e8801ff9ab35c2e0503e7dbf-png.png" w="509" h="502" %}}


- `Domain property`が登録された

{{% img src="https://i.gyazo.com/thumb/1000/7d49b9a8c71a2907e994d79fd71f5e7d-png.png" w="314" h="125" %}}



こうすると、[http://meganii.com](http://meganii.com/) でも [https://meganii.com/](https://meganii.com/) でも[https://www.meganii.com/](https://www.meganii.com/) でもまとめて見ることができる。逆に、サブドメインごとに結果を確認したい場合はあまりおすすめできないかも。


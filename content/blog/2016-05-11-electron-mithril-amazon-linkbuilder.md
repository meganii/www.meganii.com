---
title: "Electronがv1.0.0になったのでMithril.jsと合わせてAmazonアフィリエイトリンクビルダーを作った"
date: 2016-05-11T22:05:30+09:00
lastmod: 2017-08-30T22:05:30+09:00
comments: true
category: ['Tech']
tags: ['Electron', 'mithril.js', 'JavaScript']
published: true
slug: electron-mithril-amazon-linkbuilder
img: "https://farm8.staticflickr.com/7085/26951293955_748076b816_q.jpg"
---

Electronが[Electron 1.0](http://electron.atom.io/blog/2016/05/11/electron-1-0)になったということで、以前作ったAmazon LinkbuilderをMithril.jsで置き換えてみました。(Electron v1.0.0がなったことはあまり関係ありません。。。)

{{% googleadsense %}}


{{% img src="https://farm8.staticflickr.com/7085/26951293955_748076b816_z.jpg" w="640" h="441" %}}

以前の記事「[ElectronでAmazonアフィリエイトリンクビルダーを作った - SIS Lab](https://www.meganii.com/blog/2016/02/20/electron-amazon-link-builder/)」で、Electronと素のJavaScriptでAmazonアフィリエイトリンクビルダーを作成しました。

Amazonから商品を検索するAmazon Product Advertising APIの使い方と、そのJavaScriptラッパーの`node-apac`の使い方は、この記事を参照してください。


## Mithril.js

Electron + Mithril.jsの組み合わせは、[Electron + Mithril.jsでFlickrアプリを作成する - SIS Lab](https://www.meganii.com/blog/2016/02/28/electron-mithriljs-flickr-app/) のときに試しました。使うAPIもコアとなるのは5つ、全部合わせても10数個とシンプルなため、個人的には、VirtualDOM入門にはとっつきやすいと感じました。世間的には、React.jsなんでしょうけどね。

素のJavaScriptを、書き直しました。Model, Controller, ViewModel, Viewの使い方がまだイマイチ分かっていませんが、動くところまではいきました。


## 作成したプログラム

[meganii/electron-amazon-linkbuilder: Amazon Affiliate Link Builder built on Electron with Mithril.js](https://github.com/meganii/electron-amazon-linkbuilder)



package.jsonを以下の通り、1.0.0以上を指定すればよいみたい。(おそらくなので、あまり分かっていない)

```diff
},
 "homepage": "https://github.com/meganii/electron-amazon-linkbuilder#readme",
 "devDependencies": {
-    "electron-prebuilt": "^0.36.0",
+    "electron-prebuilt": "^1.0.0",
   "mithril": "^0.2.4",
   "config": "^1.20.0",
   "apac": "1.5.0"
```

## 参考

(さっそく、作ったAmazonアフィリエイトリンクビルダーで商品リンクを作りました笑)

{{% amazon 4798128457 %}}
{{% amazon 4873115736 %}}

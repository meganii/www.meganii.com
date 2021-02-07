---
title: "Progressive Web Appを有効にする"
date: 2020-08-15T09:37:43+09:00
lastmod: 2020-08-29T13:37:47+09:00
published: true
category: ["Tech"]
tags: ["PWA","AMP", "Blog"]
comment: true
slug: "enabling-progressive-web-app"
img: "https://res.cloudinary.com/meganii/image/upload/v1598661527/odzo1kdud2bvi4iswffn.png"
---

このブログでは、HugoでFull AMPなHTMLを生成し、GitHub Pagesでホストしています。
AMPの最適化を行う際、Lighthouseを利用してWebパフォーマンスを測定しているのですが、PWA Readyになっていないことが気掛かりでした。

個人ブログをPWA化しても自分しか使わないため、自己満足に他なりません。
しかし、PWAがグリーンにならないのは気持ちが悪いため、今回エラーを見直してPWAを有効にしました。

{{% toc %}}

<!--more-->
{{% googleadsense %}}

## 対応前

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1598661492/anpvjk3csklhspmnm1t5.png" w="389" h="267" %}}

既に`Service Worker`は導入しているため、単純に設定漏れによるエラーを解消していきます。
エラーは次の3つでした。

<!-- textlint-disable -->

- start_url does not respond with a 200 when offlineTimed out waiting for start_url (https://www.meganii.com/) to respond
- Web app manifest does not meet the installability requirements
- Manifest doesn't have a maskable icon

<!-- textlint-enable  -->


### start_url does not respond with a 200 when offlineTimed out waiting for start_url (https://www.meganii.com/) to respond.

オフライン時、`start_url`に指定したURLから200のレスポンスコードが返ってこないというエラーです。
次の対応を行いました。

- offline.htmlを用意する
- ServiceWorkerの初期化パラメタに、オフラインページの設定を追加

```js
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
  offlinePageOptions: {
    url: '/offline.html',
    assets: [],
  },
}); 
```


- [Add offline #14](https://github.com/meganii/www.meganii.com/pull/14/commits/0741401ba4b9f1bb2e5737945211b5283e014d8d)
- [start\_url does not respond with a 200 when offline](https://web.dev/offline-start-url/?utm_source=lighthouse&utm_medium=lr)

### Web app manifest does not meet the installability requirements

マニュフェストファイル（manifest.json）の`display`の値は、`minimal-ui` | `fullscreen` | `standalone`のいずれかを指定しないければならないようです。
現時点では、`browser`を指定していたため、`standalone`に変更しました。

[Web app manifest does not meet the installability requirements](https://web.dev/installable-manifest/)

### Manifest doesn't have a maskable icon

下記の通り、各iconサイズ毎に`"purpose": "any maskable"`を追加しました。

```json
{
  …
  "icons": [
    …
    {
      "src": "path/to/maskable_icon.png",
      "sizes": "196x196",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
  …
}
```

[Manifest doesn't have a maskable icon](https://web.dev/maskable-icon-audit/)


## 対応後

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1598661527/odzo1kdud2bvi4iswffn.png" w="403" h="267" %}}


---
title: "AMP Service WorkerでPrefetch Linksを実現する"
date: 2022-06-29T22:01:54+09:00
lastmod: 2022-06-29T22:01:54+09:00
published: true
category: ["Tech"]
tags: ["AMP","Hugo"]
comment: true
slug: "how-to-prefetch-links-with-amp-sw"
img: "https://res.cloudinary.com/meganii/image/upload/f_auto,q_auto/v1594903789/sislab_hugo_j8ykf6.png"
---

AMP Service Workerを使うと、簡単にServiceWorkerを導入できる。
このブログでも利用しているが、1つうまく動かないモジュールがあった。
それは、Prefetch Linksの機能だ。

ドキュメントどおりに設定してもうまく動かなかったが、「amp-install-serviceworkerにdata-prefetch属性を付ける」というのがポイントだったので、メモとして残しておく。

{{% toc %}}


## 設定方法

- amp-swの初期化時に`linkPrefetchOptions`を指定する
```javascript
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
    linkPrefetchOptions: {} // config options here
})
```
- aタグに`data-rel="prefetch"`属性を付ける
```html
<a href='/' data-rel='prefetch'>
```
- `amp-install-serviceworker`に`data-prefetch`属性を付ける
```html
<amp-install-serviceworker
    src="{{ .Site.BaseURL }}sw.js"
    data-iframe-src="{{ .Site.BaseURL }}install-sw.html"
    data-prefetch
    layout="nodisplay">
</amp-install-serviceworker>
```

はじめは、ドキュメントに記載があるとおり次の2つを実施したが、`prefetch`は行われなかった。
- amp-swの初期化時に`linkPrefetchOptions`を指定
- `amp-install-serviceworker`に`data-prefetch`属性を付加

`amp-install-serviceworker.js`の動きを見ていると、`<amp-install-serviceworker>`Elementに`data-prefetch`属性を持つかどうかの判定がある。
`data-prefetch`属性の有無で、`<head>`タグに`<link rel='prefetch'>`が追加されるかどうかが変わることを確認した。
[](https://github.com/ampproject/amphtml/blob/0937333cb3f4d1b09bd41f86db565c2dcda7ed3a/extensions/amp-install-serviceworker/0.1/amp-install-serviceworker.js#L349)


<!--more-->
{{% googleadsense %}}


## 参考

- [https://github.com/ampproject/amp-sw/tree/master/src/modules/link-prefetch](https://github.com/ampproject/amp-sw/tree/master/src/modules/link-prefetch)
- 

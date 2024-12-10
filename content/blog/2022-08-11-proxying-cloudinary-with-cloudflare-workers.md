---
title: "Cloudflare Workersを利用してCloudinaryの画像をプロキシする"
date: 2022-08-11T15:04:15+09:00
lastmod: 2022-09-03T13:12:38+09:00
category: ["Tech"]
tags: ["Cloudflare","Cloudflare Workers","Cloudinary", "CDN"]
comment: true
slug: "proxying-cloudinary-with-cloudflare-workers"
img: "https://i.gyazo.com/6b699bab2307c88c91ee76b026fd981b.png"
---

「すべてをCloudflareのCDNに載せたい」

`Github Pages`から`Cloudflare Pages`に切り替えたタイミングでCDNの設定を見直した。
どうせなら、Cloudinaryで配信している画像もCloudflareのCDNに載せたいと考え、やり方を調査した。


{{% toc %}}

<!--more-->
{{% googleadsense %}}



## 参考URL

- [Proxying Cloudinary image requests with Cloudflare Workers \- Fershad Irani](https://fershad.com/writing/proxy-cloudinary-with-cloudflare-workers/)
- [wesbos/cloudflare\-cloudinary\-proxy](https://github.com/wesbos/cloudflare-cloudinary-proxy)
- [Proxying Cloudinary Requests with Netlify \- Web Performance Consulting \| TimKadlec\.com](https://timkadlec.com/remembers/2020-11-17-netlify-proxy-requests/)


## アイデア

- `_headers`を利用する
- `Cloudflare Workers`を利用する

今回は、`Cloudflare Workers`を試してみた。


## Cloudflare DNS

下図のとおり、Type `AAAA`のレコード`100::`を追加する。

[![Image from Gyazo](https://i.gyazo.com/6b699bab2307c88c91ee76b026fd981b.png)](https://gyazo.com/6b699bab2307c88c91ee76b026fd981b "=1037x91")



## Cloudflare Workers

```javascript {name="index.js"}
addEventListener("fetch", event => {
	event.respondWith(handleRequest(event));
});

const CLOUD_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image`;

async function serveAsset(event) {
	const url = new URL(event.request.url);
  const cache = caches.default;
  let response = await cache.match(event.request)
  if (!response) {
    const cloudinaryURL = `${CLOUD_URL}${url.pathname}`;
    response = await fetch (cloudinaryURL, { headers: event.request.headers });
    // Cache for howver long, here is 4 hours.
    const headers = new Headers(response.headers);
    headers.set("cache-control", `public, max-age=14400`);
    headers.set("vary", "Accept");
    response = new Response(response.body, {...response, headers});
    event.waitUntil(cache.put(event.request, response.clone()));
  }
  return response;
}

async function handleRequest(event) {
  console.log('Requesting the image');
  if (event.request.method === "GET") {
    let response = await serveAsset(event);
    if (response.status > 399)
    response = new Response(response.statusText, { status: response.status });
    return response;
  } else {
    return new Response("Method not allowd", { status: 405 });
  }
}
```

```toml {name="wrangler.toml"}
name = "img-proxy-dev"
main = "src/index.js"
compatibility_date = "2022-08-07"
vars = { ENVIRONMENT = "dev", CLOUD_NAME = "YOUR_NAME" }
[env.production]
name = "img-proxy"
vars = { ENVIRONMENT = "production", CLOUD_NAME = "YOUR_NAME" }
route = "images.example.com/*"
```

上記のような設定をすると下記のようにリダイレクトされる。

- アクセス元 `https://images.example.com/upload/v1628572257/image.png`
- リダイレクト先 `https://res.cloudinary.com/YOUR_NAME/image/upload/v1628572257/image.png`


## 所感

この設定により、CloudflareのEdge側でリバースプロキシのようにURLを書き換えて配信してくれる。
使いようによっては大変便利だ。

しかしながら、利用している間に、ときおり画像が空白になってしまう事象が発生した。
この原因が掴めておらず、一旦もとのCloudinaryのドメインに戻した。

原因解明後、再度設定してみたい。
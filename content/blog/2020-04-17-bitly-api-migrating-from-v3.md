---
title: "Bitlyでの短縮URL作成（v3からv4への移行）"
date: 2020-04-17T19:32:09+09:00
lastmod: 2020-04-18T16:32:09+09:00
comments: true
category: ['Tech']
tags: ['Bitly', 'JavaScript']
published: true
slug: bitly-api-migrating-from-v3
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

Bitly API v3までは以下の通り、access_tokenと共に短縮したいURLをリクエストパラメタに乗せて、GETリクエストを行う方法でした。

`https://api-ssl.bitly.com/v3/shorten?access_token=$apiKey&longUrl=hogehoge'`

v4からはheaderに`Authorization: Bearer {token}`を入れてPOSTリクエストをする必要があります。

[bitly APIで短縮URL\(TwitterのURLバン対策 パート2\) \- くらげになりたい。](https://www.memory-lovers.blog/entry/2019/07/14/123000)を参考にさせていただき、v3からv4へ移行しました。


<!--more-->
{{% googleadsense %}}

### v4での短縮URL取得サンプル（JavaScript）

```js
const axios = require('axios');

const BITLY_ACCESS_TOKEN = process.env.BITLY_KEY || "";

(async () => {
  try {
    const endpoint = 'https://api-ssl.bitly.com/v4';
    const url = `${endpoint}/shorten`;

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BITLY_ACCESS_TOKEN}`
      }
    };

    const params = {
      long_url: 'https://www.meganii.com/'
    };

    const res = await axios.post(url, params, options);
    console.log(res.data.link);

  } catch (error) {
    console.log(error.response.body);
  }
})();
```

詳しいドキュメントは、以下のBitlyのサイトをご覧ください。

- [Bitly API V4](https://dev.bitly.com/v4/#section/OAuth-2)
- [Bitly API Documentation](https://dev.bitly.com/v4_documentation.html#section/Migrating-from-V3)



## 参考

- [bitly APIで短縮URL\(TwitterのURLバン対策 パート2\) \- くらげになりたい。](https://www.memory-lovers.blog/entry/2019/07/14/123000)
- [Bitly API V4](https://dev.bitly.com/v4/#section/OAuth-2)
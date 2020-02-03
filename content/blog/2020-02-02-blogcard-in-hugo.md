---
title: "HugoでAMP対応のブログカードを作る"
date: 2020-02-02T22:25:06+09:00
lastmod: 2020-02-02T22:25:06+09:00
comments: true
category: ['Tech']
tags: ['Hugo', 'AMP', 'JavaScript']
published: true
slug: blogcard-in-hugo
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_100/v1514036568/thumbnail_hugo_icon.png"
---

「Hugoでもブログカードを利用したい」

そう考えているところに以下の記事がTwitterのTLで流れてきたので、試してみました。

[Hugoでブログカードに対応する \| Hugo 入門 / 解説 \| nasust dev blog](https://nasust.com/hugo/shortcode/blogcard/)




<!--more-->
{{% googleadsense %}}


## ブログカードのShortcodeと表示例

```
{{% escape "{{% blogcard https://nasust.com/hugo/shortcode/blogcard/ %}}" %}}
```

{{% blogcard "https://nasust.com/hugo/shortcode/blogcard/" %}}


`blogcard`というShortcodeを利用することで、対象ページのTitle, Description, OGPを取得して表示します。

Shortcode`blogcard`の実装は以下の通りです。ローカルに立ち上げたAPIサーバ（Express）に対して`getJSON`を行うことで、ビルド時に情報を取得します。

## Shortcode for blogcard
```html
{{ $url := ( .Get 0) }}
{{ $getURL := printf "http://localhost:6060/getogp?%s" (querify "url" $url ) }}
{{ $ogpjson := getJSON $getURL }}
{{ $getSizeURL := printf "http://localhost:6060/size?%s" (querify "url" $ogpjson.image ) }}
{{ $imgjson := getJSON $getSizeURL }}

<p></p><!-- Avoid overriding list -->
<div class="embed">
    <div class="rf">
        <div class="rr">
            <div class="rcx9 rcm9 rpls">
                <div class="rf">
                    <div class="rr">
                        <div class="rcx12 body">
                            <a class="utdn"
                                href="{{ $ogpjson.url }}"><strong>{{ $ogpjson.title }}</strong></a>
                        </div>
                        <div class="rcm12" style="font-size: .8rem;">
                            {{ $ogpjson.description | truncate 50 }}</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rcx3 rcm3 rtxc rpxs rpls">
                <a href="{{ $ogpjson.url }}">
                    <div>
                        <amp-img class="" src="{{ $ogpjson.image }}"
                            alt="{{ $ogpjson.title }}" width="75" height="75" layout="fixed"></amp-img>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
```


## APIサーバ (app.ts)

上記記事を参考にさせていただきました。`/size`はサイズ取得が必要となったとき用にAPIを生やしました。

[Hugoでブログカードに対応する \| Hugo 入門 / 解説 \| nasust dev blog](https://nasust.com/hugo/shortcode/blogcard/)

```TypeScript
import * as express from 'express';
import * as client from 'cheerio-httpcli';
import * as requestImageSize from 'request-image-size';

const app = express();

app.get("/size", (expressRequest, expressResponse, expressNext) => {
    const url = expressRequest.query.url;
    client.fetch(url, (err, $, res, body) => {
        if (err) {
            expressNext(err)
            return;
        }

        requestImageSize(url)
            .then(size => {
                const result = {
                    width: size.width,
                    height: size.height,
                };
                expressResponse.json(result);
            })
            .catch(err => console.error(err));
    });
})

app.get("/getogp", (expressRequest, expressResponse, expressNext) => {
    const url = expressRequest.query.url;
    client.fetch(url, (err, $, res, body) => {
        if (err) {
            expressNext(err)
            return;
        }

        const result = {
            exists: false,
            title: "",
            description: "",
            url: "",
            image: "",
            site_name: "",
            type: "",
        }

        const ogTitleQuery = $("meta[property='og:title']");

        if (ogTitleQuery.length > 0) {
            result.exists = true;
            result.title = $("meta[property='og:title']").attr("content");
            result.description = $("meta[property='og:description']").attr("content");
            result.url = $("meta[property='og:url']").attr("content");
            result.image = $("meta[property='og:image']").attr("content");
            result.site_name = $("meta[property='og:site_name']").attr("content");
            result.type = $("meta[property='og:type']").attr("content");
        } else {
            result.title = $("head title").text()
            result.description = $("meta[name='description']").attr("content");
        }

        expressResponse.json(result);
    });

})

app.listen(6060, () => console.log('Listening on port 6060'));
```


## CI（Azure Pipelines）での設定

CI上でも実行できるように事前にJSON API Serverを実行するようにしました。

```yaml
- script: |
    npx ts-node src/app.ts &
  displayName: 'Run json api server'

- script: |
    hugo
  displayName: 'Build content by hugo'

```

## まとめ

今まで、Hugoの`getJSON`を使うときには、外部にAPIサーバを立てないといけないという固定観念がありました。しかし、よく考えればローカルAPIサーバでも問題なく動作するので、使い方に幅が出そうです。

ただし、「動的にコンテンツを生成するのはHugoの哲学に沿っているのか」という点は少し検討すべきです。ビルドが超高速なため、編集・確認までをシームレスに行えるのがHugoの魅力です。`getJSON`を利用することでビルド速度が落ちてしまったら、魅力が半減してしまうことを懸念しています。（`getJSON`はキャッシュを行うので一度情報取得してしまえば問題ない可能性もあります）

しばらくは、試しながら様子を見てみます。

{{% twitter tweetid="1218846363527438336" %}}
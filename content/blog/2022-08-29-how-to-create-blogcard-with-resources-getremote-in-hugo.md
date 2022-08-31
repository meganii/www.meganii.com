---
title: "Hugoでブログカードを作成する（resources.GetRemote利用）"
date: 2022-08-29T20:48:25+09:00
lastmod: 2022-08-29T20:48:25+09:00
published: true
category: ["Tech"]
tags: ["Hugo","ブログカード"]
comment: true
slug: "how-to-create-blogcard-with-resources-getremote-in-hugo"
img: "https://res.cloudinary.com/meganii/image/upload/f_auto,q_auto/v1594903789/sislab_hugo_j8ykf6.png"
---

以前、[HugoでAMP対応のブログカードを作る](/blog/2020/02/02/blogcard-in-hugo/)でAPIサーバを利用したブログカードの作成方法を紹介した。このときは、`getJSON`を利用していた。

Hugo `v0.91.0`で`resources.GetRemote`が実装され、`getJSON`や`getCSV`以外にも`resources.GetRemote`を利用できるようになった。

[Release v0\.91\.0 · gohugoio/hugo](https://github.com/gohugoio/hugo/releases/tag/v0.91.0)

`resources.GetRemote`を利用したブログカードの作り方のメモ。


{{% toc %}}

<!--more-->
{{% googleadsense %}}


## `resources.GetRemote`を利用したブログカードの作り方

`resources.GetRemote`を利用して、ビルド時に指定したURLにアクセスして、OGPを取得する。
結果は、以下のような形となる。

![resources.GetRemoteを利用したブログカード作成](https://res.cloudinary.com/meganii/image/upload/v1661948364/dhgp6qcyvpamqque9kgx.png "=678x433")


### markdownファイル

`{{% escape "{{< blogcard \"http://example.com\" >}}" %}}`のように記述する。

```html
{{% escape `{{< blogcard "https://www.meganii.com/blog/2022/08/14/migration-from-github-to-cloudflare-pages/" >}}` %}}

{{% escape `{{< blogcard "https://www.meganii.com/blog/2022/08/11/proxying-cloudinary-with-cloudflare-workers/" >}}` %}}

{{% escape `{{< blogcard "http://example.com" >}}` %}}
```

### layouts/shortcodes/blogcard.html

Shortcodeの中身は次のとおり。

```html
{{- $url := (.Get 0) -}}
{{- with $result := resources.GetRemote $url -}}
    {{- with $result.Err -}}
        {{- warnf "%s" . -}}{{- . -}}
    {{- else -}}
        {{- $title := "" -}}
        {{- $description := "" -}}
        {{- $image := "" -}}
        {{- with $head := index (findRE `<head>(.|\n)*?</head>` $result.Content) 0 -}}
            {{- range $meta := findRE `<meta.*?>` $head -}}
                {{- $name := replaceRE `<.*name=\"(.*?)\".*>` "$1" $meta -}}
                {{- $property := replaceRE `<.*property=\"(.*?)\".*>` "$1" $meta -}}
                {{- $content := replaceRE `<.*content=\"(.*?)\".*>` "$1" $meta -}}
                {{- if eq $property "og:title" -}}
                    {{- $title = $content -}}
                {{- else if eq $property "og:description" -}}
                    {{- $description = $content -}}
                {{- else if eq $property "og:image" -}}
                    {{- $image = $content -}}
                {{- end -}}
                {{- if and (eq $description "") (eq $name "description") -}}
                    {{- $description = $content -}}
                {{- end -}}
            {{- end -}}
            {{- if eq $title "" -}}
                {{- with index (findRE `<title>(.*?)</title>` $head) 0 -}}
                    {{- $title = replaceRE `<title>(.*?)</title>` "$1" . -}}
                {{- end -}}
            {{- end -}}
        {{- end -}}

        {{- $thumbnail_url := "" -}}
        {{- with $image -}}
            {{- with $thumbnail := resources.GetRemote $image -}}
                {{- with $thumbnail.Err -}}
                    {{- warnf "%s" . -}}{{- . -}}
                {{- else -}}
                    {{- $thumbnail_url = $thumbnail.RelPermalink -}}
                {{- end -}}
            {{- end -}}
        {{- end -}}

        <div style="margin-top: 10px;">
            <a href="{{- $url -}}" style="padding: 12px;border: solid 1px #eee;display: flex;text-decoration: none;color: #000;" onMouseOver="this.style.opacity='0.9'">
                <div style="flex-shrink: 0;">
                    <img src="{{ with $thumbnail_url }}{{- . -}}{{- else -}}/noimage.png{{- end -}}" alt="" width="100" height="100" style="object-fit: contain;" />
                </div>
                <div style="margin-left: 10px;">
                    <h2 style="margin: 0;padding-bottom: 13px;border: none;font-size: 16px;">
                        {{- $title -}}
                    </h2>
                    <p style="margin: 0;font-size: 13px;word-break: break-word;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;">
                        {{- $description | plainify | safeHTML -}}
                    </p>
                </div>
            </a>
        </div>
    {{- end -}}
{{- end -}}
```

## 参考
- [Hugoでついに外部URLのブログカードを作れるようになった【自作ショートコード】 \| Hugoブログテーマ「Salt」](https://hugo-theme-salt.okdyy75.com/article/salt/blog-card/)

---
title: "Cloudinaryを利用したレスポンシブ配信"
date: 2018-01-17T20:06:20+09:00
lastmod: 2018-01-17T20:06:20+09:00
comments: true
category: ['Tech']
tags: ['Cloudinary']
published: true
slug: cloudinary-imagesets
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

HTML配信のプラクティスとして、PC、スマートフォンなど画面サイズに応じて適切な画像サイズを配信するというものがあります。

PC画面と比べて画面サイズが小さいスマートフォンに対して、高画質の画像を配信することは無駄ですので、画面サイズに合わせた画像サイズを選択することが必要です。

そこで、Cloudinaryという画像変換サービスを利用して、レスポンシブ対応しました。

今まで写真などの画像は、基本的にはFlickrを利用していました。
実験的にCloudinaryを利用して、無料枠に収まるかを確認しています。

Cloudinary専用の`shortcodes`を用意しても良かったのですが、`{{% escape "{{% img %}}" %}}`タグの中で吸収する形式をとりました。

<!--more-->
{{% googleadsense %}}


今のところ、shortcodesはこんな感じにしています。

```html
 {{ $baseurl := "https://res.cloudinary.com/meganii/image/upload/" }}
 
 {{ if and (hasPrefix (.Get "src") $baseurl) ( or (eq (.Get "layout") "center") ( eq (.Get "layout") "") ) }}
 {{ $itemid := .Get "src" | replaceRE "^https?://res.cloudinary.com/meganii/image/upload/.+/(.*)" "$1" }}
 <figure class="center">
   <amp-img
       src="{{ .Get "src" }}"
       srcset="{{ $baseurl }}q_auto,f_auto,w_1000/{{ $itemid }} 1000w,
               {{ $baseurl }}q_auto,f_auto,w_800/{{ $itemid }} 800w,
               {{ $baseurl }}q_auto,f_auto,w_640/{{ $itemid }} 640w,
               {{ $baseurl }}q_auto,f_auto,w_400/{{ $itemid }} 400w,
               {{ $baseurl }}q_auto,f_auto,w_320/{{ $itemid }} 320w"
       width="{{ .Get "w"}}"
       height="{{ .Get "h" }}"
       layout="responsive"
       alt="image">
   </amp-img>
 </figure>
 {{ else }}
 <figure{{ if .Get "class" }} class="{{ .Get "class" }}"{{ end }}>
   <amp-img src="
   {{ if eq (substr (.Get "src") 0 4) "http" }}{{ .Get "src"}}{{ else }}{{ $.Site.BaseURL }}{{ .Get "src" }}{{ end }}" alt="{{ .Page.Title }} {{ .Get "src" }}" width={{ .Get "w" | default "640" }} height={{ .Get "h" | default "400"}} layout={{ .Get "layout" | default "responsive" }}></amp-img>
   {{ if .Get "caption" }}
   <figcaption>
     {{ if .Get "href" }}
     <a href="{{ .Get "href" }}" target="_blank">{{ .Get "caption" }}</a>
     {{ else }}
     {{ .Get "caption" }}
     {{ end }}
   </figcaption>
   {{ end }}
 </figure>
 {{ end }}
```
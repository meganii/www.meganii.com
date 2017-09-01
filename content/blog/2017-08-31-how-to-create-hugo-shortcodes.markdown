---
title: "Hugo Shortcodesの作り方"
date: 2017-08-31T20:36:39+09:00
lastmod: 2017-08-31T20:36:39+09:00
comments: true
category: ['Tech']
tags: ['Hugo', 'shortcodes']
published: true
slug: how-to-create-hugo-shortcodes
img:
---

Shortcodesの作り方

<!--more-->
{{% googleadsense %}}




## Speakerdeck

```
{{% espace "{{% speakerdeck XXXXXXX %}}" %}}
```

### AMP version

```
{{ $id := .Get 0 }}

<amp-iframe
  width="710"
  height="596"
  allowfullscreen
  sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
  layout="responsive"
  frameborder="0"
  src="https://speakerdeck.com/player/{{$id}}">
</amp-iframe>
```


## Amazon アフィリエイト

```
{{% espace "{{% amazon XXXXXXX %}}" %}}
```

```
{{% espace "{{% amazon id=\"XXXXXXX\" width=\"100\" height=\"100\" %}}" %}}
```


```
{{ $associateId := "meganii-22" }}
{{ $json := .Site.Data.amazon }}

{{ if .IsNamedParams }}
  {{ $.Scratch.Add "amazonItemId" ( .Get "id") }}
  {{ $.Scratch.Add "amazonItemWidth" ( .Get "width") }}
  {{ $.Scratch.Add "amazonItemHeight" ( .Get "height") }}
{{ else }}
  {{ $.Scratch.Add "amazonItemId" ( .Get 0) }}
  {{ $.Scratch.Add "amazonItemWidth" "100" }}
  {{ $.Scratch.Add "amazonItemHeight" "100" }}
{{ end }}

{{ $itemId := $.Scratch.Get "amazonItemId" }}
{{ $imgWidth := $.Scratch.Get "amazonItemWidth" }}
{{ $imgHeight := $.Scratch.Get "amazonItemHeight" }}

<div>
{{ range $json }}
  {{ if eq .Item.ASIN $itemId }}
  <div class="amazon-shortcode-box">
      <div class="amazon-shortcode-inner">
        <div class="amazon-shortcode-content">
          <div class="amazon-shortcode-image">
            <a href="http://www.amazon.co.jp/exec/obidos/ASIN/{{ $itemId }}/{{ $associateId }}/" name="amazon-shortcode">
              <amp-img class="thumb" src="{{ .Item.SmallImage.URL }}" alt="{{ .title }}" width="{{ .Item.SmallImage.Width }}" height="{{ .Item.SmallImage.Height }}" layout="fixed" />
            </a>
          </div>
          <div class="amazon-shortcode-body">
            <div class="amazon-shortcode-info">
              <p class="amazon-shortcode-title">
                <a href="http://www.amazon.co.jp/exec/obidos/ASIN/{{ $itemId }}/{{ $associateId }}/" name="amazon-shortcode">{{ .Item.ItemAttributes.Title }}</a>
              </p>
              {{ with .author }}
                <p class="amazon-shortcode-author">{{ . }}</p>
              {{ end }}
              <div class="amazon-shortcode-detail">
                {{ if or ( eq .productgroup "Book") (eq .productgroup "eBooks") }}
                  <p>出版社：{{ .publisher }}</p>
                {{ else }}
                  <p>{{ .label }}</p>
                {{ end }}
                {{ with .publicationdate }}
                  <p>発売日：{{ . }}</p>
                {{ end }}
              </div>
              <p>
                <a href="http://www.amazon.co.jp/exec/obidos/ASIN/{{ $itemId }}/{{ $associateId }}/" name="backport">
                  <i class="fa fa-amazon" aria-hidden="true"></i>&nbsp;Amazonで詳細を見る
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  {{ end }}
{{ end }}
<div>
```

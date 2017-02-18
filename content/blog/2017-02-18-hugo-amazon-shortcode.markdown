---
title: "hugo amazon shortcode"
date: 2017-02-18T21:04:17+09:00
lastmod: 2017-02-18T21:04:17+09:00
comments: true
category: ['Tech']
tags: ['Hugo','アフィリエイト']
published: true
slug: hugo-amazon-shortcode
img: https://images-fe.ssl-images-amazon.com/images/I/61EL3Dc95dL._SL160_.jpg
---

技術書の紹介をする際も、カエレバのようなリンクビルダーを利用してきましたが、重い腰を上げてHugoの`shortcodes`と`Data-driven Content`で対応しました。

## 使用方法

`{{% espace "{{% amazon 477418392X %}}" %}}`と記述することで、以下の結果を得る。

{{% amazon 477418392X %}}

<!--more-->
{{% googleadsense %}}




## Shortcodes amazon.html

```
{{ $associateId := "YOUR_ASSOCIATE_ID" }}
{{ $itemId := index .Params 0 }}
{{ $json := getJSON "https://yourapi.com/?itemid=" $itemId }}

<div class="amazon-shortcode-box">
  <div class="amazon-shortcode-image">
    <a href="http://www.amazon.co.jp/exec/obidos/ASIN/{{ $itemId }}/{{ $associateId }}/" name="amazon-shortcode" target="\_blank">
      <img src="{{ $json.image_url }}" alt="{{ $json.title }}" />
    </a>
  </div>
  <div class="amazon-shortcode-info">
    <p class="amazon-shortcode-title">
      <a href="http://www.amazon.co.jp/exec/obidos/ASIN/{{ $itemId }}/{{ $associateId }}/" name="amazon-shortcode" target="\_blank">
        {{ $json.title }}
      </a>
    </p>
    {{ with $json.author }}
      <p class="amazon-shortcode-author">{{ . }}</p>
    {{ end }}
    <div class="amazon-shortcode-detail">
      {{ if or ( eq $json.productgroup "Book") (eq $json.productgroup "eBooks") }}
        <p>出版社：{{ $json.publisher }}</p>
      {{ else }}
        <p>{{ $json.label }}</p>
      {{ end }}
      {{ with $json.publicationdate }}
        <p>発売日：{{ . }}</p>
      {{ end }}
    </div>
    <p>
      <a href="http://www.amazon.co.jp/exec/obidos/ASIN/{{ $itemId }}/{{ $associateId }}/" name="backport" target="\_blank">
        <i class="fa fa-amazon" aria-hidden="true"></i>&nbsp;Amazonで詳細を見る
      </a>
    </p>
  </div>
  <br style="clear: both;"/>
</div>
```
## Data-driven Content

`getJSON`の取得先は、自前のAPIサーバです。AmazonのItem Idを渡し、Amazon Product APIを利用して情報を取ってきます。

```
{{ $itemId := index .Params 0 }}
{{ $json := getJSON "https://yourapi.com/?itemid=" $itemId }}
```

## 参考

- [HugoでAmazonの商品紹介用のShortcodesを作ってみた \| backport](http://backport.net/blog/2016/12/10/hugo_shortcodes_amazon/)
- [PHPを使ってAmazonの商品情報をJSON形式で取得 \| backport](http://backport.net/blog/2016/12/08/amazon_product_advertising_api/)
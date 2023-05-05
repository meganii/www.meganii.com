---
title: "HugoのShortcodesを利用してAmazon紹介リンクタグを作成"
date: 2017-02-18T21:04:17+09:00
lastmod: 2023-05-05T01:24:01+09:00
comments: true
category: ['Tech']
tags: ['Hugo','アフィリエイト']
published: true
slug: hugo-amazon-shortcode
img: "https://res.cloudinary.com/meganii/image/upload/f_auto,q_auto/v1594903789/sislab_hugo_j8ykf6.png"
---

技術書の紹介をする際も、カエレバのようなリンクビルダーを利用してきましたが、重い腰を上げてHugoの`shortcodes`と`Data-driven Content`で対応しました。

## 使用方法

`{{% escape "{{% amazon 477418392X %}}" %}}`と記述することで、以下の結果を得ることができます。

{{% amazon 477418392X %}}

<!--more-->
{{% googleadsense %}}

### `Shortcodes`を利用するメリット

1. 紹介リンクを生成して貼り付ける必要がなくなった
2. Markdownの文書中にHTMLリンクを埋め込まなくてよくなったので可視性が上がった
3. Amazon紹介のリンクのデザインを変更する場合、`Shortcodes`とcssを変更することで一括変更できるようになった

Amazon紹介リンクをhtmlで埋め込むと、変更したくなった場合は1つ1つ手で直していかなければいけません。
`Shortcodes`にしておけば、テンプレートとCSSを変えることで簡単にデザインを変更できます。


## Shortcodes amazon.html

```html
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

`getJSON`の取得先は自前のAPIサーバです。AmazonのItem Idを渡し、Amazon Product Advertising APIを利用して情報を取ってきます。

### amazon.html

```
{{ $itemId := index .Params 0 }}
{{ $json := getJSON "https://yourapi.com/?itemid=" $itemId }}
```

`getJSON`で指定したURIにGETリクエストを送って、jsonを取得します。取得したデータは、デフォルトだと`$TMP/hugo`に格納されます。私は、`config.yml`で`cacheDir: cache`と指定しているため、`cache`ディレクトリにどんどん溜まっていきます。

![](https://i.gyazo.com/5c4906467fd2cca1af9c78d101604e5c.png "=890x492")

APIサーバのレスポンスを待つため、一気にAmazonリンクを生成しようとするとどうしてもタイムアウトを起こしてhugo生成がエラーになります。
これは、Amazon Product Advertising APIの仕様で連続アクセスが禁止されているため、APIサーバ側でエラーになってしまうからです。

今の運用は、次の手順のとおり、1つずつ確認しながら実施することで回避しています。

1. VSCodeでMarkdown編集
2. `hugo server`でプレビュー実施
3. {{% escape "{{ amazon ITEMID }}" %}}を1件ずつ処理

1度でも正常に生成できれば、`cache`ディレクトリにキャッシュが作成されるため、以降はエラーが発生しなくなります。

## 参考

- [HugoでAmazonの商品紹介用のShortcodesを作ってみた \| backport](https://backport.net/blog/2016/12/10/hugo_shortcodes_amazon/)
- [PHPを使ってAmazonの商品情報をJSON形式で取得 \| backport](https://backport.net/blog/2016/12/08/amazon_product_advertising_api/)


{{% amazon 479814410X %}}

{{% amazon 4844379208 %}}

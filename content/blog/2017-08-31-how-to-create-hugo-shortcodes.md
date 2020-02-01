---
title: "Hugo Shortcodesの作り方"
date: 2017-08-31T20:36:39+09:00
lastmod: 2017-08-31T20:36:39+09:00
comments: true
category: ['Tech']
tags: ['Hugo', 'shortcodes']
published: true
slug: how-to-create-hugo-shortcodes
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_75/v1514036568/thumbnail_hugo_icon.png"
---

Hugoでは、ちょっとしたHTMLタグを記事やテンプレートに差し込みたいと思った場合、ShortCodesという便利な機能が使えます。


<!--more-->
{{% googleadsense %}}

例えば、次のものがあります。

- Twitterのツイート埋め込み
- Slideshare, Speakerdeckなどのスライドの埋め込み
- Youtubeなどの動画埋め込み
- Amazonアフィリエイトリンク
- Instagramの写真
- imgタグ
- Adsense


## Shortcodesのメリット

HTMLタグを直書きと比べて何が嬉しいかというと、次の2点が挙げられます。

1. 変更に強い
1. 見た目がシンプル

埋め込みURLでよくあるパターンが、各記事に主導でコードを埋め込んだはいいがちょっと変更を加えたいときに、1つ1つ直していかなければいけないというものです。

HTML直書きだと変更に対して明らかに弱いです。

一方、Shortcodesにしておけば、コードは変えずにレイアウトを後からいくらでも変更できます。サイトのテーマを変えたとしても、Shortcodesは変わりません。

このように**変更に強い**のはShortcodesのメリットです。

AMP化をするときも、このShortcodesが役になってくれました。
(img -> amp-imgも、Shortcodesのレイアウトを1箇所変換すれば、Shortcodesを埋め込んだ箇所全てが変更されます）


次に、「見た目がシンプル」になるのがメリットです。

HTML直打ちだと、divタグやらimgタグやらで、どうしてもごちゃごちゃしてしまいます。Shortcodesなら、`{{% escape "{{% img src='/test.jpg' %}}"%}}`と、シンプルに書くことができます。


## Shortcodesのデメリット

逆にShortcodesのデメリットはあまり思いつきません。強いて挙げるならば、各種Webサービスの埋め込みコードはHTML直書きに最適化されており、単純にそのまま貼り付けても使えない点です。

一度、HTMLを貼り付けて、それを自分でShortcodes用に変換してあげる必要があります。難しいことはないのですが、ちょっと面倒です。


# Shortcodesの作り方

## 1. `hoge.html`というファイルをlayouts > shortcodesの中に作る

{{% img src="https://farm5.staticflickr.com/4419/36881344171_f5002848c5_o.png" w="237" h="397" layout="fixed" %}}

## 2. `hoge.html`の中身を書く

例えば、`baseurl.html`として、単純に`.Site.BaseURL`を返すだけのShortcodesの場合の記述例は以下の通り。

baseurl.html

```
{{% escape "{{ .Site.BaseURL }}"%}}
```

## 3. Shortcodesを呼び出したいところで、Shortcodesを記述する

例えば、記事中に以下のように記述する。

Shortcodes
```
{{% escape "{{% baseurl %}}"%}}
```

## 4. hugo serverでプレビューして確認する


`{{% baseurl %}}` のようにShortcodes(`{{% escape "{{% baseurl %}}"%}}`)が展開される。





# Shortcodesの例

## Speakerdeck

```
{{% escape "{{% speakerdeck XXXXXXX %}}" %}}
```

AMP version

```html
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


## Amazonアフィリエイト

例えば、以下のように名前付きと、引数1つの場合を切り分けたい場合、`.IsNamedParams`を利用することで処理を分けることができます。

```
{{% escape "{{% amazon 477418392X %}}" %}}
```

```
{{% escape "{{% amazon id=\"477418392X\" width=\"100\" height=\"100\" %}}" %}}
```

ここでの注意点は、Go Templateの変数スコープです。一般的な変数スコープなら、以下のようにif文の中で再代入できると思ったのですが、Go Templateでは再代入・再割当ができないっぽいです。

```
{{ $v := "init" }}
{{ if true }}
    {{ $v := "changed" }}
{{ end }}
v: {{ $v }} {{/* => init */}}
```

では、どのように回避するかというと、Hugoでは`Scratch`というFunctionを利用するそうです。

[text/template: add support for nested variable assignment · Issue \#10608 · golang/go](https://github.com/golang/go/issues/10608)


### Scratchの使い方


- 設定 `$.Scratch.Add "Name" "Value"`
- 取得 `$.Scratch.Get "Name"`


改めて、AmazonアフィリエイトのShortcodesです。`$json`データは、Data Folderのファイルを読み込んでいます。

```html
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


ぜひあなたも、HugoのShortcodesを使って、便利かつ簡潔に記述してみませんか。
おすすめのShortcodesがあったらぜひ教えてください。


{{% amazon B01LMS7B1O %}}

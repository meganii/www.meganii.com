---
title: "AMPページの最適化〜ぼくのAMPサイトがこんなに遅い訳がない〜"
date: 2019-10-11T22:19:49+09:00
lastmod: 2019-10-11T22:19:49+09:00
comments: true
category: ['Tech']
tags: ['Hugo', 'AMP', 'Blog']
published: true
slug: optimize-amp
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

このサイトも`AMP`対応したのだから、`Lighthouse`や`PageSpeed Insights`のスコアもきっと高いはずと計測してみたところ、全然スコアが出ていなかったので改善しました。その時のメモを残しておきます。

{{% toc %}}

<!--more-->
{{% googleadsense %}}

## TL;DR

- `AMP`用のJavaScript読み込みは必要最小限にする
- Font Awesomeを利用しない
- `AMP`の必須Script `https://cdn.ampproject.org/v0.js` をpreloadする
- Google Adsenseを利用している場合、自サイト以外のドメインからの読み込みが発生するため、DNSの事前名前解決が効く（preconnect, dns-prefetch)


## 計測

広告あり、画像ありの一般的なページである次の記事を対象として、`PageSpeed Insights`で計測してみました。

- [静的サイトジェネレータ「Hugo」でシンプルブログサイトを構築する \- SIS Lab](https://www.meganii.com/blog/2017/01/08/static-site-generator-hugo/)

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1571020728/pagespeed_insights_before_bve1iy.png" w="1440" h="1073" %}}


スコアはなんと、"59"。ぼくの`AMP`のスコアがこんなに低いなんて・・・。

モバイルでのスコア90を目指します。


## セルフホストしたAMP Pagesを最適化する

まずは、`AMP`公式サイトの[Optimize your hosted AMP pages \- amp\.dev](https://amp.dev/ja/documentation/guides-and-tutorials/optimize-and-measure/optimize_amp/)の手順に従い、最適化に取り組みます。

### 1. 最初のタグは`meta charest tag`で始め、その後残りの`meta tag`を記述する

{{% quote %}}
The first tag should be the meta charset tag, followed by any remaining meta tags.
{{% /quote %}}

理由は明記されていませんでしたが、レイアウトに関係のある項目を最初に読み込む必要があるためとの認識です。
（`<meta name="viewport" content="width=device-width,minimum-scale=1">`の部分など）

### 2. AMP runtime v0.jsをpreloadする

> Next, preload the AMP runtime v0.js `<script>` tag with `<link as=script href=https://cdn.ampproject.org/v0.js rel=preload>`. The AMP runtime should start downloading as soon as possible because the AMP boilerplate hides the document via body { visibility:hidden } until the AMP runtime has loaded. Preloading the AMP runtime tells the browser to download the script with a higher priority. Take a look at server-side-rendering to learn how to avoid this.

```
<link rel="preload" as="script" href="https://cdn.ampproject.org/v0.js">
```


### 3. `Render-delaying extensions`が含まれているのであれば、preloadする

> If your page includes render-delaying extensions (e.g., amp-experiment, amp-dynamic-css-classes, amp-story), preload those extensions as they're required by the AMP runtime for rendering the page.

amp-experiment, amp-dynamic-css-classes, amp-storyなど、レンダリングを遅延される拡張機能があるのであれば、preloadします。


`Render-delaying extensions`とは、以下の通りページの静的レイアウトに影響するものと定義されています。

> Render-delaying extensions affect the static layout of the page. Hence, the AMP runtime must wait until these are downloaded, before it can start rendering the page to avoid annoying page jumps. To improve page load time, it's best to download these extensions with a higher priority using a preload directive.


### 4. preconnectを利用して異なるドメインに対するコネクション確立を高速化する

> Use preconnect to speedup the connection to other origin where the full resource URL is not known ahead of time, for example, when using Google Fonts:


`AMP`と`Google Adsense`で利用するドメインの名前解決と接続の投機的開始を行う。

```html
<meta http-equiv="x-dns-prefetch-control" content="on">
<link rel="preconnect dns-prefetch" href="https://cdn.ampproject.org/" crossorigin>
<link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
<link rel="preconnect dns-prefetch" href="https://pagead2.googlesyndication.com" crossorigin>
<link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect dns-prefetch" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect dns-prefetch" href="https://googleads.g.doubleclick.net" crossorigin>
<link rel="preconnect dns-prefetch" href="https://stats.g.doubleclick.net" crossorigin>
<link rel="preconnect dns-prefetch" href="https://static.doubleclick.net" crossorigin>
```

[Webフロントエンド ハイパフォーマンス チューニング](https://amzn.to/2oEvv9g)でも述べられていますが、以下の対策が有効です。

- DNS prefetch (DNSプリフェッチ）
    - href属性に指定したドメインの名前解決をバックグラウンドで処理する
    - 名前解決したドメインのIPアドレスはブラウザのキャッシュに格納
- 接続の投機的開始
    - rel属性に`preconnect`を指定すると、指定したドメインへの接続のみをあらかじめ行う
    - 接続とは、ドメイン名のDNSの名前解決、TCP接続のハンドシェイク、TLSコネクションの確立（TLS利用時）


### 5. `AMP runtime`を読み込む

いくらAMPだからといって、闇雲にScriptを読み込んでいたら意味がありません。`<head>`タグ内の断捨離を行って、Scriptの読み込みは必要最低限にとどめましょう。

AMP Startからの名残で、利用していないにもかかわらず一通りのAMPライブラリを読み込んでいましたので、必要な分だけ読み込むように変更しました。

Hugoを利用しているので、ページごとにamp extensionsがあるかないかを判断するようにしました。`{{ if gt (len (findRE "amp-youtube" .Content)) 1 }}`の部分はもうちょっと改良できる気がしますが、ある程度動作しているのでまずはこれで対処しました。

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
{{ if gt (len (findRE "amp-youtube" .Content)) 1 }}
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
{{ end }}
{{ if gt (len (findRE "amp-iframe" .Content)) 1 }}
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
{{ end }}
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
{{ if gt (len (findRE "amp-twitter" .Content)) 1 }}
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
{{ end }}
{{ if eq .IsHome false }}
<script async custom-element="amp-addthis" src="https://cdn.ampproject.org/v0/amp-addthis-0.1.js"></script>
{{ end }}
```

### 6. `Render-delaying extensions`のscriptを指定する

> Specify the `<script>` tags for render-delaying extensions (e.g., amp-experiment amp-dynamic-css-classes and amp-story)

amp-experiment amp-dynamic-css-classes and amp-storyなどがあれば、ここで指定します。


### 6. 残りのAMP extensionsのscriptを指定する

> Specify the `<script>` tags for remaining extensions (e.g., amp-bind ...). These extensions are not render-delaying and therefore should not be preloaded as they might take away important bandwidth for the initial render.


`Render-delaying extensions`でなければレンダリングを遅延させないので、preloadしないようにすること。preloadすると、初期画面のレンダリングの帯域を奪ってしまいかえって遅くなる可能性がある。


### 7. `amp-custom`を指定する

> Specify any custom styles by using the `<style amp-custom>` tag.

インラインCSSをこの順番で指定します。


### 8. そのほかのheadタグで記述するものを指定する

> Add any other tags allowed in the `<head>` section. In particular, any external fonts should go last since they block rendering.

特に、外部フォントの場合はレンダリングブロックするため、最後に指定する必要があります。

Font Awesomeを引用マークだけに利用していたため、今回を機に削除しました。

### 9. AMP boilerplateを指定する

> Finally, specify the AMP boilerplate code. By putting the boilerplate code last, it prevents custom styles from accidentally overriding the boilerplate css rules.

最後に、`AMP boilerplate`のコードを指定します。最後に配置することにより、`custom style`が誤って`AMP boilerplate`のCSSルールをオーバーライドすることを防ぎます。


## 改善前と改善後


### Before

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1571020728/pagespeed_insights_before_bve1iy.png" w="1440" h="1073" %}}

```html
<head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
    <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
    <script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>
    <script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
    <script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"></script>
    <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
    <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
    <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
    <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
    <script async custom-element="amp-fx-flying-carpet" src="https://cdn.ampproject.org/v0/amp-fx-flying-carpet-0.1.js"></script>
    <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
    <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
    <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
    <script async custom-element="amp-auto-ads" src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"></script>
    <script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"></script>
    <script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"></script>
    <script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
    <script async custom-element="amp-link-rewriter" src="https://cdn.ampproject.org/v0/amp-link-rewriter-0.1.js"></script>
    <title>{{ $isHomePage := eq .Title .Site.Title }}{{ .Title }}{{ if eq $isHomePage false }} - {{ .Site.Title }}{{ end }}</title>
    <link rel="canonical" href="{{ .Permalink }}">
    <link rel="manifest" href="https://www.meganii.com/manifest.json">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <meta name="theme-color" content="#2196f3">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-custom>
      {{ replaceRE " +" " " (replaceRE "\n" "" (partial "styles.css" .)) | safeCSS }}
    </style>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    {{ partial "meta.html" . }}
</head>
```

### After

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1571020728/pagespeed_insights_after_wfkhi8.png" w="1440" h="1067" %}}

```html
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <meta name="theme-color" content="#2196f3">
    {{ partial "meta.html" . }}
    <meta http-equiv="x-dns-prefetch-control" content="on">
    <link rel="preconnect dns-prefetch" href="//cdn.ampproject.org" crossorigin>
    <link rel="preconnect dns-prefetch" href="//fonts.gstatic.com" crossorigin>
    <link rel="preconnect dns-prefetch" href="//pagead2.googlesyndication.com" crossorigin>
    <link rel="preconnect dns-prefetch" href="//fonts.gstatic.com" crossorigin>
    <link rel="preconnect dns-prefetch" href="//fonts.googleapis.com" crossorigin>
    <link rel="preconnect dns-prefetch" href="//googleads.g.doubleclick.net" crossorigin>
    <link rel="preconnect dns-prefetch" href="//stats.g.doubleclick.net" crossorigin>
    <link rel="preconnect dns-prefetch" href="//static.doubleclick.net" crossorigin>
    <link rel="preconnect dns-prefetch" href="//tpc.googlesyndication.com" crossorigin>
    <link rel="preconnect dns-prefetch" href="//res.cloudinary.com" crossorigin>
    <link rel="preconnect dns-prefetch" href="//www.google-analytics.com" crossorigin>
    <link rel="preconnect dns-prefetch" href="//adservice.google.com" crossorigin>
    <link rel="preconnect dns-prefetch" href="//m.addthis.com" crossorigin>
    <link rel="preload" as="script" href="https://cdn.ampproject.org/v0.js">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
    {{ if gt (len (findRE "amp-youtube" .Content)) 1 }}
    <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
    {{ end }}
    {{ if gt (len (findRE "amp-iframe" .Content)) 1 }}
    <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
    {{ end }}
    <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
    <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
    {{ if gt (len (findRE "amp-twitter" .Content)) 1 }}
    <script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
    {{ end }}
    {{ if eq .IsHome false }}
    <script async custom-element="amp-addthis" src="https://cdn.ampproject.org/v0/amp-addthis-0.1.js"></script>
    {{ end }}
    <style amp-custom>
      {{ replaceRE " +" " " (replaceRE "\n" "" (partial "styles.css" .)) | safeCSS }}
    </style>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <link rel="canonical" href="{{ .Permalink }}">
    <link rel="manifest" href="https://www.meganii.com/manifest.json">
    <link rel="icon" href="/images/icons/icon-72x72.png">
    <title>{{ $isHomePage := eq .Title .Site.Title }}{{ .Title }}{{ if eq $isHomePage false }} - {{ .Site.Title }}{{ end }}</title>
</head>
```


## まとめ

[Optimize your hosted AMP pages \- amp\.dev](https://amp.dev/ja/documentation/guides-and-tutorials/optimize-and-measure/optimize_amp/)に従い、AMPサイトの最適化を行うことで、PageSpeed Insightsのスコアを向上させることができました。

`AMP`だから大丈夫だといって、一般的なWebパフォーマンスチューニングのお作法を蔑ろにしているとスコアが伸びません。改めてベストプラクティスを準拠することで、スコアアップ、ひいてはサイト表示の高速化に繋がります。

また、今回、[Webフロントエンド ハイパフォーマンス チューニング](https://amzn.to/2oEvv9g)を読みながら、チューニングの心構え、ブラウザレンダリングの仕組みを学びました。

今までなんとなく遅いからといって、計測せずに仕組みを知らずに、場当たり的なチューニングを実施していなかったでしょうか。
ぜひ本書を読んで、ブラウザレンダリングの仕組みを理解、計測した上でチューニングを行ってみてください。

{{% amazon B0728K5JZV %}}


## 参考

- [Webフロントエンド ハイパフォーマンス チューニング](https://amzn.to/2oEvv9g)
    - パフォーマンスチューニングの基礎から学べます
- [Optimize your hosted AMP pages \- amp\.dev](https://amp.dev/ja/documentation/guides-and-tutorials/optimize-and-measure/optimize_amp/)
- [AMP Boilerplate Generator](https://amp.dev/boilerplate/)
    - `Boilerplate`を作成する際に便利

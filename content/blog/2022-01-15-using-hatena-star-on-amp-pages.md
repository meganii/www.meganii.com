---
title: "はてなスターをAMPページで利用する"
date: 2022-01-15T19:45:58+09:00
lastmod: 2022-06-12T13:48:03+09:00
published: true
category: ["Tech"]
tags: ["はてな","はてなスター","AMP"]
comment: true
slug: "using-hatena-star-on-amp-pages"
img: "https://res.cloudinary.com/meganii/image/upload/v1642307559/amp-hatenastar_fef0zp.png"
---

![はてなスターをAMPページで利用する](https://res.cloudinary.com/meganii/image/upload/v1642307559/amp-hatenastar_fef0zp.png "?size=1024x512&hero=1")


2022年1月11日に突如「はてなスター」がリニューアルされました。

- [はてなスターをリニューアルしました。また、リニューアル記念キャンペーンを実施します！ \- はてなブログ開発ブログ](https://staff.hatenablog.com/entry/2022/01/11/144533)
- [はてなスターをリニューアルしました \- はてなスター日記](https://star.hatenastaff.com/entry/renewal)

かつて「はてなダイアリー」や「はてなブログ」を利用していたときには、気軽にフィードバックできる仕組みとして「はてなスター」は重宝していました。
しかし、独自ドメインへの移行とともに「はてなスター」設置をやめてしまいました。
「はてなスター」の仕様上は「はてなブログ」でなくともScriptを読み込むことで利用できることは知っていたのですが、AMPページでの実装方法がわからなかったためです。

今回の「はてなスター」リニューアルを機に、「はてなスター」の「はてなブログ」以外での設置方法を再確認し、さらにAMPページでの設置方法を調査しました。

{{% toc %}}

<!--more-->
{{% googleadsense %}}

## はてなスターをAMPページで利用する方法

結論から言うと、自前で用意した「はてなスター」表示用サイトを`amp-iframe`で読み込むことにより、AMPページでも「はてなスター」を設置できました。

https://meganii.github.io/amp-hatenastar/は、GitHub Page上に用意した「はてなスター」用JavaScriptを読み込むペライチサイトです。
URLパラメータ`title`と`url`を渡すことで、「はてなスター」でスターを付けるページを認識させています。


わたしのブログはHugoを利用しているため、`{{% escape "{{ .Title }}" %}}`でページタイトル、`{{% escape "{{ .Permalink }}" %}}`でページURLが展開されます。

### はてなスター設置場所のamp-iframe

```html
<amp-iframe height=50
  layout="fixed-height"
  sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-forms allow-popups-to-escape-sandbox allow-top-navigation"
  resizable
  src="https://meganii.github.io/amp-hatenastar/?title={{ .Title }}&url={{ .Permalink }}">
<div overflow tabindex=0 role=button aria-label="">Read more...</div>
</amp-iframe>
```

### はてなスター展開イメージ

次の図のようにAMPページであっても「はてなスター」が展開されます。

![AMP用はてなスター](https://res.cloudinary.com/meganii/image/upload/v1642307979/hatenastar_for_amp_swnl9w.png "=515x221")


## 「はてなスター」表示用サイト

「はてなスター」表示用サイトは、次のGitHubリポジトリに置いてあります。

- [amp-hatenastar](https://github.com/meganii/amp-hatenastar)
- https://meganii.github.io/amp-hatenastar/


「はてなスター」表示用サイト作成する上でのポイントを残しておきます。


### 「はてなスター」を「はてなブログ」以外に設置する方法

「はてなスター」を「はてなブログ」以外に設置する方法は、次のページに記載があるとおり、はてなスター用のスクリプトを読み込み、サイトのごとにはてなスターの設定をするだけです。

[はてなスターをブログに設置するには \- Hatena Developer Center](http://developer.hatena.ne.jp/ja/documents/star/misc/hatenastarjs)


次のスクリプトを`<head>`タグの中や`<body>`タグの最後で読み込みます。

```javascript
<script type="text/javascript" src="https://s.hatena.ne.jp/js/HatenaStar.js"></script>
```

[はてなスターをブログに設置するには \- Hatena Developer Center](http://developer.hatena.ne.jp/ja/documents/star/misc/hatenastarjs)のサンプルは、`http`になっていますが、`https`でも読み込めましたので、ここでは`https`としています。


### サイトごとのはてなスター設定

サイトによっては、「はてなスター」用スクリプトの読み込みだけで「はてなスター」を表示できる場合もあります。そのままでは表示できない「はてなスター」非対応のページの場合は、スターを設定するためには次の要件を満たす必要があります。

> はてなスター非対応のページでスターを設置するには、ページの HTML に以下の4種類の要素がある必要があります。
> - エントリに対応する HTML 要素 (entryNode)
> - エントリのタイトルに対応する要素 (entryNode.title)
> - エントリの permalink に対応する要素 (entryNode.uri)
> - "Add Star " ボタンが入る要素 (entryNode.container)

「はてなスター」を付けるためのエントリタイトル、エントリURL、そしてスター設置場所をHTML要素と紐づけます。

たとえば、`<div id="container">`のようなHTMLがあった場合の`entryNodes`、`title`、`uri`、`container`設定例を示します。

- `entryNodes`は、エントリ全体のdiv要素である`div#container`
- `title`は、`entryNodes`の中の最初の`h3`要素
- `uri`は、`entryNodes`の中の最初の`a`要素
- はてなスター設置場所は、`div#hatena-star-container`

```html
<body>
  <div id="container">
    <div>
      <a id="h-uri" href="https://sandbox-amp-hatenastar.vercel.app/">
        <h3 id="h-title">はてなスター</h3>
      </a>
    </div>
    <div id="hatena-star-container" style="padding-top: 40px;"></div>
  </div>
  
  <script type="text/javascript" src="https://s.hatena.ne.jp/js/HatenaStar.js"></script>
  <script>
    Hatena.Star.SiteConfig = {
        entryNodes: {
            'div#container': {
                uri: 'a',
                title: 'h3',
                container: 'div#hatena-star-container'
            }
        }
    };
</script>
</body>
```

通常のHTMLサイトであれば、上記設定により「はてなスター」を設定可能です。
しかしながら、AMPは任意のJavaScriptが利用できないため、そもそも`HatenaStar.js`を読み込めません。
JavaScriptで実装されている「はてなスター」をAMPページに設置するためには、工夫が必要です。

## はてなスターをAMP対応させる

AMPページにJavaScriptを利用した「はてなスター」を表示するためには、次の2つの対応が必要です。

- 「はてなスター表示用のHTMLサイト」を用意する
- 「はてなスター」を設置するページで、`amp-iframe`を用いて「はてなスター表示用のHTMLサイト」読み込む


### はてなスター表示用のHTMLサイトを用意する

`amp-frame`の制約上、同一オリジンからのページ読み込みができません。
そのため、別の環境にHTMLを1つ配置します。

用意するHTMLは以下のようなものです。  
https://github.com/meganii/amp-hatenastar/blob/4cba1e88eb67da79a5a72374313d1f13e675cff3/index.html


### 「はてなスター」を設置するページで、`amp-iframe`を用いて「はてなスター表示用のHTMLサイト」読み込む

用意した「はてなスター表示用のHTMLサイト」を`amp-iframe`で読み込みます。
`sandbox`の設定は理解が曖昧で要確認ですが、まずはこの設定値で動作しました。

```html
<amp-iframe class="ml-0" height=80
  layout="fixed-height"
  sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-forms allow-popups-to-escape-sandbox allow-top-navigation"
  resizable
  src="https://meganii.github.io/amp-hatenastar/?title={{ .Title }}&url={{ .Permalink }}">
<div overflow tabindex=0 role=button aria-label="">Read more...</div>
</amp-iframe>
```

## 課題

- `amp-iframe`の`sandbox`に対する理解が不足しており、適切な設定が行えていない可能性がある
- スターをクリックした場合、通常であれば、付けた人のはてなプロフィールに遷移するが、iframeの中で描画されてしまう
  - 暫定対応として、別ウィンドウで開くようにJavaScriptで制御している
- 「はてなスター」が2段以上になった場合、レイアウト崩れの可能性がある（そんなに付けられることはないので一旦保留）
- `ShadowDOM`の操作というか、`ShadowDOM`そのものの理解不足


## まとめ

無理矢理読み込ませている感は否めないですが、AMPページでも「はてなスター」を表示させることができました。
しばらく運用してみて、CSSなどを調整してみます。


## 2022/06/12追記

はてなスターが押しづらく、あまり機能していないと判断して削除した。
設定できることは確証が得られたため、必要になったら再度設置する。

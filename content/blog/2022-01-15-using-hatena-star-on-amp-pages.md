---
title: "はてなスターをAMPページで利用する"
date: 2022-01-15T19:45:58+09:00
lastmod: 2022-01-15T19:45:58+09:00
published: true
category: ["Tech"]
tags: ["はてな","はてなスター","AMP"]
comment: true
slug: "using-hatena-star-on-amp-pages"
img: "https://res.cloudinary.com/meganii/image/upload/v1642307559/amp-hatenastar_fef0zp.png"
---

![はてなスターをAMPページで利用する](https://res.cloudinary.com/meganii/image/upload/v1642307559/amp-hatenastar_fef0zp.png "=1024x512")


2022年1月11日に突如「はてなスター」がリニューアルされました。

- [はてなスターをリニューアルしました。また、リニューアル記念キャンペーンを実施します！ \- はてなブログ開発ブログ](https://staff.hatenablog.com/entry/2022/01/11/144533)
- [はてなスターをリニューアルしました \- はてなスター日記](https://star.hatenastaff.com/entry/renewal)

かつて「はてなダイアリー」や「はてなブログ」を利用していたときには、気軽にフィードバックできる仕組みとして「はてなスター」は重宝していました。
しかし、独自ドメインへの移行とともに「はてなスター」設置をやめてしまいました。
「はてなスター」の仕様上は「はてなブログ」でなくともScriptを読み込むことで利用できることは知っていたのですが、AMPページでの実装方法がわからなかったためです。

今回の「はてなスター」リニューアルを機に、はてなブログ以外での設置方法を再確認し、さらにAMPページでの設置方法を調査しました。

{{% toc %}}

<!--more-->
{{% googleadsense %}}

## はてなスターをAMPページで利用する方法

結論から言うと、自前で用意した「はてなスター」表示用サイトを用意し、次のとおり`amp-iframe`を利用して読み込むことで、AMPページでも「はてなスター」を設置できました。

```html
<amp-iframe class="ml-0" height=50
  layout="fixed-height"
  sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-forms allow-popups-to-escape-sandbox allow-top-navigation"
  resizable
  src="https://meganii.github.io/amp-hatenastar/?title={{ .Title }}&url={{ .Permalink }}">
<div overflow tabindex=0 role=button aria-label="">Read more...</div>
</amp-iframe>
```

![AMP用はてなスター](https://res.cloudinary.com/meganii/image/upload/v1642307979/hatenastar_for_amp_swnl9w.png "=515x221")


`https://meganii.github.io/amp-hatenastar/`は、GitHub Page上に用意した「はてなスター」のJavaScriptを読み込むペライチサイトです。
URLパラメータ`title`と`url`を渡すことで、「はてなスター」でスターを付けるページを認識させています。


## 「はてなスター」表示用サイト

「はてなスター」表示用サイトは、次のGitHubリポジトリに置いてあります。

- [amp-hatenastar](https://github.com/meganii/amp-hatenastar)
- https://meganii.github.io/amp-hatenastar/


「はてなスター」表示用サイト作成する上でのポイントを残しておきます。


### 「はてなスター」を「はてなブログ」以外に設置する方法

「はてなスター」を「はてなブログ」以外に設置する方法は、次のページに記載があるとおり、はてなスター用のスクリプトを読み込み、サイトのごとにはてなスターの設定をするだけです。

[はてなスターをブログに設置するには \- Hatena Developer Center](http://developer.hatena.ne.jp/ja/documents/star/misc/hatenastarjs)


#### はてなスター用スクリプトの読み込み

次のスクリプトを`<head>`タグの中や`<body>`タグの最後で読み込みます。

```javascript
<script type="text/javascript" src="https://s.hatena.ne.jp/js/HatenaStar.js"></script>
```

[はてなスターをブログに設置するには \- Hatena Developer Center](http://developer.hatena.ne.jp/ja/documents/star/misc/hatenastarjs)のサンプルは、`http`になっていますが、`https`でも読み込めましたので、ここでは`https`としています。


### サイトごとのはてなスター設定

サイトによっては、はてなスター用スクリプトの読み込みだけではてなスターが表示できる場合もありますが、はてなスター非対応のページでスターを設定するための要件として次の記載があります。

> はてなスター非対応のページでスターを設置するには、ページの HTML に以下の4種類の要素がある必要があります。
> - エントリに対応する HTML 要素 (entryNode)
> - エントリのタイトルに対応する要素 (entryNode.title)
> - エントリの permalink に対応する要素 (entryNode.uri)
> - "Add Star " ボタンが入る要素 (entryNode.container)

はてなスターを付けるためのエントリタイトル、エントリURL、そしてスター設置場所をHTML要素と紐づけます。


たとえば、次のようなページがあった場合の設定ファイル例です。

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
しかしながら、AMPは任意のJavaScriptが利用できないため、JavaScriptで実装されている「はてなスター」をAMPページに設置するためには、工夫が必要です。

## はてなスターをAMP対応させる

AMPページにJavaScriptを利用したはてなスターを表示するためには、次の2つを実施します。

- はてなスター表示用のHTMLサイトを用意する
- はてなスターを設置するページで、`amp-iframe`を用いて「はてなスター表示用HTML」を描画する


### はてなスター表示用のHTMLサイトを用意する

`amp-frame`の制約上、同一オリジンからのページ読み込みができません。
そのため、別の環境にHTMLを1つ配置します。

用意するHTMLは以下のようなものです。

```html
<!doctype html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <title>amp-iframe hatena</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"
    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
  <script type="text/javascript" src="https://s.hatena.ne.jp/js/HatenaStar.js"></script>
</head>

<body style="margin: 0;">
  <div id="container">
    <div style="display: none;">
      <a id="h-uri" href="https://sandbox-amp-hatenastar.vercel.app/">
        <h3 id="h-title">はてなスター</h3>
      </a>
    </div>
    <div id="hatena-star-container" style="padding-top: 40px;"></div>
  </div>
  <script>
    window.addEventListener('message', receiveMessage, false);
    function receiveMessage(event) {
      if (event.data) {
        var msg;
        try {
          msg = JSON.parse(event.data);
        } catch (err) {
          // Do nothing
        }
        if (!msg)
          return false;

        if (msg.name === 'resize' || msg.name === 'rendered') {
          window.parent.postMessage({
            sentinel: 'amp',
            type: 'embed-size',
            height: msg.data.height
          }, '*');
        }
      }
    }
  </script>
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
  <script>
    var params = new URLSearchParams(window.location.search);
    var title = params.get("title");
    var url = params.get("url");
    console.log(title);
    console.log(url);
    document.querySelector("#h-title").innerText = title;
    document.querySelector("#h-uri").href = url;
  </script>
  <script>
    $(function(){
      var shadowRoot = $("#hatena-star-container span")[0].shadowRoot;
      shadowRoot.addEventListener('click', (e) =>{
        e.preventDefault();
        var a = $(e.target).parent()[0];
        window.open(a.href, '_blank');
      });
    });
  </script>
</body>

</html>
```

### はてなスターを設置するページで、`amp-iframe`を用いて「はてなスター表示用HTML」を描画する

```html
<amp-iframe class="ml-0" height=80
  layout="fixed-height"
  sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-forms allow-popups-to-escape-sandbox allow-top-navigation"
  resizable
  src="https://meganii.github.io/amp-hatenastar/?title={{ .Title }}&url={{ .Permalink }}">
<div overflow tabindex=0 role=button aria-label="">Read more...</div>
</amp-iframe>
```


## まとめ

無理矢理読み込ませている感は否めないですが、AMPページでも「はてなスター」を表示させることができました。
しばらく運用してみて、CSSなどを調整してみます。

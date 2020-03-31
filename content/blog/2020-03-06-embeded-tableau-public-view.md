---
title: "Tableau PublicのVizをiframeでブログに埋め込む方法"
date: 2020-03-06T17:24:18+09:00
lastmod: 2020-03-07T17:24:18+09:00
comments: true
category: ['Tech']
tags: ['Tableau', 'Tableau Public']
published: true
slug: embeded-tableau-public-view
img: https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_1024/v1579905055/thumb_tableau_czhjxd.png
---

`Tableau Desktop`で作成したVizは`Tableau Public`と呼ばれるギャラリーサイトに公開できます。一度`Tableau Public`に公開すればTableau Public上でのURLが発行されます。

このURLを共有すればVizの共有ができますが、Vizをブログに埋め込みたい場合はどのようにすればよいでしょうか。調べた結果を記載します。


<!--more-->
{{% googleadsense %}}


## Tableau PublicのVizをブログに埋め込む方法

やり方としては以下2通りです。

1. Tableau Publicが用意する埋め込みコードを利用する（JavaScript利用）
2. iframeでTableau Publicの埋め込みを行う


### 1. Tableau Publicが用意する埋め込みコードを利用する

下図のShareボタンをクリックすると埋め込みコードが発行されます。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1583580549/sharing_tableau_public_qmf1tj.png" w="502" h="73" %}}


基本的に、この`埋め込みコード`を利用することでVizをブログに貼り付けることができます。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1583580773/tableau_public_embeded_code_vumlsn.png" w="268" h="215" %}}


2. iframeでTableau Publicの埋め込みを行う

基本的にはTableau Pubicが用意する上記埋め込みコードで問題ありません。しかし、本ブログはFull AMPで運用しているため、AMP以外のJavaScriptを利用できません。そこで、`<amp-iframe>`を利用してiframeで表示できるように埋め込みコードを一部変更します。

### 変更点

- 「リンク」で表示されているhttps://public.tableu.com/views/・・・からURLパラメタを抜き、srcに指定する
- URLパラメタとして`:showVizHome=no`と`:embed=true`の2つを指定する

上記変更を加えた上で、通常のAMPでのiframe表示同様、必要な属性を指定します。本ブログではHugoを利用していますので、以下の`ShortCodes`を定義しました。

### Shortcodes「tableau.html」

```html tableau.html
{{ $width := .Get "width" }}
{{ $height := .Get "height" }}
{{ $src := .Get "src" }}

<amp-iframe
  width="{{$width}}"
  height="{{$height}}"
  sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
  layout="responsive"
  frameborder="0"
  src="{{$src}}?:showVizHome=no&:embed=true"
  scrolling="no" allowfullscreen>
</amp-iframe>
```


## iframeでのTableau PubicのVizの表示

以下の通り、AMPであってもTableau PublicのVizを埋め込むことができました。Vizの表示だけでなく、操作も可能なことがわかります。

{{% tableau src="https://public.tableau.com/views/iframe/EmbedTableauViz" w="4" h="3" %}}


## まとめ

AMPサイトであっても`Tableau Public`のViz埋め込みが可能ということがわかりました。
その一方で、埋め込まれたVizが見やすいかどうかについては疑問が残ります。

Tableauのビジュアライゼーションは、レスポンシブデザインとは相性が悪いです。もともと、モバイル表示用に作成したVizであればよいですが、デスクトップ表示用に作成したVizをモバイルで表示する場合は見るに耐えられません。

Tableauのダッシュボード作成のベストプラクティスにも、「Viewer（Vizを見る人）を想定して固定サイズにすべき」というものがあります。
なぜそのベストプラクティスが生まれたのかを身を以て体感しました。

ブログに埋め込むとしてもあらかじめブログ用にサイズを整えるか、キャプチャと共に`Tableau Public`のリンクを貼るようにします。


## 参考

- [Tableau Public ビューを iframe に埋め込む \| Tableau Software](https://kb.tableau.com/articles/howto/embedding-tableau-public-views-in-iframes?lang=ja-jp)
- [カスタム ビューの埋め込みコード \- Tableau](https://help.tableau.com/current/pro/desktop/ja-jp/embed_code_custom_view.htm)

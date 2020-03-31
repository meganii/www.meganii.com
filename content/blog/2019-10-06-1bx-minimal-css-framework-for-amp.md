---
title: "AMP向けのミニマルCSSフレームワーク「1BX」をHugoに導入した"
date: 2019-10-06T12:28:21+09:00
lastmod: 2019-10-06T12:28:21+09:00
comments: true
category: ['Tech']
tags: ['Web Design', 'Blog', 'AMP', 'Hugo']
published: true
slug: 1bx-minimal-css-framework-for-amp
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1570334428/1bx-screenshot_oqm0gr.png" w="1440" h="766" alt="ミニマルCSSフレームワーク「1BX」を試してみました" %}}

ミニマルCSSフレームワーク「[A Responsive CSS Grid for AMP \| 1BX](https://1bx.uk/)」を試してみました。

{{% toc %}}

## TL;DR

- Hugoで作成するようなブログにおいては[1BX](https://1bx.uk/)で十分構成可能
- サイズが小さくても、グリッドレイアウトを利用可能
- 2文字クラス名を多用しているため、HugoのSyntax Highlighting(Chroma)のクラス名と衝突するが、Inlineオプションを利用することで回避可能


<!--more-->
{{% googleadsense %}}


## AMP用のCSSフレームワークに求められること

AMP(Accelerated Mobile Pages)の仕様に準拠するためにはCSSをインライン化する必要があります。そのため、Hugoで以下の通り、`style.css`に定義したCSSをインライン化しています。

```
<style amp-custom>
{{ replaceRE " +" " " (replaceRE "\n" "" (partial "styles.css" .)) | safeCSS }}
</style>
```

ここで問題なのは、AMPの制限で、インライン化するコードは50KB以内に収めなければならない点です。

小さくしなければならないとはいえ、一から全て自分で書くのは辛いので、何らかのCSSフレームワークをベースにするのですが、AMP向けのCSSフレームワークに以外とシンプルなものがありませんでした。


## 1BXとは

>
 - Mobile First
    - The responsive layout provides mobile styling before larger screens to improve loading times on smaller devices.
- Lightweight
    - Being less than 10k in size, 1BX can be positioned inline without adding to the time it takes to load a page.  
- Built for AMP
    - We love AMP and wanted to contribute to the project which is why we created this framework to work seamlessly with it.


モバイルファースト、軽量、AMP向けを狙っているだけあって、AMPサイトを小さく使い始めるのに便利でした。

作成者のサイトでももちろん使われているため、実装時の参考にさせていただきました。

[User\-First AMP Website Development \| UK \| Unumbox Ltd](https://unumbox.com/)


通常グリッドデザインだと、row, columnなどをクラス名に指定している場合が多いですが、1BXではrw, rr, rcなどかなり省略されたクラス名を利用しているので、覚えるまで（慣れるまで）はちょっと時間がかかります。

とはいえ、全体が小さいのですぐなれます。

## ハマった点

Syntax Highlighting用のCSSクラス名と、1BXで利用するクラス名が衝突して、デザインが崩れる。

### 解決方法

`pygmentsOptions`に`noclasses=true`を指定し、Syntax Highlightingをインライン化する。


```config.toml
pygmentsUseClasses = true
pygmentsStyle = "monokailight"
pygmentsOptions = "noclasses=true"
```

こうすることで、CSSにSyntax Highlighting用のCSSを書く必要がないので、1BXとクラス名が衝突しなくなる。

[Syntax Highlighting \| Hugo](https://gohugo.io/content-management/syntax-highlighting/#readout)

## 参考

- [1BX](https://1bx.uk/)
- [User\-First AMP Website Development \| UK \| Unumbox Ltd](https://unumbox.com/)
- [Hugoのテーマを何個か作ったので知見をまとめてみる - blog.unresolved.xyz](https://blog.unresolved.xyz/how-to-make-of-hugo-theme/)
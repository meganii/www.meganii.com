---
title: "Cloudflare AMP Real URLをブログに導入する"
date: 2019-11-16T19:25:36+09:00
lastmod: 2019-11-16T19:25:36+09:00
comments: true
category: ['Tech']
tags: ['Cloudflare', 'Blog', 'Design']
published: true
slug: amp-real-url-with-cloudflare
img: https://res.cloudinary.com/meganii/image/upload/c_thumb,w_200,g_face/v1574561130/AMP_%EF%B8%8F_Real_URL_a1iiwa.png
---

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1574561130/AMP_%EF%B8%8F_Real_URL_a1iiwa.png" w="560" h="315" %}}

AMPページをGoogleドメインではなく、自ドメインで表示することができる「AMP Real URL」をこのブログにも導入しました。「AMP Real URL」に関する日本語のページがあまりなかったので、手順をまとめてみました。

ブログに適用したいと思うのは物好きしかいない、かつ、企業で導入するにはまだまだ早いということでしょうか。
まだまだ発展途上の仕組みだとは思いますが、個人のブログなのでなんの気兼ねなく試してみます。


<!--more-->
{{% googleadsense %}}


# AMPの課題とAMP Real URL

## AMPとは

AMPはGoogleが推進するAccelerated Mobile Pagesの略語です。AMPはWebのベストプラクティスに沿った形の制限を設けることで、モバイルにおけるWeb表示のパフォーマンスを向上されるフレームワークのようなものです。

ひと昔前までは、機能限定というイメージが強い印象でしたが、最近はAMPでの表現力が上がり、AMPだけでWebサイトが組めるようになってきました。AMPの導入メリットとしては、以下の点があります。

- モバイル版Google検索結果からのGoogleのキャッシュにより、非常に高速に表示させることができる


## AMPの課題

AMPの課題の１つに「AMPキャッシュのURLが自分のドメインではなく、Googleのドメインに書き換わってしまう」というものがあります。

これは、モバイルのGoogle検索結果からAMPページをクリックした瞬間、キャッシュされたページが表示され、その画面のドメインはGoogleになっているというものです。アドレスバーにGoogleドメインが表示されるので、混乱をまねく可能性があります。また、アドレスバーからそのままアドレスをコピーすることができません。

## Googleが用意する解決策

解決策としては、Web Packingの技術を利用したAMP Real URLがあります。Signed HTTP Exchanges(SXG)による署名を行うことで、サイト管理者はAMPキャッシュに対しても自ドメインを表示させることができます。


# Cloudflareでの「AMP Real URL」導入

設定方法は簡単で、Cloudflareの「AMP Real URL」機能をONにして１〜2週間ほど待つだけです。

## 設定手順

1.Cloudflareの設定画面`Speed > Optimization > AMP Real URL`へ移動

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1574554312/cloudflare-amp-real-url_gg42fw.png" w="1440" h="798" %}}

2.`AMP Real URL`をONにする

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1574560190/cloudflare-amp-real-url-on_kx8gl6.png" w="1024" h="188" alt="Cloudflare AMP Real URL - 設定" %}}

## Google結果

<figure class="center">
<amp-img
  src="https://res.cloudinary.com/meganii/image/upload/v1574559592/20191111_233556_vohygj.gif"
  width="400"
  height="711"
  layout="fixed"
></amp-img>
</figure>

## 結果(Chrome Devtoolsでの確認)

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1574554642/cloudflare-amp-real-url-result_kgeu3z.png" w="1552" h="989" alt="Cloudflare AMP Real URL Result"  %}}


## 参考

- [AMP \- a web component framework to easily create user\-first web experiences \- amp\.dev](https://amp.dev/)
- [Introducing Cloudflare AMP Real URL – The AMP Blog](https://blog.amp.dev/2019/06/17/introducing-cloudflare-amp-real-url/)
- [Real URLs for AMP Cached Content Using Cloudflare Workers](https://blog.cloudflare.com/real-urls-for-amp-cached-content-using-cloudflare-workers/)
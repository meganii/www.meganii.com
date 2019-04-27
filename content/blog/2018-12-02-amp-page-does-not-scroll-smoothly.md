---
title: "AMPページがモバイル表示で引っ掛かる件"
date: 2018-12-02T12:28:58+09:00
lastmod: 2018-12-02T12:28:58+09:00
comments: true
category: ['Tech']
tags: ['AMP','Mobile']
published: true
slug: "amp-page-does-not-scroll-smoothly"
img: "https://res.cloudinary.com/meganii/image/upload/c_thumb,f_auto,h_300,q_auto,w_300/v1543721510/IMG_3186_fl7ifm.jpg"
---

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1543721510/IMG_3186_fl7ifm.jpg" w="215" h="384" alt="AMP page" %}}

## 現象

- iPhone 6Sで、[AMP](https://scrapbox.io/meganii/AMP)ページを表示するとスクロールが意図しない動きになる
- HeaderとMain Contentの間で、スクロールが止まる
- 本家のland-seeAMPページでも引っかかりを感じるので再現性あり
    - [https://www.ampstart.com/templates](https://www.ampstart.com/templates)

<!--more-->
{{% googleadsense %}}

## 対応

- テンプレートをland-seeから、ampprojectを参考にHeaderを変更

## 結果

- スクロールのひっかりが消えた
    - 何が原因かは不明・・・

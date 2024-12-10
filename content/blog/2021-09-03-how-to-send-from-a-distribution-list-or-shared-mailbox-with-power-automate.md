---
title: "Power Automateで配布リストや共有メールボックスのアドレスから代理送信する"
date: 2021-09-03T07:54:46+09:00
lastmod: 2023-05-05T01:24:12+09:00
category: ["Tech"]
tags: ["Power Platform","Power Automate"]
comment: true
slug: "how-to-send-from-a-distribution-list-or-shared-mailbox-with-power-automate"
img: "https://res.cloudinary.com/meganii/image/upload/v1630625344/c22a3265b572ab644c876ffff2327d94_bodohw.png"
---


`Power Automate`でメールの代理送信をする仕掛けを作るときの調査結果。


{{% toc %}}

<!--more-->
{{% googleadsense %}}



## 配布リストの作成

[Exchange管理センター](https://admin.exchange.microsoft.com/)から配布リストを作成する。

![](https://res.cloudinary.com/meganii/image/upload/v1630623764/d328f11effab990102f27ddd5ab3fe00_i3tmcv.png "=862x342")


![](https://res.cloudinary.com/meganii/image/upload/v1630624001/b424fb1b2e8bed4b789b128ab6478382_p3vgrs.png "=769x635")


![](https://res.cloudinary.com/meganii/image/upload/v1630624175/ee00980a36faf961eb43925a992ef79a_u2uwdv.png "=641x522")


![](https://res.cloudinary.com/meganii/image/upload/v1630624321/8bc57775694c4e4f385a90a3215513b7_acwfvt.png "=761x773")


![](https://res.cloudinary.com/meganii/image/upload/v1630624438/cfb63845b82930a50e2d095eb6a579d0_hfok8g.png "=525x562")


## 代理送信の権限付与

![](https://res.cloudinary.com/meganii/image/upload/v1630625218/f7e8df88aa00611f5378e657ff2a1982_ewpzue.png "=515x529")

![](https://res.cloudinary.com/meganii/image/upload/v1630625228/e4ff07636d4f7524e3f7597d5ef23877_rqvzmu.png "=565x431")


## Power Automate

Power Automateからは、Action「Send an email(V2)」の`Advanced options`から`From (Send as)`に配布リストを指定する。

![](https://res.cloudinary.com/meganii/image/upload/v1630625344/c22a3265b572ab644c876ffff2327d94_bodohw.png "=614x673")

![](https://res.cloudinary.com/meganii/image/upload/v1630625506/ffaf26996c4b1dc3decf8b378fab34a6_kpkui0.png "=435x254")


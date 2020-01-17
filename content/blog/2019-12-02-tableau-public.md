---
title: "Tableau製品ラインナップとTableau Public"
date: 2019-12-02T22:16:46+09:00
lastmod: 2019-12-02T22:16:46+09:00
comments: true
category: ['Tech']
tags: ['Tableau']
published: false
slug: tableau-public
img: ""
---


最近、Tableauを触り始めましたので、自分が気になった点をまとめました。
ライセンスの話はまずは置いておいて、Tableau製品についてです。

<!--more-->
{{% googleadsense %}}


## Tableau製品には何があるのか

個人でTableauを使いたいと思った場合、なかなか有償版購入という選択肢が取れません。そこで、有償版/無償版という切り口で分類しました。

- 有償版
    - Tableau Prep　ETLツール
    - Tableau Desktop　分析・作成ツール
    - Tableau Server / Tableau Online　共有ツール

- 無償版
    - Tableau Plublic　分析・作成ツール
    - Tableau Public Gallery　共有ツール（サービス）


それぞれフェーズ毎に分類すると下表の通りです。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1575289748/tableau-products_vw6r9a.jpg" w="1920" h="1080" alt="Tableau製品比較表" %}}


なんらかのデータを分析したい場合は、データ収集=>データ加工=>データ分析・グラフ作成=>共有・報告=>施策実施という流れになるかと思います。


Tableau Desktopには2週間の無料トライアルがあり、その期間中は自由にTableau Desktopを利用し、評価することができます。しかしながら、2週間ではTableau Desktopに慣れるまでもいきません。

そこで、利用するが「Tableau Public」です。「Tableau Public」は「Tableau Desktop」の無償版の位置付けです。機能制限には以下のものがあります。


### 機能制限

- 接続できるデータソースが限られる
- 作成したグラフやダッシュボードをローカルに保存できない（Tableau Public Gallary）

最初私は、「Tableau Public」を使ってGoogle Analyticsとかに簡単に接続できれば、アクセス解析とか簡単にできるのではないか！と思いましたが、そこは上手くできているようで、機能制限がありました。とはいえ、Excelとかcsv, jsonなどは普通に読み込めるので、必要に応じて出力することで対応できるかもしれません。

ローカルに保存することができないので


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1575292388/tableau_public_datasource_tihdio.png" w="557" h="495" alt="Tableau製品比較表" %}}


## データソース拡張の可能性

Tableau Publicを拡張できる可能性があるのは、「Google Spreadsheet」と「Tableau Web Data Connector」かなと思いましたので、工夫して任意のデータソースを繋げられないか確認したいと思います。



## 参考

{{% amazon 4798059838 %}}

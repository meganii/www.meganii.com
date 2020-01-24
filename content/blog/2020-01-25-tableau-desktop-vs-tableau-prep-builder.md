---
title: "データ準備におけるTableau DesktopとTableau Prep Builderの使い分け"
date: 2020-01-25T06:55:35+09:00
lastmod: 2020-01-25T06:55:35+09:00
comments: true
category: ['Tech']
tags: ['Tableau']
published: true
slug: tableau-desktop-vs-tableau-prep-builder
img: https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_75/v1579905055/thumb_tableau_czhjxd.png
---

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1579905322/tableau_prep_xdbbz6.jpg" w="1920" h="1080" alt="Tableau Prep Builder" %}}

`Tableau Desktop`と`Tableau Prep Builder`は両方とも結合、ピボット、クリーニングなどの処理が行えます。この2つのツールはどのように使い分ければよいのでしょうか。

以下は2018年に公開されたホワイトペーパーですが、今のバージョンのTableau Desktop / Tableau Prepでも有用な情報でしたので、ポイントをまとめてみました。

[Should I use Tableau Prep or Desktop for data prep? The answer: Why not both? \| Tableau Software](https://www.tableau.com/about/blog/2018/7/should-i-use-tableau-prep-or-desktop-data-prep-answer-why-not-both-90902)


<!--more-->
{{% googleadsense %}}

使い分けを一言でいうと、「解決したい問題が単純な場合は`Desktop`、複雑な場合は`Prep`」です。


## Tableau Prep Builderを利用するケース

主な目的が、下記のデータ準備に関わるタスクのうち1つ以上当てはまるのであれば、`Tableau Prep Builder`を利用する目安となります。


- データの探索
- データの整理
- データの統合
- データの再構築


### 1. データに対して複雑な再構築と統合が必要な場合

例えば、データ分析を行う前に、以下の処理が必要だと仮定します。

- データは複数ファイルに分かれていて、ユニオンが必要
- データが横持ちになっていてビポッド処理が必要
- マスタテーブルと結合させて、コード値から名称取得が必要
- ある項目に入っている値は、表記揺れがあるため、名寄せが必要

`Tableau Desktop`でも単純な結合やピボットは可能ですが、上記のような複数ステップを実行するには向いていません。データ準備のステップが多い場合は、`Tableau Prep Builder`を利用します。

`Tableau Prep Builder`であれば、上記の作業をドラッグ&ドロップで簡単に処理できます。


### 2. データを受け取る人が複数いる場合

以下のホワイトペーパーでは、財務と営業の例が挙げられています。

[Should I use Tableau Prep or Desktop for data prep? The answer: Why not both? \| Tableau Software](https://www.tableau.com/about/blog/2018/7/should-i-use-tableau-prep-or-desktop-data-prep-answer-why-not-both-90902)

財務と営業は同じ販売データを利用した分析を行いますが、それぞれ見たい情報が異なります。

- 財務は、個々の注文の粒度でコストを把握したい
- 営業は、個々の製品の粒度で調査したい

同じ販売データから2つの部門の分析粒度に合わせたデータを作成することもできますが、データ加工の部分が重複します。

このようなケースの場合は、`Tableau Prep Builder`を利用します。1つの販売データに対して共通のデータ加工を実施し、2つの部門に合わせたデータを出力するフローを作成します。

### Tableau Desktopを利用するケース

主な目的がデータの探索、整理、統合、再構築ではない場合は、`Tableau Desktop`を利用します。

`Tableau Desktop`にも十分なデータ準備機能が備わっています。最初から、`Tableau Desktop`を利用することで、素早く分析のフローに移ることができます。


## まとめ

- Tableau DesktopとTableau Prep Builderの使い分けのポイントは、目的と問題の複雑さ
- 目的がデータ分析前のデータ準備であれば、Tableau Prep Builder
- 目的がいち早くデータ分析を行うことであれば、Tableau Desktop
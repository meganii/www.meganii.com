---
title: "Tableau製品とTableau Publicで「できること」「できないこと」"
date: 2019-12-27T11:18:08+09:00
lastmod: 2019-12-27T11:18:08+09:00
comments: true
category: ['Tech']
tags: ['Tableau']
published: true
slug: product-list-of-tableau
img: "https://res.cloudinary.com/meganii/image/upload/v1577416646/tableaupublic_xd3mun.png"
---

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1577416646/tableaupublic_xd3mun.png" w="556" h="329" alt="Tableau Public" %}}


最近、Tableauを触る機会が出てきたので、調べながら学んだ点を残しておきます。

{{% toc %}}

<!--more-->
{{% googleadsense %}}


## Tableauとは

いわゆるBIツールの1つです。少し触ってみた感じだと、ドラッグ&ドロップで簡単にデータをビジュアル化でき、触っていて楽しいツールです。

公式ページによると、下記の通り`データ分析プラットフォーム`として位置付けているようです。

>Tableau は、接続からコラボレーションまでをスムーズに行える、最も強力でセキュアかつ柔軟なエンドツーエンドのデータ分析プラットフォームです。データのパワーの活用を可能にして、ビジネスをサポートします。個人で利用できるように設計され、エンタープライズ規模に拡張することもできる Tableau は、アクションを生み出すインサイトをデータから引き出せる唯一の BI プラットフォームです。
>[Tableau とは? \| Tableau Software](https://www.tableau.com/ja-jp/products/what-is-tableau)


## Tableau製品には何があるのか

個人でTableauを使いたいと思った場合、なかなか有償版購入という選択肢は取れませんので、有償版/無償版という切り口でTableau製品を分類しました。

### 有償版

- `Tableau Prep Builder`　ETLツール
- `Tableau Desktop`　Viz作成・分析ツール
- `Tableau Server` / `Tableau Online`　共有ツール

### 無償版

- `Tableau Public`　Viz作成・分析ツール
- `Tableau Public Gallery`　共有ツール（サービス）


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1577413049/TableauProducts_tbfqoe.jpg" w="1920" h="1080" alt="Tableau 製品比較" %}}


### Tableau Publicの機能制限

- 接続できるデータソースが限られる
- 作成したグラフやダッシュボードをローカルに保存できない（Tableau Public Gallary）

「Tableau Public」を使ってGoogle Analyticsに簡単に接続できれば、アクセス解析とか簡単にできると考えました。

しかし、そこは上手くできているようで、接続できるデータソースに機能制限があります。

とはいえ、Excelファイルやcsv, jsonなどのテキストファイルは普通に読み込めるので、必要に応じてGoogle Analyticsのデータを出力することで対応できそうです。



また、作成したVizをローカルに保存できません。保存する場合は`Tableau Public Gallary`が利用できるのですが、これは全世界公開されるという仕様です。そのため、機密情報や公にできないデータを扱うには向きません。


一方、個人でオープンデータを利用する場合は、`Tableau Public`は`Tableau Desktop`の分析機能を無償でフル活用できるので非常に強力なツールになります。


## まとめ

- オープンデータを個人で分析する場合は「Tableau Public」が有効
- Tableau Prep Builderの無償版に相当するツールは存在しないため、別途手作業やPythonなどで前処理が必要


## 参考

[リソース \| Tableau Public](https://public.tableau.com/ja-jp/s/resources)

{{% amazon B07RR2QM3M %}}
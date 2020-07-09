---
title: "【Tableau】「階層」をもつ動的なフィルタを実装する"
date: 2020-05-25T23:30:31+09:00
lastmod: 2020-05-25T23:30:31+09:00
published: true
category: ["Tech"]
tags: ["Tableau","Filter","Tableau Tips"]
comment: true
slug: "hierarchical-filters-in-tableau"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_1024/v1579905055/thumb_tableau_czhjxd.png"
---

`Tableau`で階層構造を持つフィールド（例えば、本部名、部門名などの部署名）に対してフィルタを実装する際、上層のフィルタに従い動的に下層の値が変更されれば便利だと思ったことはありませんか。

調べてみると、意外と簡単にできるということがわかったので、メモとして残しておきます。

<!--more-->
{{% googleadsense %}}


{{% toc %}}


## 階層フィルタを実装する

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1594218647/dp4pbfq1dcahxcynxy9z.png" w="1080" h="702" %}}

スーパーサンプルストアのデータを利用して説明します。


### 1.「階層」を作成する

まずは「階層」を作成します。ここでは、地域ということで、国／領域 > 地域 > 都道府県 > 市区町村で「階層」を作成します。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1594219126/xtmfmr7v1ikmq46hn9as.png" w="377" h="259"  alt="階層" %}}


### 2. 作成した「階層」を1つずつフィルタに追加する

「階層」のフィルタを追加すると「階層内のすべての値」という部分にチェックが入ります。これだけで、上の階層のフィルタ結果が下層に伝播します。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1594218749/sroogb5cbaovdv6ikihx.png" w="311" h="572"  alt="階層内のすべての値" %}}


### 3. 上層からフィルタを効かせる

地域：「四国」を選択すると、都道府県も「四国」に関連する選択肢へと動的に変更されています。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1594218909/sqg06n5nsf2u6ibcrtgj.png" w="170" h="523" %}}


## 参考

[Tableau 2018\.1 新機能紹介：階層構造をフィルタに適用出来るようになりました \#tableau \| Developers\.IO](https://dev.classmethod.jp/articles/tableau-2018-1-new-features-hierarchy-filtering/)


{{% amazon 4798159743 %}}
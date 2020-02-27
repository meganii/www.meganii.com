---
title: "【Tableau】カテゴリ別の上位と下位Nを表示する"
date: 2020-02-27T07:31:54+09:00
lastmod: 2020-02-27T07:31:54+09:00
comments: true
category: ['Tech']
tags: ['Tableau']
published: true
slug: showing-top-and-bottom-n-per-category-in-tableau
img: https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_75/v1579905055/thumb_tableau_czhjxd.png
---

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1582756643/tableau-top-and-bottom_bvivwx.png" w="1226" h="457" alt="top and bottom" %}}

上位N個もしくは下位N個を個別で表示することは`ディメンションフィルター`を利用することで比較的簡単に実装できます。

しかし、上位N個と下位N個を1つのグラフ上に表現する場合はちょっとした工夫が必要でしたので、メモしておきます。


<!--more-->
{{% googleadsense %}}



## カテゴリ別の上位と下位Nを表示する方法

### True / Falseを返す計算フィールドを作成する

`N Parameter`というパラメータを作り、以下の`計算フィールド`を作成します。名前は、`Top & Bottom N Filter`としました。

```sql
RANK( SUM( [売上] ), 'desc' ) <= [N Parameter]
OR 
RANK( SUM( [売上] ), 'asc' ) <= [N Parameter]
```

上記の計算では、昇順または降順でSUM([売上])が上位Nのサブカテゴリに入る場合、trueの値を返します。

### フィルター設定

上記で作成した`Top & Bottom N Filter`をフィルターに設定し、`真`を選択します。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1582841295/tableau-top-and-bottom-filter-settings_xpk70c.png" w="526" h="592" alt="Tableau フィルター設定" %}}


その後、`Top & Bottom N Filter`を右クリック、`次を使用して計算 > ペイン（下）`を選択する。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1582840947/tableau-top-and-bottom-filter_mswcjq.png" w="500" h="313" alt="Tableau フィルター" %}}


## 完成

上記設定することで、カテゴリ毎でTop NとBottom Nを同時に表示させることができました。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1582756643/tableau-top-and-bottom_bvivwx.png" w="1226" h="457" alt="top and bottom" %}}


このような細かいTipsを積み重ねて、いつでもスッと使えるようになっておきたいところですね。

## 参考

- [カテゴリ別の上位と下位 N を表示する \| Tableau Software](https://kb.tableau.com/articles/howto/showing-top-and-bottom-n-per-category?lang=ja-jp)


{{% amazon 4798159743 %}}
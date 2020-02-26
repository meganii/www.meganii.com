---
title: "【Tableau】カテゴリ別の上位と下位Nを表示する"
date: 2020-02-27T07:31:54+09:00
lastmod: 2020-02-27T07:31:54+09:00
comments: true
category: ['Tech']
tags: ['Tableau']
published: true
slug: showing-top-and-bottom-n-per-category-in-tableau
img: 
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

## カテゴリ



## 参考

[カテゴリ別の上位と下位 N を表示する \| Tableau Software](https://kb.tableau.com/articles/howto/showing-top-and-bottom-n-per-category?lang=ja-jp)
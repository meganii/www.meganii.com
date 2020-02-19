---
title: "Tableauの「結合済みフィールド」(Combined Fields)を利用して任意のソート順を定義する"
date: 2020-02-10T04:50:23+09:00
lastmod: 2020-02-10T04:50:23+09:00
comments: true
category: ['Tech']
tags: ['Tableau']
published: true
slug: sorting-dimensions-by-conbined-fields-in-tableau
img: https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_75/v1579905055/thumb_tableau_czhjxd.png
---


Excelだと簡単にできるソートも、Tableauだと意外と苦戦する場合があります。

例えば以下のように各店舗、席タイプ、サービスメニューごとの価格の一覧があったとします。「価格でソートし、最安値となるサービスメニューを探したい」となった場合、ディメンション毎のソートとなってしまい、なかなか意図するソート順になりません。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1581277712/bagus_dimension_sort_qausg0.png" w="1010" h="689" alt="Tableau" %}}


<!--more-->
{{% googleadsense %}}


こういう場合は、「結合済みフィールド（Conbined Fileds）」を利用することで、任意のソート順を設定できます。


## 結合済みフィールドを利用して任意のソート順を設定する方法

1. 複数のフィールドから「結合済みフィールド」を作成
2. 作成した「結合済みフィールド」をシェルフに追加
3. 作成した「結合済みフィールド」を「並べ替え」から指定してソート
4. 「結合済みフィールド」を非表示

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1581277453/bagus_service_menu_qzr35v.png" w="1010" h="689" alt="結合済みフィールドを利用して任意のソート順を設定する方法" %}}


### 1. 複数のフィールドから「結合済みフィールド」を作成

ディメンションから複数のフィールドを選択して、右クリックから「作成 > 結合済みフィールド」を選択します。
（設定したいソートの粒度になるように複数選択する）

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1581281017/creating_conbined_fields_fdpj4c.png" w="489" h="401" alt="複数のフィールドから「結合済みフィールド」を作成" %}}


### 2. 作成した「結合済みフィールド」をシェルフに追加

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1581281240/before_conbined_fields_sfrjgg.png" w="690" h="324" alt="Tableau" %}}

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1581281241/after_conbined_fields_isabcm.png" w="759" h="324" alt="Tableau" %}}

これにより、ソートを掛けたい粒度になりました。


### 3. 作成した「結合済みフィールド」を「並べ替え」から指定してソート

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1581281499/sort_settings_eadkeg.png" w="447" h="390" alt="作成した「結合済みフィールド」を「並べ替え」から指定してソート"  %}}


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1581281508/sort_settings_2_jvvdfd.png" w="291" h="369" alt="Tableau" layout="fixed" %}}

### 4.「結合済みフィールド」を非表示

ソートのためだけに用意した「結合済みフィールド」は見せる必要がありませんので非表示にします。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1581281789/hide_conbined_fields_emezqy.png" w="473" h="370" alt="「結合済みフィールド」を非表示" %}}

これで完成です。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1581277453/bagus_service_menu_qzr35v.png" w="1010" h="689" alt="Tableau" %}}


## まとめ

「結合済みフィールド」を利用することで、従来Excelで表現できていたソート順の設定をTableauでも実装できました。

「都内で一番コスパの良いバグースのメニューはどこのどのサービス（10時間未満のデイパック限定）か」という問いに対して、Bネット蒲田店「期間限定デイパック7時間」が優れているという解を得られました。
（2020/2/9現在）


## 参考
- [Tableau\_カテゴリ別売上を特定の年の売上順で並べ替える \- Qiita](https://qiita.com/shoohta/items/71f6d5d68018dd879832)
- [Tableauでサブカテゴリ毎にソートするスマートな方法2つ ｜ Developers\.IO](https://dev.classmethod.jp/etc/tableau-howtosort-by-category/)
- [Sorting Dimensions by Calculated Fields That Use Table Calculations \| Tableau Software](https://kb.tableau.com/articles/HowTo/sorting-by-fields-with-table-calculatinons)


{{% amazon 4798159743 %}}

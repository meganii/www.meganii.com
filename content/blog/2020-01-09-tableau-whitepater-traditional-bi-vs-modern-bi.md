---
title: "Tableauホワイトペーパーから読み解く「トラディショナルBIとモダンBIの違い」"
date: 2020-01-09T22:37:43+09:00
lastmod: 2020-01-09T22:37:43+09:00
comments: true
category: ['Tech']
tags: ['Tableau', 'BI', 'ホワイトペーパー']
published: true
slug: tableau-whitepater-traditional-bi-vs-modern-bi
img: https://res.cloudinary.com/meganii/image/upload/v1578747121/traditional_bi_mldrza.jpg
---

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1578669810/tableaulogo_highres_t9alev.png" w="2000" h="450" %}}


TableauのホワイトペーパーやWebinerを読み聞きし、`トラディショナルBI`と`モダンBI`の違いについて自分なりにまとめてみました。

{{% toc %}}

<!--more-->
{{% googleadsense %}}


## Traditional BI / トラディショナルBI

### トラディショナルBIとは

- **IT部門が主導**する**トップダウン型**のアプローチ
- ウォータフォール型のデータリクエスト /「帳票印刷」
- ユーザが限定的
- 全社的、大規模投資


### トラディショナルBIの問題点とは

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1578747121/traditional_bi_mldrza.jpg" w="1825" h="1255" %}}

- **「帳票印刷」**
    - レポート作成が自分一人では完結しない
    - レポート作成時点で古くなる
- ITとビジネス部門の断絶
- 課題・問題から遠いITによる主導
    - 課題・問題をよく知っているのは現場・ビジネス部門のユーザがデータを触れないのでデータの本質を掴めない

IT部門へデータ抽出依頼を行い、データを出力してもらい、Excelでこねくり回してデータを加工し、PowerPointに貼り付けて報告資料を作成する。

こんな場面はよくある話ではないでしょうか。

データ抽出依頼を行い、データをもらうまでに時間が掛かり、さらにそのデータを元に、必要な形に整形するにも時間が掛かる。明らかにデータ準備に工数を取られています。

作成した報告資料が一発OKであればまだよいですが、例えば報告資料に対して「別の観点からも見たい」という指摘があった場合は、初めからやり直しです。またIT部門へのデータ抽出依頼から始まり、データを加工するという工程が待ち受けています。

時間が掛かればかかるほど、**初めに設定した解決したい課題・問いを忘れてしまい、報告資料を作成することが目的**になってしまいます。しかも、時間がかかることでレポートを出力した段階でデータは古いものになってしまい、誤ったデータで判断せざるを得ません。

本来は、**現状の分析から洞察（インサイト）を得て、次のアクションへと繋げる議論に時間を割くべき**です。

しかも、ビジネス部門のユーザは、データを直接扱えないためデータの本質が見えません。その結果としてデータ抽出依頼が増え、IT部門への負荷が高まるという負のスパイラルに陥ってしまいます。

また、導入の観点から見るとトラディショナルBIは、一般的には大規模な投資を行い、全社一括導入の形で導入されることが多いためその導入には長い時間を要します。


## Modern BI / モダンBI

### モダンBIとは

- (IT部門が実現可能にする）**ビジネス部門が主導するセルフサービス型のアプローチ**
- **ITとビジネス部門が分担・協調**
- 全員がユーザ
- リーンスタート、アジャイル発展


### モダンBIの特徴・効果は

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1578747122/modern_bi_nj04jw.jpg" w="1792" h="1299" %}}

ポイントは**セルフサービス型**という点です。

**ビジネス部門のユーザ自らが、解決したい課題（Task)に対してデータを触り、そこから得られた洞察（Insight)を共有して次のアクションへと繋げていく**。これにより、データを根拠にした判断を早く打ち出し、ビジネス環境の変化に追随していくことができます。

一方、セルフサービス型を実現するためには、ユーザの権限管理、データへのアクセス権・セキュリティ、データフローパイプラインの確立など解決しなければならない問題もたくさんあります。

そこで、IT部門は従来担っていた「データ抽出作業、レポート作成」から脱却し、ビジネス部門と協業してこれらの課題を解決してユーザに対してセルフサービス環境を実現する責務を担うように変化すべきです。

課題・問題を抱えているビジネス部門のユーザ自らがデータに触れることで、次々と浮かんでくる問いに対して自らが手を動かして、答えを出していくことができます。

導入の観点からも、トラディショナルBIと比べて、すぐに導入可能です。小さく始めて成功体験を積み重ねることができます。


## 所感

Tableau社が出しているホワイトペーパーなので、最終的にはTableau推しになるのは当然です。その点を考慮すると、他社事例を交えて、抽象化された内容になっていると感じました。

理想はそうなんだろうが、現場からモダンBIに近づけていくためにはどのように行なっていけばよいのか、何に気をつけなければならないのかについてもう少し深掘りしていきたいです。

公開されているホワイトペーパーはまだまだたくさんあるので、少しずつ読み進めてまとめていきます。

## 参考

- [モダン BI の魅力と実力 | Tableau Software](https://www.tableau.com/ja-jp/learn/webinars/managing-data-confidence-jp#video)
- [まだ「帳票印刷」ですか? \| Tableau Software](https://www.tableau.com/ja-jp/learn/webinars/beyond-fixed-reporting-form-2#video)
- [セルフサービス分析の文化を築く方法 \| Tableau Software](https://www.tableau.com/ja-jp/learn/whitepapers/how-build-culture-self-service-analytics?signin=62905dde0dc3f5db01c242b81b579bf6)

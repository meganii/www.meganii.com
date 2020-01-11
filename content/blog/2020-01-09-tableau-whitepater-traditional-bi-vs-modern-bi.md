---
title: "Tableauホワイトペーパーから読み解く「トラディショナルBIとモダンBIの違い」"
date: 2020-01-09T22:37:43+09:00
lastmod: 2020-01-09T22:37:43+09:00
comments: true
category: ['Tech']
tags: ['Tableau', 'BI', 'ホワイトペーパー']
published: true
slug: tableau-whitepater-traditional-bi-vs-modern-bi
img: https://res.cloudinary.com/meganii/image/upload/v1578669695/tableau_cmyk_2015_ztfklt.png
---

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1578669810/tableaulogo_highres_t9alev.png" w="2000" h="450" %}}


TableauのホワイトペーパーやWebinerを読み聞きし、`トラディショナルBI`と`モダンBI`の違いについて自分なりにまとめてみました。

{{% toc %}}

<!--more-->
{{% googleadsense %}}


## Traditional BI / トラディショナルBI

### トラディショナルBIとは？

- IT部門が主導するトップダウン型のアプローチ
- ウォータフォール型のデータリクエスト、「帳票印刷」
- ユーザが限定的
- 全社的、大規模投資


### トラディショナルBIの問題点とは？

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1578747121/traditional_bi_mldrza.jpg" w="1825" h="1255" %}}

- 「帳票印刷」
    - レポート作成が自分一人では完結しない
    - レポート作成時点で古くなる
- ITとビジネス部門が断絶している
- 課題・問題から遠いITが主導する
    - 課題・問題をよく知っているのは現場・ビジネス部門のユーザがデータを触れないのでデータの本質を掴めない

IT部門へデータ抽出依頼を行い、データを出力してもらい、Excelでこねくり回してデータを加工し、PowerPointに貼り付けて報告資料を作成する。

こんな場面はよくある話ではないでしょうか。

データ抽出依頼を行い、データをもらうまでに時間が掛かり、さらにそのデータを元に、必要な形に整形するにも時間が掛かる。これでは、例えば報告資料への指摘があり、「別の観点からも見たい」となった場合は、初めからやり直しで、またIT部門へのデータ抽出依頼から始まり、非常に時間がかかってしまいます。

時間が掛かればかかるほど、初めに設定した解決したい課題・問いを忘れてしまいます。しかも、時間がかかることで、レポートを出力した段階でデータは古いものになってしまい、誤ったデータで判断せざるを得ません。

ビジネス部門のユーザは、データを直接扱えないためデータの本質が見えず、結果としてデータ抽出依頼が増え、IT部門への負荷が高まるという負のスパイラルに陥ってしまいます。

また、トラディショナルBIは、一般的に大規模な投資を行い、全社一括導入の形で導入されることが多く、その導入には長い時間を要します。


## Modern BI / モダンBI

### モダンBIとは？

- (IT部門が実現可能にする)**ビジネス部門が主導するセルフサービス型のアプローチ**
- ITとビジネス部門が分担・協調
- 全員がユーザ
- リーンスタート、アジャイル発展


### モダンBIの特徴・効果は？

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1578747122/modern_bi_nj04jw.jpg" w="1792" h="1299" %}}

ポイントは「セルフサービス型」という点です。ビジネス部門のユーザ自らが、解決したい課題(Task)に対してデータを触り、そこから得られた洞察(Insight)を共有し、次のアクションへと繋げていく。これにより、流れの早いビジネス環境の変化に追随して、データを根拠にした判断を早く打ち出していくことができます。

一方、セルフサービス型を実現するためには、ユーザの権限管理、データへのアクセス権・セキュリティ、データフローパイプラインの確立などなど解決しなければならない問題もたくさんあります。

IT部門は、従来担っていた「データ抽出作業」から脱却し、ビジネス部門と協業してこれらの課題を解決し、ユーザに対してセルフサービス環境を提供するという責務に変わっていきます。課題・問題を抱えているビジネス部門のユーザ自らがデータに触れることで、次々と浮かんでくる問いに対して自らが手を動かして

また、すぐに導入可能で、小さく初めて成功体験を積み重ねることができます。


## まとめ

Tableau社が出しているホワイトペーパーなので、最終的にはTableau推しになるのは当然かと思いますが、その点を考慮すると、他社事例を交えて、抽象化された内容になっていると感じました。

まだまだ読むべきホワイトペーパーがあるので、読みながらまとめていこうと思います。


## 参考

- [モダン BI の魅力と実力 | Tableau Software](https://www.tableau.com/ja-jp/learn/webinars/managing-data-confidence-jp#video)
- [まだ「帳票印刷」ですか? \| Tableau Software](https://www.tableau.com/ja-jp/learn/webinars/beyond-fixed-reporting-form-2#video)
- [セルフサービス分析の文化を築く方法 \| Tableau Software](https://www.tableau.com/ja-jp/learn/whitepapers/how-build-culture-self-service-analytics?signin=62905dde0dc3f5db01c242b81b579bf6)


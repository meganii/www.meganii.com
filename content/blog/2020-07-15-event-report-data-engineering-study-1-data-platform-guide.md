---
title: "【イベントレポート】Data Engineering Study #1「基調講演1「Data Platform Guide - 事業を成長させるデータ基盤を作るには」"
date: 2020-07-15T22:46:26+09:00
lastmod: 2020-07-16T08:46:26+09:00
published: true
category: ["Tech"]
tags: ["Data Engineering Study","Data", "イベントレポート", "event"]
comment: true
slug: "event-report-data-engineering-study-1-data-platform-guide"
img: "https://res.cloudinary.com/meganii/image/upload/v1594863856/e337ed5003a700aeb3b1b1a31bdab638_nxrcno.png"
---


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1594863856/e337ed5003a700aeb3b1b1a31bdab638_nxrcno.png" w="659" h="251" alt="Data Engineering Study #1" %}}

「[Data Engineering Study \#1「DWH・BIツールのこれまでとこれから」 \- connpass](https://forkwell.connpass.com/event/179786/)」に参加し、「基調講演1「Data Platform Guide - 事業を成長させるデータ基盤を作るには」を聴講したときのまとめです。



{{% toc %}}

<!--more-->
{{% googleadsense %}}

## セッション　基調講演1「Data Platform Guide - 事業を成長させるデータ基盤を作るには」ゆずたそ氏

<p></p>
{{% speakerdeck id="df39dc79c2164b45bc1660fa97825217" %}}


{{% youtube hFYNuuAaiTg %}}


## 本セッションで答えられるようになりたい「本質的な問い」

本質的な問い「事業を成長させるデータ基盤を作るためには何が大切か」

### セッション聴講前の考え

データドリブン文化、データに基づく判断を促進し、迅速な意思決定を可能するために以下の基盤を用意することが大切です。

> - どんなユーザもパフォーマンスに不自由なく利用できる
> - 必要なデータが取り揃っている
> - 信頼できるデータが格納されている


### セッション聴講後の考え

データ基盤構築においては、しばしば「目的」と「手段」のすり替えが発生します。そのため、まずは「なぜ作るか」を意識する必要があります。

データ基盤を作る目的は「**現場と経営を繋ぎ、顧客価値を提供するため**」です。顧客、現場、経営の観点から考えると以下の通りです。

> - 顧客のため：データ活用で「価値」を提供する
> - 現場のため：素早くPDCAを回す（前後工程のリードタイムを短縮、測定結果を改善アクションに繋げる）
> - 経営のため：サイロ化を防ぎ全体最適を促す

次に「何を作るか」ですが、エンジニア視点／エンジニア都合だけで用意したデータ基盤（器）では、すぐに利用されないものになってしまいます。
そこで、利用者へヒアリングを行い利用者の要求に基づいて、全体最適化すべき「Model（データ蓄積・加工）」と個別最適化すべき「View（データ参照・活用）」に分けて考えることが重要です。

聴講前の私は、データ基盤のような共通基盤は全体最適こそが重要と考えていました。
しかし、「ModelとViewを分ける」の話を聞き、いかにユースケース（利用者）に個別最適化するかという観点が同じぐらい大事だと理解しました。

> - Model：データの蓄積・加工（e.g. 主要指標の集計ロジック）
> - View：データの参照・活用（e.g. 部署別ダッシュボード）

また、「データの階層を分ける」という考えも重要です。階層としては次の3つです。

> - **データレイク：ログを加工せずそのまま1つのシステムに集約したもの**
>     - 何も加工していない、ただのコピーであることが重要
>         - 加工済データのみの場合、あとで修正不可
>         - データレイクに元データがあれば調査や事後修正が可能
> - **データウェアハウス：複数データを統合・蓄積して、分析向けに整理したもの**
>     - 業務ドメイン知識をデータモデルに反映することが重要
>         - 元データでは使い勝手が悪く、かといって特定用途に限定すると応用できない、というニーズを満たす
>         - e.g. 複数DBから顧客IDで紐付けた「顧客情報テーブル」
> - **データマート：特定の利用者・用途向けにデータを加工・整理したもの**
>     - ユースケースごとに最適化されていることが重要
>         - パフォーマンスを気にせず大量データを処理、複雑な集計不要で指標を確認
>             - e.g. 最終的にExcelで集計するならそのシートがデータマート

データ基盤は作って終わりではなく、運用を回して、改善していくものです。機械的な仕組みだけではなく、人が関係するプロセスの整備も必要となります。

ユーザとサービスレベルの合意をするなど人間系のプロセスもしっかり定義しておくことが重要なポイントです。

> - サービスレベルの合意
> - インシデント対応の仕組み化
> - 品質計測、定期的な見直し・改善

最後に「どう作るか」ですが、データ基盤の実装においては次の4つの技術要素を企業体のビジネスやニーズに合わせて選定する必要があります。

> 1. ETL(Extract/Transform/Load)
> 2. DWH(Data Warehouse)
> 3. BI(Business Intelligence)
> 4. Workflow Engine

以上のことから「事業を成長させるデータ基盤」を作る上で大切なことは以下の通りです。

- 「なぜ作るのか」「何を作るのか」「どう作るのか」を踏まえ、
- ツール・システム・プロセスの勘所を理解し、
- データ取得元や利用要求を踏まえた上で、
- 最適なテクノロジーを活用すること



## まとめ・感想

基調講演と公開スライドにより、データ基盤に対する用語・概念の整理に繋がり、知識の地図をアップデートできました。

講演者のゆずたそさん、また`Data Engineering Study`を開催いただいた皆さまありがとうございました！

{{% amazon B085W4YSZJ %}}
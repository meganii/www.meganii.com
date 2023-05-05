---
title: "【Tableau】積み上げ棒グラフの合計値をラベル表示する方法"
date: 2020-03-20T17:10:26+09:00
lastmod: 2023-05-05T01:24:08+09:00
comments: true
category: ['Tech']
tags: ['Tableau', 'リファレンスライン']
published: true
slug: stack-chart-with-sum-value
img: https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_1024/v1579905055/thumb_tableau_czhjxd.png
---

## Tableauでやりたいこと

- 積み上げ棒グラフの内訳を表示しつつ、合計値も併せて表示する


## 困ったこと

スーパーサンプルストアを例にします。

「オーダー日」毎の「売上」表示する場合、何も考えなくてもラベルを表示すれば、「オーダー日」（ここでは年）毎の合計値が積み上げ棒グラフの上部に表示されます。

![グラフの合計値をラベル表示する](https://res.cloudinary.com/meganii/image/upload/v1584692694/tableau_stack_chart_label_jlnjzv.png "=351x424")


しかし、「カテゴリ」で色付けするとラベルは内訳を表示してしまうため、合計値が表示されません。


![カテゴリで色付けすると合計値が表示されない](https://res.cloudinary.com/meganii/image/upload/v1584692694/tableau_stack_chart_label_n7mqnk.png "=351x424")



この状態で「合計値も表示できるようにしてよ」と言われた場合、あなたならどのように実装しますか。


<!--more-->
{{% googleadsense %}}



Tableauの書式設定から変更できると思い、色々触ってみましたがうまくできませんでした。苦し紛れに、二重軸で片方を形状「円」・サイズ最小・透明度0%の設定を行い、無理矢理裏に表示しました。


![二重軸での表示](https://res.cloudinary.com/meganii/image/upload/v1584693379/tableu_stack_chart_multi_chart_y1xyte.png "=611x511")

改めて調べてみると「リファレンスライン」でやるのがスマートだったので紹介します。


## Tableauでのスマートな実装方法

- リファレンスラインを利用する
    - スコープを"セルごと"に設定
    - 線 > ラベルを"値"に設定
    - 書式設定を"なし"に設定
    - リファレンスラインの書式設定　> リファレンスライン ラベル > 配置 > 水平方向を中央寄せに変更


![Tableau リファレンスラインの設定](https://res.cloudinary.com/meganii/image/upload/v1584691907/tableau_reference_line_qrjlle.png "=683x785")


下図の通り、やりたいことである「積み上げ棒グラフの内訳を表示しつつ、合計値も併せて表示する」ができました。

![積み上げ棒グラフの内訳を表示しつつ、合計値も併せて表示する方法](https://res.cloudinary.com/meganii/image/upload/v1584694146/tableau_stack_chart_with_sum_yokt4q.png "=586x500")

## まとめ

Tableauにおいてリファレンスラインをうまく活用することは多く、実装の引き出しとして持って置くと便利です。
つまらないところで時間を使って、本来のタスクを忘れないようにしたいところです。


## 参考

- [積上げ棒グラフに合計のラベル \| Tableau\-id Press \-タブロイド\-](https://blog.truestar.co.jp/tableau/20190327/3119/)
- [Tableau Tips: 積み上げ棒グラフの合計値を併せて表示する ｜ Developers\.IO](https://dev.classmethod.jp/business/business-analytics/how-to-label-total-value-on-stackbar-chart/)
- [【Tableau】Stack\(積み上げ）グラフの合計値をラベル表示する ｜ Developers\.IO](https://dev.classmethod.jp/business/business-analytics/tableau-stack-graph-labeling-tips/)


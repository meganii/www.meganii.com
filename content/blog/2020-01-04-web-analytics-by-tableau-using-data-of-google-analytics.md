---
title: "Google AnalyticsをデータソースとしてTableau Desktopでアクセス解析を行う"
date: 2020-01-04T10:35:50+09:00
lastmod: 2020-01-04T10:35:50+09:00
comments: true
category: ['Tech']
tags: ['Tableau','アクセス解析', 'Google Analytics']
published: true
slug: web-analytics-by-tableau-using-data-of-google-analytics
img: https://res.cloudinary.com/meganii/image/upload/v1578102972/weekly_pageview_jxyuee.png
---

`Tableau Desktop`の14日間トライアルを実施しました。その中で、Google Analyticsを`データソース`として利用したアクセス解析を試してみましたので、その内容をまとめます。


[Tableau 無料トライアルの開始: トライアル版のダウンロードはこちらから](https://www.tableau.com/ja-jp/products/trial)

{{% toc %}}

<!--more-->
{{% googleadsense %}}


## Google Analyticsへのログイン

`Google Analytics`のデータを取得するためには必要な権限を付与する必要があります。流れとしては以下の通りです。

### 1. 接続 > サーバへ > `その他...`からGoogleアナリティクスを選択

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1578101633/tableau_datasource_googleanalytics_lkdyfb.png" w="1080" h="677" alt="Tableau for Google Analytics" %}}

### 2. Google Analyticsへの認証

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1578101633/tableau_googleanalytics_select_account_c3qoix.png" w="1041" h="866" alt="Tablaeu ログイン" %}}

### 3. 接続許可を実施

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1578101633/tableau_googleanalytics_login_gxwg8y.png" w="1041" h="866" alt="Tablaeu ログイン" %}}


### 4. 接続完了

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1578101633/TablaeuForGoogleAnalytics_hfff4x.png" w="1328" h="980" alt="Tableau for Google Analytics" %}}

接続が成功すれば、紐付く`Google Analytics`のアカウントが表示されます。これで、`Google Analytics`からデータを取得する準備が整いました。後は、必要に応じて`ディメンション`と`メジャー`を選択します。

ここでの考慮点は以下の通りです。

- 日付範囲は小さく始める（いきなり数年分を取得しようとすると時間が掛かるため）
- 取得項目数の制限に注意
    - ディメンション： 7個
    - メジャー: 10個

試行錯誤を行う上で、データ取得に時間が掛かると効率が悪いです。そのため、取得する`ディメンション`と`メジャー`の検討段階においては、日付範囲は1か月など小さくしておき、どのようなデータが取得できるのかを確認しながら作業するのをおすすめします。

また`ディメンション`は7個までという制限があるため、なるべく多くの情報量を持つ`ディメンション`を選択し、`Tableau`側で形式変換や分割などを行うなどの工夫が必要です。
(例えば、`日付の時間と分`や`参照元/メディア`など）




## 「曜日毎のページビュー数」を眺めてみる

`Google Analytics`をデータソースに指定する準備ができました。続いて、データを見ながら思い浮かんだ疑問に対して、いろいろとViz(チャート／グラフ）を作ってみます。

まずは、「曜日毎のページビュー数」はどうなっているのだろうかと、2017年〜2019年のデータで確認しました。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1578102972/weekly_pageview_jxyuee.png" w="834" h="186" alt="曜日毎のページビュー数" %}}

「曜日毎のページビュー数」をハイライト表で確認すると、私のブログ（www.megani.com)は、水曜日によく見られる傾向がありました。

続いて、もう少し深掘りするために、「曜日毎、時間帯毎のページビュー数」を確認してみます。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1578103346/highlight_weekly_pageview_wxorbi.png" w="834" h="598" alt="曜日毎、時間帯毎のページビュー数" %}}


このVizから以下の点を読み取りました。

- 平日（月〜金）の10時〜17時に集中している
- 特に水曜日の10時〜17時が突出している
- 休日（土・日）は全然見られていない

このことから、企業からの技術カテゴリの記事へのアクセスが多いのと考えました。しかし、水曜日のアクセス集中が理解できません。

そこで、各記事のカテゴリ情報をGoogle Analyticsのデータに`ブレンド`することで、ブログ記事のカテゴリ毎の傾向を確認してみます。
（* ブレンド：`Google Analytics`のデータソース以外のデータを結合すること）


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1578132330/highlight_weekly_pageview_of_tech_category_si4rfs.png" w="834" h="585" alt="Techカテゴリの時間毎のページビュー数" %}}


上記は、Techカテゴリの時間帯毎のページビュー数です。

平日10時〜18時台でのアクセスがありますが、水曜日が特段多いという訳ではなさそうです。

他のカテゴリも目視で見てみると、なぜかLifeカテゴリが水曜日の昼に多く見られています。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1578132590/highlight_weekly_pageview_of_life_category_baae1y.png" w="834" h="585" alt="Lifeカテゴリの時間毎のページビュー数" %}}

さらに、Lifeカテゴリの記事一覧のページビュー数を確認すると、[ソフトバンク債権回収室から電話があった。 \- SIS Lab](https://www.meganii.com/blog/2018/02/09/softbank-08002221263/)のページビューが突出していたので、このページを除外してみると、下図の通り水曜日に多く見られる傾向がなくなりました。



{{% img src="https://res.cloudinary.com/meganii/image/upload/v1578133093/highlight_weekly_pageview_of_life_category_2_kbxfa8.png" w="995" h="580" alt="Lifeカテゴリの時間毎のページビュー数(ページフィルター版)" %}}

このことから、「水曜日によく見られる」という傾向は、この記事に引っ張られていることがわかりました。

[ソフトバンク債権回収室から電話があった。 \- SIS Lab](https://www.meganii.com/blog/2018/02/09/softbank-08002221263/)の記事では、ソフトバンク債権回収室からの着信履歴の話を書いています。ソフトバンクからの電話が水曜日に集中しており、その電話番号を確認したくてアクセスしているのでしょうか。


さらに詳しく調べるのであれば、別のデータも必要になってきそうです。

何気なく調べ始めた「曜日毎のページビュー数ってどうなっているか」という疑問から派生して、別の事実が見えてきたのは面白いですね。


## Twitterへの投稿は何時がベストか

続いて、「Twitterから記事が見られるのはどんな時か」も見てみました。

ページビュー数だけを見ると21時がベストという結果でしたが、単純に自分がTwitterに投稿している時間帯と一致するだけの可能性があります。その点は、追加で調べる必要がありそうです。


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1578139668/Tableau_twitter_view_utqqqf.png" w="995" h="616" alt="Twitterからの流入数" %}}



**土日ではなく、平日の21時めがけてTwitter投稿すれば読まれる機会が増えそうです**



## まとめ

自分が疑問に思ったことに対して、簡単なドラッグ&ドロップの操作でViz(チャート／グラフ）を作り、疑問を解決できる点については、`Tableau`は非常に優れており、使っていて楽しいツールだと感じました。

`Google Analytics`が持つレポーティングツールを利用しても同じようなチャート／グラフを作成することはできるかもしれませんが、やはり自分が見たいデータをドラッグ&ドロップで操作して、描画できるTableauは、より直感的で楽しいです。

また、もしも必要なデータが足りなかった場合も`データソース`に戻って必要な項目を追加することで、さきほどまで作業していたチャート（グラフ）に新たな項目を付け加えていくことができます。


`Tableau Public`の場合は、データソースにGoogle Analyticsを指定できないので、`Tableau Desktop`が欲しくなりますね。

[Tableau製品とTableau Publicで「できること」「できないこと」 \- SIS Lab](https://www.meganii.com/blog/2019/12/27/product-list-of-tableau/)


- 疑問点に対して、簡単な操作でデータを可視化し、回答を出せるのは`Tableau`の強み
- データをドラッグ&ドロップで触っていけるのは楽しい
- `Tableau`なら試行錯誤をサポートしてくれる


## 参考

- [Google Analytics \- Tableau](https://help.tableau.com/current/pro/desktop/ja-jp/examples_googleanalytics.htm)
- [Google アナリティクスを活用する５つのヒント \| Tableau Software](https://www.tableau.com/ja-jp/learn/whitepapers/5-tips-get-more-google-analytics)


{{% amazon B07RR2QM3M %}}
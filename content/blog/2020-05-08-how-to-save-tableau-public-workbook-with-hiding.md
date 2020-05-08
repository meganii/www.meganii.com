---
title: "Tableau Publicにデフォルト「非表示」で保存する方法"
date: 2020-05-08T21:50:23+09:00
lastmod: 2020-05-08T21:50:23+09:00
category: ['Tech']
tags: ['Tableau', 'Tableau Public']
published: true
slug: how-to-save-tableau-public-workbook-with-hiding
img: https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_1024/v1579905055/thumb_tableau_czhjxd.png
---

`Tableau Public`って保存するときは、必ず`Tableau Public Galally`に「公開」されるものだと思われていないでしょうか。
少なくとも私は、`Tableau Public`で作成したVizは絶対に「公開」されるものであり、「非表示」にもできないと思っていました。

しかし、Twitterで「`Tableau Public`のVizを非表示にするというキーワード」が目に止まりました。
気になって調べてみると**実はデフォルト「非表示」で公開するオプション**があり、あまり知られていなさそうな設定だったので記事にまとめてみました。


## 設定方法

### 1. 自分のTableau Publicプロフィールページの右上のアイコン ＞「設定」ボタンをクリック
[meganii \- プロフィール \| Tableau Public](https://public.tableau.com/profile/meganii#!/)


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1588939414/Settings1_x9dqmm.png" h="318" w="598" alt="Tableau プロパティ" %}}


### 2. 保存中 (英語だとWhen Saving...)にチェック

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1588939543/Settings2_nblhzz.png" h="325" w="782" alt="Tableau プロパティ" %}}

### 3. Tableau Publicから通常通り「名前を付けてTableau Publicに保存」をクリック

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1588940494/save_to_tableaupublic_viwno2.png" h="140" w="383" %}}


### 4. Tableau Publicの保存結果を確認するとデフォルトで「非表示」となる

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1588940328/HiddenViz_vdmhca.png" h="639" w="717" %}}



## 「非表示」とはどういう状態なのか

「非公開」や「限定公開」という言葉を使わなかったのには理由があります。それは「非表示」とは自分以外の他人に対して自分の`Tablau Public`のViewやアクティビティが表示されないに過ぎないからです。

`Tablau Public`に公開したVizのURLを"直接指定"すれば、誰でも閲覧できます。Vizの埋め込みも同様です。

そのため、自分以外には見られない「非公開」や「限定公開」を期待して利用することはできません。推測されやすいワークブック名にしていたとすれば、適当にURLを叩いていれば他者が閲覧できる可能性がゼロとは言えないからです。


## 適切な長さ・ランダム性を持つ「ワークブック名」にすれば有用

ランダムなURLを発行して、そのURLを知っている人だけがアクセスできる手法はいろんなサービスで実装されています。例えば、gyazo.comではURLに`md5`のハッシュ値を利用しており、そのURLを知る人しかアクセスできない状態を作っています。

この「非表示」Vizも、適切な長さ・ランダム性を持つ「ワークブック名」をつければ、確率的には安全であると言えそうです。

> Gyazoで画像をアップロードすると、それぞれの画像ページに固有のURLが付与されます。そのURLを知っている人だけが画像ページにアクセスすることができます。他の人に画像ページのURLを知らせると、その人はウェブブラウザから画像ページのURLにアクセスして画像を閲覧できます。  
> 画像のURLは、ハッシュ関数で暗号化されており、例えば次のような形式です。
> 例: https://gyazo.com/e0ff5ec65913f68331ca5fd88f5dad72
> この暗号部分は 2の128乗 の可能性があるため、340,282,366,920,938,463,463,374,607,431,768,211,456 通りものURLが存在しうることになり、数学的に見て、Gyazoの正しいIDを推測するのが非常に困難であることが分かります。
> [自分の画像は他の人にも公開されますか？（Gyazoの安全性、セキュリティについて） – Gyazo ヘルプセンター](https://support.gyazo.com/hc/ja/articles/204158335-%E8%87%AA%E5%88%86%E3%81%AE%E7%94%BB%E5%83%8F%E3%81%AF%E4%BB%96%E3%81%AE%E4%BA%BA%E3%81%AB%E3%82%82%E5%85%AC%E9%96%8B%E3%81%95%E3%82%8C%E3%81%BE%E3%81%99%E3%81%8B-Gyazo%E3%81%AE%E5%AE%89%E5%85%A8%E6%80%A7-%E3%82%BB%E3%82%AD%E3%83%A5%E3%83%AA%E3%83%86%E3%82%A3%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6-)

>Gyazoは画像をアップロードすると自動で https://gyazo.com/64ad3... のような32桁のIDを含むURLを発行します。IDは0〜9とa〜fの16種類の文字で構成されていて、すべてのIDは16の32乗で340,282,366,920,938,463,463,374,607,431,768,211,456通りです。Gyazoは現在約10億枚（1,000,000,000枚）の画像を保管していますので、ランダムにIDを入力すると0.00000000000000000000000000029%の確率で画像を見つけることができます。数学的に見て、Gyazoの正しいIDを推測するのが非常に困難であることが分かります。またGyazoではDoS攻撃への対策もとられているため、大量のアクセスを通じてIDを割り出すことは不可能です。  
[Gyazoは会社で使えない？誤解の解説とセキュアなGyazoTeamsのご紹介｜スクショ撮影ならGyazo Teams｜note](https://note.com/gyazo_teams/n/n2809f2590926)


#### ランダムなハッシュ値を取得する例

```bash
$ openssl rand -base64 12 | fold -w 10 | head -1 | md5
a313c9b036de73192efeffd277f40bf8
```

ちなみに、ワークブック名は256文字未満という制約があるようです。やってみた感じだとワークブック名/シート名?URLパラメタを含めていそうです。（厳密に検証は行なっていません）

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1588941697/TableauError_dc9bvh.png" h="167" w="392" %}}


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1588941702/TableauError_llti5s.png" h="165" w="652" %}}

- [ワークブック名200文字の非表示Viz](https://public.tableau.com/views/12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890/HiddenWorkBook?:display_count=y&:origin=viz_share_link)
- [ワークブック名250文字の非表示Viz](https://public.tableau.com/views/1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890/0?:retry=yes&:display_count=y&:origin=viz_share_link)


## 「非表示」の場合はnoindexが指定される

あと気になるのは、Googleなどの検索エンジンに非表示Vizをクロールされないかどうかです。
「非表示」Vizと通常Vizの`<meta name="robots"/>`タグを見比べてみました。

結果としては、下図の通り、非表示Vizは`noindex`が指定されているので、意図せず検索結果に出る恐れはなさそうです。

### 通常Viz

`index`が指定されているので、Google botにクロールされる。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1588941605/index_it88he.png" h="514" w="985" %}}

### 非表示Viz

`noindex`が指定されているので、Google botのクロール対象外となる。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1588941606/noindex_ymwfkg.png" h="514" w="985" %}}


## まとめ

`Tableau Public`は公開が前提という固定観念があったため、デフォルト「非表示」で保存できるとは気付きませんでした。「非表示」であっても、直接URLを指定すれば閲覧可能なので、その点に注意すれば大変便利に使うことができそうです。



## 参考
- [How to save Tableau Public workbooks privately on your computer](https://www.olgatsubiks.com/post/2017/03/20/how-to-save-tableau-public-workbooks-privately-on-your-computer)
- [Gyazo \- スクリーンの瞬間共有サービス Gyazoへようこそ](https://gyazo.com/tour?lang=ja)
- [Gyazoは会社で使えない？誤解の解説とセキュアなGyazoTeamsのご紹介｜スクショ撮影ならGyazo Teams｜note](https://note.com/gyazo_teams/n/n2809f2590926)
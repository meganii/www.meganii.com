---
title: "【イベントレポート】Helpfeel Tech Conf 2024 どのように人をアシストすべきか"
date: 2024-08-26T21:22:55+09:00
lastmod: 2024-08-26T21:22:55+09:00
published: false
category: ["Tech"]
tags: 
    - "イベントレポート"
comment: true
slug: "helpfeel-tech-conf-2024"
img: "https://res.cloudinary.com/meganii/image/upload/v1724676071/HelpfeelTechConf2024_aekc5o.jpg"
---

![Helpfeel Tシャツ](https://res.cloudinary.com/meganii/image/upload/v1724676071/HelpfeelTechConf2024_aekc5o.jpg "?size=400×400&hero=1")

## イベントレポート

2024年8月25日(日曜日)、[Scrapbox Drinkup #11](/blog/2019/12/13/scrapbox-drinkup-no-11/) 以来、久しぶりにHelpfeel社（旧Nota社）のオフラインイベント「Helpfeel Tech Conf 2024」に参加した。オンラインとは違って、会場の雰囲気を感じながら、登壇者の顔を見てセッションを聴けるのは良い。おそらくだが、登壇者も聴衆の反応を見ながら話せるのでノってくるだろうし、それに呼応して、活き活きと楽しそうに話をされるのはこちらも楽しくなる。登壇者の楽しそうな姿からエネルギーをもらえた。


今回のHelpfeel Tech Conf 2024では、生成AIの使い方(どう人をアシストするか)の観点で参考になる点が多かった。いままで「生成AIで文章や画像を生成できます」と言われたところで、いまいちピンときていなかった。というのも、生成AIだけで解決しようとしていたからだと思う。生成AIだけで解決するのではなく、取り組んでいる課題や顧客の要望に答えるために、生成AIと既存の手法を適切に組み合わせることが肝要である。人の能力を拡張するアシスタントとして、UIに溶け込こみ、なめらかに振る舞うのが望ましいと感じた。どのような点からそう感じたのかをCosense、Helpfeel、Gyazoの3つプロダクトから見てみる。

まずは、Cosense「文芸的データベース」。従来、データベースのような定型フォーマットを定義するには、人が機械のために頑張って定型化していた。一方、文芸的データベースでは、人が自由にドキュメントを書く一方で機械（生成AI）に正規化されたテーブルを作ることを任せる。人が頑張るのではなく、人は型にはめられることなく自由に創造し、機械が頑張る構図である。「型は絶対に書きたくないでござる」というRubyの思想にも通ずるような気がした。

次に、Helpfeel「意図予測検索」の索引構築、検索アルゴリズムの組み合わせが挙げられる。FAQを作るときの課題に、用意した回答とユーザーが質問する言葉が一致していないため、検索がヒットしないというものがある。これに対して、Helpfeelの意図予測検索の裏側の仕組みのひとつに、Helpfeel記法と呼ばれる索引を作っている。ユーザーが使う言葉をすべて網羅することはできないため、正規表現を駆使して、さまざまな言葉を用いた検索にたえうるようにする。このとき、Helpfeel記法は人の手で定義する必要があるが、その部分にアシストが入り、記事の内容から適切なHelpfeel記法のたたきをつくってくれる。

最後に、Gyazo「Assistant for Gyazo」。画像からマニュアルの叩きを作成する、赤枠でアテンションをコントロールして生成AIに指示する、メタプロンプトを生成する、コレクション内の画像から回答を得るなど、Gyazoを起点としたタスク事例の紹介があった。生成AIが図表を解釈できるようになったことで、何ができるか。


Helpfeel社のVision「Human Empowerment Technology テクノロジーの発明により、人の可能性を拡張する」にもあるように、CosenseとHelpfeelでは文書拡張、Gyazoではいわば画像拡張。それぞれを組み合わせて使うことで、人の可能性を拡張していくんだというメッセージと受けとった。


Helpfeel社のプロダクトは「便利なもの」だけでなく、「楽しいもの」を作る。触っていて楽しいを目指しているという話があった。Helpfeelを導入した「カラオケ パセラ」のFAQを触っているうちに、楽しくなっちゃって、どんどんパセラの業務に詳しくなったという。たしかに、Cosenseも書いて、整理するだけで、楽しい。青リンクでつながるとアハ体験がある、引き続き、魅力を感じている。



## 聴講メモ

[PdM shokaiと事業開発 sawachin の協働から考える、理想のBizとDevの関係性 - sawachin](https://www.docswell.com/s/inteltank/Z1RJ62-helpfeel-techconf-2024)


[現実の画像との戦い - nona](https://scrapbox.io/HelpfeelTech/%E7%8F%BE%E5%AE%9F%E3%81%AE%E7%94%BB%E5%83%8F%E3%81%A8%E3%81%AE%E6%88%A6%E3%81%84)

[文芸的データベース - 文書の作成とそのデータベース化を同時に行なう手法 - shokai](https://scrapbox.io/shokai/%E6%96%87%E8%8A%B8%E7%9A%84%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9_-_%E6%96%87%E6%9B%B8%E3%81%AE%E4%BD%9C%E6%88%90%E3%81%A8%E3%81%9D%E3%81%AE%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9%E5%8C%96%E3%82%92%E5%90%8C%E6%99%82%E3%81%AB%E8%A1%8C%E3%81%AA%E3%81%86%E6%89%8B%E6%B3%95)

[Helpfeel開発チームのオンボーディング - yado](https://docs.google.com/presentation/d/1Eu4zrdsItddR8a82oFyYcqS3Gba8GIm29Hl-4p6k6qE/edit?usp=sharing)


[Helpfeelの検索技術の面白いところ全部見せます！ - teramotodaiki](https://docs.google.com/presentation/d/1yR5OZmS9pI1j2JW2O8N9HBm1R-0AvJE117xaHuyQoGQ/edit?usp=sharing)

[AI時代のナレッジワーカーを支援するプラットフォーム - rakusai](https://scrapbox.io/HelpfeelTech/TechConf_2024%E7%99%BA%E8%A1%A8)




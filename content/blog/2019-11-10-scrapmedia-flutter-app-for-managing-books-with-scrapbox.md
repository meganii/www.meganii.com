---
title: "Scrapboxで読書管理をするために「ScrapMedia」というFlutterアプリを作った"
date: 2019-11-10T15:13:30+09:00
lastmod: 2019-11-10T15:13:30+09:00
comments: true
category: ['Tech']
tags: ['Android', 'Flutter']
published: true
slug: scrapmedia-flutter-app-for-managing-books-with-scrapbox
img: https://res.cloudinary.com/meganii/image/upload/v1573366825/playstore_icon_dz92ux.png
---

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1573366346/Scrapmedia_hero_r2wjh0.png" w="1500" h="500" alt="Scrapboxで読書管理をするために「ScrapMedia」というFlutterアプリを作った" %}}


<!--more-->
{{% googleadsense %}}


「Scrapboxで読書管理がしたい」そんな自分のために、書籍情報を書影付きで簡単にScrapboxに送れるFlutter(Android)アプリを作りました。


## モチベーション

Scrapboxで読書管理をするときに問題になるのが、Scrapboxに書籍ページを作ること。やろうと思えば、Amazonから対象書籍を検索して、Bookmarkletで取り込むことができるが、**ちょっと面倒**。

面倒だと続かないので、Scrapboxへの取り込みステップを１つ省略するために、書籍バーコードを読み取り、そのままScrapboxへ送ることができるアプリがあればよいと思い、作りました。


## 機能

- 書籍バーコードを読み取り、書籍情報を取得、書影付きでScrapbox or Twitter へ送付する（手動での直接ISBN入力も可能）
- データ取得元はopenBDかAmazonから選択（Amazonを利用する場合は、Amazon Product APIのキー取得が必要）

{{% twitter tweetid="1190857370324422656" %}}


## 使い方

以下の設定をすればopenBDからの情報を取得します。

1. 「Scrapbox Project name」に、Scrapboxのプロジェクト名を入力
2. 設定画面で「openBD API」を選択

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1573370426/ScrapMedia_setting_oc5l11.png" w="200" h="400" layout="fixed" alt="ScrapMedia openBD" %}}

もしも、Amazon Product Advertising APIを利用されている方は、AWS ID, Secret Key, Tag IDなどの情報を入れて、「Amazon Product Amazon Product Advertising API」を選択すれば、Amazonから情報を取得します。

## Scrapboxでの読書管理


こんな感じで、「Scrap Media」を使って書籍情報をScrapboxに取り込んで、Scrapboxの読書棚を育てています。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1573368405/mediamarker_jqkwmu.png" w="1440" h="798" alt="Scrapboxで読書管理" %}}


## まとめ

アプリ開発は完全に初心者ですが、Flutterのおかげでなんとなく形になりました。まだまだ未完成ですが、自分が使いやすいように変更していく予定です。もしも興味があれば、ぜひダウンロードしてみて、試してみてください。
（まだまだ荒削りのため、石は投げないで・・・）

<a href='https://play.google.com/store/apps/details?id=com.meganii.flutter_scrapmedia&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
<amp-img alt='Google Play で手に入れよう' src='https://play.google.com/intl/en_us/badges/static/images/badges/ja_badge_web_generic.png' layout="fixed" height="125" width="232"></amp-img></a>


ソースコードはこちら。
[https://github.com/meganii/flutter_scrapmedia](https://github.com/meganii/flutter_scrapmedia)


## 参考図書

{{% amazon 4798055832 %}}

{{% amazon 4839970874 %}}

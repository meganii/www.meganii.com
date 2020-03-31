---
title: "Amazon Product Advertising API用にAWS IAMユーザを作成する方法"
date: 2017-08-27T15:35:00+09:00
lastmod: 2017-08-27T15:35:00+09:00
comments: true
category: ['Tech']
tags: ['AWS']
published: true
slug: create-iam-user-for-amazon-product-advertising-api
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---


いつのまにか、IAMユーザが作成できるようになっていたので、手順をまとめました。

rootアカウントでの運用は、セキュリティ上危険なためすぐにIAMユーザへの切り替えをオススメします。



<!--more-->
{{% googleadsense %}}


[Managing your Existing AWS Security Credentials for the Product Advertising API \- Product Advertising API](http://docs.aws.amazon.com/AWSECommerceService/latest/DG/use-your-existing-aws-security-credentials-for-the-product-advertising-api.html)



## 1.以下のURLの[Sign In to the Console]ボタンをクリック

[Managing your Existing AWS Security Credentials for the Product Advertising API \- Product Advertising API](http://docs.aws.amazon.com/AWSECommerceService/latest/DG/use-your-existing-aws-security-credentials-for-the-product-advertising-api.html)


{{% img src="https://farm5.staticflickr.com/4406/36025382113_4cef01852b_b.jpg" w="1024" h="434" %}}


## 2.[セキュリティ認証情報]をクリック

{{% img src="https://farm5.staticflickr.com/4415/36025382023_4dd56d59c3_b.jpg" w="1024" h="363" %}}


## 3.[IAMユーザーの使用開始]をクリック

{{% img src="https://farm5.staticflickr.com/4343/36025381823_1ca1a0736d_b.jpg" w="753" h="205" %}}


## 4.[ユーザーを追加]をクリック

{{% img src="https://farm5.staticflickr.com/4334/36025381713_fa221a896f_b.jpg" w="1024" h="358" %}}


## 5.ユーザー名に任意の名前を入力し、アクセスの種類の[プログラムによるアクセス]を選択する

{{% img src="https://farm5.staticflickr.com/4404/36025381623_4a5756c6b6_b.jpg" w="1024" h="731" %}}


## 6.[既存のポリシーを直接アタッチ]をクリックし、[ポリシーの作成]をクリックする

{{% img src="https://farm5.staticflickr.com/4386/36025381543_668c0869cd_b.jpg" w="1024" h="726" %}}


## 7.ポリシー名と説明に任意の値を入力し、ポリシードキュメントに下記内容を入力する。

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "ProductAdvertisingAPI:*",
            "Resource": "*"
        }
    ]
}
```

{{% img src="https://farm5.staticflickr.com/4338/36025381453_d8f1918546_b.jpg" w="1024" h="787" %}}


## 8.ユーザー追加の画面に戻って、ポリシー検索窓に先ほど作成したポリシー名を入力し、該当のポリシーを選択し、次のステップへ

{{% img src="https://farm5.staticflickr.com/4360/36025381333_33b2af1151_b.jpg" w="1014" h="710" %}}


{{% img src="https://farm5.staticflickr.com/4379/36025381273_58b769a71c_b.jpg" w="1012" h="756" %}}


## 9.[ユーザーの作成]ボタンをクリックして、ユーザーを作成する

{{% img src="https://farm5.staticflickr.com/4348/36025381223_2712ff177c_b.jpg" w="1014" h="655" %}}

10.作成されたユーザーのアクセスキーIDとシークレットアクセスキーを控えておく

{{% img src="https://farm5.staticflickr.com/4369/36438140630_328fe4924c_b.jpg" w="1024" h="498" %}}

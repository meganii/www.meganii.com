---
title: "[デブサミ2018夏]Hashicorp Vault on Google Cloud Platform"
date: 2018-07-27T12:11:42+09:00
lastmod: 2018-07-27T12:11:42+09:00
comments: true
category: ['Tech']
tags: ['デブサミ', 'Hashcorp']
published: true
slug: developers-summit-2018-hashcorp-vault
img: https://res.cloudinary.com/meganii/image/upload/c_thumb,w_200,g_face/v1532741609/developers-summit-2018-summer_pcc1uq.png
---

[【C-3】 Hashicorp Vault on Google Cloud Platform](https://event.shoeisha.jp/devsumi/20180727/session/1766/)のメモ。

## Vaultの思想

- Credential管理に開けるパラダイムシフト
- 煩雑になって来ている問題を解決するソリューションを提供するソフトウェア

<!--more-->
{{% googleadsense %}}


## 課題

- パーミッション
    - spreadsheetなど
- 保存場所
    - ローカル、サーバ
- デプロイ
    - 人が介入？
- 生成
    - 適切なポリシー？
    - 定期的な更新？
- 復号化/暗号化
    - そもそも暗号化してる？
    - シームレスにできるの？


### Secure Secret Storage

- SecretをStorageに保存する前に暗号化する


### Dynamic Secret

- オンデマンドのアカウントを発行できる

### Data Encryption

- ストレージに保存する前に暗号化する

### Lease & Renewal

- TTLが内蔵しているので、期限が切れればアカウントは失効する

### Revocation

- アカウント失効の手続き



## Vaultを使うと何が嬉しいの

e.g.

- ApplicationにVault Tokenを埋め込む
- MySQLにVaultようアカウントが必要

---
title: "Vercelにカスタムドメインを設定する（Cloudflareネームサーバ利用）"
date: 2020-05-11T07:00:00+09:00
lastmod: 2023-05-05T01:24:08+09:00
published: true
category: ["Tech"]
tags: ["Cloudflare", "Vercel", 'Gatsby.js']
slug: "how-to-configure-custom-domain-using-cloudflare-in-vercel"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto/v1594902885/tech_ben4sq.png"
---

 `Cloudflare`のネームサーバを利用して`Vercel`にカスタムドメインを設定する際、キャッシュがクリアされない、SSL接続が確立しないなど苦労した点がありましたので、備忘録として残しておきます。一言でいうと自分の設定漏れでした。

{{% toc %}}

<!--more-->
{{% googleadsense %}}

## 前提

- `Gatsby.js`を利用して、`Vercel`でビルド & 公開
 

## 現象

- `Vercel`でカスタムドメイン設定が有効（`Valid Configuration`）にならない
    - `Invalid Configuration`のまま変わらない
- キャッシュがクリアされない
    - ビルドが成功しても、コンテンツがリフレッシュされない
    - 各デプロイメントの固有URLでアクセスすると最新情報になっている
- `Error 525: SSL handshake failed`が発生する


![](https://res.cloudinary.com/meganii/image/upload/v1589109876/Error525_t4aiir.png "=1045x781")

## 原因

- `{yourdomain}/.well-known/acme-challenge`に対するHTTP GETリクエストを許可していなかったため、ドメイン認証が正常動作しなかった
- そのため、`Error 525: SSL handshake failed`が発生した（と推測）

*:{yourdomain}部分は自身のドメインに読み替えてください。

元々`Cloudflare`の設定で`Always Use HTTPS`を有効にしていたため、下記URLに対するHTTP GETリクエストがHTTPSにリダイレクトされていました。

```bash
*.{yourdomain}/.well-known/acme-challenge/
```


## ドメイン認証の流れ

ドメイン認証時、下記のパス配下にランダムな命名のファイルが配置されます。

```
http://{yourdomain}/.well-known/acme-challenge
```

このファイルには証明書要求者とCA（認証局）だけが知っているトークンを含んでいます。この取得したファイルでもってCAが正当な証明書要求であると判断し、証明書が発行されます。（下記の例だと`TEST_CLIENT_KEY`がトークンに相当）

>Let's EncryptがHTTP経由でDCV（ドメイン認証）を実行する場合、アリスは、Webサイトの /.well-known/acme-challengeパスにランダムな名前の付いたファイルを配置する必要があります。CA（認証局）は、`http://aliceswonderland.com/.well-known/acme-challenge/<random_filename>`に対してHTTP GET要求を送信して、このファイルを取得する必要があります。このエンドポイントに予期された値が存在すれば、DCVは成立します。  
> [マルチパスドメイン認証（Multipath Domain Control Validation）を使用した証明書発行の保護](https://blog.cloudflare.com/jp/secure-certificate-issuance-jp/)

```
curl http://aliceswonderland.com/.well-known/acme-challenge/YnV0dHNz

GET /.well-known/acme-challenge/YnV0dHNz
Host: aliceswonderland.com

HTTP/1.1 200 OK
Content-Type: application/octet-stream

YnV0dHNz.TEST_CLIENT_KEY
```


## 解決方法

### 1. `{yourdomain}/.well-known/acme-challenge`に対するHTTP GETリクエストが通るように以下の設定を実施

- `Cloudflare`の`Always Use HTTPS`の設定をONからOFFに変更
- `Cloudflare`の`Page Rules`に`*meganii.com/.well-known/*`に対してSSL OFFの設定を追加

![](https://res.cloudinary.com/meganii/image/upload/v1589109681/Always_Use_HTTPS_g3nybg.png "=1045x208")


![](https://res.cloudinary.com/meganii/image/upload/v1589109532/CloudflarePageRules_hryvgr.png "=1053x531")


### 2. SSL/TLS encryption modeをFull(Strict)に変更

元々は`Full`にしていたが、他の方の設定を見る限り`Full(Strict)`の方が良さそうだったので、変更しました。

![](https://res.cloudinary.com/meganii/image/upload/v1589109600/SSL_TLS_encryption_mode_nuffxu.png "=1045x723")


### 3. CloudflareのDNS設定を再設定（Proxy StatusをDNS Onlyに変更し、Proxiedに戻す）

この操作が効いたのかどうかは定かではありませんが、変更直後に挙動が変わったので設定値をリフレッシュする可能性が高いです。

`TXTレコード`は、他の方の設定値の通り試したので、実際に必要かどうかはわかっていません。

![](https://res.cloudinary.com/meganii/image/upload/v1589109532/CloudflareDNS_bdk3u4.png "=1045x389")

### 4. 下記コマンドでエラーが返ってくることを確認

以下のコマンドで、エラーが返って来れば少なくとも正常にHTTP GETのリクエストは受け付けられている。

```bash
$ curl http://{yourdomain}/.well-known/acme-challenge
{"error":{"code":"bad_request","message":"Expected URL of the format `/.well-known/acme-challenge/:token`"}}⏎
```

## まとめ

`Vercel`は、`GitHub`のリポジトリを繋げてビルドすれば簡単に公開までできます。そのため、カスタムドメイン設定もポチッとだけで問題ないと思い込んでいましたのでハマりました。そして、一度ハマると`DNS`や`CDN`の都合上、キャッシュが残っているのから挙動がおかしいのか、設定がそもそも間違っているのか切り分けが難しく困りました。`Vercel`や`Cloudflare`のドキュメントには必要な設定は書いてあったので、公式ドキュメントをまずちゃんと読むことが大事ですね。

とにかくこれで、`Vercel`で簡単に`Gatby.js`のブログを公開できる環境が整ったので整備してきます。


## 参考

- [Develop\. Preview\. Ship\. \- Vercel](https://vercel.com/)
- [Vercel + Cloudflare Domain Setup (formerly ZEIT)](https://ahmadawais.com/vercel-cloudflare-domain-setup/)
- [How to Set Up Cloudflare with Vercel (formerly ZEIT) | Level Up Coding](https://levelup.gitconnected.com/how-to-set-up-cloudflare-with-zeit-93daa7d45dd)
- [https://community.cloudflare.com/t/setup-for-zeit-now-deployments/14170/4](https://community.cloudflare.com/t/setup-for-zeit-now-deployments/14170/4)
- [https://vercel.com/docs/v2/custom-domains?query=cloudflare%20.well#cloudflare](https://vercel.com/docs/v2/custom-domains?query=cloudflare%20.well#cloudflare)
- [チャレンジのタイプ \- Let's Encrypt \- フリーな SSL/TLS 証明書](https://letsencrypt.org/ja/docs/challenge-types/)

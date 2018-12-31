---
title: "SendGridのInbound Parseでメール受信をトリガーに処理を実行する"
date: 2017-11-19T06:22:24+09:00
lastmod: 2017-11-19T06:22:24+09:00
comments: true
category: ['Tech']
tags: ['Sendgrid', 'Node.js', 'JavaScript']
published: true
slug: sendgrid-inbound-parse
img: https://res.cloudinary.com/meganii/image/upload/c_scale,h_75,w_75,f_auto/v1511097208/zbenj5jvtfhidsnduvhx.png
---

「メール受信をトリガーになんらかの操作をしたい」ときに調べたときの調査結果

<!--more-->
{{% googleadsense %}}


# やりたいこと
メール受信をトリガーになんらかの操作をしたい




# 実現方法

## SendGrid

[SendGridでメールを受信することはできますか？ – サポート](https://support.sendgrid.kke.co.jp/hc/ja/articles/203392065-SendGrid%E3%81%A7%E3%83%A1%E3%83%BC%E3%83%AB%E3%82%92%E5%8F%97%E4%BF%A1%E3%81%99%E3%82%8B%E3%81%93%E3%81%A8%E3%81%AF%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8B-)

- Parse Webhookを利用して、指定したドメイン宛のメールを指定したURLにPOSTできる。
- POSTには受信したメールのヘッダ、本文、添付ファイルなどの情報が含まれる。このPOSTをアプリケーション側で受けることにより、メール受信をトリガとした処理を実行できる。
- Parse Webhookを利用するには、Domain Whitelabel設定を行った上でメールを受信するドメインのDNSのMXレコードの修正が必要


## SendGrid設定方法

1. SendGrid登録
1. Domain Whitelabel
1. MX/CNAMEレコードを追加
1. Inbound Parse設定
1. POSTリクエストを受け取るアプリケーションを用意
1. メール送信


### 1. Send GridのFreeプランを登録する(私の場合、Azureから登録しました)

### 2. [Send Grid] Domain Whitelabel 設定

Parse Webhook(Inbound Parse)を利用するためには、まずDomain Whitelabel設定が必要のため、以下の通りサブドメインを登録します。

{{% img src="https://res.cloudinary.com/meganii/image/upload/c_scale,w_640,f_auto/v1511095930/f4wmdqgwy2pcne4f9nr7.png" w="640" h="354" %}}

### 3. [ドメイン設定] MXレコードとCNAMEを追加する。

Domain Whitelabl登録時に表示されるCNAMEと、MXレコードをご自身のドメイン管理サイト(お名前.com)に、以下3レコードを追加します。

{{% img src="https://res.cloudinary.com/meganii/image/upload/c_scale,w_640,f_auto/v1511045848/gzkrcrwjrmivsqqhtw9h.jpg" w="640" h="190" %}}

はじめ、Domain Whitelabel設定を行ったときに、これを登録しろと言われるCNAMEを全部登録した後にMXレコードを追加しようとしたが、お名前.com側で追加できなかった。

CNAMEに登録するのは、s1._domainkey.XXXX, s2._domainkey.XXXXの2つだけでよい。

[livedoor Techブログ : CNAMEの間違った使い方](http://blog.livedoor.jp/techblog/archives/65340720.html)


### 4. [Send Grid] Inbound Parse設定

Settings > Inbound Parse 対象ドメインのメール受信後にどのURLに対してPOSTするかを設定する。

{{% img src="https://res.cloudinary.com/meganii/image/upload/c_scale,w_640,f_auto/v1511051917/m3sgzyg5xzftm2c3c5pi.jpg" w="640" h="480" %}}



- subdomainの部分は、「2.」で登録したドメインを登録する。

- `Destination URL`にはPOST先のURLを指定する。

テスト時は後述する`RequestBin`や`ngrok`のURLを指定した。


{{% img src="https://res.cloudinary.com/meganii/image/upload/c_scale,w_640,f_auto/v1511052504/ztj0duzot0rtit4olqc3.png" w="640" h="480" %}}


### 5. POSTリクエストを受け取るアプリケーションを用意

Node.js(Express)の場合。

server.js
```javascript
const express = require('express');
const cors = require('cors');
const port = 4000;
const app = express();
const multer = require('multer');
let upload = multer();

app.use(cors());

// HTTPリクエストを受け取る
app.post('/incoming', upload.fields([]), function (req, res) {
console.log(req.body.subject);
console.log(req.body.text);
res.sendStatus(200);
});

// サーバーを起動する部分
const server = app.listen(port, function () {
var host = server.address().address;
console.log('Example app listening at http://%s:%s', host, port);
});
```

```
node server.js
```

### 6.メール送信 

例えば、`sub.hoge.com`とした場合、mail@sub.hoge.comにメール送信する。


## 確認方法

以下のリンクで紹介されている`RequestBin`というWebサービスを利用するのがよいです。

[Webhookのデバッグ](https://sendgrid.kke.co.jp/docs/API_Reference/Webhooks/debug.html#-RequestBin)



{{% img src="https://res.cloudinary.com/meganii/image/upload/c_scale,w_640,f_auto/v1511048426/ga8ugnnbstfhbshvt9mz.jpg" w="640" h="480" %}}


その後、ローカルデバッグしたい場合は、`ngrok`を利用する。


# ハマった点

`multipart/form-data`として扱わなければならないところを扱っていなかったため、`request.body`が取得できなかった。


今までrequestのデータが取れない場合は、だいたいbodyParserで解決していたので、今回も同様に考えていたらハマった。上記で紹介している`RequestBin`を試してみたところ、`multipart/form-data`で送られてきていたので判明した。

https://stackoverflow.com/questions/24543847/req-body-empty-on-posts



https://stackoverflow.com/questions/37630419/how-to-handle-formdata-from-express-4

Node.jsでは`multer`というライブラリを使うのが通例(?)っぽいので試してみたところ解決した。


```javascript
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 4000;
const app = express();
const multer = require('multer');
let upload = multer();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// HTTPリクエストを受け取る部分
app.post('/incoming', upload.fields([]), function (req, res) {
console.log(req.body.subject);
console.log(req.body.text);
res.sendStatus(200);
});
// サーバーを起動する部分
const server = app.listen(port, function () {
var host = server.address().address;
console.log('Example app listening at http://%s:%s', host, port);
});
```


## ngrok

```
$ ngrok 4000
Session Status                online
Version                       2.2.8
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://xxxxxxxx.ngrok.io -> localhost:4000
Forwarding                    https://xxxxxxxx.ngrok.io -> localhost:4000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              29      0       0.00    0.00    0.02    0.56

HTTP Requests
-------------

POST /incoming                 200 OK
```

## 参考

- [メールを受信する \- ドキュメント \| SendGrid](https://sendgrid.kke.co.jp/docs/Tutorials/E_Receive_Mail/receive_mail.html)
- [Domain Whitelabel \- ドキュメント \| SendGrid](https://sendgrid.kke.co.jp/docs/User_Manual_JP/Settings/Whitelabel/domains.html)
- [SendGridでメールを受信してAWSのAPIGateway/Lambdaに渡す \- Qiita](https://qiita.com/monamu/items/77459b6bdb02e8bc2585)

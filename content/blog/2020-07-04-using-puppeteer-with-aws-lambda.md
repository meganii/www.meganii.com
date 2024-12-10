---
title: "puppeteerをAWS Lambdaで利用する"
date: 2020-07-04T12:18:11+09:00
lastmod: 2023-05-05T01:24:09+09:00
category: ["Tech"]
tags: ["puppeteer","lambda","AWS"]
comment: true
slug: "using-puppeteer-with-aws-lambda"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto/v1594902885/tech_ben4sq.png"
---


`AWS Lambda`は、いわゆる`FaaS(Function as a Service)`の1つです。`AWS Lambda`を使用することで、サーバーのプロビジョニングや管理をすることなく、コードを実行できます。
なんらかのイベントをトリガーとして、処理を行うためには適しているサービスです。

しかし、`puppeteer`を`AWS Lambda`上で何かの処理を自動化する場合、以下の制約がネックになります。

- デプロイパッケージサイズ
    - 50 MB（zip圧縮済み、直接アップロード）
    - 250 MB（解凍、レイヤーを含む）
    - 3 MB（コンソールエディタ）

[AWS Lambda の制限 \- AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/gettingstarted-limits.html)

`puppeteer`を普通に利用すると`chronium`を同梱しているため、どうしても50MBの制限を超えてしまいます。この制限を回避するためには以下で公開いただいているような、軽量な`Chromium Binary`を利用する必要があります。

- [alixaxel/chrome\-aws\-lambda: Chromium Binary for AWS Lambda and Google Cloud Functions](https://github.com/alixaxel/chrome-aws-lambda)
- [adieuadieu/serverless\-chrome: 🌐 Run headless Chrome/Chromium on AWS Lambda](https://github.com/adieuadieu/serverless-chrome)


今回は、`chrome-aws-lambda`を利用する手順を紹介します。


{{% toc %}}

<!--more-->
{{% googleadsense %}}


## 1. AWS Lambda Layerに登録するZIPアーカイブ（chromium + puppeteer）を作成

`AWS Lambda Layer`とは、ライブラリ、カスタムランタイム、またはその他の依存関係を含むZIPアーカイブです。
この`AWS Lambda Layer`を利用してデプロイパッケージを小さくすることで、`AWS Lambda`上で`puppeteer`を利用可能とします。


`chrome-aws-lambda`を利用する場合は、以下のコマンドを実行して`AWS Lambda Layer`に登録するZIPアーカイブを作成します。

```
git clone --depth=1 https://github.com/alixaxel/chrome-aws-lambda.git && \
cd chrome-aws-lambda && \
make chrome_aws_lambda.zip
```

## 2. AWS Lambda Layerに作成したZIPアーカイブを登録

AWS Console > AWS Lambdaから、レイヤーを作成します。

![レイヤーの作成](https://res.cloudinary.com/meganii/image/upload/v1593931417/nhwkjaeerejr4jyikps3.png "=1383x350")


ここで、先ほど作成した`chrome_aws_lambda.zip`を指定します。また、互換性のあるランタイムとして`Node.js 10.x`, `Node.js 12.x`を指定して登録します。

![レイヤーの作成　レイヤー設定](https://res.cloudinary.com/meganii/image/upload/v1593931471/zrgujpawchwznghdnc2c.png "=820x690")


## 3. AWS Lambda関数の作成とレイヤー追加

続いて、ぽちぽちと関数を作成していきます。

![関数を作成](https://res.cloudinary.com/meganii/image/upload/v1593931605/vonwhatp33fu5n5dmwjy.png "=1365x388")


![](https://res.cloudinary.com/meganii/image/upload/v1593931652/snysklv7zdoyvyjzskya.png "=1331x713")


任意の名前で関数を作成した後、「レイヤーの追加」から先ほど登録したレイヤーを追加します。（ここでは一度登録し直したためバージョン2になっていますが、初期登録の場合はバージョン1になります）

![](https://res.cloudinary.com/meganii/image/upload/v1593931781/vrecpy09jzld9ksytb8p.png "=1331x486")


![](https://res.cloudinary.com/meganii/image/upload/v1593931806/ati0jpfrvnzxdcfk3cjn.png "=759x486")


続いて、実際のコードを登録します。ここでは下記のサンプルコードを利用します。

![](https://res.cloudinary.com/meganii/image/upload/v1593931858/bq3i6xdablib3kykqvkq.png "=1313x609")
```javascript
const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context, callback) => {
  let result = null;
  let browser = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    let page = await browser.newPage();

    await page.goto(event.url || 'https://example.com');

    result = await page.title();
  } catch (error) {
    return callback(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return callback(null, result);
};
```

## 4. 実行時の設定変更

`chrome-aws-lambda`の要求するメモリは、最小512MB, 推奨1600MB以上とされています。
ここでは、最小512MBと、タイムアウトをデフォルトの3秒から1分に設定を変更しました。
（タイムアウトをデフォルトの3秒のままにしていたら、`puppeteer`が起動するまでに3秒以上かかり、タイムアウトのエラーが発生しました）


![](https://res.cloudinary.com/meganii/image/upload/v1593931904/rgqkqakaqzlen6fudbxw.png "=655x282")


![AWS Lambdaの設定変更](https://res.cloudinary.com/meganii/image/upload/v1593932034/zsccctcunpcj21nwgtf9.png "=739x680")


## 5. テスト実行

以下の「テスト」をクリックして、新しいテストイベントの設定を行います。今回は、デフォルトのまま登録します。



![](https://res.cloudinary.com/meganii/image/upload/v1593933340/twwitz4tc4jevbzjvkho.png "=957x113")


![](https://res.cloudinary.com/meganii/image/upload/v1593933363/conuwb4ch7xbdch18i6s.png "=738x407")



関数コードの「Test」を実行すると、正しくレスポンスが返ってきました。`Response: "Example Domain"`

![](https://res.cloudinary.com/meganii/image/upload/v1593933440/jqlrhillne20jzntp6qz.png "=944x569")




## まとめ

上記の手順により、`puppeteer`を`AWS Lambda`で実行する方法を確立できました。
これにより、`AWS Lambda`の柔軟な実行環境を手に入れました。

後はイベント駆動でスクレイピングや任意の処理を組み込むなど、できることは多そうです。

{{% amazon 4798055204 %}}

---
title: "puppeteerをAWS Lambdaで利用する"
date: 2020-07-04T12:18:11+09:00
lastmod: 2020-07-05T12:18:11+09:00
published: true
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

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1593931417/nhwkjaeerejr4jyikps3.png" w="1383" h="350" alt="レイヤーの作成" %}}


ここで、先ほど作成した`chrome_aws_lambda.zip`を指定します。また、互換性のあるランタイムとして`Node.js 10.x`, `Node.js 12.x`を指定して登録します。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1593931471/zrgujpawchwznghdnc2c.png" w="820" h="690" alt="レイヤーの作成　レイヤー設定" %}}


## 3. AWS Lambda関数の作成とレイヤー追加

続いて、ぽちぽちと関数を作成していきます。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1593931605/vonwhatp33fu5n5dmwjy.png" w="1365" h="388" alt="関数を作成" %}}


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1593931652/snysklv7zdoyvyjzskya.png" w="1331" h="713" %}}


任意の名前で関数を作成した後、「レイヤーの追加」から先ほど登録したレイヤーを追加します。（ここでは一度登録し直したためバージョン2になっていますが、初期登録の場合はバージョン1になります）

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1593931781/vrecpy09jzld9ksytb8p.png" w="1331" h="486" %}}


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1593931806/ati0jpfrvnzxdcfk3cjn.png" w="759" h="486" %}}


続いて、実際のコードを登録します。ここでは下記のサンプルコードを利用します。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1593931858/bq3i6xdablib3kykqvkq.png" w="1313" h="609" %}}
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


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1593931904/rgqkqakaqzlen6fudbxw.png" w="655" h="282" %}}


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1593932034/zsccctcunpcj21nwgtf9.png" w="739" h="680" alt="AWS Lambdaの設定変更" %}}


## 5. テスト実行

以下の「テスト」をクリックして、新しいテストイベントの設定を行います。今回は、デフォルトのまま登録します。



{{% img src="https://res.cloudinary.com/meganii/image/upload/v1593933340/twwitz4tc4jevbzjvkho.png" w="957" h="113" %}}


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1593933363/conuwb4ch7xbdch18i6s.png" w="738" h="407" %}}



関数コードの「Test」を実行すると、正しくレスポンスが返ってきました。`Response: "Example Domain"`

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1593933440/jqlrhillne20jzntp6qz.png" w="944" h="569" %}}




## まとめ

上記の手順により、`puppeteer`を`AWS Lambda`で実行する方法を確立できました。
これにより、`AWS Lambda`の柔軟な実行環境を手に入れました。

後はイベント駆動でスクレイピングや任意の処理を組み込むなど、できることは多そうです。

{{% amazon 4798055204 %}}
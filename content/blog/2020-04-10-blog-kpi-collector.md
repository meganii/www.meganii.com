---
title: "Blog KPI Collector（GAS）で各種KPIを自動取得する"
date: 2020-04-10T18:28:55+09:00
lastmod: 2020-04-10T18:28:55+09:00
comments: true
category: ['Tech']
tags: ['Blog', 'Google Apps Script', 'ブログメンタリング']
published: true
slug: collecting-blog-kpi-with-google-apps-script-blog-kpi-collector
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

ブログメンタリング期間中は、事前に設定したブログKPI（ページビュー数、ユーザ数、Twitterフォロワーなど）を報告するため、毎週日曜日に手動で取得していました。

しかし、ブログメンタリング終了後、報告する必要がなくなるとどうしてもめんどくさいことはやらなくなってしまいます。

そこで、今まで取得していたKPIを`Google Apps Script`で自動取得するように設定してみました。


{{% toc %}}

<!--more-->
{{% googleadsense %}}

## Google Apps Script（Blog KPI Collector）の導入

ここでは、[@budougumi0617](https://twitter.com/budougumi0617)さんが作成した`Google Apps Script`のスターターキットである「blog-kpi-collector」を利用させていただきました。

[budougumi0617/blog\-kpi\-collector: \`clasp\`コマンドを使ってKPIを取得するgoogleスプレッドシートを生成するスターターキット](https://github.com/budougumi0617/blog-kpi-collector)

上記の`README.md`を見ながらインストールしてきます。



### claspインストール

`clasp`とはGoogleが提供する「Google Apps Scriptを操作するコマンドラインツール」です。

[google/clasp: 🔗 Command Line Apps Script Projects](https://github.com/google/clasp)

元々、`Google Apps Script`上でスクリプトを書くことで実行はできていました。
しかし、ローカルで作成したファイルを`Google Apps Script`にアップロードするには色々と面倒な手順が必要でした。
（例えば、`google-apps-script`というライブラリを使うなど）

この`clasp`はそれらのツールの決定版という位置付けで、ローカルで`Google Apps Script`の開発を行うためには、デフォルトのツールになっているようです。

claspのインストールと初期設定は、[GAS のGoogle謹製CLIツール clasp \- Qiita](https://qiita.com/HeRo/items/4e65dcc82783b2766c03)を参考にしました。

まずは、以下の通り`clasp`コマンドのインストールと初期設定を行います。

```
$ npm install -g @google/clasp
$ clasp login
```


### Blog KPI Collectorインストール

続いて、Blog KPI Collectorを導入していきます。GitHubから落として、`npm install`を実行します。

```
$ git clone git@github.com:budougumi0617/blog-kpi-collector.git
$ npm install
```

### Google Sheet作成

`clasp create`でKPIを入力していく`Google Sheet`とその`Google Sheet`に紐づく`Google Apps Script`を作成します。

```
$ clasp create --title "KPI Sheet" --type sheets --rootDir ./src
Created new Google Sheet: https://drive.google.com/open?id={ID}
Created new Google Sheets Add-on script: https://script.google.com/d/{ID}/edit
Warning: files in subfolder are not accounted for unless you set a '.claspignore' file.
Cloned 1 file.
└─ ./src/appsscript.json
```

### （初回のみ）Google Apps Script APIの有効化

初めて`Google Apps Script API`を利用する場合、`clasp create`を実行すると下記メッセージが出て実行できない場合があります。

```
$ clasp create --title "KPI Sheet" --type sheets --rootDir ./src
Created new Google Sheet: https://drive.google.com/open?id={XXXXX}
User has not enabled the Apps Script API. Enable it by visiting https://script.google.com/home/usersettings then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.
```

その場合は、メッセージの通り、[Settings \- Apps Script](https://script.google.com/home/usersettings)にアクセスして、`Apps Script API`を有効にします。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1586603453/GoogleAppsScriptAPI_1_ncvlmy.png" w="978" h="584" %}}


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1586603453/GoogleAppsScript_2_cxpwd3.png" w="894" h="275" %}}


### Google Apps Scriptをpull & push

`clasp pull`で自動生成されたGoogle Apps Scriptのコードを手元にダウンロードします。

その後、`clasp push`で、Blog KPI CollectorのコードをGoogle Apps Scriptにアップロードします。

```
$ clasp pull
 (node:64667) ExperimentalWarning: The fs.promises API is experimental
 Warning: files in subfolder are not accounted for unless you set a '.claspignore' file.
 Cloned 1 file.
 └─ ./src/appsscript.json
```

```
$ clasp push
 (node:64687) ExperimentalWarning: The fs.promises API is experimental
 └─ src/appsscript.json
 └─ src/googleAnalytics.ts
 └─ src/hatena.ts
 └─ src/main.ts
 └─ src/twitter.ts
 Pushed 5 files.
```


### Google Apps Scriptを実行する

`clasp open`コマンドを実行し、Add-on scriptのURLを開きます。
その後、`main.gs`ファイルを選択し、`main関数`を実行します。

>「承認が必要です」と出てくるので「許可を確認」→アカウントを選択→「詳細」→「KPI Sheet（安全ではないページ）に移動」→「許可」とクリックしていきます。

下図の通り、認可を進めていきます。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1586604029/Run-AppsScript_c6kuh7.png" w="719" h="275" %}}

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1586604491/Authorization-1_lrp7rr.png" w="457" h="168" %}}

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1586604498/Authorization-2_mliigt.png" w="605" h="701" %}}

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1586604498/Azuthorization-3_clrfpr.png" w="605" h="555" %}}

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1586604498/Authorization-4_c6gzaz.png" w="605" h="555" %}}


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1586604815/Authorization-5_uphtc4.png" w="605" h="766" %}}

`KPI Sheet`に何かしらの値が登録されていれば、OKです。

### 「スクリプトのプロパティ」を設定する

[「スクリプトのプロパティ」を設定する](https://github.com/budougumi0617/blog-kpi-collector#%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E3%81%AE%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B)に従って、変数をプロパティに設定します。

これにより、各ユーザごとの指標を取得できます。


### Google Analyticsとの連携方法

[Google Analyticsとの連携方法](https://github.com/budougumi0617/blog-kpi-collector#google-analytics%E3%81%A8%E3%81%AE%E9%80%A3%E6%90%BA%E6%96%B9%E6%B3%95)に従い、`Google Analytics` APIを有効にします。



### トリガーによる自動実行の設定

仕上げとして、トリガーによる自動実行の設定を行います。
これも、[定期的に実行するトリガーを設定する](https://github.com/budougumi0617/blog-kpi-collector#%E5%AE%9A%E6%9C%9F%E7%9A%84%E3%81%AB%E5%AE%9F%E8%A1%8C%E3%81%99%E3%82%8B%E3%83%88%E3%83%AA%E3%82%AC%E3%83%BC%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B)に従い、設定します。

日曜日の朝一で日〜土曜日までの1週間のKPIを取得するようにしました。



## まとめ

久しぶりに`Google Apps Script`を触ってみると結構変わっていることに気づきました。

- claspというApps Scriptをコマンドラインから操作するツールが出ている
- Google Apps ScriptでES 6の機能を利用できる

日々の作業を自動化するために、もっと`Google Apps Script`を活用していきます。
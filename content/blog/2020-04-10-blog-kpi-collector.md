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
 (node:64637) ExperimentalWarning: The fs.promises API is experimental
 Created new Google Sheet: https://drive.google.com/open?id={ID}
 Created new Google Sheets Add-on script: https://script.google.com/d/{ID}/edit
 Warning: files in subfolder are not accounted for unless you set a '.claspignore' file.
 Cloned 1 file.
 └─ ./src/appsscript.json
```

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


## まとめ

久しぶりに`Google Apps Script`を触ってみると結構変わっていることに気づきました。

- claspというApps Scriptをコマンドラインから操作するツールが出ている
- Google Apps ScriptでES 6の機能を利用できる

日々の作業を自動化するために、もっとGoogle Apps Scriptを活用していきます。
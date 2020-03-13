---
title: "npm-run-allでローカルAPI serverとHugo serverを同時に実行する"
date: 2020-03-13T06:54:19+09:00
lastmod: 2020-03-13T06:54:19+09:00
comments: true
category: ['Tech']
tags: ['Hugo', 'Blog']
published: true
slug: running-api-server-and-hugo-server-with-npm-run-all
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_100/v1514036568/thumbnail_hugo_icon.png"
---

このブログではローカルでAPIサーバ（Express）を動かし、HugoのShortcodesから利用しています（2020/03/13現在）。
[HugoでAMP対応のブログカードを作る \- SIS Lab](https://www.meganii.com/blog/2020/02/02/blogcard-in-hugo/)

そのため、記事を書いてHugoのプレビューを利用する場合は、2つのターミナルで以下のコマンドを実行していましたが、ちょっとだけ面倒です。

- API Server: npx ts-node src/app.ts
- Hugo Server: hugo server -D

そこで、`npm-run-all`というライブラリを利用して、1つのターミナルで簡単にできるようにしました。

<!--more-->
{{% googleadsense %}}

## npm-run-allとは

`npm-run-all`は、複数のnpmスクリプトを並列もしくは直列で実行するためのCLIツールです。

以下の3つのコマンドが提供されます。

- npm-run-all: コマンドオプションにより並列・直列実行、その他複雑な処理が行える
- run-p: 並列実行の省略コマンド
- run-s: 直列実行の省略コマンド

今回は単純な並列実行のため`run-p`を利用します。


## npm-run-allで1つのターミナルでAPIサーバとHugoを動かす方法

事前に以下のコマンドで`npm-run-all`をインストールします。

```
npm install npm-run-all --save-dev
```

`package.json`には、以下の通り設定をしておき、`npm start`を実行したときに、`ts-node src/app.ts`と`hugo server -D`を並列実行するようにしました。
正確には`hugo server`を実行する前にAPIサーバが動作していないとうまくHugoのビルドが行われないのですが、接続タイムアウトになるまでには若干余裕があります。
今の所、接続タイムアウトになる前にはAPIサーバ起動できているので、支障は出ていません。

```
  "scripts": {
    "start": "run-p serve dev",
    "serve": "ts-node src/app.ts",
    "dev": "hugo server -D",
  },
```


```bash
$ npm start
 > meganii.com@1.0.0 start /github-pages
 > run-p serve dev
 
 
 > meganii.com@1.0.0 serve /github-pages
 > ts-node src/app.ts
 
 
 > meganii.com@1.0.0 dev /github-pages
 > hugo server -D
 
 Building sites … Listening on port 6060
 
                   | EN  |  JA   
-------------------+-----+-------
  Pages            |  36 | 1614  
  Paginator pages  |   0 |  155  
  Non-page files   |   0 |    0  
  Static files     | 154 |  154  
  Processed images |   0 |    0  
  Aliases          |  15 |  493  
  Sitemaps         |   2 |    1  
  Cleaned          |   0 |    0  

Built in 6037 ms
Watching for changes in /github-pages/github-pages/{archetypes,content,data,layouts,static,themes}
Watching for config changes in /github-pages/github-pages/config.toml
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```


## まとめ

`npm-run-all`のnpmライブラリを利用することで、ローカルにAPIサーバを立ててHugo Serverでのプレビュー表示が簡単に行えるようになりました。

`ctrl + c`で終了させれば、APIサーバも自動的に停止しますのでプロセスが残って、ポートが重複することもありません。

これでまたちょっとの面倒が解消されました。


## 参考

[npm\-run\-all \- npm](https://www.npmjs.com/package/npm-run-all)
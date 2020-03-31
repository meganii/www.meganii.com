---
title: "Circle CIでHugoのビルド・デプロイを実行する"
date: 2016-08-15T15:53:59+09:00
comments: true
category: ['Tech']
tags: ['CircleCI','CI','Hugo']
published: true
slug: circle-ci-hugo-deploy
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514036568/thumbnail_hugo_icon.png"
---

{{% img src="https://farm5.staticflickr.com/4388/36747233782_a795b7ff4b_b.jpg" w="1024" h="761" %}}


## この記事で書くこと

- Circle CIの設定
- Circle CIからさくらVPS(CentOS 6.4)へのrsyncでハマったこと
- circle.ymlのRuby, Pythonの設定


## 実現したいこと

GitHubのリポジトリに、git pushした後、以下の作業をCIで実現したい。

- (事前準備）TF-TDFに食わせるためのファイル生成
- TF-IDFで関連記事生成
- Hugo build
- さくらVPSにrsync
- 関連記事生成で変更分をGitHubにコミット


## 目的

Hugo単体でbuild -> さくらVPSへ転送まではローカルで完結するため、あまりCIとかは必要ないと思っていました。しかし、[PythonでTF\-IDFによる文書推薦 \- SIS Lab](https://www.meganii.com/blog/2016/08/13/tf-idf-recommendation/)で、TF-IDFによる関連記事生成のタスクを追加したことで、若干buildまでの時間が掛かるようになりました。

そこで、GitHubにpushしたら、関連記事の生成からHugoビルド・デブロイまでCIで面倒を見てもらうようにしたい。

また、GitHubで管理することによって履歴が分かるようになること、ブラウザベースで記事を修正できるようになることも狙いの1つです。

{{% googleadsense %}}


## Circle CIとは

[CircleCI](https://circleci.com/)

自分のCircle CIの認識は、継続的インテグレーション（CI）を実現するためのSaaS型のWebサービスです。同様のCIサービスには、TravisCIや、Weckerがあります。各サービスごとに、細かい違いはあるようですが、そのなかでも人気がありそうなCircle CIを選びました。

## How　どうやって実現するか

1. Circle CIからGitHubを連携させる
2. circle.ymlに処理を記述する
3. 対象リポジトリにgit pushする

実際の設定自体は単純で、circle.ymlというCircle CI用の設定ファイルを作ってあげるだけで、Circle CIが動き出す。

## ハマった点

- Circle CIからさくらVPSへのrsync
- GitHubへのコミット権限は、ユーザ定義を指定しなければならない


### Circle CIからさくらVPSへのrsync

Circle CIで毎回生成されるコンテナ（Ubuntu)からブログ記事をホストしているさくらVPSへのrsyncを行うために、SSHの鍵を登録する必要がある。

#### 1. さくらVPSで鍵を生成する

```
$ ssh-keygen -t rsa # 生成の際にパスワードは設定しない
```

#### 2. 公開鍵をauthorized_keysに登録する

```
$ cat id_rsa.pub >> authorized_keys
```

#### 3. CircleCIのプロジェクト設定のSSH Permissionsから秘密鍵を登録

「1. さくらVPSで鍵を生成する」で生成した秘密鍵`id_rsa`をコピーして、Circle CIの「SSH Permissions」から登録します。

{{% img src="https://farm8.staticflickr.com/7648/28936345722_c7fc15ee85_z.jpg" w="640" h="407" %}}


#### 4. Circle CIのDebug Via SSHからSSHログインしてCircle CI側からさくらのレンタルサーバー側にログイン確認

```
$ ssh -p port番号 さくらVPSのユーザ名@さくらVPSのIPアドレス
```

[CircleCI側のSSHキーをさくらのレンタルサーバー側に登録する \- Qiita](http://qiita.com/ANTON072/items/fbcbca9fa440b391044b)


### GitHubへのコミット権限は、ユーザ定義を指定しなければならない

「Checkout SSH keys」で最初に作られている`deploy key`だとGitHubにコミットができませんでした。

GitHubにコミットするためには、`user key`を利用する必要がありました。


### 環境変数の設定方法

直接コードに埋め込みたくない値などは、Circle CIでも環境変数として定義できます。

{{% img src="https://farm5.staticflickr.com/4380/36541006250_c2da84d253_b.jpg" w="1024" h="441" %}}



ここでは、さくらVPSのIPアドレス、ポート番号を環境変数として定義している。


### Rake -qによるサイレント実行

せっかくあまり見せたくない変数をCircle CIの環境変数として定義したにも関わらず、Rakeの実行ログがCircle CIのビルド結果に残ってしまうのはあんまり意味がありません。

Rakeのオプションに -q, --quietがあったのでこのオプションを付けて実行します。

```
-q, --quiet   Do not log messages to standard output.
```



### Mecabインストール

mecabインストールで参考にしたcircleci
https://circleci.com/gh/bungoume/mecab-web-api/76#config


## 今後対応したいこと

- TF-TDFのパラメータ調整
- Textlintによる文章校正
- GitHub Flowによる電子書籍作成
- Circle CIの定期実行

{{% amazon 4774174238 %}}

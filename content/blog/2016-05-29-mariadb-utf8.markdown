---
title: "MariaDBの日本語文字化けを解消するための設定"
date: 2016-05-29T15:55:28+09:00
comments: true
category: ['Tech']
tags: ['MariaDB', 'DB']
published: true
slug: mariadb-utf8
img: 'https://images-na.ssl-images-amazon.com/images/I/51pj9W0WxzL._SL160_.jpg'
---

Ruby on RailsからMariaDBを利用した時に、文字化けが発生したのでMariaDBの設定内容を見直した。


## 前提

MariaDBのバージョン

```
Server version: 10.1.10-MariaDB MariaDB Server
```

{{% googleadsense %}}

## 文字化けする

character_set_server, character_set_databaseが、latin1になっているのが原因で、新規作成したデータベース、テーブルの文字latin1になっていた。


```
MariaDB [(none)]> show variables like 'char%';
+--------------------------+----------------------------+
| Variable_name            | Value                      |
+--------------------------+----------------------------+
| character_set_client     | utf8                       |
| character_set_connection | utf8                       |
| character_set_database   | latin1                     |
| character_set_filesystem | binary                     |
| character_set_results    | utf8                       |
| character_set_server     | latin1                     |
| character_set_system     | utf8                       |
| character_sets_dir       | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+
```

### 各設定の説明

|設定値                    |	説明               |
|:------------------------|:------------------------------------------------------------------------|
|character_set_client	    |クライアント => サーバーにメッセージを送る際に使われるキャラセット                 |
|character_set_connection	|クライアントが送ったクエリをサーバーが解析する際、このキャラセットに従ってunescapeする|
|character_set_database	  |DBのdefaultキャラセット。"LOAD DATA INFILE"文はこの指定に従う|
|character_set_filesystem	|ファイルシステムの文字コード|
|character_set_results	  |サーバー => クライアントに結果を送信するときに使われるキャラセット|
|character_set_server	    |サーバーのdefaultキャラセット|
|character_set_system	    |ファイル名をこのキャラセットで扱う。utf8固定|
|character_sets_dir	      |キャラセットファイルの置いてあるディレクトリ|


参考: [MySQL/MariaDB　文字コードの設定 - takafumi blog](http://takafumi-s.hatenablog.com/entry/2015/04/03/010720)


## 設定

一般的には、`/etc/my.cnf`に`/etc/my.cnf.d`ディレクトリにある設定ファイルを読み込む設定を書いておき、詳細設定は、`/etc/my.cnf.d`の各設定ファイルに書く。今回、自分の設定ファイルを確認すると、`/etc/my.cnf`に`my.cnf.d`ディレクトリを読み込む設定がされていなかったため、追加した。

### /etc/my.cnf

```diff
[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
user=mysql
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
port=3306

[mysqld_safe]
log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid

+!includedir /etc/my.cnf.d
```

### /etc/my.cnf.d/server.cnf

続いて、`/etc/my.cnf.d/server.cnf`に文字コードの設定を追記した。

```
sudo vim /etc/my.cnf.d/server.cnf
```

```diff
# this is read by the standalone daemon and embedded servers
[server]

# this is only for the mysqld standalone daemon
[mysqld]
+character-set-server=utf8 #added

[galera]

[embedded]

[mariadb]
```


MariaDBを再起動し、設定を反映させる。
```
sudo /etc/init.d/mysql restart
```


## utf-8

```
MariaDB [(none)]> show variables like 'char%';
+--------------------------+----------------------------+
| Variable_name            | Value                      |
+--------------------------+----------------------------+
| character_set_client     | utf8                       |
| character_set_connection | utf8                       |
| character_set_database   | utf8                       |
| character_set_filesystem | binary                     |
| character_set_results    | utf8                       |
| character_set_server     | utf8                       |
| character_set_system     | utf8                       |
| character_sets_dir       | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+
```

これで新規作成されるデータベース、テーブルの文字コードは、utf8になった。


## 参考

- [MariaDBの日本語の文字化けを解消する - Qiita](http://qiita.com/aiiro/items/1c160f5cb70c0850e8ce)
- [MySQL/MariaDB　文字コードの設定 - takafumi blog](http://takafumi-s.hatenablog.com/entry/2015/04/03/010720)



<div class="booklink-box"><div class="booklink-image"><a href=http://www.amazon.co.jp/Ruby-Rails-%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0-%E5%B1%B1%E7%94%B0-%E7%A5%A5%E5%AF%9B/dp/4774164100%3FSubscriptionId%3DAKIAI6MZOKQQCKBKJBLQ%26tag%3Dmeganii-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D4774164100><img src="https://images-na.ssl-images-amazon.com/images/I/51lycs3O%2BrL._SL160_.jpg" /></a></div><div class="booklink-info"><div class="booklink-name"><a href="http://www.amazon.co.jp/exec/obidos/asin/4774164100/meganii-22/">Ruby on Rails 4 アプリケーションプログラミング</a></div><div class=shoplinkrakuten><a href="http://hb.afl.rakuten.co.jp/hgc/g00q0725.il1o2897.g00q0725.il1o3b57/?pc=http%3A%2F%2Fbooks.rakuten.co.jp%2Frb%2F12707975%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Frms%2Fmsv%2FItem%3Fn%3D12707975%26surl%3Dbook">楽天で買う</a></div></div></div>


<div class="booklink-box"><div class="booklink-image"><a href=http://www.amazon.co.jp/MariaDB-MySQL%E5%85%A8%E6%A9%9F%E8%83%BD%E3%83%90%E3%82%A4%E3%83%96%E3%83%AB-%E9%88%B4%E6%9C%A8-%E5%95%93%E4%BF%AE/dp/4774170208%3FSubscriptionId%3DAKIAI6MZOKQQCKBKJBLQ%26tag%3Dmeganii-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D4774170208><img src="https://images-na.ssl-images-amazon.com/images/I/51pj9W0WxzL._SL160_.jpg" /></a></div><div class="booklink-info"><div class="booklink-name"><a href="http://www.amazon.co.jp/exec/obidos/asin/4774170208/meganii-22/">MariaDB&MySQL全機能バイブル</a></div><div class=shoplinkrakuten><a href="http://hb.afl.rakuten.co.jp/hgc/g00q0725.il1o2897.g00q0725.il1o3b57/?pc=http%3A%2F%2Fbooks.rakuten.co.jp%2Frb%2F13027235%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Frms%2Fmsv%2FItem%3Fn%3D13027235%26surl%3Dbook">楽天で買う</a></div></div></div>

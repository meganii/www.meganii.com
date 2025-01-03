---
title: "さくらVPSのCentOS6.4にh2oをAnsibleでビルド＆インストール"
date: 2016-07-18T21:44:52+09:00
lastmod: 2022-07-02T11:32:46+09:00
comments: true
category: ['Tech']
tags: ['h2o','http2']
slug: installing-h2o-with-ansible
img: "/images/ansible.png"
---

前回[http/2ベンチマークツール「h2load」をインストール \- SIS Lab](/blog/2016/07/17/install-h2load/)でhttp/2ベンチマークツールをインストールしたので、いよいよ`h2o`をインストールします。

さくらVPSで運用しているCentOSは、Ansible経由で整備しているので今回もAnsibleのタスクを作成して、まずはローカルの開発環境でテスト、そしてさくらVPSのCentOSに適用します。

Wordpressも、`h2o`で動かそうと思ったのですが、うまくリソースが取得できませんでした。下記の設定では、静的ジェネレータ`hugo`で作成するファイルだけ`h2o`で公開するときの設定です。

<!--more-->
{{% googleadsense %}}


## Ansibleでのh2oインストール方針

- ダウンロードしたソースコードは、`/tmp`に格納する
- 実行ファイルは`/usr/local/bin`に格納する
- h2oの設定ファイルは`/usr/local/etc/h2o/conf/`に格納する


## Ansibleのロール設定

```
group_vars
roles
  - h2o
    - tasks
    - templates
hosts
site.yml
```

### tasks/main.yml

```yaml
---
- name: install cmake
  yum: name=cmake state=present
  sudo: yes

- name: install package
  yum: pkg={{ item }} state=present enablerepo=epel
  with_items:
    - openssl
    - openssl-devel
  sudo: yes

- name: check h2o installed
  command: test -x /usr/local/bin/h2o
  register: h2o_present
  ignore_errors: yes
  changed_when: false

- name: download h2o
  get_url: url=https://github.com/h2o/h2o/archive/v{{h2o_version}}.tar.gz dest=/tmp/h2o.tgz
  when: h2o_present|failed

- name: expand h2o
  command: tar xzf h2o.tgz chdir=/tmp creates=/tmp/h2o-{{h2o_version}}
  when: h2o_present|failed

- name: cmake h2o
  command: cmake -DWITH_BUNDLED_SSL=on . chdir=/tmp/h2o-{{h2o_version}} creates=/tmp/h2o-{{h2o_version}}/Makefile
  when: h2o_present|failed

- name: make h2o
  command: make chdir=/tmp/h2o-{{h2o_version}} creates=/tmp/h2o-{{h2o_version}}/h2o
  when: h2o_present|failed

- name: install h2o
  command: make install chdir=/tmp/h2o-{{h2o_version}} creates=/usr/local/bin/h2o
  when: h2o_present|failed
  sudo: yes

- name: Ensures conf dir exists
  file: path=/usr/local/etc/h2o/conf/ state=directory

- name: Copy h2o configuration
  template: src=h2o.conf dest=/usr/local/etc/h2o/conf/h2o.conf

- name: Ensures log dir exists
  file: path=/var/log/h2o/ state=directory

- name: Create access log file
  file: path=/var/log/h2o/access.log state=touch

- name: Create error log file
  file: path=/var/log/h2o/error.log state=touch

- name: Create pid log file
  file: path=/usr/local/etc/h2o/h2o.pid state=touch mode=0777

- name: add iptables rule for http
  lineinfile: dest=/etc/sysconfig/iptables regexp="{{ httpd_port }}" line="-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport {{ httpd_port }} -j ACCEPT" insertbefore="^# add end" state=present

- name: add iptables rule for https
  lineinfile: dest=/etc/sysconfig/iptables regexp="{{ https_port }}" line="-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport {{ https_port }} -j ACCEPT" insertbefore="^# add end" state=present

- name: iptables restart
  command: /etc/init.d/iptables restart
```

### templates/h2o.conf

```yaml
access-log: /var/log/h2o/access.log
error-log:  /var/log/h2o/error.log
pid-file:   /usr/local/etc/h2o/h2o.pid

http2-reprioritize-blocking-assets: ON
gzip: ON
expires: 1 day

hosts:
  "meganii.com:80":
    listen:
      port: 80
    paths:
      "/":
        redirect: https://www.meganii.com/
  "meganii.com:443":
    listen:
      port: 443
      ssl:
        certificate-file: /etc/letsencrypt/live/meganii.com/fullchain.pem
        key-file:         /etc/letsencrypt/live/meganii.com/privkey.pem
        minimum-version: TLSv1
        cipher-suite: "AESGCM:HIGH:!3DES:!RSA:!aNULL:!eNULL:!MD5"
        cipher-preference: server
    paths:
      "/":
        file.dir: /home/web/www/meganii.com/
```

## h2oでWordpressを動かそうとしたときのメモ

`h2o`と`php-fpm`の設定を下記の通り設定すれば、h2oでWordpressが動くことは動きました。でも、以下の不具合が出てしまい、うまく表示ができない状態になってしまいました。

- 静的ファイル(css,js,img)の読込エラーで、レイアウトが崩れる
- サブディレクトリで複数のブログを管理しているが、その管理画面の表示がうまくできない

静的ファイルの読込エラーは、おそらくh2oとWordpressのファイル読取・実行権限が上手くいっていないことが考えられます。h2oはデフォルトでnobodyとして動くはずなので、`user: wordpress`としたのですが、ダメでした。どこを見なおせばよいのか。。

また、管理画面の表示がうまくいないのは、nginxでいうところのRewriteの部分が影響しているとかんがえられる。これは、h2oでどのように書くのがよいのか要調査。

```conf
# Rewrite multisite '.../wp-.*' and '.../*.php'.
if (!-e $request_filename) {
        rewrite ^/[_0-9a-zA-Z-]+(/wp-.*) $1 last;
        rewrite ^/[_0-9a-zA-Z-]+.*(/wp-admin/.*\.php)$ $1 last;
        rewrite ^/[_0-9a-zA-Z-]+(/.*\.php)$ $1 last;
}
```


### h2o.conf

```yaml
user: wordpress
file.custom-handler:
  extension: .php
  fastcgi.connect:
    port: /var/run/php-fpm/wordpress.sock
    type: unix
"domain.com:80":
  listen:
    port: 80
  paths:
    "/":
      redirect: https://domain.com/
"domain.com:443":
  listen:
    port: 443
    ssl:
      certificate-file: /etc/letsencrypt/live/domain.com/fullchain.pem
      key-file:         /etc/letsencrypt/live/domain.com/privkey.pem
      minimum-version: TLSv1
      cipher-suite: "AESGCM:HIGH:!3DES:!RSA:!aNULL:!eNULL:!MD5"
      cipher-preference: server
  paths:
    "/":
      file.dir: /srv/wordpress
      file.dirlisting: OFF
      redirect:
        url: /index.php/
        internal: YES
        status: 307
```

### /etc/php-fpm.d/wordpress.conf

```conf
[wordpress]
listen = /var/run/php-fpm/wordpress.sock
listen.owner = nginx
listen.group = nginx
listen.mode = 0660

user = wordpress
group = wordpress

pm = dynamic
pm.max_children = 10
pm.start_servers = 1
pm.min_spare_servers = 1
pm.max_spare_servers = 3
pm.max_requests = 500
chdir = /srv/wordpress/
php_admin_value[open_basedir] = /srv/wordpress/:/tmp
php_admin_value[error_log] = /var/log/php-fpm/www-error.log
```


### まとめ

静的ファイルをホストするには、configファイルもシンプルで楽、たぶんデフォルトでうまいことやってくれるのが`h2o`だと思う。Wordpressをなんとか動かせるようにして、サーバープッシュなどの機能を有効にしてベンチマークを取りたい。

ただ、やりたいことはただ単純にブログと簡単なアプリを公開したいだけなので、その目的を実現するためには、ネットで情報があるnginx + Wordpressの方が設定を探しやすいことは探しやすい。

まあ、何事も勉強ということで。

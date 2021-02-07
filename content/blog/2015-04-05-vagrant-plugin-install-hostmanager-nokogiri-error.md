---

title: "vagrant plugin install hostmanager実行時のnokogiriインストールエラーの解決"
date: 2015-04-05T19:23:00+09:00
lastmod: 2019-04-27T16:12:02+09:00
category: ['Tech']
tags: ['vagrant']
published: true
slug: vagrant-plugin-install-hostmanager-nokogiri-error
---

マルチドメインのテストがしたくて、vagrantでホスト名を指定するにはどうすればよいか調べた。`vagrant-hostmanager`というプラグインが使えそうなのでインストールしてみたところ、nokogiriインストールエラーが発生したので、解決方法をメモする。


{{% googleadsense %}}



## 前提
- Mac OS mavericks
- vagrant -v 1.6.4
- ruby 2.0.0p353 (2013-11-22 revision 43784) [x86_64-darwin12.5.0]



## vagrant-hostmanager

`vagrant up`するときに、`/etc/hosts` を書き換えるみたい。

[smdahlen/vagrant-hostmanager · GitHub](https://github.com/smdahlen/vagrant-hostmanager)



## インストール時のinstall nokogiriのエラー

```bash
vagrant plugin install vagrant-hostmanager
```

上記コマンドで簡単にインストールできるかとおもいきや、nokogiriのインストールでコケる。



```bash
$ vagrant plugin install vagrant-hostmanager --verbose
Installing the 'vagrant-hostmanager' plugin. This can take a few minutes...
Fetching source index from http://gems.hashicorp.com/
Fetching gem metadata from https://rubygems.org/.........
Fetching additional metadata from https://rubygems.org/..........
Resolving dependencies...
Using builder 3.2.2
Using gyoku 1.1.1
Using mini_portile 0.6.2

Gem::Installer::ExtensionBuildError: ERROR: Failed to build gem native extension.

    /Applications/Vagrant/embedded/bin/ruby extconf.rb
checking if the C compiler accepts ... no
checking if the C compiler accepts -Wno-error=unused-command-line-argument-hard-error-in-future... no
Building nokogiri using packaged libraries.
checking for gzdopen() in -lz... yes
checking for iconv using --with-opt-* flags... no
checking for iconv... no
-----
libiconv is missing.  Please locate mkmf.log to investigate how it is failing.
-----
*** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of necessary
libraries and/or headers.  Check the mkmf.log file for more details.  You may
need configuration options.

Provided configuration options:
	--with-opt-dir
	--with-opt-include
	--without-opt-include=${opt-dir}/include
	--with-opt-lib
	--without-opt-lib=${opt-dir}/lib
	--with-make-prog
	--without-make-prog
	--srcdir=.
	--curdir
	--ruby=/Applications/Vagrant/embedded/bin/ruby
	--help
	--clean
	--use-system-libraries
	--enable-static
	--disable-static
	--with-zlib-dir
	--without-zlib-dir
	--with-zlib-include
	--without-zlib-include=${zlib-dir}/include
	--with-zlib-lib
	--without-zlib-lib=${zlib-dir}/lib
	--enable-cross-build
	--disable-cross-build


Gem files will remain installed in /Users/meganii/.vagrant.d/gems/gems/nokogiri-1.6.6.2 for inspection.
Results logged to /Users/meganii/.vagrant.d/gems/gems/nokogiri-1.6.6.2/ext/nokogiri/gem_make.out
Bundler, the underlying system Vagrant uses to install plugins,
reported an error. The error is shown below. These errors are usually
caused by misconfigured plugin installations or transient network
issues. The error from Bundler is:

An error occurred while installing nokogiri (1.6.6.2), and Bundler cannot continue.
Make sure that `gem install nokogiri -v '1.6.6.2'` succeeds before bundling.
```

`libiconv is missing.  Please locate mkmf.log to investigate how it is failing.
`　あたりのエラーから、libiconvのインストールが出来てなさそうと当たりをつけて調べてみた。

以下を参考に、`brew install`, `brew link`の後、パラメタを指定して、`gem install nokogori`を試すと、成功した。

[Nokogiri on OSX - Qiita](http://qiita.com/maestro/items/4e287824e62bb8c2eda4)

```bash
brew install libxml2 libxslt libiconv
```

```bash
$ brew install libxml2 libxslt libiconv
Warning: libiconv-1.14 already installed
==> Downloading https://downloads.sf.net/project/machomebrew/Bottles/libxml2-2.9.2.mavericks.bottle.tar.gz
######################################################################## 100.0%
==> Pouring libxml2-2.9.2.mavericks.bottle.tar.gz
==> Caveats
This formula is keg-only, which means it was not symlinked into /usr/local.

Mac OS X already provides this software and installing another version in
parallel can cause all kinds of trouble.

Generally there are no consequences of this for you. If you build your
own software and it requires this formula, you'll need to add to your
build variables:

    LDFLAGS:  -L/usr/local/opt/libxml2/lib
    CPPFLAGS: -I/usr/local/opt/libxml2/include

==> Summary
🍺  /usr/local/Cellar/libxml2/2.9.2: 275 files, 11M
==> Downloading https://downloads.sf.net/project/machomebrew/Bottles/libxslt-1.1.28.mavericks.bottle.1.tar.gz
######################################################################## 100.0%
==> Pouring libxslt-1.1.28.mavericks.bottle.1.tar.gz
==> Caveats
To allow the nokogiri gem to link against this libxslt run:
  gem install nokogiri -- --with-xslt-dir=/usr/local/opt/libxslt

This formula is keg-only, which means it was not symlinked into /usr/local.

Mac OS X already provides this software and installing another version in
parallel can cause all kinds of trouble.

Generally there are no consequences of this for you. If you build your
own software and it requires this formula, you'll need to add to your
build variables:

    LDFLAGS:  -L/usr/local/opt/libxslt/lib
    CPPFLAGS: -I/usr/local/opt/libxslt/include


If you need Python to find bindings for this keg-only formula, run:
  echo /usr/local/opt/libxslt/lib/python2.7/site-packages >> /usr/local/lib/python2.7/site-packages/libxslt.pth
==> Summary
🍺  /usr/local/Cellar/libxslt/1.1.28: 145 files, 3.3M
```


```bash
brew link libxml2 --force
brew link libxslt --force
brew link libiconv --force
```

```bash
ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future NOKOGIRI_USE_SYSTEM_LIBRARIES=1 gem install nokogiri -- --use-system-libraries --with-iconv-dir="$(brew --prefix libiconv)" --with-xml2-config="$(brew --prefix libxml2)/bin/xml2-config" --with-xslt-config="$(brew --prefix libxslt)/bin/xslt-config"
```

```bash
NOKOGIRI_USE_SYSTEM_LIBRARIES=1 vagrant plugin install vagrant-hostmanager
```


## 別のプラグインを入れたら`vagrant`が壊れたので、結局vagrantも最新化した



以下のサイトから、最新版を入れなおした。
http://www.vagrantup.com/downloads



## 参考
- [Nokogiri on OSX - Qiita](http://qiita.com/maestro/items/4e287824e62bb8c2eda4)
- [【Ruby2.0.0 or 1.9.3 on Rails4.0】 Nokogiri 1.6.0 インストールできない？！ - TACATAKATACA BLOG](http://tacatakatca.hatenablog.com/entry/20131020/1382270726)





---
title: "Homebrewで過去バージョンのパッケージをインストールする方法"
date: 2019-12-03T21:27:01+09:00
lastmod: 2019-12-03T21:27:01+09:00
comments: true
category: ['Tech']
tags: ['Hugo']
published: true
slug: how-to-install-an-older-version-of-a-homebrew-package
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

Homebrewで入れたHugoを、「`brew upgrade hugo`」でv0.60.1にアップグレードしたところ、まともにビルドできなくなってしまった。これでは困ると思い、前のバージョンをインストールしようと思ったがやり方が分からなかったので、調べてみました。


<!--more-->
{{% googleadsense %}}

まず試してみたのは、「`brew install hugo@0.58.3`」とバージョン指定してインストールを試みましたがダメ・・・。

諦めてちゃんと調べてみると、下記の方法で過去バージョンをインストールできることがわかりました。


## 1. まずは`brew info hugo`で状況を確認する

```
$ brew info hugo
hugo: stable 0.60.1 (bottled), HEAD
Configurable static site generator
https://gohugo.io/
/usr/local/Cellar/hugo/0.58.3 (41 files, 57.8MB)
  Poured from bottle on 2019-12-03 at 21:20:38
/usr/local/Cellar/hugo/0.60.1 (41 files, 67.6MB) *
  Poured from bottle on 2019-12-03 at 21:14:47
From: https://github.com/Homebrew/homebrew-core/blob/master/Formula/hugo.rb
==> Dependencies
Build: go ✔
==> Options
--HEAD
	Install HEAD version
==> Caveats
Bash completion has been installed to:
  /usr/local/etc/bash_completion.d
==> Analytics
install: 20,043 (30 days), 64,846 (90 days), 207,747 (365 days)
install-on-request: 19,478 (30 days), 62,833 (90 days), 199,830 (365 days)
build-error: 0 (30 days)
```


## 2. 過去のバージョンが残っているのであれば、`brew switch`で切り替え可能

`brew install hugo`などで最新版のバージョンと一緒に過去バージョンを残している場合は、`brew switch hugo {version}`でバージョンの切り替えが可能です。

```
$ brew switch hugo 0.58.3
Cleaning /usr/local/Cellar/hugo/0.60.1
Cleaning /usr/local/Cellar/hugo/0.58.3
37 links created for /usr/local/Cellar/hugo/0.58.3
```

```
$ brew info hugo
hugo: stable 0.60.1 (bottled), HEAD
Configurable static site generator
https://gohugo.io/
/usr/local/Cellar/hugo/0.58.3 (41 files, 57.8MB) *
  Poured from bottle on 2019-12-03 at 21:20:38
/usr/local/Cellar/hugo/0.60.1 (41 files, 67.6MB)
  Poured from bottle on 2019-12-03 at 21:14:47
From: https://github.com/Homebrew/homebrew-core/blob/master/Formula/hugo.rb
==> Dependencies
Build: go ✔
==> Options
--HEAD
	Install HEAD version
==> Caveats
Bash completion has been installed to:
  /usr/local/etc/bash_completion.d
==> Analytics
install: 20,043 (30 days), 64,846 (90 days), 207,747 (365 days)
install-on-request: 19,478 (30 days), 62,833 (90 days), 199,830 (365 days)
build-error: 0 (30 days)
```

```
$ hugo version
Hugo Static Site Generator v0.58.3/extended darwin/amd64 BuildDate: unknown
```

これで、*マークがついているバージョンに切り替わりました。


## 3. 最新版のバージョンしかない場合はFormulaのファイルをgit checkoutで対象のバージョンに戻す

新規インストールした場合、もしくは`brew upgrade hugo`などで既存のパッケージを上書きしてしまった場合などはこの状況になる可能性が高いです。私もこのパターンでした。

まずは以下の通り、Formulaファイル格納場所へ移動し、対象のライブラリ(ここでは`hugo.rb`)の任意のバージョンのコミットハッシュ値を調べます。

```
$ cd /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core/Formula
$ git log hugo.rb
...
...
commit 1eb598bac6dbd3e9234e50d7ab208074f5fcaac8
Author: BrewTestBot <homebrew-test-bot@lists.sfconservancy.org>
Date:   Sat Sep 28 22:21:54 2019 +0000

    hugo: update 0.58.3 bottle.
...
...
```

```
git checkout 1eb598bac6dbd3e9234e50d7ab208074f5fcaac8 hugo.rb
```

この状態で、以下の通り再びHugoをインストールする。

```
$ brew install hugo
```


*怒られた場合は`brew unlink hugo`します。


```
$ hugo version
Hugo Static Site Generator v0.58.3/extended darwin/amd64 BuildDate: unknown
```

任意のバージョンに変更されていることを確認した後は、変更した`hugo.rb`を元に戻しておきます。

```
$ git reset --hard
```

## 4. 番外編

公式ドキュメントを確認すると、以下の通り対象バージョンのFormuraを指定して直接インストールできるようです。

{{% quote %}}
Installing directly from pull requests
You can browse pull requests and install through their direct link. For example, Python 3.7.0 from pull request Homebrew/homebrew-core#29490:

```
$ brew install https://raw.githubusercontent.com/sashkab/homebrew-core/176823eb82ee1b5ce55a91e5e1bf2f50aa674092/Formula/python.rb
```
{{% /quote %}}


1.https://github.com/Homebrew/homebrew-core/ から、`hugo.rb`を探す。2.そのHistoryを確認し、対象となるコミット時のrawを取得する。3.以下のコマンドを叩くことで、同じ結果が得られました。


```
brew install https://raw.githubusercontent.com/Homebrew/homebrew-core/1eb598bac6dbd3e9234e50d7ab208074f5fcaac8/Formula/hugo.rb
```


## 参考

- [How to install an older version of a Homebrew package](https://flaviocopes.com/homebrew-install-older-version/)
- [Tips and Tricks — Homebrew Documentation](https://docs.brew.sh/Tips-N'-Tricks)
- [\[2018/10\]homebrewで過去バージョンのパッケージをインストールする \- Qiita](https://qiita.com/nghryuki/items/7d65d8f55ea65b95310d)
- [Homebrewで旧バージョンのパッケージをインストールしたい \- Qiita](https://qiita.com/KyoheiG3/items/912bcc27462871487845)


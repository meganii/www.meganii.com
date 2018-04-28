---
title: "Fish Shell導入"
date: 2018-04-27T06:37:42+09:00
lastmod: 2018-04-27T06:37:42+09:00
comments: true
category: ['Tech']
tags: ['fish','shell']
published: false
slug: implementation-fish-shell
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_75/v1514031264/thumbnail_tech.png"
---

ゴールデンウィークということで、環境周りを整備します。

まずは、シェルの環境から！

<!--more-->
{{% googleadsense %}}

## Install Fish

```
$ brew install fish
$ fish -v
fish, version 2.7.1
```

## Change Shell

下記記事を読み、ログインシェルではなくiTerm2の設定で変更しました。

{{% quote %}}
「homebrewでインストールしたfishにchshしていいのか?」というhsbtの指摘はその通りだと思ったので、同じようにterminal.appで設定することにした。ただ、そうするとtmuxが起動時に$SHELLで起動してしまうので、Mac用のtmux.confに以下の設定を入れたんだけどださい。なんかいい方法ないですか?  
[fishを使いはじめた \| けんちゃんくんさんのWeb日記](https://diary.shu-cream.net/2018/02/20/hello-fish-shell.html)
{{% /quote %}}

{{% quote %}}
fish の紹介エントリを眺めていると chsh すると書いてあって、正気かと疑うんだけど、サーバーないし UNIX ライクなシステムで、何かトラブルシューティングしようとしたり、homebrew を purge せざるを得ないみたいな時に確実に死ぬのでやらない方がいいと思う。Terminal.app ならセッションの起動時に使うシェルを chsh とは別に設定できるので、そこで fish を指定するだけで十分なのでそうした。iTerm2 にも似たような設定があったと思う。  
[zsh から fish にした \- HsbtDiary\(2017\-04\-21\)](https://www.hsbt.org/diary/20170421.html)
{{% /quote %}}

## Install Fisherman

[fisherman/fisherman: The fish\-shell plugin manager\.](https://github.com/fisherman/fisherman)

```
curl -Lo ~/.config/fish/functions/fisher.fish --create-dirs https://git.io/fisher
```

## Install Theme

```
fisher omf/theme-agnoster
```

記号を使っているらしく、powerlineのフォントがいるみたい。

```
ghq get https://github.com/powerline/fonts.git
cd powerline/fonts
./install.sh
```


## peco + ghq

- 前提として、peco と ghqはインストール済

`~/.config/fish/config.fish`に下記functionを追加した。

```
function fish_user_key_bindings
  bind \cr 'peco_select_history (commandline -b)'
  bind \c] peco_select_ghq_repository
end
```

## Referece

- [モダンなshell、fish を導入する \- 木木木](http://source.hatenadiary.jp/entry/2018/02/23/102037)
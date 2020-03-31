---
title: "Fish Shellを導入してrbenv, pyenv, nodebrewのパスを通す"
date: 2018-04-27T06:37:42+09:00
lastmod: 2018-05-07T23:37:42+09:00
comments: true
category: ['Tech']
tags: ['fish','shell']
published: true
slug: implementation-fish-shell
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

ゴールデンウィークということで、環境周りを整備します。

まずは、シェルの環境から！ Fishを導入します。

<!--more-->
{{% googleadsense %}}

## Install Fish

```
$ brew install fish
$ fish -v
fish, version 2.7.1
```

## Change Shell

- ログインシェルの変更ではなくiTerm2の設定や、VSCodeの設定で変更した

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1525181982/Change_shell_b80mlo.png" w="1030" h="680" alt="Change shell in iTerm2" %}}

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

- テーマ`agnoster`は、特殊な記号を使っているらしく、powerlineのフォントが必要
- 下記コマンドを実行してフォントをインストール

```
ghq get https://github.com/powerline/fonts.git
cd powerline/fonts
./install.sh
```

- インストールしたフォントをiTerm2の設定に反映

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1525181985/Change_font_i8vrez.png" w="1030" h="562" alt="Change font in iTerm2" %}}

## rbenvのPATH

```
fisher rbenv
```

上記コマンドを実行すると、`~./.config/fish/conf.d/rbenv.fish`が生成され、その中に設定が記述される。


~/.config/fish/conf.d/rbenv.fish

```bash
if not command -s rbenv > /dev/null
    echo "rbenv: command not found. See https://github.com/rbenv/rbenv"
    exit 1
end

set -l rbenv_root ''
if test -z "$RBENV_ROOT"
    set rbenv_root "$HOME/.rbenv"
    set -x RBENV_ROOT "$HOME/.rbenv"
else
    set rbenv_root "$RBENV_ROOT"
end

set -x PATH $rbenv_root/shims $PATH
set -x RBENV_SHELL fish
if test ! -d "$rbenv_root/shims"; or test ! -d "$rbenv_root/versions"
    command mkdir -p $rbenv_root/{shims,versions}
end
```

## pyenv

```
fisher pyenv
```

上記コマンドを実行すると、`~./.config/fish/conf.d/pyenv.fish`が生成され、その中に設定が記述される。


```bash
if not command -s pyenv > /dev/null
    echo "Install <github.com/yyuu/pyenv> to use 'pyenv'."
    exit 1
end

set -l pyenv_root ""

if test -z "$PYENV_ROOT"
    set pyenv_root ~/.pyenv
    set -x PYENV_ROOT "$pyenv_root"
else
    set pyenv_root "$PYENV_ROOT"
end

if status --is-login
    set -x PATH "$pyenv_root/shims" $PATH
    set -x PYENV_SHELL fish
end
command mkdir -p "$pyenv_root/"{shims,versions}
```


## nodebrew

```bash
set -x NODEBREW_ROOT /usr/local/var/nodebrew
set -x PATH /usr/local/var/nodebrew/current/bin $PATH
```

## peco + ghq

- 前提として、peco と ghqはインストール済
- `~/.config/fish/config.fish`に下記functionを追加

```bash
function fish_user_key_bindings
  bind \cr 'peco_select_history (commandline -b)'
  bind \c] peco_select_ghq_repository
end
```


## VS Codeのターミナルの設定

- settingsの下記項目を上書きすることで対応

```json
{
    "terminal.integrated.shell.osx": "/usr/local/bin/fish",
    "terminal.integrated.fontFamily": "Source Code Pro for Powerline",
}
```

- VS Code上でもfishで立ち上がってくる

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1525181585/terminal_in_VSCode_ccari2.png" w="1095" h="301" %}}


## Referece

- [fish shellチュートリアル](http://fish.rubikitch.com/tutorial/)
- [モダンなshell、fish を導入する \- 木木木](http://source.hatenadiary.jp/entry/2018/02/23/102037)
- [fish shell を使いたい人生だった ｜ Developers\.IO](https://dev.classmethod.jp/etc/fish-shell-life/)
- [ghq, peco, hubで快適Gitライフを手に入れよう！ \- Qiita](https://qiita.com/itkrt2y/items/0671d1f48e66f21241e2)
- [詳解 fishでモダンなシェル環境の構築\(fish,tmux,powerline,peco,z,ghq,dracula\) \- Qiita](https://qiita.com/susieyy/items/ac2133e249f252dc9a34)
- [fishを使いはじめた \| けんちゃんくんさんのWeb日記](https://diary.shu-cream.net/2018/02/20/hello-fish-shell.html)
- [Configuration - Integrated Terminal in Visual Studio Code](https://code.visualstudio.com/docs/editor/integrated-terminal#_configuration)
- [Terminal Display Settings - Integrated Terminal in Visual Studio Code](https://code.visualstudio.com/docs/editor/integrated-terminal#_terminal-display-settings)


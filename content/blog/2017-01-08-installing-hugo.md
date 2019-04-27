---
title: "静的サイトジェネレータ「Hugo」インストール"
date: 2017-01-08T20:53:29+09:00
lastmod: 2018-01-27T07:05:29+09:00
comments: true
category: ['Tech']
tags: ['Hugo']
published: true
slug: installing-hugo
img: /images/hugo_s.png
---

静的ジェネレータ「Hugo」のインストール方法を紹介します。

公式のチュートリアルは、こちらです。[Install Hugo
](https://gohugo.io/getting-started/installing/)

<!--more-->
{{% googleadsense %}}

# Hugoインストール

## Macでのインストール方法

パッケージ管理にHomebrewを使われている方は、下記コマンドを叩けばインストールされます。

```
$ brew install hugo
```

念のため、`brew install hugo`の前に, `brew update`で更新しておくと良いです。

## Windowsでのインストール方法

パッケージ管理に[Chocolatey](https://chocolatey.org/)を使われている方は、下記コマンドを叩けばインストールできます。

```
$ choco install hugo -confirm
```

## バイナリ(実行ファイル)をダウンロードしてインストール

MacでHomebrewや、Windowsで[Chocolatey](https://chocolatey.org/)を利用していない場合でも、以下の通りバイナリファイル(実行ファイル)をダウンロードして、適切なパスを通すことで利用することができます。

下記URLに従い、利用するWindows環境に合わせて32bit or 64bitをどちらをダウンロードします。(2018/01/27時点の最新バージョンは0.34)

[Releases · gohugoio/hugo](https://github.com/gohugoio/hugo/releases)

### Windowsの場合

- [hugo_0.34_Windows-32bit.zip](https://github.com/gohugoio/hugo/releases/download/v0.34/hugo_0.34_Windows-32bit.zip)
- [hugo_0.34_Windows-64bit.zip](https://github.com/gohugoio/hugo/releases/download/v0.34/hugo_0.34_Windows-64bit.zip)

### Macの場合

- [hugo_0.34_macOS-32bit.tar.gz](https://github.com/gohugoio/hugo/releases/download/v0.34/hugo_0.34_macOS-32bit.tar.gz)
- [hugo_0.34_macOS-64bit.tar.gz](https://github.com/gohugoio/hugo/releases/download/v0.34/hugo_0.34_macOS-64bit.tar.gz)


# Hugoでのサイト構築

まずは、下記コマンドを実行すると、Hugoを利用する上で必要なフォルダ構成が作成されます。

```powershell
$ hugo new site {site name} #site nameに指定した名前のフォルダが作成される
```

```bash
$ hugo new site myblog.com
Congratulations! Your new Hugo site is created in /Users/meganii/tmp/myblog.com.

Just a few more steps and you're ready to go:

1. Download a theme into the same-named folder.
   Choose a theme from https://themes.gohugo.io/, or
   create your own with the "hugo new theme <THEMENAME>" command.
2. Perhaps you want to add some content. You can add single files
   with "hugo new <SECTIONNAME>/<FILENAME>.<FORMAT>".
3. Start the built-in live server via "hugo server".

Visit https://gohugo.io/ for quickstart guide and full documentation.
```

```
$ tree
.
├── archetypes
│   └── default.md
├── config.toml
├── content
├── data
├── layouts
├── static
└── themes
```

`hugo server`とコマンドを実行すれば、直下の`config.toml`を読み込んでサイトのプレビューができるのですが、この最低限のフォルダ構成ではなにも表示されないので、まずはテーマをインストールします。


### テーマのインストール

Hugoのテーマ

```
$ cd themes
$ git clone https://github.com/dim0627/hugo_theme_robust.git
```

## プレビュー

ダウンロードしたthemeを利用するには、以下の通り`--theme`オプションで、インストールしたテーマを指定して`hugo server`を実行します。

先ほどテーマをインストールした時に、`themes`フォルダに移動しているので、サイト直下に戻っています。

```
cd .. 
hugo server --theme=hugo_theme_robust
```

表示されました！！

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1517006572/hugo_psqrqq.png" w="589" h="514" %}}

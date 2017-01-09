---
title: "静的サイトジェネレータ「Hugo」インストール"
date: 2017-01-08T20:53:29+09:00
lastmod: 2017-01-08T20:53:29+09:00
comments: true
category: ['Tech']
tags: ['Hugo']
published: true
slug: installing-hugo
img: /images/hugo_s.png
---

静的ジェネレータ「Hugo」のインストール方法です。
MacでHomebrewを使っている方は、`brew update && brew install hugo`とすれば、すぐにインストールできます。

<!--more-->
{{% googleadsense %}}


## Macでのインストール方法

[Hugo \- Installing on a Mac](https://gohugo.io/tutorials/installing-on-mac/)

### brewのインストール

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

```
$ brew update
$ brew install hugo
```

## Windowsでのインストール方法

下記URLに従い、利用するWindows環境に合わせて32bit or 64bitをどちらをダウンロードします。
[Hugo \- Installing on Windows](https://gohugo.io/tutorials/installing-on-windows/)

https://github.com/spf13/hugo/releases
- https://github.com/spf13/hugo/releases/download/v0.18.1/hugo_0.18.1_Windows-32bit.zip  
- https://github.com/spf13/hugo/releases/download/v0.18.1/hugo_0.18.1_Windows-64bit.zip  

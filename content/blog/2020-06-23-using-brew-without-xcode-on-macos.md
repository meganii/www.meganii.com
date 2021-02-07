---
title: "macOSでXcodeを利用せずにHomebrewを利用する方法"
date: 2020-06-23T21:37:07+09:00
lastmod: 2020-07-16T21:38:27+09:00
published: true
category: ["Tech"]
tags: ["macOS", "Xcode"]
comment: true
slug: "using-brew-without-xcode-on-macos"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto/v1594902885/tech_ben4sq.png"
---

ふと気づくと`Xcode`関連ファイルがやたら容量食っていたため、一度アンインストールした後に再インストールを試してみました。
`Xcode`をアンインストールして`App Store`から`Xcode`をインストールする際、次の問題が発生しました。

- `macOS mojave`のままでは最新版Xcodeをインストールできない（OSアップグレードが必要）
- `Homebrew`が利用できない（Xcodeに内包しているツールに依存している）


`macOS Catalina`にはまだバージョンを上げたくないですが、`Homebrew`は引き続き使いたいので何か方法を探してみたところ、最終的には`Command Line　Tools`を入れることで解決しました。


{{% toc %}}

<!--more-->
{{% googleadsense %}}

## 前提

- `macOS mojave`利用

```
brew --version
Homebrew 2.4.0-95-ga89b565
Homebrew/homebrew-core (git revision 94af7; last commit 2020-06-22)
Homebrew/homebrew-cask (git revision d4b39; last commit 2020-06-22)
```


## インストール方法

### 1.Appleのサイトから`Command Line Tools`をダウンロード&インストール

以下のサイトから、過去バージョンの`Xcode`をダウンロードできます。もしも、`macOS`のバージョンを上げずに`Xcode`を入れ直したいという場合は、ここから対応する`Xcode`をダウンロードしてインストールします。

[More Downloads for Apple Developers](https://developer.apple.com/download/more/)

今回`Xcode`は不要なため、`brew`が依存するツールだけをインストールします。

`macOS mojave`は`10.14`ですので、その中でも最新版を選んでダウンロード&インストールします。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1593002275/nl4n15hdxexfslqemk5k.png" w="1059" h="592" %}}



### 2.（念の為）Homebrewを再インストール

[macOS（またはLinux）用パッケージマネージャー — Homebrew](https://brew.sh/index_ja)

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```


## 確認

`Xcode`をアンインストールして容量を節約しつつ、`Homebrew`が利用できるようになりました。`Xcode`を無くしたことで`Xamarin`や`Flutter`の`iOS`ビルドがどうなるかはまだ未検証ですが、しばらくこの状態で運用してみます。

```
xcode-select --version
xcode-select version 2354.
```

```
brew --version
Homebrew 2.4.0-95-ga89b565
Homebrew/homebrew-core (git revision 94af7; last commit 2020-06-22)
Homebrew/homebrew-cask (git revision d4b39; last commit 2020-06-22)
```

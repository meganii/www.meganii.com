---
title: "音声認識エンジンJuliusをインストールする"
date: 2016-12-21 21:52:28 +0900
lastmod: 2016-12-21 12:52:28 +0000
comments: true
category:
- Tech
tags:
- julius
slug: install-julius
img: https://images-fe.ssl-images-amazon.com/images/I/510B8-IOdUL._SL160_.jpg

---
音声認識エンジンを調査したときのメモです。

## 音声認識エンジン

* Apple - Siri
* Google -
* Microsoft - Bing API
* Julius

<!--more-->
{{% googleadsense %}}

## Juliusとは

Juliusは、フリーの高性能音声認識ソフトウェアです。

[http://julius.osdn.jp/index.php?q=whatis.html](http://julius.osdn.jp/index.php?q=whatis.html "http://julius.osdn.jp/index.php?q=whatis.html")

## Juliusのインストール

Juliusで音声から文字起こしする(ディクテーション)をする場合は、最小限のモデル（不特定話者音響モデル + 汎用言語モデル）が必要です。

以下の手順でJulius本体と、モデルをインストールします。

1. 下記URLから最新版のJulius(4.4.2)をダウンロード

[Releases · julius-speech/julius](https://github.com/julius-speech/julius/releases)
https://github.com/julius-speech/julius/archive/v4.4.2.tar.gz

1. ダウンロードしたファイルを解凍し、`make install`

   \$ cd julius-4.4.2
   \$ ./configure
   \$ make
   \$ make install
2. インストールを確認

問題なくインストールされていたら、以下のコマンドを実行すればJuliusのバージョンが表示される。

    $ julius -version
    JuliusLib rev.4.4.2 (fast)
    
    Engine specification:
     -  Base setup   : fast
     -  Supported LM : DFA, N-gram, Word
     -  Extension    :
     -  Compiled by  : gcc -g -O2
    
    Library configuration: version 4.4.2
     - Audio input
        primary A/D-in driver   : coreaudio (MacOSX CoreAudio)
        available drivers       :
        wavefile formats        : RAW and WAV only
        max. length of an input : 320000 samples, 150 words
     - Language Model
        class N-gram support    : yes
        MBR weight support      : yes
        word id unit            : short (2 bytes)
     - Acoustic Model
        multi-path treatment    : autodetect
     - External library
        file decompression by   : zlib library
     - Process hangling
        fork on adinnet input   : no
     - built-in SIMD instruction set for DNN
        SSE AVX FMA
        FMA is available maximum on this cpu, use it
    
    Try `-help' for more information.

1. `Git Large File Storage`のインストール

次の手順においてダウンロードするリポジトリが2GBぐらいあります。そのため、git-lfs(Git Large File Storage)をインストールしないと途中でgit cloneが失敗する(と記載があった)ので、まずは以下のコマンドを実行して`Git Large File Storage`をインストールします。

    $ brew install git-lfs

1. ディクテーションキットのダウンロード

[julius-speech/dictation-kit: Japanese dictation kit using Julius](https://github.com/julius-speech/dictation-kit)

## 参考

[Juliusによる音声認識 | Raspberry Pi 研究室 | Feijoa.jp](http://feijoa.jp/laboratory/raspberrypi/julius/)

{{% amazon 4627847114 %}}
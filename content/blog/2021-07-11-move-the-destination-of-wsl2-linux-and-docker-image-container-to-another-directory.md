---
title: "WSL2のLinuxおよびDockerイメージ格納先を任意のディレクトリに移動する"
date: 2021-07-11T14:12:20+09:00
lastmod: 2021-07-11T18:09:26+09:00
published: true
category: ["Tech"]
tags: ["Windows", "WSL2","Docker", "Docker Desktop"]
comment: true
slug: "move-the-destination-of-wsl2-linux-and-docker-image-container-to-another-directory"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_1024/v1594902885/tech_ben4sq.png"
---

`Windows Store`からインストールできる`WSL2`の`Ubuntu`および、`Docker Desktop WSL2 Backend`のイメージ格納先がデフォルトではCドライブに格納される。
Cドライブに必要最低限なSSD、Dドライブに大容量HDDを割り当てているため、Cドライブが枯渇するためDドライブに移動させたい。

ここでは、`WSL2`のUbuntuと、`Docker Desktop WSL2 Backend`のインストールフォルダ変更についての調査・確認結果を記す。


{{% toc %}}

<!--more-->
{{% googleadsense %}}


## デフォルトのインストール先

| ディストリビューション | 概要                                       | 実体(デフォルト)                                          | 
| ---------------------- | ------------------------------------------ | --------------------------------------------------------- | 
| Ubuntu                 | Microsoft StoreからインストールできるLinux | %LocalAppData%\Packages\$packageName\LocalState\ext4.vhdx | 
| docker-desktop         | Dockerを動かすためのエンジン               | %LocalAppData%\Docker\wsl\data\ext4.vhdx                  | 
| docker-desktop-data    | イメージやコンテナを格納する               | %LocalAppData%\Docker\wsl\distro\ext4.vhdx                | 


何でもかんでも、`%LocalAppData%`に溜め込むWindowsの流儀に未だに慣れない。
これらの`vnhd`ファイルを新しく作成した`D:\wsl`ディレクトリに移動する。


## 手順

### 1. Docker Desktop for Windowsの停止

タスクトレイに常駐している`Docker Desktop`を停止する。


### 2. WSLの停止

`wsl -l -v`で現在の`WSL`の動作状況を確認でき、`wsl --sutdown`で`WSL`を停止する。

```
wsl --shutdown
wsl -l -v
```

{{% img src="https://i.gyazo.com/f766c432b42cfb79568e05ab2678a35f.png" w="564" h="256" %}}


### 3. ディストリビューションのExport

`wsl --export <Distro> <FileName>`で、ディストリビューションをtarファイルにエクスポートする。

ここでは、`Ubuntu`と、`Docker Desktop`のディストリビューションを一緒にエクスポートする。

```
mkdir D:\wsl
wsl --export Ubuntu D:\wsl\Ubuntu20.04.tar
wsl --export docker-desktop  D:\wsl\docker-desktop.tar
wsl --export docker-desktop-data  D:\wsl\docker-desktop-data.tar
```


### 4. ディストリビューションの解除（削除）

`wsl --unregister <Distro>`で、指定したディストリビューションの登録を解除する。

このコマンドを実行すると、既存の`ext4.vhdx`が削除されるため、注意が必要である。

```
wsl --unregister Ubuntu
wsl --unregister docker-desktop
wsl --unregister docker-desktop-data
```

### 5. ディストリビューションのインポート

`wsl --import <Distro> <InstallLocation> <FileName>`で指定したtarファイルを新しいディストリビューションとしてインポートする。


```
wsl --import Ubuntu20.04 D:\wsl\Ubuntu20.04 D:\wsl\Ubuntu20.04.tar
wsl --import docker-desktop D:\wsl\docker-desktop docker-desktop.tar
wsl --import docker-desktop-data D:\wsl\docker-desktop-data docker-desktop-data.tar
```

### 6. Docker Desktopを起動させる

`Docker Desktop`を起動して、動作確認する。


## 参考URL

- Microsoft公式ドキュメント
    - [Import any Linux distribution to use with WSL \| Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/use-custom-distro)
    - [WSL コマンド ライン リファレンス \| Microsoft Docs](https://docs.microsoft.com/ja-jp/windows/wsl/reference)
- [Move WSL \(Bash on Windows\) root filesystem to another hard drive? \- Stack Overflow](https://stackoverflow.com/questions/38779801/move-wsl-bash-on-windows-root-filesystem-to-another-hard-drive/51767786#51767786)
- [WSL上のLinuxをCドライブから移動させる](https://www.aise.ics.saitama-u.ac.jp/~gotoh/HowToReplaceWSL.html)
- [標準機能だけでWSLを好きな場所にインストールする \- Qiita](https://qiita.com/yamada6667/items/9e73193b0167cba2351d)
- [WSL2 Dockerのイメージ・コンテナの格納先を変更したい \(WSL2のvhdxファイルを移動させたい\) \- Qiita](https://qiita.com/neko_the_shadow/items/ae87b2480345152bc3cb)
- [Windows 10 WSLのイメージ保管先変更  \- Zenn](https://zenn.dev/trusted_dream/articles/b7547b732c1d62)


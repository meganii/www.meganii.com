---
title: "WSL2のデフォルトユーザを指定する"
date: 2021-07-25T20:04:09+09:00
lastmod: 2021-07-25T20:04:09+09:00
published: true
category: ["Tech"]
tags: ["Windows","WSL2"]
comment: true
slug: "how-to-set-default-user-of-distribution-installed-via-wsl"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_1024/v1594902885/tech_ben4sq.png"
---

以前、[WSL2のLinuxおよびDockerイメージ格納先を任意のディレクトリに移動する](https://www.meganii.com/blog/2021/07/11/move-the-destination-of-wsl2-linux-and-docker-image-container-to-another-directory/)で、WSL2のLinuxディストリビューションをデフォルトのCドライブからDドライブに移動した。

いつものように、Windows Terminal上のUbuntu 20.04から`code .`と`VS Code`を起動し、作業をしていると以下のようなエラーが発生した。
原因と対処方法について調査したときの結果を残しておく。

```shell
Failed to save 'example.file': Unable to write file (No Permissions (FileSystemError): Error: EACCS: permission denied, open 'path/to/example.file')

※上記のexample.fileは任意のファイル名
```

{{% toc %}}

<!--more-->
{{% googleadsense %}}



## 原因

WSL2から起動したVSCodeでファイルを新規作成した際、ファイル所有者がrootになっている。
そのファイルを別のユーザで更新や削除しようとして権限エラーが発生している。


## 対処方法

デフォルトでインストールしたWSL2のLinuxディストリビューションであれば、次のドキュメント「[ディストリビューションの既定のユーザーを変更する](https://docs.microsoft.com/ja-jp/windows/wsl/wsl-config#change-the-default-user-for-a-distribution)」のとおり、規定ユーザの変更で問題なさそうだ。

しかし、デフォルトのインストール場所から変更したLinuxディストリビューションは、以下のコマンドでは動作しなかった。
Ubuntu20.04のPATHが通っていない。

```ps1
> Ubuntu20.04 config --default-user meganii
Ubuntu20.04 : The term 'Ubuntu20.04' is not recognized as the name of a cmdlet, function, script file, or operable
program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
At line:1 char:1
+ Ubuntu20.04 config --default-user meganii
+ ~~~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (Ubuntu20.04:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
```

では、どのように対処するかというと、Linuxディストリビューションの`/etc/wsl.conf`に、以下の内容を追加する。

```
[user]
default=meganii
```

念のため`wsl --shutdown`で`wsl2`を再起動すると、VSCodeでの権限エラーは発生しなくなった。


## 参考URL

- [Impossible to set default user of distribution installed via wsl \-\-import on 1903 · Issue \#3974 · microsoft/WSL](https://github.com/microsoft/WSL/issues/3974#issuecomment-639517636)
- [VS Code on WSL2でつまづいたこと \| mktia's note](https://blog.mktia.com/usage-of-vscode-on-wsl2/)
- [WSL 2 のデフォルトユーザー指定 \(2つめのインスタンス用\) \| ヘタレな趣味の道](https://hetarena.com/archives/2856)
- [Linux ディストリビューションの管理 \| Microsoft Docs](https://docs.microsoft.com/ja-jp/windows/wsl/wsl-config#change-the-default-user-for-a-distribution)










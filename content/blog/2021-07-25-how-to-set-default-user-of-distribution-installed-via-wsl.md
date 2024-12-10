---
title: "WSL2のデフォルトユーザを指定する"
date: 2021-07-25T20:04:09+09:00
lastmod: 2022-07-02T11:32:46+09:00
category: ["Tech"]
tags: ["Windows","WSL2"]
comment: true
slug: "how-to-set-default-user-of-distribution-installed-via-wsl"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_1024/v1594902885/tech_ben4sq.png"
---

以前、[WSL2のLinuxおよびDockerイメージ格納先を任意のディレクトリに移動する](/blog/2021/07/11/move-the-destination-of-wsl2-linux-and-docker-image-container-to-another-directory/)で、WSL2のLinuxディストリビューションをデフォルトのCドライブからDドライブに移動した。
その後、`VSCode`の利用時に発生したエラーについて、原因と対処方法について調査したときの結果を残しておく。

{{% toc %}}

<!--more-->
{{% googleadsense %}}


## 発生事象

### ファイル作成・削除時のエラー

いつものように、Windows Terminal上のUbuntu 20.04から`code .`と`VS Code`を起動し、作業をしていると以下のようなエラーが発生した。

```shell
Failed to save 'example.file': Unable to write file (No Permissions (FileSystemError): Error: EACCS: permission denied, open 'path/to/example.file')

※上記のexample.fileは任意のファイル名
```

### VS Code上でgit commit, git push できない

VS CodeのGUIから操作してもエラーになり、VSCodeのターミナルから`git commit`しても次のエラーが発生する。

```shell
error: insufficient permission for adding an object to repository database .git/objects
error: insufficient permission for adding an object to repository database .git/objects
error: Error building trees
```


## 原因

WSL2から起動したVSCodeでファイルを新規作成した際、ファイル所有者がrootになっている。
そのファイルを別のユーザで更新や削除しようとして権限エラーが発生している。


たとえば、`.git/objects`のエラーは、次のとおり一部オブジェクトの所有者およびグループがrootになっていた。

```bash
meganii@OMEN25L:~/ghq/github.com/meganii/www.meganii.com/.git/objects$ ls -al
total 204
drwxr-xr-x 51 meganii meganii 4096 Jul 25 20:30 .
drwxr-xr-x  9 meganii meganii 4096 Jul 25 20:32 ..
drwxr-xr-x  2 meganii meganii 4096 Jul  4 21:30 05
drwxr-xr-x  2 root    root    4096 Jul 11 16:39 07
drwxr-xr-x  2 root    root    4096 Jul 24 19:40 08
drwxr-xr-x  2 root    root    4096 Jul 11 18:08 09
drwxr-xr-x  2 root    root    4096 Jul 11 18:08 0a
drwxr-xr-x  2 meganii meganii 4096 Jul 11 18:09 0b
drwxr-xr-x  2 root    root    4096 Jul 11 18:08 0e
drwxr-xr-x  2 root    root    4096 Jul 24 19:41 14
drwxr-xr-x  2 meganii meganii 4096 Jul 11 18:09 1d
drwxr-xr-x  2 root    root    4096 Jul 24 19:37 21
```


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

`.git/objects`については、以下のコマンドで所有者およびグループを元に戻した。

```shell
cd .git
sudo chown meganii:meganii objects/*
```

念のため`wsl --shutdown`で`wsl2`を再起動すると、VSCodeでの権限エラーは発生しなくなった。


## 参考URL

- [Impossible to set default user of distribution installed via wsl \-\-import on 1903 · Issue \#3974 · microsoft/WSL](https://github.com/microsoft/WSL/issues/3974#issuecomment-639517636)
- [Linux ディストリビューションの管理 \| Microsoft Docs](https://docs.microsoft.com/ja-jp/windows/wsl/wsl-config#change-the-default-user-for-a-distribution)
- [VS Code on WSL2でつまづいたこと \| mktia's note](https://blog.mktia.com/usage-of-vscode-on-wsl2/)
- [WSL 2 のデフォルトユーザー指定 \(2つめのインスタンス用\) \| ヘタレな趣味の道](https://hetarena.com/archives/2856)










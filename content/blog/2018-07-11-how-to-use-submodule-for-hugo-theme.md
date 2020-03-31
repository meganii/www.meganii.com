---
title: "Hugoのテーマでsubmoduleを使う方法"
date: 2018-07-11T21:25:48+09:00
lastmod: 2018-07-11T21:25:48+09:00
comments: true
category: ['Tech']
tags: ['Hugo','Design', 'git']
published: true
slug: how-to-use-submodule-for-hugo-theme
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514036568/thumbnail_hugo_icon.png"
---

HugoのThemeプロジェクトを`git submodule`で扱う方法について調べました。

<!--more-->
{{% googleadsense %}}

### Cloneしてきたリポジトリがsubmoduleを使用している場合

- submoduleを使ったリポジトリをcloneした時、そのままの状態では、submoduleのディレクトリは空
- `git submodule init`で初期化した後、`git submodule update`して初めてダウンロードされる

- [submodule の基礎 - Qiita](https://qiita.com/sotarok/items/0d525e568a6088f6f6bbGit)

## Submoduleを導入するメリット

- 親プロジェクトから全てのsubmoduleのバージョンを一括管理できる
- submoduleはあくまで外部モジュールなので、親プロジェクトと別の開発ができる
- コミットレベルで外部モジュール（submodule）のバージョンと紐づけるので、親プロジェクトのバージョンを変更した場合も安心


## 作業ログ

- 最初、submoduleの追加の仕方がわからなかった
    - `git submodule add XXX xxxx` でO.K.
        - 以下2つの差分が発生する
            - .gitsubmodule
            - XXXX
- 更新の仕方が不明
- 更新手順
    - テーマの変更をCommit、Push
    - 親リポジトリでsubmoduleの向き先を変更してCommit、Push
    - ポイントは「SubmoduleのCommitは親リポジトリにおける参照の変更である」ということ


## NetlifyでSubmoduleを用いる方法

- プライベートリポジトリを取得できなかった。何かやり方があるものか
    - submoduleをPublicにすることで取得することはできた
- [Working with submodules | The GitHub Blog](https://blog.github.com/2016-02-01-working-with-submodules/)


## 参考

- [\[Git\] git submodule は癖がすごいとの噂だったが素直につきあっていけそうという話 \| deadwood](https://www.d-wood.com/blog/2014/05/22_6257.html)
- [Gitのサブモジュール機能を使ってプロジェクトを管理してみよう \| vdeep](http://vdeep.net/git-submodule)
- [Git submodule の基礎 \- Qiita](https://qiita.com/sotarok/items/0d525e568a6088f6f6bb)
- [Git submoduleの押さえておきたい理解ポイントのまとめ \- Qiita](https://qiita.com/kinpira/items/3309eb2e5a9a422199e9)


{{% amazon 4863542178 %}}
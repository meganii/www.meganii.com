---
title: "git-filter-repoを利用してGitリポジトリを最適化する"
date: 2023-07-24T15:54:00+09:00
lastmod: 2023-07-24T15:54:00+09:00
published: true
category: ["Tech"]
tags: ["git"]
comment: true
slug: "optimize-git-repo-with-git-filter-repo"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto/v1594902885/tech_ben4sq.png"
---


{{% toc %}}

<!--more-->
{{% googleadsense %}}


## 背景

普段ブログのコンテンツ管理に利用しているwww.meganii.comのリポジトリの容量（`.git/objects`）がなぜか数GBになっている。普段、ビルドするときはシャロークローンを使うため気にならないが、すべての履歴を取得する場合、数分から数十分要する。ほぼテキストのため、不要な履歴を削って軽量化・最適化したい。


## 結論

- `git filter branch`ではなく、git公式サイトでも推奨されている[git-filter-repo](https://github.com/newren/git-filter-repo)を利用すべき。
- `git-filter-repo`のanaliyze結果から、過去に`/public`やリポジトリ直下に配置してしまっていた生成物（HTML）がかさ増しの原因であった。
- これを機会に、hugoのthemeフォルダも別リポジトリに分離し、過去履歴に残っていたメールアドレスも最新のものに置き換えた。
- 不要な履歴を削除し整理した結果、リポジトリの容量（`.git/objects`）が1.9GBから14MBに減少した。


## 作業メモ／ポイント

### git filter-branchではなくサードパーティのgit-filter-repoを利用する

「Please use an alternative history filtering tool such as git filter-repo.」と[git公式ドキュメント（2.41.0）](https://git-scm.com/docs/git-filter-branch/2.41.0)にも、[git-filter-repo](https://github.com/newren/git-filter-repo)のような代替ツールを利用するように記載がある。[git でリポジトリを整理して容量削減するときに嵌った話 \| おいもログ](https://blog.oimo.io/2021/07/19/git-filter-repo/)も参照した上で、素直に[git-filter-repo](https://github.com/newren/git-filter-repo)を利用した。

> WARNING
> git filter-branch has a plethora of pitfalls that can produce non-obvious manglings of the intended history rewrite (and can leave you with little time to investigate such problems since it has such abysmal performance). These safety and performance issues cannot be backward compatibly fixed and as such, its use is not recommended. **Please use an alternative history filtering tool such as git filter-repo.** If you still need to use git filter-branch, please carefully read SAFETY (and PERFORMANCE) to learn about the land mines of filter-branch, and then vigilantly avoid as many of the hazards listed there as reasonably possible.  
> [Git \- git\-filter\-branch Documentation](https://git-scm.com/docs/git-filter-branch/2.41.0)


>`git filter-branch` has many pitfalls, and is no longer the recommended way to rewrite history. **Instead, consider using `git-filter-repo`**, which is a Python script that does a better job for most applications where you would normally turn to `filter-branch`. Its documentation and source code can be found at [https://github.com/newren/git-filter-repo](https://github.com/newren/git-filter-repo).  
>[Git \- Rewriting History](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)


インストールは[How do I install it?](https://github.com/newren/git-filter-repo#how-do-i-install-it)を参照し、[git-filter-repo script](https://github.com/newren/git-filter-repo/blob/main/git-filter-repo)のPythonスクリプトをプロジェクトに配置した。


### analyzeの結果をもとに何がリポジトリを肥大化させているのかあたりを付ける

まず、`.git/objects`の容量を次のコマンドで確認した。1.9GBもある。

```bash
 du -hs .git/objects
 1.9G    .git/objects
```

次のコマンドを実行し、`.git/filter-repo/analysis`に解析結果を出力する。
```bash
python3 git-filter-repo --analyze
```

`path-all-sizes.txt`には、だいたいサイズが大きいものから順にファイルが並んでいる。たとえば、下図は初回の実行結果だが、htmlファイルが並んでいることが見て取れる。おそらく、過去リポジトリ直下にHTMLを展開し、コミットしてしまったゴミと思われる。

[![git filter-repo --analyzeの実行結果](https://i.gyazo.com/faf357f6c49691293f56c763cf684e37.png "=948x411")](https://gyazo.com/faf357f6c49691293f56c763cf684e37)
次のコマンドを実行し、コミット履歴から`--path`で指定するディレクトリを削除する。
```bash
python3 git-filter-repo --path public/ --path tags/ --path en/ --path blog/ --path category/ --path tags/ --path tmp --invert-paths --force
```

ちなみに、`git-filter-repo --path`は指定したファイルもしくはディレクトリを残し、それ以外はフィルタするというのがデフォルトの動きである。そのため、特定のファイルもしくはディレクトリを削除する場合は、`--invert-paths`のオプションを付加する。

また、該当プロジェクトに差分がある場合は、`--force`オプションを付加しないと実行できない。

上記コマンドで生成物の削除だけで1.9GB->47MBに減った。どれだけ不要なファイルを蓄えていたのかがわかる。
```bash
du -hs .git/objects
47M     .git/objects
```

同じ要領で、`python3 git-filter-repo --analyze`を実行しながら、その他削除可能なファイルおよびディレクトリがないかを確認する。既に`.git/filter-repo/analysis`が存在する場合は、エラーになるため、適宜`.git/filter-repo/analysis1`などリネームする必要がある。

その後、analyze結果を見ながら、削除を繰り返し、最終的に14MBと妥当な大きさに収まった。

```bash
du -hs .git/objects
14M     .git/objects
```


### Authorのメールアドレスを変更する

次のような新旧メールアドレスのマッピングファイル（`mailmap`）を用意する。

```bash {name="mailmap"}
<new_email@example.com> <old_email@example.com>
```

次のコマンドを実行し、過去の履歴のAuthorのメールアドレスを変更する。
```bash
python3 git-filter-repo -f --mailmap mailmap
```


### remote originの情報は削除される

`git-filter-repo`のコマンドを実行すると、remote originの情報は削除される。これは履歴書き換えによる影響を避けるため、新しいリポジトリにpushすべきという作者の意図によるもの。

>4.Push your new repository to its new home (note that refs/remotes/origin/* will have been moved to refs/heads/* as the first part of filter-repo, so you can just deal with normal branches instead of remote tracking branches).   
>[DISCUSSION | git\-filter\-repo\(1\)](https://htmlpreview.github.io/?https://github.com/newren/git-filter-repo/blob/docs/html/git-filter-repo.html#DISCUSSION)

今回も、新しいリポジトリにpushすべく、既存の`www.meganii.com`は`www.meganii.com.old`にリネームした上で、privateリポジトリに変更した。そして、空いた`www.meganii.com`に対して、pushした。


## 今後の課題とまとめ

いままでgitの履歴を改編したことがなかったのでよい勉強になった。今回は、自分ひとりのプロジェクトであったため、`git push --force`したときの影響は気にしなかった。

しかし、チームで開発しているリポジトリに同じような改編を加える場合の影響は意識する必要がある。今後実施する際の課題とする。


## 参考URL

- [Git \- git\-filter\-branch Documentation](https://git-scm.com/docs/git-filter-branch/2.41.0)
- [7.6 Git のさまざまなツール - 歴史の書き換え | git book (ja)](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%81%95%E3%81%BE%E3%81%96%E3%81%BE%E3%81%AA%E3%83%84%E3%83%BC%E3%83%AB-%E6%AD%B4%E5%8F%B2%E3%81%AE%E6%9B%B8%E3%81%8D%E6%8F%9B%E3%81%88)
- [7.6 Git Tools - Rewriting History | git book (en)](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)
- [git でリポジトリを整理して容量削減するときに嵌った話 \| おいもログ](https://blog.oimo.io/2021/07/19/git-filter-repo/)
- [gitの歴史改変が出来るgit filter\-repo](https://zenn.dev/honahuku/scraps/f730a41bf9e10b)

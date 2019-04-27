---
title: "Sublime Text 2にLiveReloadを導入してMarkdown Previewを快適に!!"
date: 2013-05-20T22:05:00+09:00
category: ['Tech']
tags: ['Jekyll','Sublime Text']
published: true
slug: livereloaded
---

Jekyllを使うからには、Markdownをプレビュー出来るエディタが欲しくなる。

Markdownをプレビュー出来るエディタと言えば、[Kobito - プログラミングのメモやスニペットの記録に最適なMacアプリケーション](http://kobito.qiita.com/)が思い浮かぶ。リアルタイムプレビューの名にふさわしく、かなり快適。

[Kobito - プログラミングのメモやスニペットの記録に最適なMacアプリケーション](http://kobito.qiita.com/)

しばらくは、Kobitoでいいかと思っていたが、ターミナルから起動できても、ファイルの読み込みがどうも出来ない。どうせならターミナルからコマンドを叩いて、Markdownのひな形をシームレスに編集したい。

探していたところ、Sublime Text 2のプラグインに、LiveReloadというものがあるみたいなので、試してみる。

{{% googleadsense %}}

## 前提

1. Sublime Text 2に Package Controlを導入済み
2. Package ControlからMarkdown Previewをインストール済み

[Sublime Text 2にパッケージコントロールを導入!!](https://www.meganii.com/blog/2013/04/26/sublime-text-2-pakage-control/)

## LiveReloadのインストール

- Package Control: Install PackageからLiveReloadをインストール

<a href="http://www.flickr.com/photos/35571855@N06/8785672298/" title="2013-05-20-livereloaded.markdown — octopress by , on Flickr"><img src="https://farm9.staticflickr.com/8415/8785672298_15ac1e223a.jpg" width="400" /></a>

LiveReload
[dz0ny/LiveReload-sublimetext2 · GitHub](https://github.com/dz0ny/LiveReload-sublimetext2/)


## Markdown Previewの設定
### CSSを読みこませるには
Package Settings > Markdown Previewの設定ファイル中にある `css:`に自分のcssファイルを配置する。

### Jekyllの記事の始まりの`---`と`---`で囲まれた部分のTitleだけを抜き出してうまく表示させるには
`strip_yaml_front_matter`をtrueにする。

``` 
- "strip_yaml_front_matter": false
+ "strip_yaml_front_matter": true
```

## 感想
リアルタイムプレビューとまではいかないが、だいぶ快適になった。
しばらく、この運用でいってみようと思う。




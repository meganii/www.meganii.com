---
title: Sublime Text 2にパッケージコントロールを導入!!
date: 2013-04-26T22:21:00+09:00
category: ['Tech']
tags: ['sublime text2']
published: true
slug: sublime-text-2-pakage-control
---

GWということで、普段なかなかできない環境周りの整備がしたくなる時期です。
今回は、やりたかったけど、なかなかできなかったSublime Text 2の環境を整えます。

- Mac ターミナルから起動できるようにする
- Sublime Text 2に Pakage Controlを導入
- Markdown Previewを導入

[Installation \- Package Control](https://packagecontrol.io/installation)


{{% googleadsense %}}


### ターミナルからSublime Text 2を起動できるようにする

やっぱり、ターミナルから起動できないと不便ですよね。まずは、重たい腰を上げて、ターミナルから起動できるようにします。


homeディレクトリに ```bin``` ディレクトリを作成

```
mkdir bin
```

```
ln -s "/Applications/Sublime Text 2.app/Contents/SharedSupport/bin/subl" ~/bin/subl	
```

.bash_profileに```export PATH=$PATH:~/bin/```を追加して、以下のコマンドを実行。

```
source .bash_profile
```

これで、ターミナルから``` subl hoge.text``` でSublime Text 2を開くことができる。


### Sublime Text 2に Pakage Controlを導入

[Installation \- Package Control](https://packagecontrol.io/installation)

上記のサイトにアクセスして、以下のコマンドをコピー。

```
import urllib2,os; pf='Package Control.sublime-package'; ipp=sublime.installed_packages_path(); os.makedirs(ipp) if not os.path.exists(ipp) else None; urllib2.install_opener(urllib2.build_opener(urllib2.ProxyHandler())); open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read()); print('Please restart Sublime Text to finish installation')
```

Sublime Text 2上で Ctrl + ` でコマンドラインを出す。


{{% img src="https://farm9.staticflickr.com/8400/8683705864_995fc97c47.jpg" w="450" h="383" %}}


コマンドラインに先ほどのコマンドを貼り付けて実行する。
これで、パッケージコントロールが使えるようになりました。	

#### 参考　ドットインストール

- [\#12 パッケージを使ってみよう \| Sublime Text 2入門 \- プログラミングならドットインストール](https://dotinstall.com/lessons/basic_sublimetext/10512)

### Markdown Previewを導入

```Shift + Cmd + P``` で出てきた入力窓に install と入力。
Package Control : Install Package　を選択。


{{% img src="https://farm9.staticflickr.com/8266/8683722130_d1bd113402.jpg" w="450" h="383" %}}


markdown previewを選択 -> インストール。これで、導入されました。

パッケージの導入も簡単ですね。


## 参考

- [Markdown書く時はリアルタイムプレビュー出来る Sublime Text2 + Markdown Previewプラグインで決まり！ | clicktx::Tech::Memo](http://perl.no-tubo.net/2013/03/26/markdown%E6%9B%B8%E3%81%8F%E6%99%82%E3%81%AF%E3%83%AA%E3%82%A2%E3%83%AB%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%97%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC%E5%87%BA%E6%9D%A5%E3%82%8B-sublime-text2-markdown-prev/)
- [コードで一言: SublimeText2でMarkdownをプレビューするプラグイン](http://codedehitokoto.blogspot.jp/2012/04/sublimetext2markdown.html)
- [Sublime Text 2を使ってMarkdownを編集したりプレビューしたりする | 世界 daipresents.com](http://daipresents.com/2013/sublime-text-2%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6markdown%E3%82%92%E7%B7%A8%E9%9B%86%E3%81%97%E3%81%9F%E3%82%8A%E3%83%97%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC%E3%81%97%E3%81%9F%E3%82%8A%E3%81%99/)

---
title: "UTF-8-MACとは何か？〜Jekyllのカテゴリ(タグ)ページで濁点を含むページが表示されない〜"
date: 2014-11-29T23:01:00+09:00
comments: true
category: ['Tech']
tags: ['Jekyll','文字コード']
published: true 
slug: jekyll-tags-unread-because-of-utf-8-mac
img: "https://farm9.staticflickr.com/8582/15904473402_eeaa56b76f_z.jpg"
---


Macでファイル作成し、その後、rsyncでさくらVPS(CentOS)に転送しているのだが、濁点を含むファイルだけが表示されない。

例えば、「リファクタリング」など。

[https://www.meganii.com/blog/tag/リファクタリング/](https://www.meganii.com/blog/tag/リファクタリング/)




{{% googleadsense %}}

## 原因

Mac OSXが作成した濁点、半濁点を含むファイル名を、CentOS側では異なる文字と認識しているのが原因みたい。

一般的に、UTF-8と表現される場合、NFC(Normalization Form C)でエンコードされたものを指す。

一方、Mac OSXでは、NFD(Normalization Form D)で符号化したUTF-8が用いられ、iconvではこれをUTF-8-MACと呼んでいる。

同じUTF-8でも、NFCとNFDという解釈の違いが存在するため、この現象が起きる。




例えば、「が」を例にすると、NFCだと、「が」と1文字で表現されるところが、NFDだと、分解されて「か」と「゜」で表現される。


{{% img src="https://farm9.staticflickr.com/8582/15904473402_eeaa56b76f_z.jpg" alt="nfdndc" w="3" h="2" %}}



## 解決策

- rsyncのバージョンを3.0に上げる
- オプション`--iconv=UTF-8-MAC,UTF-8`をつけて実行

※ オプション`iconv`は、バージョン3.0からしか利用出来ない

これによって、`UTF-8-MAC`を`UTF-8`に変換して、サーバに転送する。

### rsyncアップロード

Homebrewでインストール。

```bash
brew tap homebrew/dupes
brew install libiconv
brew install rsync
```

### Rakefileの変更

```diff
 desc "deploy_to_sakura"
 task :deploy_to_sakura do
   sh "jekyll build"
-  sh 'rsync -e -avz --delete _site/ meganii@11.111.111.111:/home/meganii/jekyll
+  sh 'rsync --iconv=UTF-8-MAC,UTF-8 -e -avz --delete _site/ meganii@11.111.111.111/home/meganii/jekyll
 end
```

## 手書きメモ

{{% img src="https://farm8.staticflickr.com/7482/15719329297_f662ce2376_z.jpg" w="3" h="2" %}}


## 参考

- [カテゴリー名に濁点を含んだ日本語が使えない問題を解決する\(Rsyncのiconvオプションを使う\) \| gam0022\.net](https://gam0022.net/blog/2012/08/11/use-rsync-iconv-option/)
- [Mac OS Xの濁点ファイルがやってきた \- miauの避難所](http://d.hatena.ne.jp/miau/20110805/1312555736)
- [UTF\-8\-MAC \- MacWiki](http://macwiki.osdn.jp/wiki/index.php/UTF-8-MAC)
- [UTF-8にもいろいろある - ザリガニが見ていた...。](http://d.hatena.ne.jp/zariganitosh/20131124/utf8_nfd_nfc_bom)
- [文字エンコードとロケールを体感する - ザリガニが見ていた...。](http://d.hatena.ne.jp/zariganitosh/20131118/text_encoding_locale_feeling)

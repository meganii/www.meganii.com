---
title: "Hugoのホスト先をさくらVPSからNetlifyに変更"
date: 2017-03-19T19:46:06+09:00
lastmod: 2017-03-19T19:46:06+09:00
comments: true
category: ['Tech']
tags: ['Netlify','Hugo']
published: true
slug: migrate-hugo-hosting-service-from-sakura-vps-to-netlify
img: 
---

現在さくらVPSを利用しているが、そろそろ更新時期でしたので、これを機に、静的サイトのホスティングをVPSではなく、クラウドサービスを利用しようと検討しました。

最初は、`Github Pages`にしようとしていましたが、現状http2対応していないみたいで、ちょっとなーと思っていたところ、`Netlify`を改めて試してみたら、結構よかったので移行しました。

[![Netlify](https://i.gyazo.com/6e0e459a700179093431f2c57b1880a5.png)](https://gyazo.com/6e0e459a700179093431f2c57b1880a5)
[Netlify: All\-in\-one platform for automating modern web projects](https://www.netlify.com/)

<!--more-->
{{% googleadsense %}}


## カスタムドメインの設定方法

### サブドメイン

CNAMEで

### Naked Domain


## リダイレクト処理

`_redirects`ファイルにRedirect処理を書くことができる。

[Go Static Without Losing Your Server \| Netlify](https://www.netlify.com/blog/2016/03/10/go-static-without-losing-your-server/)


> However, if you’re 100% sure that you’ll always want to redirect, even when the URL matches a static file, you can append an exclamation mark to the rule:
```
/app/*  /app/index.html  200!
```

カスタムドメインを設定しても、元々の`*.netlify.com`にはアクセスできてしまうので、Google的には重複コンテンツと見なされるのではないか？とちょっと心配になったので、以下の通りリダイレクトを`_redirects`ファイルに設定しました。

```_redirects
https://meganii.netlify.com/* https://meganii.com/:splat 301!
http://meganii.netlify.com/* https://meganii.com/:splat 301!
```

`:splat`は、ワイルドカードのように


```
/news/*  /blog/:splat
```

### 例

`/news/2004/01/10/my-story` to `/blog/2004/01/10/my-story`

## Hugo

デフォルトだと、HugoのVersionは`1.7`だけど、`hugo_0.19`というbuild commandを利用することで、使えるようになるみたい


## 参考

- [高機能ホスティングサービスNetlifyについて調べて使ってみた \- Qiita](http://qiita.com/TakahiRoyte/items/b7c4d1581df1a17a93fb)
- [Netlifyは最強の静的ウェブサイトホスティングサービスかもしれない \- yoshidashingo](http://yoshidashingo.hatenablog.com/entry/2016/08/22/193821)
- [Netlifyを使ってブログをHTTPS化する \| Aimless](http://aimless.jp/blog/archives/2016-11-18-enable-https-by-netlify/)
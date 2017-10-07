---
title: "HugoのRelated Contentを利用して関連記事を表示する"
date: 2017-10-07T14:40:16+09:00
lastmod: 2017-10-07T14:40:16+09:00
comments: true
category: ['Tech']
tags: ['Hugo']
published: true
slug: hugo-related-content
img: /images/hugo_s.png
---

- [Hugo \| Hugo 0\.27: Fast and Flexible Related Content\!](https://gohugo.io/news/0.27-relnotes/)
- [Hugo \| Related Content](https://gohugo.io/content-management/related/)

いつのまにかHugo 0.29から関連コンテンツ表示機能が追加されています。Jekyllでは簡単にプラグインでできていたのにHugoではできないというポイントが解消されました。もはや、Hugo最強説。

<!--more-->
{{% googleadsense %}}


使い方は、ドキュメントを見ていただければ分かると思いますが、`.Site.RegularPages.Related`に関連ページが含まれているのでそれを表示するだけです。

```html
{{ $related := .Site.RegularPages.Related . | first 10 }}
{{ with $related }}
<h3>See Also</h3>
<ul>
	{{ range . }}
	<li><a href="{{ .RelPermalink }}">{{ .Title }}</a></li>
	{{ end }}
</ul>
{{ end }}
```

そうすると、以下の通りいい感じで関連記事を出してくれます。

{{% img src="https://farm5.staticflickr.com/4470/36875101903_b778fc6630_o.png" w="781" h="371" %}}


関連記事をどのように抽出しているかは、おいおいドキュメントやソースを確認してみたいと思います。

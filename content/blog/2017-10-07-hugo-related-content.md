---
title: "HugoのRelated Contentを利用して関連記事を表示する"
date: 2017-10-07T14:40:16+09:00
lastmod: 2023-05-05T01:24:03+09:00
comments: true
category: ['Tech']
tags: ['Hugo', '関連記事', 'Blog']
slug: hugo-related-content
img: "https://res.cloudinary.com/meganii/image/upload/f_auto,q_auto/v1594903789/sislab_hugo_j8ykf6.png"
---

- [Hugo \| Hugo 0\.27: Fast and Flexible Related Content\!](https://gohugo.io/news/0.27-relnotes/)
- [Hugo \| Related Content](https://gohugo.io/content-management/related/)

いつのまにかHugo 0.29から関連コンテンツ表示機能が追加されています。これによって他のCMSではプラグインで簡単にできていたのに、Hugoではできないというポイントが解消されました。もはや、Hugo最強説！！。

さっそくこのブログにも試してみました。

{{% toc %}}

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

そうすると、以下の通りいい感じで関連記事を出してくれます。関連記事表示のスニペットを入れたからといって、ビルド時間が遅くなったというのは感じられませんでした。(元々爆速なので）

![Hugo 関連記事](https://res.cloudinary.com/meganii/image/upload/v1596888296/36875101903_b778fc6630_o_sbfqjs.png "=781x371")


関連記事をどのように抽出しているかは、おいおいドキュメントやソースを確認してみたいと思います。


{{% amazon 4844379208 %}}

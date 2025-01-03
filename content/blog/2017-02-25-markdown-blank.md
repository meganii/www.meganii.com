---
title: "HugoのMarkdownでtarget='_blank'を実現する方法"
date: 2017-02-25T23:21:20+09:00
lastmod: 2021-01-30T17:56:10+09:00
comments: true
category: ['Tech']
tags: ['Hugo','Markdown']
slug: hugo-markdown-href-target-blank
img: "https://res.cloudinary.com/meganii/image/upload/f_auto,q_auto/v1594903789/sislab_hugo_j8ykf6.png"
---

HugoのMarkdownエンジンは、[blackfriday][]を利用しているため、そのオプションに`hrefTargetBlank`があります。この`hrefTargetBlank`オプションを有効にすれば、外部リンクを別タブ、別ウィンドウで開く`<a href="" target="_blank">`をMarkdownで実現できる。

そもそも、Markdownに直接HTMLも記述できるので、`<a href="" target="_blank">`と直接書いてもよいが、せっかくMarkdownで書いているので、極力タグは使いたくありません。Markdown記法で書けるのであれば、すっきりと記載できるので嬉しいです。


[blackfriday]: https://github.com/russross/blackfriday

<!--more-->
{{% googleadsense %}}

### config.yml

```yaml
blackfriday:
    hrefTargetBlank: true
```


## 参考

- [Hugo \- Configuring Hugo](https://gohugo.io/overview/configuration/)
- [How to target="\_blank" in \.md? \- support \- Hugo Discussion](https://discuss.gohugo.io/t/how-to-target--blank-in-md/524)


{{% amazon 4844379208 %}}

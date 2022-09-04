---
title: "【Hugo】Render Hooks for Code Blocksを利用してコードブロックにファイル名を表示する"
date: 2022-09-03T21:25:00+09:00
lastmod: 2022-09-04T12:50:13+09:00
published: true
category: ["Tech"]
tags: ["Hugo"]
comment: true
slug: "display-filename-at-codeblock-using-render-hooks-for-code-blocks-in-hugo"
img: "https://res.cloudinary.com/meganii/image/upload/f_auto,q_auto/v1594903789/sislab_hugo_j8ykf6.png"
---

`Hugo v0.93.0`からコードブロックに対しても`Render Hooks`を利用できるようになった。
`Render Hooks`を利用して、コードブロックにファイル名を表示する方法を調べたときのメモを以下に残しておく。

[Release v0\.93\.0 · gohugoio/hugo](https://github.com/gohugoio/hugo/releases/tag/v0.93.0)

{{% toc %}}

<!--more-->
{{% googleadsense %}}

## Render Hooks for Code Blocksを利用してコードブロックにファイル名を表示する

`Render Hooks for Code Blocks`を利用することで下図のとおり、コードブロックの上部にファイル名を表示できる。

![Render Hooks for Code Blocks](https://res.cloudinary.com/meganii/image/upload/v1662207909/btczpo3urriafjkegpan.png "=824x226")

### Markdown

`{name="content/blog/blogcard.md"}`の形式で`Attributes`（`name`）を指定すると、`Render Hooks`側でファイル名（`.Attributes.name`）を取得できる。

{{< highlight html >}}
```html {name="content/blog/blogcard.md"}
{{% escape `{{< blogcard "https://www.meganii.com/blog/2022/08/14/migration-from-github-to-cloudflare-pages/" >}}` %}}

{{% escape `{{< blogcard "https://www.meganii.com/blog/2022/08/11/proxying-cloudinary-with-cloudflare-workers/" >}}` %}}

{{% escape `{{< blogcard "http://example.com" >}}` %}}
```
{{< / highlight >}}

### Render Hooks for Code Block

下記のとおり、`layouts/_default/_markup/render-codeblock.html`を作成する。

```html {name="layouts/_default/_markup/render-codeblock.html"}
<div>
    {{- $name := .Attributes.name -}}
    {{ with $name }}<div class="codeblock--name">{{ . }}</div>{{ end }}
    <div class="codeblock--content">
      {{- highlight (.Inner | safeHTML) .Type .Options }}
    </div>
</div>
```

2022年9月3日現在このブログでは、`TailwindCSS`を使っているので、以下のようなCSSを当てている。

```html
<div>
    {{- $name := .Attributes.name -}}
    {{ with $name }}<div class="codeblock--name w-fit text-sm text-white bg-gray-600 mt-1 py-1 px-1.5 rounded-t-lg">{{ . }}</div>{{ end }}
    <div class="codeblock--content">
      {{- highlight (.Inner | safeHTML) .Type .Options }}
    </div>
</div>
```


## 参考

- [Markdown Render Hooks | Hugo](https://gohugo.io/templates/render-hooks/#render-hooks-for-code-blocks)
- [HUGO の Code Block Render Hooks を使って、コードブロックにファイル名を表示する \| ひよこまめ](https://blog.chick-p.work/blog/hugo-render-hooks-code)


{{% amazon 4844379208 %}}
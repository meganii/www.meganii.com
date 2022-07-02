---
title: "Hugoでブログ記事一覧ページ（ブログアーカイブページ）を作成する"
date: 2020-12-26T10:46:41+09:00
lastmod: 2022-07-02T11:32:46+09:00
published: true
category: ["Tech"]
tags: ["Hugo","Tips"]
slug: "creating-post-list-archive-page-with-hugo"
img: "https://res.cloudinary.com/meganii/image/upload/f_auto,q_auto/v1594903789/sislab_hugo_j8ykf6.png"
---

以前、ブログメンタリングを受講していたときの課題でもあった「アーカイブページ」を作った時のメモです。
ようやく、ブログ記事一覧の機能を実装できました。

[/blog/archives/](/blog/archives/)



{{% toc %}}

<!--more-->
{{% googleadsense %}}


## 実装方法

Hugoでのアーカイブページの作り方を調べてみると、大きく分けて次の2つがありました。

- a) Taxonomyでコンテンツごとに年・月の情報を付加する
  - /2020/, /2020-12/のように年ごと、月ごとのアーカイブページを自動生成できる
- b) Archive用のテンプレートと、Archiveページのコンテンツを作成する

a)の方式だと各コンテンツのFront Matterに情報を付加しないといけないため、まずは簡単にできそうなb)の方法で実装しました。


### layouts/_default/archive.html

```html
{{ define "main" }}
<article class="mx-4 sm:mx-12">
  <section class="">
    <div class="">
      <h2 class="font-bold text-xl">Blog Archives</h2>
      {{ $type := "blog" }}
      {{ $isGroupKey := true}}

      {{ range (.Site.RegularPages.GroupByDate "2006") }}

      {{ $count := (len .Pages) }}
      {{ if (gt .Key 2000) }}

      {{ range (where .Pages "Type" $type) }}
      {{ if $isGroupKey }}
      <h1 class="font-bold mt-2">{{ .Date.Format "2006" }}年 ({{ $count }})</h1>
      {{ $isGroupKey = false}}
      {{ end }}
      {{ end }}

      {{ $isGroupKey = true}}

      <ul class="">
        {{ range (where .Pages "Type" $type) }}
        <li>
          <a class="" href="{{ .RelPermalink }}">
            <span class="">{{ .Date.Format "01/02" }}</span> — {{ .Title }}
          </a>
        </li>
        {{ end }}
      </ul>

      <br>

      {{ end }}
      {{ end }}
    </div>
  </section>
  <section>
    <div class="mt-8">
      {{- partial "share.html" . -}}
    </div>
  </section>
</article>
{{ end }}
```

### content/blog/archives/index.md

```
---
title: "Blog Archive"
layout: archive
slug: archives
---
```

`.Site.RegularPages.GroupByDate "2006"`で年ごとにグルーピングされたリストを取得できます。

`if (gt .Key 2000)`としているのは、この`content/blog/archives/index.md`自体がアーカイブページへ表示されないようにするためです。
（`index.md`ではコンテンツの日付を指定していないため、0年として表示される）

## 参考ページ

- [Generating Archive Pages with Hugo - Thedro Neely](https://www.thedroneely.com/posts/generating-archive-pages-with-hugo/)
    - 今回の実装例
- [Inconvenient Hugo Yearly/Monthly Archives - Melcher.dev](https://melcher.dev/2019/01/inconvenient-hugo-yearly/monthly-archives/)
    - Taxonomyでの実装例


{{% amazon 4844379208 %}}


## 合わせて読みたい

[小さな習慣・アウトプット駆動生活〜ブログメンタリングのふりかえり〜 \- SIS Lab](/blog/2020/03/31/reflections-on-blog-mentoring/)

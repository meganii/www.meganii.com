---
title: "Hugo v0.109.0でパンくずリストをシンプルに実装する"
date: 2023-02-03T21:39:28+09:00
lastmod: 2023-02-03T21:39:28+09:00
category: ["Tech"]
tags: ["Hugo","Blog"]
comment: true
slug: "implementation-simple-breadcrumb-navigation-in-hugo-v0.109.0"
img: "https://res.cloudinary.com/meganii/image/upload/f_auto,q_auto/v1594903789/sislab_hugo_j8ykf6.png"
---

Hugo `v0.109.0`でトップページまでツリーを辿る`.Ancestors`メソッドが`Page`に追加された。
これにより、パンくずリストをシンプルに実装できるようになった。
[Release v0\.109\.0 · gohugoio/hugo](https://github.com/gohugoio/hugo/releases/tag/v0.109.0)

<!--more-->
{{% googleadsense %}}


以下`.Ancestors.Reverse`を利用した公式サンプル。

```html
<ol>
  <ul>
    {{- range .Ancestors.Reverse }}
      <li><a href="{{ .Permalink }}">{{ .Title }}</a></li>
    {{- end }}
    <li class="active" aria-current="page">
      <a href="{{ .Permalink }}">{{ .Title }}</a>
    </li>
  </ul>
</ol>
```


## このサイトでの変更

以前までは、`template`を繰り返し適用することでしかパンくずリストを実装できなかったが、`.Ancestors.Reverse`を利用してシンプルに実装できた。
変更点は、Before / Afterのとおり。


### Before

```html {name="layouts/partials/breadcrumb.html"}
<ol>
  {{- template "breadcrumbnav" (dict "p1" . "p2" .) -}}
</ol>

{{ define "breadcrumbnav" }}
  {{ if .p1.Parent }}
    {{ template "breadcrumbnav" (dict "p1" .p1.Parent "p2" .p2 ) }}<li class="inline">></li>
  {{ else if not .p1.IsHome }}
    {{ template "breadcrumbnav" (dict "p1" .p1.Site.Home "p2" .p2 ) }}
  {{ end }}
<li class="inline{{ if eq .p1 .p2 }} active:text-black{{ end }}">
  {{ if eq .p1 .p2 }}
    {{- .p1.Title -}}
  {{ else }}
    <a class="text-gray-800 hover:underline hover:text-gray-600 " href="{{ .p1.Permalink }}">{{- .p1.Title -}}</a>
  {{ end }}
</li>
{{ end }}
```

### After

```html {name="layouts/partials/breadcrumb.html"}
<ol>
  <ul>
    {{- range .Ancestors.Reverse }}
      <li class="inline"><a class="text-gray-800 hover:underline hover:text-gray-600" href="{{ .Permalink }}">{{ .Title }}</a></li>
      <li class="inline">></li>
    {{- end }}
    <li class="inline active:text-black">
      {{- .Title -}}
    </li>
  </ul>
</ol>
```


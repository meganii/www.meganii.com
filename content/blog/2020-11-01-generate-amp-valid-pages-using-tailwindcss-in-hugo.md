---
title: "HugoでTailwindCSSを利用しAMP Validなページを生成する"
date: 2020-11-01T09:55:49+09:00
lastmod: 2020-11-01T09:55:49+09:00
published: true
category: ["Tech"]
tags: ["Hugo", "TailwindCSS", "AMP"]
comment: true
slug: "generate-amp-valid-pages-using-tailwindcss-in-hugo"
img: "https://res.cloudinary.com/meganii/image/upload/f_auto,q_auto/v1594903789/sislab_hugo_j8ykf6.png"
---

HugoでCSSフレームワーク「Tailwind CSS」を利用し、AMP Validなページを生成する方法についてのメモです。

## ポイント

- HugoでPostCSSの仕組みを利用して、TailwindでCSSを組み立てる
- Tailwind CSS v1.4からpergeCSSを内包し、設定方法が変わった



{{% toc %}}

<!--more-->
{{% googleadsense %}}



Tailwind CSSは、utility-firstなCSSフレームワークです。
あらかじめ決められたutilityのセットが用意されており、ユーザはそのutilityを組み合わせて任意のデザインを組み上げます。

一方、AMPの制約には、CSSのインライン化とCSSサイズが決められています。Tailwind CSSが用意するCSSをすべて利用した場合には、`2413.4kB`となりAMPの制約を満たすことができません。そのため、HugoでTailwind CSSを利用してAMP Validなページを生成するためには、未使用CSSを削除し、サイズ圧縮が必要です。

<!-- textlint-disable -->
Tailwind CSS ver.1.3までは`@fullhuman/postcss-purgecss`を利用していましたが、ver1.4からはTailwind自体にpurgeCSSを含むようになり、設定方法が変わりました。
<!-- textlint-enable -->

### head.html

Hugoの`<head>`を組み立てるテンプレート内で、`postCSS`を利用します。

```html
{{ if .Site.IsServer }}
  {{ $style := resources.Get "css/styles.css" | postCSS (dict "config" "./assets/css/dev/postcss.config.js") | fingerprint }}
  <link rel="stylesheet" href="{{ $style.Permalink }}" data> 
{{ else }}
  {{ $style := resources.Get "css/styles.css" | postCSS (dict "config" "./assets/css/postcss.config.js") | minify }}
  <style amp-custom>{{ $style.Content | safeCSS }}</style>
{{ end }}
```

`.Site.IsServer`によって、ローカル開発と本番ビルドで挙動を変えています。

- ローカル開発（`huge server`）：スタイルシートとして読み込み
- 本番ビルド（`HUGO_ENV="production" NODE_ENV="production" hugo -gc`）：AMPカスタムCSSとしてインラインCSS化


ポイントは次の記述です。`css/styles.css`を読み取り、Hugo PipesのpostCSSに渡し、`./assets/css/postcss.config.js"`の設定に従い、CSSを処理します。

```
{{ $style := resources.Get "css/styles.css" | postCSS (dict "config" "./assets/css/postcss.config.js") | minify }}
```



### postcss.config.js

```js
const themeDir = __dirname + '/../../';

module.exports = {    
    plugins: [        
        require('postcss-import')({path: [themeDir]}), 
        require('tailwindcss')(themeDir + 'assets/css/tailwind.config.js'), 
        require('autoprefixer'),
    ]
}
```

### tailwind.config.js

`tailwind.config.js`はTailwindの設定ファイルです。
`purge`の`mode: 'all'`で未使用CSSを削除します。

```js
 const themeDir = __dirname + '/../../';
 
 module.exports = {
   purge: {
     mode: 'all',
     content: [
       themeDir + 'layouts/**/*.html',
       'layouts/**/*.html',
       'content/**/*.html',
     ],
   },
   theme: {},
   variants: {},
   plugins: []
 }
```

## 参考

Tailwind v1.3系の際の設定は次のとおりでした。

```js
const themeDir = __dirname + '/../../';

module.exports = {    
    plugins: [        
        require('postcss-import')({path: [themeDir]}), 
        require('tailwindcss')(themeDir + 'assets/css/tailwind.config.js'),
        require('@fullhuman/postcss-purgecss')({
            // Specify the paths to all of the template files in your project 
            content: [
                themeDir + 'layouts/**/*.html',
                'layouts/**/*.html',
                'content/**/*.html',
            ],
            whitelist: ['blockquote'],
            whitelistPatternsChildren: [/post$/],
            // Include any special characters you're using in this regular expression
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [], 
            fontFace: true
        }),    
        require('autoprefixer')({
            grid: true
        }),
        require('postcss-reporter'),
    ]
}
```

## まとめ

- Hugo Pipes「postCSS」を利用することで、Tailswind CSSでAMP Validなページを生成可能
- Tailwind CSS ver1.4からフレームワーク自体にpurgeCSSの機能を含んだため、設定変更に注意


{{% amazon 4844379208 %}}
---
title: "HugoでのシンタックスハイライトにPython Pygmentsが不要となった"
date: 2017-10-14T06:31:25+09:00
lastmod: 2017-10-14T06:31:25+09:00
comments: true
category: ['Tech']
tags: ['Hugo', 'Design']
published: true
slug: hugo-syntax-highlighting
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514036568/thumbnail_hugo_icon.png"
---

`Hugo 0.28`から`Python Pygments`に頼らず、Goの機能でシンタックスハイライトが可能になりました。これにより、シンタックスハイライトを行なっているコンテンツがあったとしても、キャッシュなしで高速なビルドができるようになっています。

[Hugo \| Hugo 0\.28: High\-speed Syntax Highlighting\!](https://gohugo.io/news/0.28-relnotes/)

<!--more-->
{{% googleadsense %}}


自分の場合は、`config.toml`に以下のパラメータを指定しています。

> Set to true to enable syntax highlighting in code fences with a language tag in markdown (see below for an example).

```
pygmentsCodefences = true # ```で囲んだコードをハイライトする設定
pygmentsUseClasses = true # <span stype="xxxx">で色付けをするのではなく、<span class="className">classで分ける
```

`pygmentsUseClasses`を有効にしているので、次のコマンドを実行して出てきたcssを自身のcssファイルに書き込みます。

`--style`に指定するstyleは、[Pygments style gallery\!](https://help.farbox.com/pygments.html)から選ぶことができます。

```
hugo gen chromastyles --style=monokai > syntax.css
```

```css
/* Background */ .chroma { color: #f8f8f2; background-color: #272822 }
/* Error */ .chroma .ss4 { color: #960050; background-color: #1e0010 }
/* LineHighlight */ .chroma .hl { background-color: #ffffcc; display: block; width: 100% }
/* LineNumbers */ .chroma .ln { ; margin-right: 0.4em; padding: 0 0.4em 0 0.4em; }
/* Keyword */ .chroma .s3e8 { color: #66d9ef }
/* KeywordNamespace */ .chroma .s3eb { color: #f92672 }
/* Name */ .chroma .s7d0 {  }
/* NameAttribute */ .chroma .s7d1 { color: #a6e22e }
/* NameClass */ .chroma .s7d4 { color: #a6e22e }
/* NameConstant */ .chroma .s7d5 { color: #66d9ef }
/* NameDecorator */ .chroma .s7d6 { color: #a6e22e }
/* NameException */ .chroma .s7d8 { color: #a6e22e }
/* NameFunction */ .chroma .s7d9 { color: #a6e22e }
/* NameOther */ .chroma .s7df { color: #a6e22e }
/* NameTag */ .chroma .s7e2 { color: #f92672 }
/* Literal */ .chroma .sbb8 { color: #ae81ff }
/* LiteralDate */ .chroma .sbb9 { color: #e6db74 }
/* LiteralString */ .chroma .sc1c { color: #e6db74 }
/* LiteralStringEscape */ .chroma .sc25 { color: #ae81ff }
/* LiteralNumber */ .chroma .sc80 { color: #ae81ff }
/* Operator */ .chroma .sfa0 { color: #f92672 }
/* Punctuation */ .chroma .s1388 {  }
/* Comment */ .chroma .s1770 { color: #75715e }
/* GenericDeleted */ .chroma .s1b59 { color: #f92672 }
/* GenericEmph */ .chroma .s1b5a { font-style: italic }
/* GenericInserted */ .chroma .s1b5d { color: #a6e22e }
/* GenericStrong */ .chroma .s1b60 { font-weight: bold }
/* GenericSubheading */ .chroma .s1b61 { color: #75715e }
/* Text */ .chroma .s1f40 {  }
```


詳細は、下記ドキュメントを参照してください。
[Hugo \| Syntax Highlighting](https://gohugo.io/content-management/syntax-highlighting/)



それでは、よい`Hugo Life`を。


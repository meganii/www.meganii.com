---

title: JekyllのFront matterを抽出する
date: 2014-06-24T07:12:00+09:00
lastmod: 2022-07-02T10:08:03+09:00
category: ['Tech']
tags: ['jekyll']
slug: jekyll-front-matter
---


{{% googleadsense %}}

```ruby
require 'rubygems'
require 'english'
require 'yaml'

content = File.read('test.markdown')
content =~ /\A(---\s*\n.*?\n?)^(---\s*$\n?)/m
YAML.load($MATCH)
```


## 参考
- [Jekyllのお勉強 -YAML部分と記事本文を分離する正規表現- – じょーぶん部](/blog/2013/05/23/regexp-jekyll/)
- [Front-matter](http://jekyllrb.com/docs/frontmatter/)
- [Module: English (Ruby 2.0.0)](http://ruby-doc.org/stdlib-2.0.0/libdoc/English/rdoc/English.html)

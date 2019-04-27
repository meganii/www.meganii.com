---
title: Jekyllのお勉強 -YAML部分と記事本文を分離する正規表現-
date: 2013-05-23T07:19:00+09:00
category: ['Tech']
tags: ['jekyll','正規表現']
published: true
slug: regexp-jekyll
---

JekyllのYAML部分と記事本文を分離していると思われる正規表現を確認する。

正規表現	
```
/\A(---\s*\n.*?\n?)^(---\s*$\n?)/m
```

こんな感じらしい

{{% img src="https://farm8.staticflickr.com/7340/8802953102_f2b245cfb1.jpg" w="400" h="400" %}}

{{% googleadsense %}}

```ruby
# Read the YAML frontmatter.
#
# base - The String path to the dir containing the file.
# name - The String filename of the file.
#
# Returns nothing.
def read_yaml(base, name)
  begin
    self.content = File.read(File.join(base, name))

    if self.content =~ /\A(---\s*\n.*?\n?)^(---\s*$\n?)/m
      self.content = $POSTMATCH
      self.data = YAML.safe_load($1)
    end
  rescue SyntaxError => e
    puts "YAML Exception reading #{File.join(base, name)}: #{e.message}"
  rescue Exception => e
    puts "Error reading file #{File.join(base, name)}: #{e.message}"
  end

  self.data ||= {}
end
```

## 参考
 
 - [正規表現 \(Ruby 1\.9\.3\)](https://docs.ruby-lang.org/ja/1.9.3/doc/spec=2fregexp.html)

 {{% amazon 4873114500 %}}
---
title: "[Ruby]Moduleの使い方"
date: 2017-06-24T18:00:35+09:00
lastmod: 2019-04-27T16:12:02+09:00
comments: true
category: ['Tech']
tags: ['Ruby']
slug: ruby-iduom-module
---


## メソッドをクラスのインスタンスメソッドとして取り込む

```ruby
module Greetable
  def greet_to(name)
    puts "Hello #{name}. My name is #{self.class}"
  ends
end

class Alice
  include Greetable
end

alice = Alice.new
alice.greet_to('meganii')
```

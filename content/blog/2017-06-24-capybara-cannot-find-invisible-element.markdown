---
title: "Capybaraで非表示要素を検索できない"
date: 2017-06-24T11:39:13+09:00
lastmod: 2017-06-24T11:39:13+09:00
comments: true
category: ['Tech']
tags: ['capybara']
published: true
slug: capybara-cannot-find-invisible-element
img: https://images-fe.ssl-images-amazon.com/images/I/51HQYnwtflL._SL160_.jpg
---

Capybaraで、`style="display: none;"`となっているある要素を取得しようと思ったら、思わぬところでハマった。
`page.screenshot`でスクリーンショットを取っても、`print page.html`でDOMを取得しても、そこにある要素がfindやhas_selector?メソッドから取得できなくて困った。

結論は、`style="display: none;"`のような非表示の要素は、デフォルトでは検索条件にならない。

どうやら下記の`visible`オプションがあるようです。知らなくて、しばらく途方にくれていました。

[http://www.rubydoc.info/github/jnicklas/capybara/master/Capybara/Node/Finders#all-instance_method](http://www.rubydoc.info/github/jnicklas/capybara/master/Capybara/Node/Finders#all-instance_method)

```
visible (Boolean, Symbol) — Only find elements with the specified visibility:
true - only finds visible elements.
false - finds invisible and visible elements.
:all - same as false; finds visible and invisible elements.
:hidden - only finds invisible elements.
:visible - same as true; only finds visible elements.
```

<!--more-->
{{% googleadsense %}}


## 参考

- [Capybara で非表示要素を find する \- kakakakakku blog](http://kakakakakku.hatenablog.com/entry/2015/05/14/124653)
- [非表示要素はCapybaraのfindで検索対象になるのか \- Qiita](http://qiita.com/upinetree/items/4d4022c90ce32b68c38d)


{{% amazon B071YC72X1 %}}

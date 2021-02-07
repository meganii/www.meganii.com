---

title: sublime-vim
date: 2013-05-28T21:02:00+09:00
lastmod: 2019-04-27T16:12:02+09:00
category: ['Tech']
tags:
  - 'Vim'
  - 'Sublime Text 2'
published: true
slug: sublime-vim
---

そろそろ重たい腰を上げて、vi系のコマンドを覚えたいなと思い始めたので、`Sublime Text 2`を`Vim`っぽく操作するようにカスタマイズしてみようと思う。

{{% amazon 4774143960 %}}

参考にさせてもらいながら、設定変更。

[Vimと僕とSublime \- fukayatsu\.dev](https://blog.fukayatsu.com/2013/01/02/vim-advent-calendar/)


{{% googleadsense %}}

メニューからPreferences > Settings-User(⌘,)
を選択して、以下の様に追加します（Mac向け）。

```
 "ignored_packages": [""],
 "vintage_ctrl_keys": true,
 "vintage_start_in_command_mode": true
```

[Vintage Mode \- Sublime Text 2 Documentation](https://www.sublimetext.com/docs/2/vintage.html)

`Package Control`を導入して、`VintageEx`を導入。
 

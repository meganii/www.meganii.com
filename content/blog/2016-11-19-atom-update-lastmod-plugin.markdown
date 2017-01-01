---
title: "Atomプラグインの作り方"
date: 2016-11-19T11:14:10+09:00
lastmod: 2016-11-19T11:27:50+09:00
---

静的サイトジェネレータでサイトを管理するときに、作成日時だけでなく更新日時も管理したいときに、frontmatterに`lastmod`を追加したのだが、いちいち更新日時を手動で更新するのも面倒なのでatomプラグインで実現することにした。

## atom pluginの作り方

今まではcoffee scriptでしかpluginをかけないと思っていたが、いつの間にかES2015でかけるようになっていたので大変ありがたい。

`ctrl + command + P`でコマンドパレットを起動して、Generate Pluginを選択する。


## 参考

https://github.com/meganii/atom-update-lastmod-on-markdown

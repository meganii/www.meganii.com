---
title: "DeepL翻訳時にAutoHotKeyを使用して改行を削除する"
date: 2021-05-24T21:24:55+09:00
lastmod: 2021-05-24T21:24:55+09:00
published: true
category: ["Tech"]
tags: ["AutoHotKey","DeepL","英語翻訳"]
comment: true
slug: "using-autohotkey-to-remove-line-feeds-when-translating-with-deepl"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto/v1594902885/tech_ben4sq.png"
---

英文PDFをDeepLで翻訳するときにコピー&ペーストを利用すると、翻訳したい英文に変な改行が含まれてしまう。
そのまま翻訳すると、翻訳精度が下がってしまうため、いちいち手動で改行を削除している。

これは大変面倒くさい。

そこで、何か自動的に改行を除去する方法がないか探してみると`AutoHotKey`でやりたいことが実現できそうなので、そのときの調査結果、設定方法を下記に残しておく。



{{% toc %}}

<!--more-->
{{% googleadsense %}}


## 設定方法

1. `DeepL`のデスクトップアプリケーションをダウンロードして`ctrl + c`2回で翻訳開始の設定をする
2. `AutoHotKey`で以下のスクリプトを走らせる

```ahk
 ~^c::
   Input, inputText, I L1 T0.5, ^c
   IfInString, ErrorLevel, EndKey:
   {
     Clipboard := cutcrlf(Clipboard)
   }
 Return
 
 cutcrlf(str){
   str := StrReplace(str,"`r")
   str := StrReplace(str,"`n")
   return str
 }
```

まず、`~^c::`で`ctrl + c`のホットキーを指定する。
その後の`Input`コマンドで、`ctrl + c`に続くキー入力を横取りして、`inputText`変数に格納する。  
`I L1 T0.5`という引数の意味はそれぞれ次のとおり。
- I: AutoHotKeyが生成したキー入力は無視
- L1: 入力受付キーの長さは1文字
- T0.5: キー入力を待つ時間は0.5秒以内

最後の`^c`の引数は、「ctrl+c」が入力されたらコマンドを終了して次の行に進むを意味する。

次の`IfInString, ErrorLevel, EndKey:`は、`ErrorLevel`変数に`EndKey:`という文字列が含まれているかという条件文である。
`Input`コマンドの待ち時間（0.5秒）以内に「ctrl + c」が押されたら、`ErrorLevel`変数に`EndKey:^{c}`という値が格納される。
一方、0.5秒以内に「ctrl + c」が押されない場合は`Timeout`という値が格納される。
よって、`EndKey:`が含まれれば「ctrl + cが2連打された」と判断できる。


`IfInString`のスコープ内では、改行`\r\n`を削除する`cutcrlf`という関数を用意し、クリップボードの中身を操作する。
`Clipboard`はクリップボードの中身であり、`cutcrlf`関数を通すことで改行除去後の内容をクリップボードに戻す。

このスクリプトによって、クリップボード内の改行が除去された状態で、DeepLに渡れるため改行除去後の英文で翻訳される。
※タイミングによってはDeepLが動作しないため、スクリプトの改良が必要である。


## まとめ

日常的に利用するワークフローにおいて、ちょっとしたことを自動化するのは自分がまさに困っていることを解決できるため、すごく気持ちがよい。

今までキーボード周りのハックは、あまり試せていなかったので`AutoHotKey`を使いこなしたい。


## 参考

- [AutoHotKeyの解説と自分の設定について \| 閑古鳥ブログ](https://kankodori-blog.com/?p=536)
- [Input \- Syntax & Usage \| AutoHotkey](https://www.autohotkey.com/docs/commands/Input.htm)
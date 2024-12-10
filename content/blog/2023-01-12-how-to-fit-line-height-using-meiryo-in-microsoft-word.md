---
title: "【Word】メイリオの広い行間を調整する"
date: 2023-01-12T19:43:52+09:00
lastmod: 2023-01-14T23:53:12+09:00
category: ["Tech"]
tags: ["Word"]
comment: true
slug: "how-to-fit-line-height-using-meiryo-in-microsoft-word"
img: "https://res.cloudinary.com/meganii/image/upload/v1673526915/vwcjqzgdzmotql9uz066.png"
---


Microsoft Wordでフォントを「メイリオ」もしくは「Meiryo  UI」にすると、行間が広くなってしまう問題を解消するために、調べたことをまとめる。

{{% toc %}}

<!--more-->
{{% googleadsense %}}



## 原因

「メイリオ」や「Meiryo UI」は、フォント自体に余白を多く持つ。
たとえば「メイリオ」でフォントサイズが10ptだと20pt程度の行高が必要となる。
Wordの行高が余白を多く含むメイリオの文字よりも小さい場合は、文字が1行に収まらず、1行を使って文字を収めようとする。

つまり、メイリオをそのまま使うと、行間が間延びしてしまう。

![メイリオを使った場合の広い行間](https://res.cloudinary.com/meganii/image/upload/v1673526915/vwcjqzgdzmotql9uz066.png "=660x134")

## 解決方法

「ページ設定」ダイアログ「文字数と行数」タブの「行数」を適切な値に設定する。
適切な値は、フォントサイズによって異なる。ちょうどよい行間に調整するためには試行錯誤が必要。
たとえば、フォントサイズ10.5ptの場合、行数を32以下に設定する。


![ページ設定」ダイアログの「文字数と行数」タブ](https://res.cloudinary.com/meganii/image/upload/v1673610035/pfllq9mxtzvlsrnecm8s.png "=419x631")



見出しなど「標準」スタイルのフォントサイズよりも大きいフォントサイズに対応するには次の設定をする。

- 「1ページの行数を指定時に文字を行グリット線に合わせる」のチェックを外す
- 「行間」を固定値にして、「間隔」に『「ページ設定」ダイアログの「文字数と行数」タブ』で設定した「行送り」のptを指定する

![ALT](https://res.cloudinary.com/meganii/image/upload/v1673611419/gbqivis2zbtc5wp6donc.png "=460x680")


この設定を「見出し1」スタイルに設定したのが下図である。フォントサイズが異なる「見出し1」スタイルと「本文」スタイルの行高が揃う。
![ALT](https://res.cloudinary.com/meganii/image/upload/v1673611824/t9ywrxrjvdcmdbhbujvf.png "=586x170")


## 検証結果

フォントサイズが10.5ptの「メイリオ」で行数を45から1行ずつ減らしていくことで、行間がどのように変化するかの検証結果は次の通り。

- 行数45
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526915/vwcjqzgdzmotql9uz066.png "=660x134")
- 行数44
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526903/mt6jhmqbqmnagy9hsgec.png "=660x139")
- 行数43
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526864/g45fb2b1e7cr6kzhbgkz.png "=644x133")
- 行数42
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526837/zcp0fzlqon70evyesnvc.png "=658x137")
- 行数41
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526814/joezjrnaqd2hfor0qwot.png "=657x137")
- 行数40
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526792/w6t1gifrvxr5fzsmywr4.png "=655x139")
- 行数39
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526768/hcci14jhy3n9lm9velab.png "=660x155")
- 行数38
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526748/xvhxhonf4pxxfkuglecm.png "=654x149")
- 行数37
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526725/lnq7nbeurmy2emc9zpsg.png "=650x156")
- 行数36
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526393/goubphioetqqybzqdnrm.png "=665x159")
- 行数35
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526670/fxmphafmguxcr4bmdifm.png "=682x171")
- 行数34
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526637/yrrznd3mrqybxapsuzah.png "=652x161")
- 行数33
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526589/vwm2dgzpy0tqo154xnjg.png "=650x163")
- 行数32
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526560/eiubjevc2lvwu8wujbcf.png "=657x101")
- 行数31
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526530/s0r1n0ujikeczsbwh2mn.png "=648x104")
- 行数30
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526499/asvvva1oiypdzm8lazsd.png "=659x110")
- 行数29
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526950/m2u9ada1ya6ee1c9kho7.png "=648x102")
- 行数28
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526974/okqbxc09lwjdenglgre6.png "=645x104")
- 行数27
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673526999/znlidhetdgk1kinfirva.png "=650x104")
- 行数26
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673527023/r6lctxctduev4eu025om.png "=652x111")
- 行数25
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673527049/p7i6npnmsnsqz2is6szo.png "=645x111")
- 行数20
	- ![ALT](https://res.cloudinary.com/meganii/image/upload/v1673527095/jxpxukpr8duabz8rivma.png "=664x152")

## 参考図書

{{% amazon 4798164240 %}}
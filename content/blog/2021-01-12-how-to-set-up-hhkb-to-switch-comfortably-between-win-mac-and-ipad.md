---
title: "HHKBをWindows/Mac/iPadで快適に使う方法"
date: 2021-01-12T06:35:29+09:00
lastmod: 2021-01-12T06:35:29+09:00
published: false
category: ["Gadget"]
tags: ["Keyboard","HHKB", "レビュー"]
comment: true
slug: "how-to-set-up-hhkb-to-switch-comfortably-between-win-mac-and-ipad"
img: "https://res.cloudinary.com/meganii/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1608967964/happy-hacking-keyboard-hhkb_acbupn.jpg"
---


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1610490200/how-to-setup-hhkb_gktyqo.png" w="1024" h="512" %}}

複数OS（Windows, macOS, iPadOS）でHHKBを利用したいが、OS間で微妙にキーボードの操作が異なることに対してストレスを抱えている方に向けた記事です。

私もHHKBを複数OSで利用し始めましたが、環境を切り替えることによるコンテキストスイッチが気になり、最適な設定を模索しています。
今時点の自分にとって、最適な設定をまとめました。

ちなみに、[【レビュー】HHKB（Happy Hacking Keyboard）ファーストインプレッション](https://www.meganii.com/blog/2020/10/25/happy-hacking-keyboard-first-impression/)の記事では、HHKBを使い始めたときの1週間の所感をまとめていますので参考にしてください。


{{% toc %}}

<!--more-->
{{% googleadsense %}}


## 前提

- 利用HHKB（Professional HYBRID　静音　US配列）
    - [Happy Hacking Keyboard Professional HYBRID Type-S 英語配列／墨](https://amzn.to/3nR9FZA)
- 利用OS
    - Windows 10
    - macOS (Mojave)
    - iPadOS 13


## US配列のHHKBで複数OSを利用するときの問題点

[Happy Hacking Keyboard Professional HYBRID Type-S](https://amzn.to/3nR9FZA)であれば、Bluetoothで最大4端末までペアリング可能です。
接続切替には、キーボードショートカット`Fn + Ctrl + [1|2|3|4]`を利用します。
このキーボードショートカットによって、一度ペアリングした端末であれば、瞬時に切替可能です。

**「この機能を利用すれば、仕事・プライベート問わず、利用するOSの全てでHHKBを有効活用できる」**

そんな万能感に包まれながら、しばらくUS配列のHHKBを、複数OS（Windows、macOS、iPadOS）で利用してみたところ、私の使い方においては次の問題点が見えてきました。

- 同一キーボードで複数OSを利用する場合、脳が今、どのOSを利用しているのかわからなくなる
- 今どのOSを利用しているのかわからなくなるため、OSごとの異なるキーボードショートカットにストレスを感じる


### 同一キーボード、複数OSの場合、脳がどのOSを利用しているのかわからなくなる

今まではOS切替とともに物理キーボードが変わっていたため、OSごとの入力方式を切り替えることができました。
しかし、同一キーボードを利用する場合、どうも頭が切り替わらないようです。


- OSごとに利用キーボードを変えていたときは、入力環境の変更を物理キーボードの変化で、自分の中で切り替えることができた
- しかし、HHKB BTを利用するようになり、キーボードを統一できるため、自分の中で入力環境を切り替えることができなくなり、入力ミスが増えるようになった
 - Windowsを利用しているときに、Macのキーボードショートカットを使ってしまう
 - その逆で、WindowsからMacに切り替えると、コピペもままならない
- OSが変わっても、Bluetoothで簡単に切り替えができ、同じキーボードを利用できることが逆にアダとなってしまっています
- これでは、せっかくのHHKBの力を発揮できないと考え、設定の見直しを行いました。



## HHKBで実現したいこと

- US配列のHHKBで、なるべく少ない設定変更で、違和感なく複数OS（Windows, macOS, iPadOS）を利用できること
- macOSで実現している日本語の入力切替（トグルではなく、左・右の⌘キーでON/OFF切替）をWindowsとiPadOSに持ち込む


## HHKBの設定と各OSの設定

ポイントは次の点です。

- HHKBキーマッピング変更ツールで、Macモードのキーバインドを変更し、英字／かな入力を可能とする
- Windows、macOSはWinモード、iPadOSはMacモードを利用する
- WindowsではAutoHotKey、macOSではKarabiner-Elementsで、日本語入力ON/OFFの設定変更



### HHKB

- HHKBのDIPスイッチ
  - Winモード　SW1: ON, SW2: OFF
  - DeleteをBSへ切り替え　SW3 ON
- HHKBのキーマップ変更ツールでMacモードを次のとおり変更する
  - 左右

### Windowsの設定

- HHKBはWinモード
- AutoHotKeyで次のマッピング変更
  - 左Windowsを無変換
  - 右Windowsを無変換
  - 右ALTを右Winキー
- コントロールパネルから次の設定
  - 日本語配列からUS配列に切替（再起動が必要）
  - 入力切替メソッドの変更
    - 無変換を日本語入力OFF
    - かなを日本語入力ON
- Macで当たり前のように使っていたCtrl +

### macOSの設定

- HHKBはWinモード
- キーボード設定でControlとCommandを入れ替え（CommandをControlに、ControlをCommandに変更）
  - Windowsとキーボード操作を一致させるため
- Kanabilerで次の設定
  - Bluetoothキーボードが有効な場合は、内蔵キーボードは無効化（これにより、尊師スタイルを可能とする）
  - 左Command単体押しで、英語切替
  - 右Command単体押しで、日本語切替


### iPadOSの設定

- iPadOSを利用する際は、Macモードに切り替える
- 物理キーボード設定を次のとおり変更


### まとめ

今回紹介した設定によって、そのキーボードショートカットも同じになることで、OS間の入力体験を統一できました。
これにより、HHKBの本来持つ快適なタイピングをストレスなく利用できます。

もしも、より良いHHKBの設定があれば教えてください。

次に狙っているのは、尊師スタイルのためのアクリルボードとパームレストですね。


{{% amazon B077ZX1D6P %}}

{{% amazon B06Y2KJ99V %}}


{{% amazon B082TYNNL2 %}}


## 参考

- [HHKB英語配列はキーマップ変更ツールで大化けする｜yagitch｜note](https://note.com/yagitch/n/n406459c35609)
- [Windows上でHHKBをMac風に使う設定 (US配列編) – Miraium](https://miraium.com/mac-like-hhkb-setting-on-windows/)



---
title: "Happy Hacking Keyboard（HHKB）をWindows/Mac/iPadで快適に使う方法"
date: 2021-01-15T06:35:29+09:00
lastmod: 2021-01-15T06:35:29+09:00
published: true
category: ["Gadget"]
tags: ["Keyboard","HHKB", "レビュー"]
comment: true
slug: "how-to-set-up-hhkb-to-switch-comfortably-between-win-mac-and-ipad"
img: "https://res.cloudinary.com/meganii/image/upload/v1610490200/how-to-setup-hhkb_gktyqo.png"
---


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1610490200/how-to-setup-hhkb_gktyqo.png" w="1024" h="512" %}}

複数OS（Windows、macOS、iPadOS）でHappy Hacking Keyboard（以降HHKBと表記）を利用していると、OS間で微妙にキーボード操作が異なることにストレスを覚えることはないでしょうか。

私は昨年（2020年）にHHKBを購入し、複数OSで利用し始めましたが、OS切替時の些細なストレスが気になり始めました。
そこで、HHKBとOSの最適な設定を模索し、今時点の自分にとって最適な設定をまとめてみました。

ちなみに、[【レビュー】HHKB（Happy Hacking Keyboard）ファーストインプレッション](https://www.meganii.com/blog/2020/10/25/happy-hacking-keyboard-first-impression/)で、HHKBを使い始めたときの1週間の所感をまとめています。

{{% toc %}}

<!--more-->
{{% googleadsense %}}


## 前提

- 利用HHKB
    - [Happy Hacking Keyboard Professional HYBRID Type-S 英語配列／墨](https://amzn.to/3nR9FZA)
- 利用OS
    - Windows 10（JIS配列ノートPC）
    - macOS Mojave（US配列　MacBook Air）
    - iPadOS 14（iPad Pro 11インチ）


## US配列のHHKBで複数OSを利用するときの問題点

[Happy Hacking Keyboard Professional HYBRID Type-S](https://amzn.to/3nR9FZA)は、Bluetoothで最大4端末までペアリング可能です。
接続切替には、キーボードショートカット`Fn + Ctrl + [1|2|3|4]`を利用します。
このキーボードショートカットによって、一度ペアリングした端末であれば、瞬時に切替可能です。

**「この機能を利用すれば、仕事・プライベート問わず、利用する全てのOSでHHKBを有効活用できる」**

そんな万能感に包まれながら、しばらくUS配列のHHKBを、複数OS（Windows、macOS、iPadOS）で利用してみたところ、私の使い方においては次の問題点が見えてきました。

- 同一キーボードで複数OSを利用する場合、脳が今、どのOSを利用しているのかわからなくなる
- 今、どのOSを利用しているのかわからなくなるため、OSごとの異なるキーボードショートカットにストレスを感じる


HHKBという同一キーボードで複数OSを使用すると、脳内でWindowsとmacOSのキーボードショートカットが混ざってしまうのです。
たとえば、Windowsを利用していてmacOSの`ctrl + n`でのカーソル移動を使ってしまう。macOSで`Control + c Control + v`を使ってコピー&ペーストをしてしまうなどがあります。

複数OSを別のキーボードで使用していたときには、入力方式の違いに戸惑ったことはありませんでした。
どうやら、物理キーボードの違いというフィジカルなフィードバックによって、脳（指）が入力方式を切り替えているようです。

OSが変わっても同じキーボードを利用できることが逆に入力を妨げてしまっています。
これでは、せっかくのHHKBの力を発揮できないため、設定を見直しました。

## HHKBで実現したいこと

- なるべく少ない設定変更で、違和感なく複数OS（Windows, macOS, iPadOS）を利用する
- macOSで実現している日本語の入力切替（トグルではなく、左・右の⌘キーでON/OFF切替）をWindowsとiPadOSに持ち込む

## HHKBの設定と各OSの設定

ポイントは次の点です。

- [キーマップ変更ツール]で、HHKB「Macモード」のキーバインドを変更し、英字／かな入力を可能とする
- Windows、macOSはWinモード、iPadOSはHHKB「Macモード」を利用する
- Windowsでは[AutoHotKey]、macOSでは[Karabiner-Elements]で、日本語入力ON/OFF切替を設定する

次にそれぞれの設定方法を説明します。

### HHKBの設定

HHKB本体の設定です。

- HHKBのDIPスイッチ
  - Winモード（SW1: ON／SW2: OFF）
  - DeleteをBSへ切り替え（SW3：ON）
- HHKBのキーマップ変更ツールで「Macモード」を次のとおり変更
  - 左◇キー：「英数」、右◇キー：「かな」


HHKBには、DIPスイッチと呼ばれる物理スイッチが背面にあり、そのスイッチのON/OFFでキーボードの動作を変更できます。
たとえば、SW1/SW2の組み合わせによって「◇キー」をWindowsキーにする「Winモード」や「◇キー」を「⌘（Command）キー」にする「Macモード」などがあります。


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1610542637/hhkb-config-dip-switch_lrauat.png" w="600" h="340" alt="HHKB DIPスイッチ 設定" %}}

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1610542637/hhkb-config-dip-switch-2_tr0m9x.png" w="600" h="207" alt="HHKB DIPスイッチ 設定 2" %}}


詳しくは、[Happy Hacking Keyboard | ダウンロード | PFU](https://happyhackingkb.com/jp/download/)のマニュアルをご覧ください。

<!-- textlint-disable  ja-technical-writing/max-ten -->

また、HHKB純正ソフトウェアである[キーマップ変更ツール]を利用し、キーボード自体のキーマップを変更できます。
iPadOS用にHHKB「Macモード」を次の図のとおり変更します。
この設定によってHHKB「Macモード」に切り替えた際、「左◇キー」は「英数」、「右◇キー」は「かな」として認識され、左右の「◇キー」で日本語入力ON/OFFを実現できます。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1610543175/MacMode_xnmkuu.png" w="1024" h="725" %}}

<!-- textlint-enable  ja-technical-writing/max-ten -->


### Windowsの設定

<!-- textlint-disable jtf-style/4.2.6.ハイフン(-) -->

- HHKB「Winモード」利用
- [AutoHotKey]で次のとおりマッピング変更
  - 左Windowsキー =>「無変換」
  - 右Windowsキー =>「変換」
  - 右ALTキー =>「右Win」
- コントロールパネルから次の設定
  - JIS配列からUS配列に切替（JIS配列キーボードのノートPCを利用しているため）
- 「Microsoft IMEの詳細設定」で次の設定
    - ［変換キー］に機能として「IME-オン」、［無変換キー］に「IME-オフ」を割当
- Macの`Control + n`などのカーソル移動は、HHKBの「Fnキー」を組み合わせた矢印で代用

<!-- textlint-enable jtf-style/4.2.6.ハイフン(-) -->

Windowsでは、HHKB「Winモード」を利用します。

[AutoHotKey]を利用しているのは、日本語切替のON/OFFを「半角/全角」のトグルではなく、左右の変換/無変換キーで切り替えられるようにするためです。
これによって、今自分が「かな入力モード」にいるのか「半角入力モード」にいるのかを意識せずに、日本語と英字の入力切替ができるようになります。

macOSで利用していた`Control + n`などでのカーソル移動は、HHKBの「Fnキー」を使った矢印キーで代用します。


### macOSの設定

- HHKB「Winモード」利用
- キーボード設定で「Controlキー」と「Commandキー」を入れ替え（CommandをControlに、ControlをCommandに変更）
- [Karabiner-Elements]で次の設定
  - Bluetoothキーボードが有効な場合は、内蔵キーボードは無効化（これにより、[尊師スタイル]を可能とする）
  - 「左Commandキー」単体押しで、英語切替
  - 「右Command」単体押しで、日本語切替

macOSでは、HHKB「Winモード」を利用します。

キーボード設定で「Controlキー」と「Commandキー」を入れ替えているのは、Windowsとキーボード操作をできる限り一致させるためです。
HHKB US配列では、一般的なキーボードにおいて「Caps Lockキー」が配置してあるポジションに、「Controlキー」が配置されています。
そのため、Windowsのショートカットキーで多用される「Controlキー」は左小指で押します。
一方、macOSの場合、Windowsの「Controlキー」に対応する操作は「Commandキー」になっていることが多く、左親指で押すことになります。
ここに、微妙な違いが発生します。

キーボードのショートカットキーをできる限り統一するため、私は**macOSをWindowsへ合わせる**方向に寄せました。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1610635232/macos-hhkb-keyboard-setting_jvf3gd.jpg" w="668" h="583" %}}


[Karabiner-Elements]を利用するのは、Windowsで[AuthHotKey]を利用する理由と同じく、左右「⌘（Command）キー」単一押下での日本語入力ON/OFFを実現するためです。
また、HHKBを[尊師スタイル]で利用するときのための設定として、HHKBのBluethooth接続が有効な場合は内蔵キーボードを無効化します。
これによって、MacBook Airの内蔵キーボードの上に直接HHKBを置いて利用しても影響を与えません。
ただし、若干触れているようなので、キーボードブリッジのようなオプション品を揃えたいところです。


### iPadOSの設定

- HHKB「Macモード」利用
- 設定 > 一般 > キーボード > ハードウェアキーボード > 修飾キー > HHKBを次のとおり変更
  - Controlキー => 「Command」
  - Commandキー => 「Control」

iPadOSでは、**HHKB「Macモード」**を利用します。
現時点のiPadOSでは、ソフトウェアでキーマップを変更できないため、HHKB本体のキーマップを変更して対応します。

Windowsと操作感を合わせるため、修飾キーの設定画面で次の図の通り、「Controlキー」と「Commandキー」を入れ替えます。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1610718666/ipados-hardware-keyboard-setting_pyaeow.png" w="1024" h="715" %}}


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1610718664/ipados-hardware-keyboard-hhkb-setting_snt2h5.jpg" w="1024" h="715" %}}



### まとめ

今回紹介した設定によって、キーボードの操作感がWindows、macOS、iPadOSで（ほぼ）同一になり、OS間の入力体験を統一できました。
これにより、HHKBの本来持つ快適なタイピングをストレスなく利用できます。

もしも、より良いHHKBの設定があればぜひ教えてください。

次に狙っているのは、[尊師スタイル]のための[キーボードブリッジ](https://amzn.to/3bIr1o9)と快適な高さを出すための[パームレスト](https://amzn.to/2XMBA1n)ですね。


{{% amazon B077ZX1D6P %}}

{{% amazon B06Y2KJ99V %}}

{{% amazon B082TYNNL2 %}}


## 参考

- [HHKB英語配列はキーマップ変更ツールで大化けする｜yagitch｜note](https://note.com/yagitch/n/n406459c35609)
- [Windows上でHHKBをMac風に使う設定 (US配列編) – Miraium](https://miraium.com/mac-like-hhkb-setting-on-windows/)
- [Windows 10対応：MS\-IME日本語入力のオン／オフ切り替えキーを追加・変更する：Tech TIPS \- ＠IT](https://www.atmarkit.co.jp/ait/articles/1901/28/news023.html)


[キーマップ変更ツール]:https://happyhackingkb.com/jp/download/
[AutoHotKey]:https://www.autohotkey.com/
[Karabiner-Elements]:https://karabiner-elements.pqrs.org/
[尊師スタイル]:https://ja.wikipedia.org/wiki/Happy_Hacking_Keyboard

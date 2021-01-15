---
title: "HHKBをWindows/Mac/iPadで快適に使う方法"
date: 2021-01-15T06:35:29+09:00
lastmod: 2021-01-15T06:35:29+09:00
published: false
category: ["Gadget"]
tags: ["Keyboard","HHKB", "レビュー"]
comment: true
slug: "how-to-set-up-hhkb-to-switch-comfortably-between-win-mac-and-ipad"
img: "https://res.cloudinary.com/meganii/image/upload/v1610490200/how-to-setup-hhkb_gktyqo.png"
---


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1610490200/how-to-setup-hhkb_gktyqo.png" w="1024" h="512" %}}

複数OS（Windows、macOS、iPadOS）でHHKBを利用していると、OS間で微妙にキーボード操作が異なることにストレスを覚えることはないでしょうか。

私は昨年（2020年）にHHKBを購入し、複数OSで利用し始めましたが、OS切替時のコンテキストスイッチが気になり始めました。
そこで、HHKBとOSの最適な設定を模索し、今時点の自分にとって最適な設定をまとめてみました。

ちなみに、[【レビュー】HHKB（Happy Hacking Keyboard）ファーストインプレッション](https://www.meganii.com/blog/2020/10/25/happy-hacking-keyboard-first-impression/)の記事では、HHKBを使い始めたときの1週間の所感をまとめていますので参考にしてください。


{{% toc %}}

<!--more-->
{{% googleadsense %}}


## 前提

- 利用HHKB
    - [Happy Hacking Keyboard Professional HYBRID Type-S 英語配列／墨](https://amzn.to/3nR9FZA)
- 利用OS
    - Windows 10（JIS配列ノートPC）
    - macOS Mojave（US配列　MacBook Air）
    - iPadOS 14


## US配列のHHKBで複数OSを利用するときの問題点

[Happy Hacking Keyboard Professional HYBRID Type-S](https://amzn.to/3nR9FZA)は、Bluetoothで最大4端末までペアリング可能です。
接続切替には、キーボードショートカット`Fn + Ctrl + [1|2|3|4]`を利用します。
このキーボードショートカットによって、一度ペアリングした端末であれば、瞬時に切替可能です。

**「この機能を利用すれば、仕事・プライベート問わず、利用する全てのOSでHHKBを有効活用できる」**

そんな万能感に包まれながら、しばらくUS配列のHHKBを、複数OS（Windows、macOS、iPadOS）で利用してみたところ、私の使い方においては次の問題点が見えてきました。

- 同一キーボードで複数OSを利用する場合、脳が今、どのOSを利用しているのかわからなくなる
- 今どのOSを利用しているのかわからなくなるため、OSごとの異なるキーボードショートカットにストレスを感じる


HHKBという同一キーボードで複数OSを使用すると、キーボードショートカットがWindowsとmacOSで混ざってしまうのです。
たとえば、Windowsを利用していてmacOSのctrl+nでのカーソル移動を使ってしまったり、macOSでWindowsのキーでコピー&ペーストを行なったりしてしまいます。

複数OSを別のキーボードで使用していたときには、入力方式の違いに戸惑ったことはありませんでした。
どうやら、物理キーボードの違いというフィジカルなフィードバックによって、脳（指）が入力方式を切り替えているようです。

OSが変わっても同じキーボードを利用できることが逆に入力を妨げてしまっています。
これでは、せっかくのHHKBの力を発揮できないため、設定を見直しました。

## HHKBで実現したいこと

- なるべく少ない設定変更で、違和感なく複数OS（Windows, macOS, iPadOS）を利用する
- macOSで実現している日本語の入力切替（トグルではなく、左・右の⌘キーでON/OFF切替）をWindowsとiPadOSに持ち込む

## HHKBの設定と各OSの設定

ポイントは次の点です。

- [キーマップ変更ツール]で、Macモードのキーバインドを変更し、英字／かな入力を可能とする
- Windows、macOSはWinモード、iPadOSはMacモードを利用する
- Windowsでは[AutoHotKey]、macOSでは[Karabiner-Elements]で、日本語入力ON/OFF切替を設定する

それぞれの設定方法を詳しく説明します。

### HHKBの設定

HHKB本体の設定です。私のお勧めの設定は次のとおりです。

- HHKBのDIPスイッチ
  - Winモード（SW1: ON／SW2: OFF）
  - DeleteをBSへ切り替え（SW3：ON）
- HHKBのキーマップ変更ツールでMacモードを次のとおり変更する
  - 左◇：「英数」、右◇：「かな」


HHKBには、DIPスイッチと呼ばれる物理スイッチが背面にあり、そのスイッチのON/OFFでキーボードの動作を変更できます。
たとえば、SW1/SW2の組み合わせによって「◇キー」をWindowsキーにする「Winモード」や「◇キー」を⌘（Command）キーにする「Macモード」などがあります。


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1610542637/hhkb-config-dip-switch_lrauat.png" w="600" h="340" alt="HHKB DIPスイッチ 設定" %}}

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1610542637/hhkb-config-dip-switch-2_tr0m9x.png" w="600" h="207" alt="HHKB DIPスイッチ 設定 2" %}}


詳しくは、[Happy Hacking Keyboard | ダウンロード | PFU](https://happyhackingkb.com/jp/download/)のマニュアルを参照してください。  

また、[キーマップ変更ツール]を利用し、キーボード自体のキーマップを変更できます。
iPadOS用に、Macモードを次の図のとおり変更します。
この設定により、iPadOSでMacモードでに切替左◇で「英数」、右◇で「かな」で日本語入力ON/OFFを実現できます。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1610543175/MacMode_xnmkuu.png" w="1024" h="725" %}}




### Windowsの設定

<!-- textlint-disable jtf-style/4.2.6.ハイフン(-) -->

- HHKBはWinモードで利用
- [AutoHotKey]で次のマッピング変更
  - 左Windows =>「無変換キー」
  - 右Windows =>「変換キー」
  - 右ALT =>「右Winキー」
- コントロールパネルから次の設定
  - JIS配列からUS配列に切替（JIS配列のキーボードを利用しているため）
- 「Microsoft IMEの詳細設定」で
    - ［変換］キーに機能として「IME-オン」、［無変換］キーに「IME-オフ」を割当
- Macで当たり前のように使っていたCtrl+nなどでの移動は、HHKBのFnキーを組み合わせた矢印で代用

<!-- textlint-enable jtf-style/4.2.6.ハイフン(-) -->

Windowsでは、Winモードを利用します。

[AutoHotKey]を利用しているのは、日本語切替のON/OFFを「半角/全角」のトグルではなく、左右の変換/無変換キーで切り替えられるようにするためです。
これによって、今自分がかな入力モードにいるのか半角入力モードにいるのかを意識せずに、日本語と英字の入力切替ができるようになります。

Mac利用時に多用していた`ctrl + n`などでのカーソル移動は、HHKBのFnを使った矢印キーで代用します。


### macOSの設定

- HHKBはWinモード
- キーボード設定でControlキーとCommandキーを入れ替え（CommandをControlに、ControlをCommandに変更）
- Karabiner-Elementsで次の設定
  - Bluetoothキーボードが有効な場合は、内蔵キーボードは無効化（これにより、尊師スタイルを可能とする）
  - 左Command単体押しで、英語切替
  - 右Command単体押しで、日本語切替


macOSでは、Winモードを利用します。

キーボード設定でControlキーとCommandキーを入れ替えているのは、Windowsとキーボード操作をできる限り一致させるためです。
HHKB US配列では、一般的なキーボードにおいてCaps Lockが配置してあるポジションに、Controlが配置されています。
そのため、Windowsのショートカットキーで多用されるControlは左小指で押します。
一方、macOSの場合、WindowsのControlに対応する操作はCommandキーになっていることが多く、左親指で押すことになります。
ここに、微妙な違いが発生します。
キーボードのショートカットキーをできる限り統一するため、私は**macOSをWindowsへ合わせる**方向に寄せました。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1610635232/macos-hhkb-keyboard-setting_jvf3gd.jpg" w="668" h="583" %}}


[Karabiner-Elements]を利用するのは、Windowsで[AuthHotKey]を利用する理由と同じく、左右⌘キー単一押下での日本語入力ON/OFFをで実現するためです。
また、HHKBを尊師スタイルで利用するときのための設定として、HHKBのBluethooth接続が有効な場合は内蔵キーボードを無効化します。
これによって、MacBook Airの内蔵キーボードの上に直接HHKBを置いて利用しても、影響を与えません。
ただし、若干触れているようなので、キーボードブリッジのようなオプション品を揃えたいところです。


### iPadOSの設定

- iPadOSを利用する際は、Macモードに切り替える
- 設定 > 一般 > キーボード > ハードウェアキーボード > 修飾キー > HHKBを次のとおり変更
  - Controlキー => Command
  - Commandキー => Control

iPadOSでは、**Macモード**を利用します。
現時点のiPadOSでは、ソフトウェアでキーマップを変更できないため、HHKB本体のキーマップを変更して対応します。

Windowsと操作感を合わせるための修飾キーを次の図の通り、ControlキーとCommandキーを入れ替えます。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1610718666/ipados-hardware-keyboard-setting_pyaeow.png" w="1024" h="715" %}}


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1610718664/ipados-hardware-keyboard-hhkb-setting_snt2h5.jpg" w="1024" h="715" %}}



### まとめ

今回紹介した設定によって、そのキーボードショートカットも同じになることで、OS間の入力体験を統一できました。
これにより、HHKBの本来持つ快適なタイピングをストレスなく利用できます。

もしも、より良いHHKBの設定があれば教えてください。

次に狙っているのは、尊師スタイルのためのキーボードブリッジと快適な高さを出すためのパームレストですね。


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


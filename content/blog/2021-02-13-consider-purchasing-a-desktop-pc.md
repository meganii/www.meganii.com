---
title: "VR ReadyなデスクトップPCが欲しい"
date: 2021-02-13T22:45:57+09:00
lastmod: 2021-03-21T00:09:14+09:00
published: true
category: ["Gadget"]
tags: ["PC","Windows"]
comment: true
slug: "consider-purchasing-a-desktop-pc"
img: "https://res.cloudinary.com/meganii/image/upload/c_fill,f_auto,g_center,h_768,q_auto:good,w_1024/v1615812694/bjorn-agerbeek-FFsNZH75rHY-unsplash_nbfq74.jpg"
---

<amp-img src="https://res.cloudinary.com/meganii/image/upload/c_fill,f_auto,g_center,h_400,q_auto,w_1024/v1615812694/bjorn-agerbeek-FFsNZH75rHY-unsplash_nbfq74.jpg" width="1024" height="400" layout="responsive">
</amp-img>

**「MacではなくデスクトップPCが欲しい」**

新型コロナウィルスの影響で家にいることが増え、ノートPCにこだわらなくてもよくなってきた。
また、せっかく`Oculus Quest 2`を購入したのでPCVRも楽しみたい。

在宅勤務対応のため、モニターとキーボードを購入したので、あとはPC本体を購入すればOKな状態である。

このような背景もあって、デスクトップPCを購入する機運が高まり、購入対象を検討する。

{{% toc %}}

<!--more-->
{{% googleadsense %}}

## 目的

- Windows機が欲しい
- Oculus Linkを楽しみたい
- VR、Unityなどの3D開発をしてみたい
- Epic Games、SteamなどのPCゲームもやってみたい
- 豊富なフリーソフトを利用したい
- Windows再入門したい
  - Window 10
  - PowerShell
  - .NET

VRやゲームを考えないのであれば、`M1 Mac mini`一択であった。

しかし、MacでVRとゲームを行うのは至難の業。
今後は`M1 Mac`上でWindowsをエミュレートして、VRとゲームを楽しむというのもできるようになるだろうが、もう少し未来になりそうなので素直にWindows機が欲しい。

また、このところ開発機としてのWindowsもなかなか良いと聞いているので、試してみたいという目的もある。


## Oculus Link対応確認

`Oculus Quest 2`をPCと接続して、PCVRを実現する`Oculus Link`の要求スペックを確認する。

[Oculus Linkの互換性](https://support.oculus.com/444256562873335/)


OSがWindows 10のみというのがポイントで、今までMacだと門前払いであった。



### 要件

| コンポーネント           | 推奨スペック                          | 
| ------------------------ | ------------------------------------- | 
| プロセッサ               | Intel i5-4590 / AMD Ryzen 5 1500X以上 | 
| グラフィックカード       | 以下のGPUの表を参照                   | 
| メモリ                   | 8GB以上のRAM                          | 
| オペレーティングシステム | Windows 10                            | 
| USBポート                | USBポートx1                           | 

### GPUサポート（NVIDIA）

| NVIDIA GPU                               | サポートされている | 現在サポートされていない | 
| ---------------------------------------- | :----------------: | :----------------------: | 
| NVIDIA Titan Z                           |                    | ✔                       | 
| NVIDIA Titan X                           | ✔                 |                          | 
| NVIDIA GeForce GTX 970                   | ✔                 |                          | 
| NVIDIA GeForce GTX 1060デスクトップ、3GB |                    | ✔                       | 
| NVIDIA GeForce GTX 1060デスクトップ、6GB | ✔                 |                          | 
| NVIDIA GeForce GTX 1060M                 |                    | ✔                       | 
| NVIDIA GeForce GTX 1070 (すべて）        | ✔                 |                          | 
| NVIDIA GeForce GTX 1080 (すべて）        | ✔                 |                          | 
| NVIDIA GeForce GTX 1650                  |                    | ✔                       | 
| NVIDIA GeForce GTX 1650 Super            | ✔                 |                          | 
| NVIDIA GeForce GTX 1660                  | ✔                 |                          | 
| NVIDIA GeForce GTX 1660 TI               | ✔                 |                          | 
| NVIDIA GeForce RTX 20シリーズ（すべて）  | ✔                 |                          | 


### GPUサポート（AMD）

| AMD GPU          | サポートされている | 現在はサポートされていない | 
| ---------------- | :----------------: | :------------------------: | 
| AMD 200シリーズ  |                    | ✔                         | 
| AMD 300シリーズ  |                    | ✔                         | 
| AMD 400シリーズ  | ✔                 |                            | 
| AMD 500シリーズ  | ✔                 |                            | 
| AMD 5000シリーズ | ✔                 |                            | 
| AMD Vegaシリーズ | ✔                 |                            | 


## VR Chat Readyなスペック

[【2021年3月版】約3年間プレイしてきて分かった、VRChatを快適に遊ぶためPCスペックはコレだ！ \| こはろぐ](https://kohavrog.com/vrchat-pcspec/)を参考に、以下をベースラインとして定めた。

- CPU	intel Core i5 8700～ / AMD Ryzen 5 2600～
- メモリ	16GB～
- グラフィック	GTX 1060～

## 【OS】Windows 10 Home or Pro

個人用途であれば、以下の2点を意識すればよい。

1. Hyper-Vの利用有無
2. リモートデスクトップの利用有無

開発環境として`WSL（Windows Subsystem for Linux）`を利用する場合、`Hyper-V` が必要となる都合上、`Windows 10 Pro`以上である必要があった。
しかし、今現在の`WSL2`では`Hyper-V`は不要となり、必ずしも`Windows 10 Pro`である必要はない。

仮想環境として`Hyper-V`を使い倒す想定がなければ、`Windows 10 Home`で十分だ。


ビジネス用であれば`Active Directory`への参加や、`Bitlocker`の利用は必要かもしないが、個人用では必須ではない。
唯一悩むとしたら、リモートデスクトップの有無である。
もしも、iPadやMacBookAirから母艦Windowsにリモートデスクトップするシーンが考えられるのであれば`Windows 10 Pro`も考慮すべき。


わたしは、iPad Proを利用してリモートデスクトップができたらよい。
仕事の検証用として`Windows 10 Pro`の環境があれば嬉しいぐらいの位置づけとした。


- [Windows 10 Home と Pro の違い \| Microsoft Windows](https://www.microsoft.com/ja-jp/windows/compare-windows-10-home-vs-pro)
- [Windowsで開発](https://r7kamura.com/articles/2020-09-28-development-on-windows)



## 【組立・購入方法】自作　or　BTO（Build To Order）

今回を機に自作PCへチャレンジするかどうか悩んだ。
しかし、調べるほど自分がいかにPCに疎いかを実感し、自作PCは諦めてBTO製品の中から選ぶことにした。

考えてみれば大学以来ずっとMacを利用してきた。Macで考えることは、モデルとIntel CPUとメモリのスペックをどうするかだけである。
そこからいきなりマザーボード、CPU、GPU、メモリ、筐体カバー、電源、SSD/HDDなど一から適切な構成を選べる自信はなかった。

よって、BTO製品を選定する方針とした。


## 【CPU】 intel or AMD

今までintelのCPUしか使ったことがなかったため、コストパフォーマンスが高いと言われている`AMD Ryzen`も積極的に試したい。


## 【GPU】 NVIDIA or AMD

ディープラーニングを行う際、`CUDA`というキーワードを聞いていたので、可能なら`NVIDIA`を選択したい。
また、ゲーミングの用途においても、`NVIDIA`がGPUの世界を先行してきたこともあり、サポートも多いという判断。

## 【メモリ】

最低16GBをベースラインに、あとは値段と相談。


## 予算

上を見ればキリがない。
M1 Mac miniが8万円台なので、10万円前後に抑えたい。

## 検討したPC

### Lenovo

まずはTwitterのTLで流れてきた次の3タイプを確認した。

- ThinkCentre M75q
- ThinkCentre M75s
- ThinkCentre M75t

確かにコスパは良いが、「VR Ready」という観点で見ると、候補から外れる。
検討するとすれば、「Legion T550i」と「Legion T550」の2つである。

購入時は楽天リベーツを経由することで、楽天ポイントを獲得できる点は覚えておきたい。


#### ThinkCentre M75q Tiny Gen2

最初目にしたのは、Twitterで話題の「ThinkCentre M75q」だ。
価格コム経由で申し込むことにより、コスパ最高になるという触れ込みどおり確かに安い。

VRやゲーム用途を考えないのであれば選択肢に入るのだが、「VR ReadyなPCか」という観点だと対象外にならざるを得ない。

<a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3340975&pid=887018325&vc_url=https%3A%2F%2Fwww.lenovo.com%2Fjp%2Fja%2Fdesktops%2Fthinkcentre%2Fm-series-tiny%2FThinkCentre-M75q-Gen-2%2Fp%2F11TC1MTM7G2%3Fcid%3Djp%3Aaffiliate%3Adsry7f" rel="nofollow">
  <amp-img src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3340975&pid=887018325" height="1" width="0" layout="fixed"></amp-img>
  <amp-img src="https://www.lenovo.com/medias/lenovo-laptop-thinkcentre-m75q-gen-2-hero.png?context=bWFzdGVyfHJvb3R8MTQxMzY5fGltYWdlL3BuZ3xoN2UvaGVlLzExMTM1OTYzMjM0MzM0LnBuZ3w5OGQzMmQyOTZlMDA3OGNjMjE5ZmIyZDdiNzg0NzI5YTRlMjg1NGJmZWNlNjg1YzkwZTQzODJkZTg4MWExNDM2" layout="responsive" height="515" width="725" sizes="(min-width: 600px) 30vw, 100vw"></amp-img>
</a>

#### ThinkCentre M75t Mini-Tower Gen2

次に見たのは「ThinkCentre M75t」だ。
GPUを変更すれば要望を満たせそうだが、筐体が結構大きそうなことと、BTOで買うのにわざわざ後からパーツを載せ替えるのは手間だと思い候補から外した。

<a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3340975&pid=887017295&vc_url=https%3A%2F%2Fwww.lenovo.com%2Fjp%2Fja%2Fdesktops%2Fthinkcentre%2Fm-series-towers%2FThinkCentre-M75t-Gen-2%2Fp%2F11TC1MDM75T%3Fcid%3Djp%3Aaffiliate%3Adsry7f" rel="nofollow">
  <amp-img src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3340975&pid=887017295" height="1" width="0" layout="fixed"></amp-img>
  <amp-img src='https://www.lenovo.com/medias/lenovo-laptop-thinkcentre-m75t-gen-2-hero.png?context=bWFzdGVyfHJvb3R8MTI2NzMzfGltYWdlL3BuZ3xoMzUvaDRkLzExMTM1MjY3MTEwOTQyLnBuZ3wwNTA1ZGQ0YTY4MjAyZjQzMzYxZjIxMTNiMTMyMGVhZTk1MGQwY2E3NTM3ODJiOTRiMTNkMTAxNDEyYzJlMmZl' layout="responsive" height="515" width="725" sizes="(min-width: 600px) 30vw, 100vw"></amp-img>
</a>


#### Legion T550i or Legion T550

素直にLenovoでゲーミングPCを探すなら「Legion」シリーズになるであろう。
なかなか良さそうなので、最終候補まで残した。

`Legion T550i`はIntel Coreプロセッサ、`Legion T550`はAMD RyzenプロセッサとCPUによって命名が異なる。

<a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3340975&pid=887018325&vc_url=https%3A%2F%2Fwww.lenovo.com%2Fjp%2Fja%2Fdesktops%2Flegion-desktops%2Flegion-t-series%2FLenovo-Legion-T5-28IMB05%2Fp%2F99LE9500351%3Fcid%3Djp%3Aaffiliate%3Adsry7f" rel="nofollow">
  <amp-img src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3340975&pid=887018325" height="1" width="0" layout="fixed"></amp-img>
  <amp-img src='https://www.lenovo.com/medias/lenovo-jp-legion-t550i-intel-2020-0819.png?context=bWFzdGVyfHJvb3R8OTg2NjF8aW1hZ2UvcG5nfGgzMy9oZjAvMTEwNTgxOTEyNjk5MTgucG5nfGEzZjBjMjE0OTIzNzFkY2NkOWU0OTczMjVlZjI4MDIzMzRhNzI4NWExMTIxNzA5N2ZmNmRlMGFkOGQ3YzFkY2I' layout="responsive" height="463" width="653" sizes="(min-width: 600px) 30vw, 100vw"></amp-img>
</a>


### HP

HPのゲーミングデスクトップPCは、次の2つを候補に挙げた。

- Pavilion Gaming Desktop TG01
- OMEN by HP

HPは、週末セールやキャンペーンが行われているので、よく見ておくこと。
納期遅延のリスクがあるため、すぐに必要な場合は注意が必要。


#### Pavilion Gaming Desktop TG01


- [Pavilion Gaming Desktop TG01（インテル）](https://click.linksynergy.com/fs-bin/click?id=XQClM5NEHeo&offerid=252926.1408&type=3&subid=0)<amp-img layout="fixed" width="1" alt="" height="1" src="https://ad.linksynergy.com/fs-bin/show?id=XQClM5NEHeo&bids=252926.1408&type=3&subid=0"></amp-img>
- [Pavilion Gaming Desktop TG01（AMD）](https://click.linksynergy.com/fs-bin/click?id=XQClM5NEHeo&offerid=252926.1409&type=3&subid=0)
<amp-img layout="fixed" width="1" alt="" height="1" src="https://ad.linksynergy.com/fs-bin/show?id=XQClM5NEHeo&bids=252926.1409&type=3&subid=0"></amp-img>


{{% amazon B08LVKLTW7 %}}


#### OMEN by HPシリーズ

- [OMEN by HPシリーズ](https://click.linksynergy.com/fs-bin/click?id=XQClM5NEHeo&offerid=252926.901&type=3&subid=0)<amp-img layout="fixed" width="1" alt="" height="1" src="https://ad.linksynergy.com/fs-bin/show?id=XQClM5NEHeo&bids=252926.901&type=3&subid=0"></amp-img>
  - OMEN 25L Desktop
  - OMEN 30L Desktop


{{% amazon B08YRLC46W %}}

{{% amazon B08YQH8RFZ %}}







## まとめ

- これを機会に自作PCの世界へ足を踏み入れようとも考えたが、結局BTO製品が安くて良さそうという考えに至った
- いままで、GPUなどのパーツにはこだわりがなかったため、知識が全然ないことを自覚した
 - とくに、CPU / GPU
  - Ryzenシリーズ、Intelシリーズの見分けがまったくわからん
  - メモリ、SSD/HDDもわからない
  - 今回いろいろと見比べる中で少しは知識がついた

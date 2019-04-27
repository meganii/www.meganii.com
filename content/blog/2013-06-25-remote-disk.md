---

title: リモートディスクを利用してMacBookProのDVDドライブからMacBookAirにソフトウェアをインストール
date: 2013-06-25T20:45:00+09:00
category: ['Tech']
tags: ['Mac']
published: true
slug: remote-disk
---

MacBookAirには、CD/DVDドライブがついていない。過去のソフトをどうやって新しく買ったインストールしようかと思って、なんとかMacBookProのDVDドライブを使えないか調べてみると、「リモートディスク」が使えるっぽい。

[Mac で別のコンピュータの CD／DVD ドライブを使う \- Apple サポート](https://support.apple.com/ja-jp/HT203973)
早速、iWorkをリモートディスクを使ってインストールしてみた。

{{% googleadsense %}}

## 1.まずMacBookPro側でリモートディスクを有効にする

システム環境設定の共有から

{{% img src="https://farm6.staticflickr.com/5337/9132825549_538b90ce83.jpg"  alt="システム環境設定" w="450" h="383" %}}

DVDまたはCD共有を選択

{{% img src="https://farm3.staticflickr.com/2828/9135024638_03421750e2.jpg"  alt="リモートディスク" w="450" h="383" %}}


## 2.MacBookProでネットワークを作成

適当にパスワードを作って、ネットワークを作成します。


{{% img src="https://farm8.staticflickr.com/7352/9133002529_139f7d77db.jpg" w="364" h="66" alt="Create Network1" %}}


{{% img src="https://farm4.staticflickr.com/3779/9133002547_264b7cb6a4.jpg"  alt="Create Network2" w="450" h="358" %}}


### ご参考

- [旧Macbookから新Macbookへの移行を高速に行う方法\(WiFi経由\) \| 想造ノート](https://souzou.motta.jp/2013/06/18/191/)


## 3.MacBookAir側でリモートディスクの使用依頼をMacBookProに送る

先ほど、MacBookProで作成したネットワークに接続すると、リモートディスクから、MacBookProが見えているはずです。


{{% img src="https://farm4.staticflickr.com/3811/9133002597_c906d1e466.jpg" alt="RemoteDisk2" w="450" h="358" %}}


このMacBookProをクリックして、右上の使用を依頼を押す。

{{% img src="https://farm4.staticflickr.com/3707/9135222996_86c1f006ed.jpg" alt="RemoteDisk" w="400" h="385" %}}


## 4.MacBookPro側で許可する

これで、MacBookProにCDを入れると、MacBookAir側で認識することができました。


あとは、好きにソフトをインストールするだけです。


## 注意

ただし、以下のタイプのディスクや操作は、DVD または CD 共有でサポートされていないそうです。

- DVD ムービー
- オーディオ CD
- ゲームディスクなど、コピーガード (複製防止機能) がかかっているディスク 
- Microsoft Windows (Boot Camp で使用) または Mac OS X などのオペレーティングシステムのインストールディスク。
- CD または DVD の作成	

音楽CDぐらい取り込ませてくれてもいいのにね。

でも、これで、無駄にDVDドライブを買わずにすみました。もしも、困っていらっしゃる方がいたらぜひお試しください。

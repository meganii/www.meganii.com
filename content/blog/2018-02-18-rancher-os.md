---
title: "ConohaVPSでCoreOSやRancherOSを入れる際に困ったこと"
date: 2018-02-18T21:54:35+09:00
lastmod: 2018-02-18T21:54:35+09:00
comments: true
category: ['Tech']
tags: ['RancherOS']
published: true
slug: rancher-os
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

## CoreOS

- 久しぶりにCoreOSを入れ直そうと、ISOからBootさせてインストールを行ったところ、失敗。メモリが2GBが必要になってきたのかもしれない。
- 昔保存したv1500ぐらいのイメージから、アップデートすれば最新版にできたが、直接最新版にするとインストール失敗した。

<!--more-->
{{% googleadsense %}}


## RancherOS

以下のコマンドを実行してもダウンロードできなかった。

```
conoha-iso download -i https://releases.rancher.com/os/latest/rancheros.iso
```

下記情報がヒットしたので、Conoha側が未対応のようです。

> APIからダウンロードする際は、ISOイメージが保存されているディレクトリがhttp接続でリスト表示できる必要がある  
[ConoHaでISOダウンロードが出来なかった件 \- Qiita](https://qiita.com/marukei/items/6b6ccee3e7a553f64f1e)


- Dropboxにアップロードしてもダメだった。
- 適当なファイルホスティングを利用して、実行したところダウンロードできた。


### `sudo passwd rancher`でパスワードを変えても、再起動後にリフレッシュされてしまう

> `--append "rancher.password=password"` RancherOS起動時にRancherOS の rancher ユーザーのパスワードを password に変更する。  
[RancherOS で インストール後パスワードでログインする方法 \- Qiita](https://qiita.com/FoxBoxsnet/items/127354c03b55a161a35b)


## そもそも /dev/sda と /dev/vdaの違いは？

- 完全仮想化と準仮想化の違い
- 一般的に、完全仮想化より準仮想化の方がパフォーマンスが高い

{{% quote %}}
Full Virtualization vs. Paravirtualization

`/dev/sda` is the first detected disk of IDE/SATA/SCSI type. In this case, emulated(full virtualized) by the hypervisor.

`/dev/vda` is the first detected paravirtualizated disk driver. It is faster than emulated sdX devices if both are referred to the same disk, because there are less overhead in its operation compared to an emulated drive.

[virtualization \- what is the difference between /dev/vda and /dev/sda \- Server Fault](https://serverfault.com/questions/803388/what-is-the-difference-between-dev-vda-and-dev-sda)
{{% /quote %}}


{{% quote %}}
They're different devices.

/dev/sda is the first disk that's either SCSI or (more likely) providing the SCSI drive API to user land. This includes SATA drives and IDE drives using libata. This can also be an IDE/SATA/SCSI/etc. drive emulated by the hypervisor.

/dev/vda is the first disk using the virtualization-aware disk driver. The performance should be much better, as the hypervisor doesn't have to emulate some hardware interface.

If the disk has been exposed to your VM under both interfaces, you should prefer /dev/vda as it'll almost certainly be faster.

[udev \- Difference between sdX and vdX \- Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/145332/difference-between-sdx-and-vdx)
{{% /quote %}}


{{% quote %}}
/dev/sdx and /dev/hdx are physical (hard) disk drives or emulated physical (hard) disk drives. When the kernel or some program I/O's to these, it does all sorts of things like bringing the disk to the right spot and doing all sorts of physical-specific "stuff."

/dev/vdx is for virtual (hard) disk drives. All the kernel does when it is I/O'd to is tell the virtualization software that bits need to be read/written and it's done. In general, vdx is faster because the kernel doesn't need to tell the hard drive to do a whole bunch of random junk that really shouldn't be needed because it just needs to tell the VM hypervisor to do stuff.

I apologize for the word "stuff," I couldn't think of a better word :D

[udev \- Difference between sdX and vdX \- Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/145332/difference-between-sdx-and-vdx)
{{% /quote %}}
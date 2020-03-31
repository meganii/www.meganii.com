---
title: "CoreOSのリリースバージョンをstableからalphaに変更"
date: 2017-09-24T20:08:41+09:00
lastmod: 2017-09-24T20:08:41+09:00
comments: true
category: ['Tech']
tags: ['CoreOS']
published: true
slug: change-release-channels-for-coreos
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

現在、Conoha VPSにCoreOSを入れて運用していますが、CoreOS Stableだと`docker-compose`のversion 3記法が使えなかったので、えいやっとRelease ChannelsをAlphaに変更しました。

趣味で使っているだけなので問題ないと思いますが、しばらく様子を見たいと思います。



<!--more-->
{{% googleadsense %}}


## Release Channelsをstable alphaに変更

```
sudo vim /etc/coreos/update.conf
```

```diff
-GROUP=stable
+GROUP=alpha
REBOOT_STRATEGY=best-effort
```


## 再起動

```
sudo reboot
```

変更後、問題なく`alpha`に変更されていました。

```
Container Linux by CoreOS alpha (1535.2.0)
$
```

## 手動アップデート

```
sudo update_engine_client -update
```

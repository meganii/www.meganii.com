---
title: "Vivaldiのスワイプで戻る・進むを有効にする"
date: 2017-03-02T22:15:35+09:00
lastmod: 2022-10-16T12:51:02+09:00
comments: true
category: ['Tech']
tags: ['Vivaldi','browser']
slug: vivaldi-swipe-gestures
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

Vivaldiを試しに使ってみているのだが、スワイプで戻る・進むができなかったのでマウスジェスチャーを調べた。
VivaldiもChromium browserをベースにしているため、以下のコマンドをターミナルから実行すればO.K.

> Since Vivaldi is based on the Chromium browser, most solutions for Google Chrome also works on Vivaldi too. I took the answer from here and applied it to Vivaldi. Just had to find what Vivaldi's .plist file was and use that instead.

<!--more-->
{{% googleadsense %}}

### スワイプを有効にする

```
defaults write com.vivaldi.Vivaldi.plist AppleEnableSwipeNavigateWithScrolls -bool TRUE
```

### スワイプを無効にする

```
defaults write com.vivaldi.Vivaldi.plist AppleEnableSwipeNavigateWithScrolls -bool FALSE
```

## 参考

- [Mouse/Trackpad swipe gesture history back and forward \| Vivaldi Forum](https://forum.vivaldi.net/topic/4881/mouse-trackpad-swipe-gesture-history-back-and-forward)
- [How to Disable Swipe Navigation Gestures in Google Chrome for Mac](https://osxdaily.com/2015/05/09/disable-swipe-navigation-google-chrome-mac/)

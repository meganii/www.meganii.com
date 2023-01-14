---
title: "Enable swipe by using Vivaldi"
date: 2017-03-02T22:15:35+09:00
lastmod: 2022-10-16T12:51:02+09:00
comments: true
category: ['Tech']
tags: ['Vivaldi','browser']
published: true
slug: vivaldi-swipe-gestures
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

I'm using Vivaldi web browser, but I can't back history or forward histoy by swiping. So, I find the solution.

> Since Vivaldi is based on the Chromium browser, most solutions for Google Chrome also works on Vivaldi too. I took the answer from here and applied it to Vivaldi. Just had to find what Vivaldi's .plist file was and use that instead.

<!--more-->
{{% googleadsense %}}

### Enable Swipe

```
defaults write com.vivaldi.Vivaldi.plist AppleEnableSwipeNavigateWithScrolls -bool TRUE
```

### Disable Swipe

```
defaults write com.vivaldi.Vivaldi.plist AppleEnableSwipeNavigateWithScrolls -bool FALSE
```

## Reference

- [Mouse/Trackpad swipe gesture history back and forward \| Vivaldi Forum](https://forum.vivaldi.net/topic/4881/mouse-trackpad-swipe-gesture-history-back-and-forward)
- [How to Disable Swipe Navigation Gestures in Google Chrome for Mac](http://osxdaily.com/2015/05/09/disable-swipe-navigation-google-chrome-mac/)


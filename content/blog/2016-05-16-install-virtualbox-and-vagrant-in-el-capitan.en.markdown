---
title: "How to install Virtualbox and Vagrant by installing by cli with Mac El Capitan"
date: 2016-05-16T20:50:35+09:00
lastmod: 2017-01-01T21:50:35+09:00
comments: true
category: ['Tech']
tags: ['El Capitan','Mac']
published: true
slug: install-virtualbox-and-vagrant-in-el-capitan
img: "https://farm8.staticflickr.com/7385/26774309130_925fdae08f_t.jpg"
---

## Environment

- El Capitan Version 10.11.4


## Problem

I faced below message after downloading dmg file and double-clicking Vagrant.pkg or Virtualbox.pkg.

{{% img src="https://farm8.staticflickr.com/7385/26774309130_925fdae08f.jpg" w="500" h="178" %}}

<!--more-->
{{% googleadsense %}}


## Cause

I can't install because System Integrity Protection(SIP).

### Reference
[virtualbox.org • View topic - [INSTALL] Verifying "VirtualBox.pkg"... never clears -- El Cap 10.11.4](https://forums.virtualbox.org/viewtopic.php?f=8&t=77122)


## Solution

1. Disable System Integrity Protection(SIP)
2. Install with command `sudo installer`

Now, I explain "2. Install with command `sudo installer`".

## How to install

### 1.Mount

```
hdiutil mount VirtualBox-5.0.18-106667-OSX.dmg
```

### 2.Install

```
sudo installer -pkg /Volumes/Vagrant/Vagrant.pkg -target /Volumes/Macintosh\ HD
```

### 3.Unmount

```
hdiutil mount VirtualBox-5.0.18-106667-OSX.dmg
```

## Conclusion

I'm able to install clearly the above ways.

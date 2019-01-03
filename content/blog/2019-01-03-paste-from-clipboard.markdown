---
title: "macOSでClipboardから画像をペーストする"
date: 2019-01-03T12:17:55+09:00
lastmod: 2019-01-03T12:17:55+09:00
comments: true
category: ['Tech']
tags: ['Visual Studio Code']
published: true
slug: paste-from-clipboard
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_75/v1514031264/thumbnail_tech.png"
---

Visual Studio Code Extensionを作成するために、調べた結果をまとめます。


<!--more-->
{{% googleadsense %}}

macOSでClipboard操作を行うときに分かったこと。

- `pbpaste`はImageはペーストできない（Textのみ）
    - [macos - Binary (image) data clipboard (OS X) - Stack Overflow](https://stackoverflow.com/questions/3146692/binary-image-data-clipboard-os-x)
- Electronには、`clipboard`のAPIが存在するが[[Visual Studio Code]](https://scrapbox.io/meganii/Visual_Studio_Code)からは(まだ)利用できないっぽい
    - [clipboard | Electron](https://electronjs.org/docs/api/clipboard)


## 対応方法

- 1. [AppleScript](https://scrapbox.io/meganii/AppleScript)を利用する
- 2. Electron APIを利用する
    - [njleonzhang/vscode-extension-mardown-image-paste: read the image from system clipborad, optimize the size, upload to CDN, and return you the CDN link.](https://github.com/njleonzhang/vscode-extension-mardown-image-paste) のExtensionを見ると、Electron APIを利用してやりたいことがほぼできているのだけれど、`electron-image-ipc-server`を別途動かしておかない
- 3. `pngpaste`を利用する
    - [jcsalterego/pngpaste: Paste PNG into files, much like pbpaste does for text.](https://github.com/jcsalterego/pngpaste)
    - 別途`brew install`が必要

Visual Studio CodeのExtensionで完結しないのはいかがなものかと思い、「1.AppleScriptを利用する」で実装することにしました。

## AppleScriptでClipboradの画像をpng保存する

そういえば、AppleScriptを書いたことがなかったので、調べながら書きました。基本的には、[mushanshitiancai/vscode\-paste\-image: paste image from clipboard to markdown/asciidoc directly\!](https://github.com/mushanshitiancai/vscode-paste-image)を参考にさせていただき作成しました。

{{% gist 525a3303f0ff1d0970848db28bdf31a3 %}}


---
title: "macOSでClipboardの画像を保存する"
date: 2019-01-03T12:17:55+09:00
lastmod: 2019-01-03T12:17:55+09:00
comments: true
category: ['Tech']
tags: ['Visual Studio Code', 'macOS']
published: true
slug: paste-from-clipboard
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

Visual Studio Code Extensionを作成するために、調べた結果をまとめます。

<!--more-->
{{% googleadsense %}}

## macOSでClipboard操作について分かったこと

- `pbpaste`はImageはペーストできない（Textのみ）
    - [macos - Binary (image) data clipboard (OS X) - Stack Overflow](https://stackoverflow.com/questions/3146692/binary-image-data-clipboard-os-x)
- Electronには、`clipboard`のAPIが存在するが[[Visual Studio Code]](https://scrapbox.io/meganii/Visual_Studio_Code)からは(まだ)利用できないっぽい
    - [clipboard | Electron](https://electronjs.org/docs/api/clipboard)


## 対応方法

- 1. [AppleScript](https://scrapbox.io/meganii/AppleScript)を利用する
- 2. Electron APIを利用する
    - [njleonzhang/vscode-extension-mardown-image-paste: read the image from system clipborad, optimize the size, upload to CDN, and return you the CDN link.](https://github.com/njleonzhang/vscode-extension-mardown-image-paste) のExtensionを見ると、Electron APIを利用してやりたいことがほぼできているのだけれど、`electron-image-ipc-server`を別途動かしておかないといけない
- 3. `pngpaste`を利用する
    - [jcsalterego/pngpaste: Paste PNG into files, much like pbpaste does for text.](https://github.com/jcsalterego/pngpaste)
    - 別途`brew install`が必要

Visual Studio CodeのExtension内で完結しないのはいかがなものかと思い、「1.AppleScriptを利用する」で実装することにしました。

## AppleScriptでClipboradの画像をpng保存する

そういえば、AppleScriptを書いたことがなかったので、調べながら書きました。基本的には、[mushanshitiancai/vscode\-paste\-image: paste image from clipboard to markdown/asciidoc directly\!](https://github.com/mushanshitiancai/vscode-paste-image)を参考にさせていただき作成しました。

下記の想定です。

- pngのファイルタイプを定義
- Clipboardにpng形式が含まれている場合は、引数として渡されたファイル名として保存

filetypeについては、[ASH Planning: クリップボード活用のススメ](http://ashplanning.blogspot.com/2006/12/blog-post.html)を参照。


```bash
property fileTypes : {{% escape "{{<class PNGf>, \".png\"}}" %}}
 
on run argv
if argv is {} then
    return ""
end if

set theType to getType()
if theType is missing value then
    return "no image"
end if

set imagePath to (item 1 of argv)
try
    set myFile to (open for access imagePath with write permission)
    set eof myFile to 0
    write (the clipboard as (first item of theType)) to myFile
    close access myFile
    return (POSIX path of imagePath)
on error
    try
        close access myFile
    end try
    return ""
end try
end run

on getType()
repeat with aType in fileTypes
    repeat with theInfo in (clipboard info)
        if (first item of theInfo) is equal to (first item of aType) then return aType
    end repeat
end repeat
return missing value
end getType
```

`cmd + shift + ctl + 4`でスクリーンショットを取得した後、上記AppleScriptを`spawn`から実行すると、先ほど取得したスクリーンショットが画像として保存されます。

```javascript
import { spawn } from 'child_process';
const scriptPath = path.join(__dirname, '../script/mac.applescript');
const filepath = 'save_to_dir';
let ascript = spawn('osascript', [scriptPath, filepath]);

ascript.stdout.on('data', (data) => {
    console.log(data.toString().trim()); // filename
});
            
ascript.stderr.on('data', (data) => {
    console.error(data);
});

ascript.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
```

## 参考

- [今でも便利に使っているAppleScript集 \- ザリガニが見ていた\.\.\.。](http://d.hatena.ne.jp/zariganitosh/20111025/useful_applescript)
- [ASH Planning: クリップボード活用のススメ](http://ashplanning.blogspot.com/2006/12/blog-post.html)

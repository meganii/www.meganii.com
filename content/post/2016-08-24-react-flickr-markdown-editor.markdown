---

title: "React + ElectronでFlickr連携可能なMarkdown Editorを作った"
date: 2016-08-24T21:21:06+09:00
comments: true
category: ['Tech']
tags: ['Electron','JavaScript']
published: true
slug: react-flickr-markdown-editor
img: "https://c1.staticflickr.com/9/8555/28577511064_1d5a39a929_m.jpg"

---

[Electron \+ Mithril\.jsでFlickrアプリを作成する \- SIS Lab](https://meganii.com/blog/2016/02/28/electron-mithriljs-flickr-app/)で、自分専用のMarkdown-Editorを作りたいと思っていたので、今回Reactの勉強も兼ねて、Flickr連携できるMarkdown Editorを作成しました。

>最終的には、自分専用Markdownデスクトップアプリを、Electronで作成することが目標だ。Kobitoは便利で使ってるのだけど、そのままEvernoteに連携して欲しかったり、リンク作成の機能がまとまってると嬉しい。

>実装したい機能は、こんな感じ。Kobitoをベースに自分専用の機能を盛り込みたい。

>Markdownエディター(オートプレビュー)
Flickr連携(アップロード、リンク作成)
Evernote連携(自動保存)
Amazonリンク作成
ASP一括検索
git pushでブログデプロイ

<!--more-->
{{% googleadsense %}}

![React-Markdown-Editor](https://farm9.staticflickr.com/8455/29165784116_9084f95502_z.jpg)


## 今の機能

- Markdown記法で記載すれば、リアルタイムにプレビューできる
- Editor部分に写真をDrag & Dropすれば、Flickrにアップロードして、その画像リンクを貼ってくれる

ベースは、以下のreact-markdown-editorを参考にさせてもらった。
[uraway/react\-markdown\-editor: React \+ Electron = Markdown Editor](https://github.com/uraway/react-markdown-editor)


### Drag & Drop

デフォルトのままだと、ファイルをDrag & Dropするとそのファイル自身をWebViewで表示する挙動となるため、以下のように、デフォルトの挙動を書き換える必要がある。

```javascript
    const holder = document.getElementById('input');
    holder.ondragover = () => { return true; };
    holder.ondragleave = holder.ondragend = () => { return false; };
    holder.ondrop = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      console.log('File Path:', file.path);
      ipcRenderer.send('upload', file.path);  // file upload
      return false;
    };

```


## 苦労したところ

### Flickr認証

ファイルをDrag & Dropしたら、画像をFlickrにアップロードしようとFlickrの認証にまずつまずいた。

[Flickr Services](https://www.flickr.com/services/api/auth.oauth.html)
ひたすら、このページを見ながら格闘しました。いつもはライブラリを使って終わりのところでしたが、なかなかうまく行かず、必死にリクエストを試行錯誤しながら作成しました。



### split-pane

なかなかそれっぽく動かなかった。ドキュメントをちゃんと読むの大事

[tomkp/react\-split\-pane: React split\-pane component](https://github.com/tomkp/react-split-pane)


## 実際どうなの？

- ファイルアップロード後に、リンクを自動作成してくれるのはホント楽
- Editorとしての機能が全然ないので、ストレス(基本的なファイル操作って大事)


## 残り実装したい機能

- ファイル操作周りの実装
- アイコンをつくる
- frontformatterはメタ情報としてそれっぽく表示させる
- ファイルツリーの表示
- シンタックスハイライト(Aceエディタの導入)

---
title: "SharePoint上のファイルパスを取得するブックマークレット"
date: 2022-05-16T20:09:13+09:00
lastmod: 2022-05-17T18:56:45+09:00
published: false
category: ["Tech"]
tags: ["SharePoint","Bookmarklet"]
comment: true
slug: "getting-document-path-in-share-point-by-bookmarklet"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_1024/v1594902885/tech_ben4sq.png"
---

SharePointでファイルパスを手軽に取得する方法を調査した結果を記す。

{{% toc %}}

## 要約

### 取得方法

ブックマークレットからSharePoint REST APIを利用してファイル情報を取得し、そのファイル情報を元にファイルパスを組み立てて、クリップボードにコピーする。

- SharePoint REST API `_api/web/GetFolderByServerRelativeUrl/{path}/Files`で、表示フォルダのファイル情報を取得する
- Excel, PowerPoint, Wordの場合は、`UniqueId`からリンクを組み立てる
- Excel, PowerPoint, Word以外の場合は、単純にファイルパスからリンクを組み立てる
- 各ファイルのファイルパスは、SharePointドキュメントライブラリの親フォルダパスを添える
- ファイルパスは、HTML形式でクリップボードにコピーし、テキスト形式が必要な場合は、コピー完了後のプロンプトからコピーする

### 何がうれしいか

- 複数ファイルのファイルパスをまとめて取得できる
- ファイルパスを取得するためだけに、「リンクのコピー」からぽちぽちとリンクをコピーしなくてすむ
- HTML形式でファイルパスを取得するため、OutlookやTeamsに綺麗に貼れる
- Teamsでファイル共有するとき、ファイルが自動展開される（ただし、少し手間は必要）
- Excel、PowerPoint、Wordは`UniqueId`をもとにしたリンクのため、ファイル名を変更したり、フォルダを移動したりしても機能する

<!--more-->
{{% googleadsense %}}

## モチベーション

**SharePointでもファイルサーバと同じく簡単にファイルパスを取得したい。**

現状、ファイルパスを取得するには次の手順が必要である。
1. ファイル選択
2. 「リンクをコピー」を選択
3. 「既存アクセス権を持つユーザー」を選択

これでやっと、1ファイル分のファイルパスを取得できる。
このままペタッとOutlookやTeamsに貼り付けてもよいが、そうするとファイルパスがURL展開されてファイルアイコンとファイル名に置き換わってしまう。
これでは、ファイルがどこのSharePointサイトのどのフォルダに格納されているかわからない。

たとえば、ファイルを明示的に読み取り専用として開きたい場合は、次の操作になる。
まずそのファイルが格納されているドキュメントライブラリの該当フォルダにアクセスして、対象のファイルをプレビューで開く、もしくは、ファイルダウンロードしてローカルで開く。

望ましいのは、SharePointのドキュメントライブラリのURLとファイルパスを併記することだ。
でも、これは非常に手間がかかる。誰かと共有するファイルが1つだけならまだよいが、2つ3つと増えてくると非常に面倒だ。

この作業を解決するために、SharePoint REST APIを利用したブックマークレットを用いた。

## ブックマークレットの動き

### ファイル選択時
下図のとおり、ファイルを選択した場合は、選択した分のファイルのパスを取得する。
![ファイル選択時の動き](https://res.cloudinary.com/meganii/image/upload/v1652700500/3ee2efda3a05d2ab8b8bbb482a656aed_kbxk9q.png "=1497x414")

Outlookに貼った場合は、下図のとおりファイルアイコンとファイル名が展開される。
![ファイル選択時に生成されるHTML形式のリンク](https://res.cloudinary.com/meganii/image/upload/v1652700577/cea0869f99918ec53be4181270bf117e_wamfdh.png "=673x297")
Wordファイルは、`_layouts/15/Doc.aspx?sourcedoc={UniqueId}`形式のパスになっている。


### ファイル未選択時
下図のとおり、ファイルを選択しない場合は、表示しているドキュメントフォルダ直下のファイル一覧のパスを取得する。
![ファイル未選択時の動き](https://res.cloudinary.com/meganii/image/upload/v1652700685/03e123c91a18389440ef95ddd47b5317_yr4ayr.png "=1260x411")

Outlookに貼った場合、Word、PowerPoint、Excel以外のファイル、ここではPDFは、通常のドキュメントライブラリのパスになっている。

![ファイル未選択時に生成されるHTML形式のリンク](https://res.cloudinary.com/meganii/image/upload/v1652700738/55016c38f29430ea67d4c588adf91c86_ukjlyu.png "=697x312")


## ブックマークレット

用いたブックマークレットは下記のとおり。

```javascript
javascript: (async () => {
  const selectedItems = [...document.querySelectorAll('div.is-selected')].map(x => x.ariaLabel.split(',')[0]);
  const site = location.pathname.split('/')[2];
  const docList = location.pathname.split('/')[3];
  const id = new URLSearchParams(location.search).get('id') || new URLSearchParams(location.search).get('RootFolder');
  const path = id ? id.split('/').slice(3).join('/') : docList;
  const baseurl = `${location.origin}/sites/${site}`;
  const url = `${baseurl}/_api/web/GetFolderByServerRelativeUrl('${path}')/Files`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json;odata=verbose'
    }
  });
  const files = await response.json();
  let text = `<${baseurl}/${path}>\n`;
  let html = `<a href="${baseurl}/${path}">${baseurl}/${path}</a><br />`;
  for (let file of files.d.results) {
    const ext = file.Name.split('.').pop();
    const docUrl = /docx?|pptx?|xlsx?/.test(ext)
      ? `${baseurl}/_layouts/15/Doc.aspx?sourcedoc={${file.UniqueId}}`
      : `${baseurl}/${path}/${file.Name}`;
    console.log(file.Name, file.LinkingUri, file.UniqueId, docUrl);
    if (selectedItems.length === 0 || selectedItems.includes(file.Name)) {
      text = text + docUrl + '\n';
      html = html + `- <a href="${docUrl}">${file.Name}</a><br />`;
    }
  }
  const blob = new Blob([html], { type: "text/html" });
  const richTextInput = new ClipboardItem({ "text/html": blob });
  await navigator.clipboard.write([richTextInput]);
  prompt('HTML形式としてファイルパスをコピーしました。テキスト形式の場合は以下のテキストをコピーしてください。', text);
})();
```

## まとめ

ファイルパス取得の1つ1つは些細な作業だが、数が増えるとストレスを感じていた。
ずっと実現したかった動作だったので、Quality of SharePoint Lifeが爆上がりした。

Happy SharePoint Life!


## 参考

[ひと目でわかるMicrosoft 365 SharePoint運用管理編](https://amzn.to/3PqCk5E)
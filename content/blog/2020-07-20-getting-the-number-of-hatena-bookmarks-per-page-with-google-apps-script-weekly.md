---
title: "Google Apps Scriptで、ページ毎のはてなブックマーク数を週次で取得する"
date: 2020-07-20T06:12:16+09:00
lastmod: 2020-07-20T06:55:58+09:00
published: true
category: ["Tech"]
tags: ["GAS","Google Apps Script","はてなブックマーク"]
comment: true
slug: "getting-the-number-of-hatena-bookmarks-per-page-with-google-apps-script-weekly"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto/v1594902885/tech_ben4sq.png"
---

7/20現在、[Blog KPI Collector（GAS）で各種KPIを自動取得する](https://www.meganii.com/blog/2020/04/10/collecting-blog-kpi-with-google-apps-script-blog-kpi-collector/)で設定した`Google Apps Script`でサイト全体のブックマーク数を取得しています。

「はてなブックマーク数」の推移を追っていく際に、全体としてどのぐらい増えたのかは分かるのですが、どのページで増えたのかが分かりません。
そこで、ページ毎のはてなブックマーク数も合わせて取得するようにしました。

{{% toc %}}

<!--more-->
{{% googleadsense %}}

## ページ毎のはてなブックマーク数を取得する

ページ毎のはてなブックマーク数は、以下のAPIを利用することで簡単に取得できます。

[はてなブックマーク件数取得API \- Hatena Developer Center](http://developer.hatena.ne.jp/ja/documents/bookmark/apis/getcount)

このAPIを`Google Apps Script`から叩くことにしました。

```javascript
function getBookmarks(url) {
  let encodeUrl = encodeURIComponent(url);
  let response = UrlFetchApp.fetch('https://bookmark.hatenaapis.com/count/entry?url=' + encodeUrl);
  return response.getContentText();
}
```

## サイトマップからURLを抽出して逐次はてなブックマーク数を取得する

以下の`Google Apps Script`を毎週実行して、結果を貯めてみることにします。

sitemap.xmlには、通常の記事ページ以外にもタグページやカテゴリページのURLも含まれています。
そのため下記の通りURLが`https://www.meganii.com/blog`で始まるもの、かつ、被はてなブックマークが0よりも大きいものを出力するようにしています。

```javascript
function main() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('bookmarks');
  const today = Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd");
  
  const feedURL = "https://www.meganii.com/ja/sitemap.xml";
  const response = UrlFetchApp.fetch(feedURL);
  const document = XmlService.parse(response.getContentText());
  const root = document.getRootElement();
  const sitemap = XmlService.getNamespace("http://www.sitemaps.org/schemas/sitemap/0.9");
  const entries = root.getChildren("url", sitemap);
  for (let i = 0; i < entries.length; i++) {
    const url = entries[i].getChild('loc', sitemap).getText();
    const isPostPage = /^https:\/\/www\.meganii\.com\/blog/.test(url);
    if (isPostPage){
      const count = getBookmarks(url);
      if (count > 0) {
        sheet.appendRow([
          today,
          url,
          count
        ]);
      }
    }
  }
}
```

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1595142928/du4nlvuwws6jwesf6rit.png" w="922" h="435" %}}

{{% amazon B07BNB1Z9L %}}

---
title: "ScrapboxにAmazonの書影を取り込むブックマークレット"
date: 2018-04-15T22:29:00+09:00
lastmod: 2018-04-15T22:29:00+09:00
comments: true
category: ['Tech']
tags: ['Scrapbox', 'Amazon', 'ブックマークレット']
published: true
slug: scrap-amazon-image-to-scrapbox
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

Scrapboxで読書メモを管理にするにあたり、書籍の画像が欲しくなったので、参考URLのブログを参考にブックマークレットを作成しました。

久しぶりにブックマークレットを作りましたが、モダンなブラウザではES2015(ES6)が標準で使えるようになったので嬉しいですね。


<!--more-->
{{% googleadsense %}}


```javascript
javascript:(() => {
  const titleElement = document.getElementById("productTitle") || document.getElementById("ebooksProductTitle");
  if (!titleElement) return;
  const title = window.prompt('Scrap "Amazon" to your scrapbox.', titleElement.innerHTML);
  if (!title) return;
  const imageElement = document.getElementById("imageBlockContainer") || document.getElementById("ebooksImageBlockContainer");
  if (!imageElement) return;
  const image = imageElement.getElementsByTagName("img")[0];
  const imageUrl = image.getAttribute("src");
  const productUrl = document.querySelector('link[rel="canonical"]').href.replace(/amazon.co.jp\/.*\/dp/, 'amazon.co.jp/dp');
  const lines=`[${imageUrl} ${productUrl}]\n#本`;
  const body = encodeURIComponent(lines);
  const pageTitle = encodeURIComponent(title.trim());
  window.open(`https://scrapbox.io/your-project/${pageTitle}?body=${body}`);
})();
```

## 参考

- [楽天ブックス・楽天Koboから読書メモを作るBookmarklet \- Scrapboxとあそぶ \- Scrapbox](https://scrapbox.io/scrasobox/%E6%A5%BD%E5%A4%A9%E3%83%96%E3%83%83%E3%82%AF%E3%82%B9%E3%83%BB%E6%A5%BD%E5%A4%A9Kobo%E3%81%8B%E3%82%89%E8%AA%AD%E6%9B%B8%E3%83%A1%E3%83%A2%E3%82%92%E4%BD%9C%E3%82%8BBookmarklet)
- [Amazonの書籍商品ページからScrapboxに、書籍の画像付きページを作るブックマークレット \| ひびテク](https://yoshikiito.net/blog/archives/1325)
- [Scrapboxに本の情報を取り込むブックマークレットを作りました – R\-style](https://rashita.net/blog/?p=24448)


## Action

- [x] Bookmakletを使って書影をScrapboxへ送り、読書メモを追加する



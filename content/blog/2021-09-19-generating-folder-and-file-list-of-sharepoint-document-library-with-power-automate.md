---
title: "Power AutomateでSharePointドキュメントライブラリのフォルダ・ファイル一覧を生成する"
date: 2021-09-19T17:13:24+09:00
lastmod: 2023-05-05T01:24:12+09:00
published: true
category: ["Tech"]
tags: ["Power Automate","SharePoint"]
comment: true
slug: "generating-folder-and-file-list-of-sharepoint-document-library-with-power-automate"
img: "https://res.cloudinary.com/meganii/image/upload/v1632039515/dd3116d4f6bb4f64f2dd38dd485830ae_uhj78s.png"
---

`Microsoft Teams`の`Files`タブを利用していると、いつの間にかファイルがルート直下に増えてしまい、あとから見返したとき、どこに何のファイルがあるかわからなくなる課題がありました。

まずは、整理のため任意のタイミングでフォルダ・ファイル一覧を生成したいと思い、そのためのフローを作成しました。


{{% toc %}}

<!--more-->
{{% googleadsense %}}


## 完成版

### Power AutomateのFlow

![Flow](https://res.cloudinary.com/meganii/image/upload/v1632039515/dd3116d4f6bb4f64f2dd38dd485830ae_uhj78s.png "=565x306")

- 手動トリガーで実行後、`Get files (properties only)`でSharePointドキュメントライブラリのプロパティ一覧を取得
- `Select`でプロパティ一覧から必要な項目のみ抽出
- `Run script`で、抽出結果を受け取り、Excelファイルに書き出し


### フォルダ・ファイル一覧

![フォルダ・ファイル一覧](https://res.cloudinary.com/meganii/image/upload/v1632039824/79b20ca5c24a8330c2bc6c99ded1f879_ksf1mx.png "=1364x562")

- `Office Script`を利用し、Path, FileName, Linkの簡素なフォルダ・ファイル一覧を作成


### Office Script

```javascript
function main(workbook: ExcelScript.Workbook, records: File[]) {

  // 削除処理
  let table = workbook.getTable("テーブル1");
  let rowCount = workbook.getTable("テーブル1").getRowCount();
  table.deleteRowsAt(0, rowCount);

  // Power Automateから受け取ったファイル一覧をもとに追加
  let selectedSheet = workbook.getActiveWorksheet();
  let rownum = 1;
  for (let record of records) {
    if (record.IsFolder) {
      selectedSheet.getCell(rownum, 0).setValue(record.FullPath);
    } else {
      selectedSheet.getCell(rownum, 0).setValue(record.Path);
      selectedSheet.getCell(rownum, 1).setValue(record.File);
    }
    selectedSheet.getCell(rownum, 2).setFormula('=HYPERLINK("' + record.Link + '", "Link")');
    rownum++;
  }
}

interface File {
  "Path": string,
  "File": string,
  "FullPath": string,
  "Link": string,
  "IsFolder": boolean
}
```

- `main`関数に`records`などの引数を追加することで、`Power Automate`側からデータを受け取れる
- `interface`で型を定義できる


## Power AutomateのFlow作成での学び

`Get files (properties only)`を利用することで、SharePointドキュメントライブラリの一覧を取得できるのは当たりが付いていました。しかし、その後、`Power Automate`での変数操作、配列操作に不慣れで試行錯誤のため時間を費やしました。

`Power Automate`でやりたいことを実現するためには、余計なところで時間が取られないように素振りが必要ですね。
ハマりどころは、以下の記事を読んで理解しました。

- [Power Automateでハマるポイント \- MoreBeerMorePower](https://mofumofupower.hatenablog.com/entry/2020/03/26/220403)
- [first関数で不要なApply to eachを回避する \- MoreBeerMorePower](https://mofumofupower.hatenablog.com/entry/2020/09/07/160111)
- [item\(\)とitems\('Apply\_to\_each'\)の違い・使い分け \- MoreBeerMorePower](https://mofumofupower.hatenablog.com/entry/2020/09/05/112357)

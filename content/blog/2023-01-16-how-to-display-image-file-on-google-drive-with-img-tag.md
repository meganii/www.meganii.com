---
title: "Google Drive上のファイルをimgタグで表示させる時のURL"
date: 2023-01-16T22:02:54+09:00
lastmod: 2023-01-16T22:02:54+09:00
category: ["Tech"]
tags: ["Google Drive"]
comment: true
slug: "how-to-display-image-file-on-google-drive-with-img-tag"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto/v1594902885/tech_ben4sq.png"
---



{{% toc %}}

<!--more-->
{{% googleadsense %}}


## 現象

以下は、Scrapboxでの例（`fileId`は、Google Drive上のファイルに対するId）。
WindowsやAndroidでは画像展開されるが、iOS、iPadOSからは表示されない。

```
[https://drive.google.com/uc?id={fileId}&export=download#.png]
```

`https://drive.google.com/uc?id={fileId}&export=download`は、Google Drive APIで取得できる`webContentLink`である。

直接該当URLにアクセスすると、リダイレクトされるため、iOS、iPadOSからはセキュリティの観点でブロックされていると推測している。


### 類似事象

- `<img src="https://drive.google.com/uc?id={fileId}">`とすることでWindows、Androidでは問題なく表示できるが、iOSでは表示されない。
- `<img src="https://drive.google.com/uc?id={fileId}">`はリダイレクトされる。リダイレクトされるとiOSで表示できない。
- iOSでも、直接URLにアクセスしリダイレクト後の画像を表示すると、以降はキャッシュが切れるまでは、`<img src="https://drive.google.com/uc?id={fileId}">`の形式で表示できる。

[Google Drive にある画像をimgタグで取得させるURLについて \- Qiita](https://qiita.com/TechnoKuRo/items/622c3dcc2ff3f7e09474)  
[GoogleDriveに保存した画像ファイルをhtmlのimgタグで表示\.\.\. \- Yahoo\!知恵袋](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q11220360286)


## 解決方法

2023年1月16日現在、Google DriveのURLを次の形式にすることで、Windows、Android、iOS、iPadOSでも表示できることを確認した。

```
https://lh3.googleusercontent.com/d/{fileId}>
```

Scrapboxでは、`[https://lh3.googleusercontent.com/d/{fileId}#.png]`。通常のHTMLであれば、`<img src="https://lh3.googleusercontent.com/d/{fileId}">`になる。


ただし、このURLは正規のURLではないため、Google側の仕様変更に伴い、変わる可能性は高い。
[Displaying files \(e\.g\. images\) stored in Google Drive on a website \- Stack Overflow](https://stackoverflow.com/questions/10311092/displaying-files-e-g-images-stored-in-google-drive-on-a-website/70143719#70143719)を見ても、コロコロと仕様が変わっていることが伺える。


## 調査結果

以下、調査結果を記す。

### Google Drive APIで取得できるLink

Google Drive APIで取得できるLinkは`https://drive.google.com/uc?id=YOUR_FILE_ID&export=download'`であった。
検証コードは以下の通り。


```python {name="get_link.py"}
import google.auth
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

scopes = ["https://www.googleapis.com/auth/drive"]

def get_link(file_id):
    try:
        creds, _ = google.auth.default(scopes)
        service = build('drive', 'v3', credentials=creds) 
        file = service.files().get(fileId=file_id, fields='webViewLink,webContentLink').execute()

    except HttpError as error:
        print(F'An error occurred: {error}')
        file = None

    return file
 
if __name__ == '__main__':
    link = get_link('YOUR_FILE_ID')
    print(link)
```

```json {name="結果"}
{
  'webContentLink': 'https://drive.google.com/uc?id=YOUR_FILE_ID&export=download',
  'webViewLink': 'https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=drivesdk'
}
```


## 参考URL

- [Displaying files \(e\.g\. images\) stored in Google Drive on a website \- Stack Overflow](https://stackoverflow.com/questions/10311092/displaying-files-e-g-images-stored-in-google-drive-on-a-website/70143719#70143719)


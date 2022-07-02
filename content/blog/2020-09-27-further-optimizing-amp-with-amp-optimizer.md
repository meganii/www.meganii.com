---
title: "AMP OptimizerによるAMPのさらなる最適化"
date: 2020-09-27T20:07:10+09:00
lastmod: 2022-07-02T11:32:46+09:00
published: true
category: ["Tech"]
tags: ["AMP","Blog"]
comment: true
slug: "further-optimizing-amp-with-amp-optimizer"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto/v1594902885/tech_ben4sq.png"
---

以前、[Optimize your hosted AMP pages \- amp\.dev](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/optimize_amp/?referrer=ampproject.org#preload-hero-images)を読みながらAMPの最適化を行いました。

[AMPページの最適化〜ぼくのAMPサイトがこんなに遅い訳がない〜 \- SIS Lab](/blog/2019/10/11/optimize-amp/)

今回は、さらに一歩進み`AMP Optimizer`によるAMPの最適化を試してみました。結果は、`Web Core Vital`の1つである`Largest Content Full Paint`を40%改善できました。

対応した内容と結果をまとめています。

{{% toc %}}

<!--more-->
{{% googleadsense %}}


## AMP Optimizerとは

>AMP Optimizer is a tool to simplify creating AMP pages and improve AMP rendering performance. AMP Optimizer implements AMP performance best practices and supports AMP server-side-rendering.   
[amp\-toolbox/packages/optimizer at master · ampproject/amp\-toolbox](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer)

`AMP Optimizer`は、AMPページ作成を簡素化し、AMPのレンダリングパフォーマンスを改善するツールです。AMPのパフォーマンスに関するベストプラクティスが実装されており、`AMP SSR（サーバーサイドレンダリング）`もサポートしています。

デフォルトで次の最適化を実施します。

- AMPレイアウトのサーバーサイド・レンダリング
- 不足するAMPコンポーネントスクリプトの自動インポート
- 不足する必須AMPタグの自動追加
- amp-img, amp-iframe, amp-video, or amp-video-iframeからhero画像の自動検出とプリロード
- （可能であれば）AMP Boilerplateの削除
- 不要な空白の削除
- CSS keyframe animationsを抽出しページ下部へ移動
- AMPフレームワークとカスタムフォント読込の最適化
- インライン化されたamp-scriptコードのCSPを生成

### AMP SSR（サーバーサイドレンダリング）とは

AMPは`Web Component framework`であり、AMPの独自タグ（amp-*）を有効化するためにクライアント側で処理を行なっています。
たとえば、AMPページが表示されるまでにクライアント側では次のプロセスが実行されます。

- AMP BoilerplateがAMPページを隠す
- AMP JavaScriptをロードする
- AMP CSSを挿入する

`AMP SSR`を行うことで、上記のプロセスを省略または最適化を行うことができます。


2017年と少し古い情報ですが、下記記事中のスライド写真が参考になります。  
[Google、さらなる高速化を目指してSSRのAMPを開発中 \| 海外SEO情報ブログ](https://www.suzukikenichi.com/blog/google-is-working-on-server-side-rendered-amp/)



## AMP Optimizerによる最適化（AMP SSR）の効果

`AMP Optimizer`を利用し、AMPのSSRを実行するメリットは次のとおりです。

- AMP Runtime JavaScriptを実行せずにAMPドキュメントを描画でき、AMP Boilerplateが削除される
- AMP Boilerplateが無くなることで、AMPページ読み込み時のドキュメント非表示の時間が短縮される


なぜ、`AMP Boilerplate`の削除がページ表示時間の改善に繋がるのか。
`AMP Boilerplate`のコードは、AMPの独自タグが有効化され、ページレイアウトが確定するまでAMPドキュメントを非表示にします。
`AMP SSR`によって、事前にページレイアウトを確定することで、`AMP Boilerplate`によるページ隠蔽が不要となります。

> AMP SSRは、サーバー上でAMPボイラープレートコードを取り除いてページレイアウトをレンダリングすることによって動作します。AMP ボイラープレートコードが存在しているのは、ページの読み込み時にコンテンツの位置が突然変化しないようにするためです。AMPフレームワークがダウンロードされてページのレイアウトが確定するまでの間、ページのコンテンツは隠蔽されます。その結果、AMP ページでは他のクライアントサイド フレームワークと同じ問題が発生することになります。つまり、Javascript がダウンロードされるまでレンダリングがブロックされます。  
[Google Developers Japan: オリジンで AMP を高速化する: AMP \+ SSR = ⚡](https://developers-jp.googleblog.com/2019/10/amp-amp-ssr.html)


ところで、AMP Validなページを作るためには`AMP Boilerplate`が必須ですが、`AMP Optimizer`による最適化で生成されたページはAMP Validとなるのでしょうか。

[Google Developers Japan: オリジンで AMP を高速化する: AMP \+ SSR = ⚡](https://developers-jp.googleblog.com/2019/10/amp-amp-ssr.html)によると次の説明があり、有効なAMPとして扱われるようです。


- AMP Optimizerを利用した最適化を行なったページには以下のように`transformed="self;v=1"`が付与される
- この属性が設定されているとAMP検証ツールは、SSRを適用した有効なAMPとして扱う

```html
<html amp transformed="self;v=1">
```

## 対応内容

対応内容としては、公式ドキュメントのサンプルコードを参考にし、`gulp`で`AMP Optimizer`を実行します。
私のブログはHugoを利用しており、生成物は`public`ディレクトリに配置されるため、そのHTMLファイルを上書きする形で実行します。


### gulpによるAMP Optimizerの実行


```JavaScript
const {src, dest} = require('gulp');
const through2 = require('through2');

const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const ampOptimizer = AmpOptimizer.create();

function build(cb) {
  return src('public/**/*.html')
    .pipe(
      through2.obj(async (file, _, cb) => {
        if (file.isBuffer()) {
          const optimizedHtml = await ampOptimizer.transformHtml(
            file.contents.toString()
          );
          file.contents = Buffer.from(optimizedHtml);
        }
        cb(null, file);
      })
    )
    .pipe(dest('public/'));
}

exports.default = build;
```

### GitHub Actionでの実行

上記gulpスクリプトを`GitHub Action`で実行しています。

```diff
jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true  # Fetch Hugo themes
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.74.3'

      - name: Setup package.json
        run: npm install

      - name: Run API server
        run: npm run serve:prod

      - name: Build
        run: hugo --gc

+     - name: Optimize AMP
+       run: npx gulp

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```


## WebPageTestによる測定結果 

https://www.webpagetest.org/


### 通常のAMP

| 指標                        | 結果（秒） |
| -------------------------- | -------: | 
| First Contentful Paint     | 1.996    | 
| Speed index                | 11.954   | 
| Largest Content Full Paint | 14.345   | 

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1601118202/webpageperformance_nomal_amp_ymwmey.png" w="882" h="378" alt="通常のAMP" %}}

### AMP Packer実行

| 指標                        | 結果（秒） |
| -------------------------- | -------: | 
| First Contentful Paint     |  7.882   | 
| Speed index                |  9.137   | 
| Largest Content Full Paint |  9.532   | 


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1601118202/webpageperformance_amp_packeger_dg5fja.png" w="980" h="408" alt="AMP Packer実行" %}}


### AMP Optimizer実行

| 指標                        | 結果（秒） |
| -------------------------- | -------: | 
| First Contentful Paint     |  2.082   | 
| Speed index                |  7.111   | 
| Largest Content Full Paint |  9.131   | 


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1601118202/webpageperformance_amp_optimizer_pemy1f.png" w="980" h="408" alt="AMP Optimizer実行" %}}

### AMP Optimizer x Google Ad Manager

| 指標                        | 結果（秒） |
| -------------------------- | -------: | 
| First Contentful Paint     |  2.198   | 
| Speed index                |  6.849   | 
| Largest Content Full Paint |  8.598   | 


{{% img src="https://res.cloudinary.com/meganii/image/upload/v1601118202/webpageperformance_amp_optimizer_ad_manager_lwev8r.png" w="980" h="412" alt="AMP Optimizer実行 x Google Ad Manager" %}}


## まとめ

- AMP OptimizerのAMP SSRを利用して、`Web Core Vital`の1つである`Largest Content Full Paint`を40%改善できた
- AMP利用のベストプラクティスは昔から公開されているにも関わらずキャッチアップできていなかったため、AMP利用する際は公式ドキュメントの読み込みが必要

## 参考

- [詳解 AMP Optimizer \- Qiita](https://qiita.com/sangotaro/items/a85da91164860bd679af)
- [Google Developers Japan: AMP をさらに高速化する方法](https://developers-jp.googleblog.com/2018/11/how-to-make-amp-even-faster.html)
- [How to make AMP even faster – The AMP Blog](https://blog.amp.dev/2018/10/08/how-to-make-amp-even-faster/)
- [Google Developers Japan: 新しい AMP Optimizer で楽々 AMP 開発](https://developers-jp.googleblog.com/2020/03/amp-optimizer-amp.html)
- [Google Developers Japan: オリジンで AMP を高速化する: AMP \+ SSR = ⚡](https://developers-jp.googleblog.com/2019/10/amp-amp-ssr.html)
- [AMPを「高速化技術」「一瞬で表示する技術」というのはもうやめよう。｜榊原昌彦｜note](https://note.com/rdlabo/n/nd994c99b5c54)
- [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
- [WebPageTest \- Website Performance and Optimization Test](https://www.webpagetest.org/)



{{% amazon 4844379208 %}}

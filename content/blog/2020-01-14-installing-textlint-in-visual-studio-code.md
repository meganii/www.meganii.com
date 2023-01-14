---
title: "VS Codeにtextlintを導入して文章を校正する"
date: 2020-01-14T21:07:50+09:00
lastmod: 2022-08-31T23:24:59+09:00
comments: true
category: ['Tech']
tags: ['VSCode', 'textlint', '文章', 'Writing']
published: true
slug: installing-textlint-in-visual-studio-code
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto/v1594902885/tech_ben4sq.png"
---

ブログメンタリング受講者の方々が書いた`textlint`の記事に触発され、`Visual Studio Code`（以降`VS Code`）に`textlint`を導入しました。
ブログメンタリングに関しては[技術ブロガーを育てる！ブログメンタリングで何を教えているのか \- kakakakakku blog](https://kakakakakku.hatenablog.com/entry/2019/06/24/070816)を読んでみてください。

- [VS Codeでtextlintを導入してみた \- chikoblog](https://chikoblog.hatenablog.jp/entry/2020/01/09/104935)
- [Vim \+ textlintで良質なブログ記事を書こう\! \- code\-log](https://code-log.hatenablog.com/entry/2019/12/29/191207)

基本的には、上記記事の方法と同様です。
しかし、少し異なるのは私の[ブログ](https://www.meganii.com/blog/)が`Hugo`で構築している点です。

`Hugo`は、通常の`Markdown`の文章の中に`Hugo`独自の記法（`Shortcodes`）を利用できます。
`textlint`とそのルールプリセットを導入すると、`Shortcodes`の部分がエラーになってしまう（文字数制限）ため、その除外方法（フィルター方法）を付け加えています。




{{% toc %}}
<!--more-->
{{% googleadsense %}}


## textlintとは

![textlint](https://res.cloudinary.com/meganii/image/upload/v1579037525/textlint_banner_1420x512_k1gcn6.png "=1420x512")

`Markdown`や`Plain text`に書かれた文章のチェックを行うツールです。
ブログの文章以外にも、ドキュメントや書籍作成などの事例をよく目にします。

- [textlintで日本語の文章をチェックする \| Web Scratch](https://efcl.info/2015/09/10/introduce-textlint/)
- [textlintから学んだこと](https://azu.github.io/slide/reactsushi/textlint.html)


普段私は、`VS Code`で`Markdown`を書いています。
よって、`VS Code`上で保存するのと同時に`textlint`が動作して、文章のチェックができる環境を目指します。


## VS Codeにtextlintを導入する

`textlint`は「`textlint`本体」と適用する「ルール」に分かれています。
そのため、適用したいルールを利用者が選択して導入できます。

今回は、以下の2つのルールを適用しました。

1. `textlint-rule-preset-ja-technical-writing`
2. `preset-jtf-style`

1つ目の`textlint-rule-preset-ja-technical-writing`は、技術文書向けのルールプリセットです。
技術文書を書く上での留意点が一通り収められています。
厳しめに作られているとのことですが、まずはこの流儀に従ってみます。

- [textlint\-ja/textlint\-rule\-preset\-ja\-technical\-writing: 技術文書向けのtextlintルールプリセット](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing)
- [技術文書を書くためのtextlint校正ルールセット \| Web Scratch](https://efcl.info/2016/07/13/textlint-rule-preset-ja-technical-writing/)

2つ目の`preset-jtf-style`は「JTF日本語標準スタイルガイド（翻訳用）」を実装したルールプリセットです。
この「JTF日本語標準スタイルガイド（翻訳用）」とは「実務翻訳において和訳時に使用できる日本語表記ガイドライン」です。

- [textlint\-ja/textlint\-rule\-preset\-JTF\-style: JTF日本語標準スタイルガイド for textlint\.](https://github.com/textlint-ja/textlint-rule-preset-JTF-style)
- [スタイルガイド｜JTF　日本翻訳連盟](https://www.jtf.jp/jp/style_guide/styleguide_top.html)

1つ目の`textlint-rule-preset-ja-technical-writing`だけでも十分ですが、括弧の扱いなどのスタイルも含んだルールプリセットとして導入しました。
記事を書いているうちに違和感があるようだったら適宜メンテンスする予定です。


### 1. textlintインストール

`Hugo`のプロジェクト直下で以下のコマンドを実行し、`textlint`本体と上記2つのルールをインストールします。

```bash
npm install --save-dev textlint textlint-rule-preset-ja-technical-writing textlint-rule-preset-jtf-style
```

### 2. textlintルール定義

`textlint`の設定ファイルは`.textlintrc`です。以下のコマンドで`.textlintrc`を生成します。

```bash
npx textlint --init
```

#### .textlintrc
```
{
  "filters": {},
  "rules": {}
}
```

この`.textlintrc`の`rules`に下記の通り2つのルールを追加します。

```
{
  "filters": {},
  "rules": {
    "preset-ja-technical-writing": true,
    "preset-jtf-style": true
  }
}
```

これで`textlint`としての準備が整いました。
試しに以下のコマンドを実行することで、動作を確認できます。

```
npx textlint {hogehoge.md}
```

![textlintによる日本語チェック](https://res.cloudinary.com/meganii/image/upload/v1579009743/textlint_error_uvoe1q.png "=1158x229")
ちゃんと日本語のチェックが行われて、いくつか指摘がありますね。

### 3. VS CodeにtextlintのExtenstionをインストール

続いて`VS Code`で記事を保存した瞬間に`textlint`が実行されるようにします。
以下の`VS Code Extensiton`をインストールし、WindowをReloadします。これで、`VS Code`に`textlint`を統合できました。

[vscode\-textlint \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=taichi.vscode-textlint)

![VS Code Extension textlint](https://res.cloudinary.com/meganii/image/upload/v1579009304/vscode_extension_textlit_h9ktvw.png "=628x369")


`VS Code`で保存した瞬間に`textlint`による文章チェックが行われます。また、下図の通り、自動修正可能な指摘は一括修正できます。

![textlint fix auto](https://res.cloudinary.com/meganii/image/upload/v1579010049/textlint_fix_auto_xxwhhc.png "=622x135")


### 4. HugoのShortcodesを除外ルールに追加

上記の手順により、`VS Code`上で`textlint`による文章チェックが行えるようになりましたが、`Hugo`を利用している場合はもう一手間必要です。

`Hugo`の`Shortcodes`はURLを含めて長くなってしまう場合があり、そのままだと1文の文字数制限に引っかかってしまいます。
そこで、冒頭で書いた`Hugo`の`Shortcodes`を除外するルールを追加します。

- 参考：[Hugoでtextlintを使ってみる · 竹内電設\.com](https://xn--v6q832hwdkvom.com/post/hugo%E3%81%A7textlint%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%BF%E3%82%8B/)

`textlint`ではホワイトリストによる除外設定が可能です。
ホワイトリストを作るためには`textlint-filter-rule-whitelist`を追加でインストールします。

```
npm install --save-dev textlint-filter-rule-whitelist
```

続いて、`.textlintrc`の`filters`に以下の通り追加します。
これは、Hugoの`Shortcodes`として`{{% escape "{{%" %}} shortcodes {{% escape "%}}" %}}`を利用しているためです。

```
{
  "filters": {
    "whitelist": {
      "allow": [
        "{{% escape "/{{%[\\s\\S]*?%}}/m" %}}"
      ]
    }
  },
  "rules": {
    "preset-ja-technical-writing": true,
    "preset-jtf-style": true
  }
}
```



## まとめ

ようやく`textlint`を用いた日本語校正が行えるようになりました。
常に隣に`textlint`がいて、自分が間違った日本語を書いた瞬間に指摘してくれるのは非常にありがたいです。
また、今まで自分が書いていた日本語は以下の指摘が多く、技術文書として適切ではないことに気付かせてくれました。

- 読点が多い
- 弱い表現になっている
- 冗長な表現になっている

ぜひあなたも`textlint`を用いて、ツールのサポートを受けながら正しい日本語を書く意識をしてみませんか。



{{% amazon 4121006240 %}}

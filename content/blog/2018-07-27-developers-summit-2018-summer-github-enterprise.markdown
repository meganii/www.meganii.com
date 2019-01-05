---
title: "[デブサミ2018夏]富士フイルムソフトウエアはいかにして旧開発手法を捨ててGitHub Enterpriseを愛するようになったのか"
date: 2018-07-27T14:03:21+09:00
lastmod: 2018-07-27T14:03:21+09:00
comments: true
category: ['Tech']
tags: ['デブサミ', Git', 'GitHubEnterprize']
published: true
slug: developers-summit-2018-summer-github-enterprise
img: https://res.cloudinary.com/meganii/image/upload/c_thumb,w_200,g_face/v1532741609/developers-summit-2018-summer_pcc1uq.png
---


## 導入経緯

- 課題 デバイスが異なり、開発プラットフォームが異なる
- クロスプラットフォーム開発を目指した
- 計画
    - マージ作業が大幅なコスト
    - SVNのブランチ状態は混沌
    - trunk, trunk2, trunk3 ...
- 開発環境もリファクタリングできるチャンスGitHubを導入したい
- 期待した効果
    - マージコスト
    - コードレビュー
    - CI, 課題管理ツールとの連携

<!--more-->
{{% googleadsense %}}


## 導入に対する壁

- GitHub.com
- GitHubEnterprise
    - セキュリティ観点
    - サポートツール


## 教育

- GitHubおじさん
- Gitトレーニング
- キーワードは「GitHubはSEにとってのSNSなんだよ！」

## 導入効果

- コードレビュー効率化
- Before
    - F2F, WinMerge
    - Excelに議事録を書いていた
- After
    - PRによるレビュー
        - ブラウザでみれる、非同期。スケジュールを合わせる必要がない
    - ブランチはPush済のため、次の開発を始めることができる
    - PRがそのまま議事録となる
- 会社の風土に合わせる
- コメント入力は、GoogleChrome拡張でポカ避け


## 各種ツールとの連携

- 課題管理、静的解析ツール、CIツール
- 課題管理と結ばれていないから、なぜその修正が入ったか背景がわからない
- Tools
    - sonarqube
    - Jenkins
    - Redmine


## コードレビューの殺伐さが消えた

- 良いコードには賞賛を！気軽にいいねしあえる関係
- サンプルコードの提示、アドバイス
    - ソースコードへのアクセスが容易
    - Markdown
- 良い雰囲気は良いコードを生む


## 課題

- PRベースのコードレビューは便利だが、気付かずに溜まっていく
- レビュー漏れはないが、スケジュールに影響する

## 対策

- 自動テスト、静的解析でのチェック機構により、小規模な改善がやりやすくなった
- 早朝プチリファクタリングマラソン
    - 毎朝15分
    - 1stepでも改修できればよいという気持ちで
- 効果
    - 静的解析指摘の収集
- 技術課題の解決が加速
    - GitHubはすぐに試せる



## まとめ

- 組織全体での開発効率が4倍向上
- ソフトウェアの内部品質が向上
- 使えることがメリットではなく、GitHubを使えないのがデメリット

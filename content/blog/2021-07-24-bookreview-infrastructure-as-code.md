---
title: "『Infrastructure as Code』"
date: 2021-07-24T19:51:34+09:00
lastmod: 2021-07-24T19:51:34+09:00
category: ["Tech"]
tags: ["IaC","",""]
comment: true
slug: "bookreview-infrastructure-as-code"
img: "https://m.media-amazon.com/images/I/51YYyQ6-t6L._SL500_.jpg"
---

{{% amazon 4873117968 %}}


{{% toc %}}

<!--more-->
{{% googleadsense %}}

## 本書から得たいこと

『Infrastructure as Code』の日本語訳として出版されたのが2017年3月のため、もしかしたら利用するツールは若干古いかもしれない。しかし、「Infrastructure as Code（IaC）」の考え方自体は陳腐化するものではなく、むしろ重要性が増してくると考え、改めてIaCのエッセンスを読み取ることを目的として読み始めた。

- Infrastructure as Code（IaC）のエッセンス
    - IaCのメリット
    - 何を意識するのか、どんなプラクティスがあるのか
    - `Azure ARM Template`を利用する場合、どのような点に気を付けるべきか


## Infrastructure as Codeとはなにか




## 感想

`Ansible`を使い、冪等性などを意識して自サーバのplaybookを作成したこともあったが、「冪等性」を考慮するのは非常に厄介である。すぐに手で直してしまいたい誘惑に駆られ、意識しないとあっという間にplaybookと実際のサーバの状態が乖離していく。

だからこそ、都度新しいサーバーを構築し、サーバーを使い捨てする「イミュータブルサーバー」のコンセプトには納得する。さらには「コンテナ」の利用でサーバーを使い捨てする方向に進み、今は猫に杓子にコンテナ化が加速している。

本書のIaCの原則やアンチパターンなどは参考になった。しかし、現在の組織において継続的インテグレーション、継続的デプロイの部分についてはまだまだ実践できていない。一気にジャンプするのではなく、少しずつプラクティスを実践していきたい。


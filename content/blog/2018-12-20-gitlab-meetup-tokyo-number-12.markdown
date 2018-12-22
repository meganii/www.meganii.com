---
title: "GitLab Meetup Tokyo #12"
date: 2018-12-22T10:44:01+09:00
lastmod: 2018-12-22T10:44:01+09:00
comments: true
category: ['Tech']
tags: ['GitLab']
published: true
slug: gitlab-meetup-tokyo-number-12
img: https://res.cloudinary.com/meganii/image/upload/c_thumb,w_160/v1545443513/2018-12-22-gitlab-meetup-tokyo_xy7flc.png
---

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1545443513/2018-12-22-gitlab-meetup-tokyo_xy7flc.png" w="670" h="384" %}} 




[GitLab Meetup Tokyo #12: 2018年振り返り - connpass](https://gitlab-jp.connpass.com/event/111427/)

SNSシェア/ブログ枠で申し込んだため、感じたこと得たことを残しておきます。


<!--more-->
{{% googleadsense %}}


## 参加目的

下記の内容を知りたかったため

- GitLab usersってどんな人がいるのか
- 社内にGitLabを立てるにはどうすればよいか、どうやってCVS, SVNから移行していったか
- GitLab x CI/CD、DevOpsと内部統制をどのようにして両立させているのか

## Timetable

- 三菱地所スポンサーご紹介
- GitLab TokyoGitLab Tokyoのご紹介
- Guenjun YooGitLab direction in 2019
- @hiroponzGitLabとKubernetesではじめるAuto DevOps
- @tnirrecap of KubeCon+CloudNativeCon 2018 (GitLab Serverless)
- @jvasseur(LT) GitLabソースにコントリビュートしてみて勉強になったこと
- @xorphitus(LT) (仮) 独自パッチで進化させ過ぎたGitLabのOmnibus package移行
- grooves(LT) スポンサーLT
- @attakei(LT) GitLab-CI/CD+Pagesでポートフォリオを作ってみよう
- 全員忘年会・懇親会（ネットワーキング）


遅れての参加になってしまったので、前半はあまり話を聞けませんでしたが、メモ書きです。


## GitLabとKubernetesではじめるAuto DevOps

- [Hiroyuki Sato (@hiroponz79) | Twitter](https://twitter.com/hiroponz79) 氏
- [クリエーションライン株式会社 (CREATIONLINE, INC.)](https://www.creationline.com/)
- Auto DevOps
    - `.gitlab-ci.yml`の設定ファイルが不要。いい感じに自動設定してくれる
    - e.g. Auto Build, Auto Test ....
        - Auto Review Apps・・・Topic Branchを切ってMerge Requestを送った際にそのコードで
    - ただし、一部の機能は有料プランの加入が必須
- GitLab + k8s
    - GitHub Runnerをk8sで並列実行させる。なるほど便利
    - Ingress,
- おすすめ書籍
- {{% amazon B07D2YCMJ5 %}}

## recap of KubeCon+CloudNativeCon 2018 (GitLab Serverless)
- [tnir / Takuya Noguchi #KubeCon (@tn961ir) | Twitter](https://twitter.com/tn961ir) 氏
- DevOps Tax ・・・各種ツールを繋げることでそれぞれの設定がつらい問題


## (LT) GitLabソースにコントリビュートしてみて勉強になったこと
- [jvasseurさんのプロフィール - connpass](https://connpass.com/user/jvasseur/) 氏


## (LT) (仮) 独自パッチで進化させ過ぎたGitLabのOmnibus package移行
- [T.Matsu (@xorphitus) | Twitter](https://twitter.com/xorphitus)　氏


## (LT) GitLab-CI/CD+Pagesでポートフォリオを作ってみよう
- [kAZUYA tAKEI (@attakei) | Twitter](https://twitter.com/attakei)　氏
- GitHub Pages, Netlify, GitLab Pagesを比較したときのGitLabのメリットは、全てGitLabで完結すること
    - GitHub Pagesは、CI部分は受け持ってくれない
    - Netlifyは、Repositoryは管理してくれない
- GitLab PagesでPortfolioを作成すれば、見る人からみれば、CI/CDの設定ができる人、静的ジェネレータなどを利用できる人、Gitを利用できる人など。ある程度、技術力のアピールにもなる


## grooves(LT) スポンサーLT
- 河又 涼(でぃんご) 氏
    - 人狼国内No.2らしい
    - [国内屈指の人狼最強プレイヤーが、周囲とは違う選択の連続の先に見つけた、大きな野望とは？ | 株式会社grooves](https://www.wantedly.com/companies/grooves/post_articles/126527)

- スポンサー費が1,000万円に達したそうです
- Forkwell エンジニアのアウトプットを応援する
- アウトプットって難しい
- [【エンジニアのキャリアアップを語る】日々のアウトプットが変える！あなたのエンジニア・ライフ - connpass](https://forkwell.connpass.com/event/102045/)
        - [実践的アウトプット入門 なぜ？なにを？どうやって？ / Kwappa さん - ニコナレ](https://niconare.nicovideo.jp/watch/kn3513)
        - 

- [「日々のアウトプットが変える！あなたのエンジニア・ライフ」というイベントに登壇してきたよ #forkwell | Kwappa研究開発室](http://randd.kwappa.net/2018/10/10/705)

- Qurunchもおすすめ
- Forkwellがスポンサーになっていたはず 
- Forkwell Portfolio

ありがとうございました。
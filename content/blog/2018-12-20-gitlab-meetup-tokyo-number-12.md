---
title: "「GitLab Meetup Tokyo #12： 2018年振り返り」に参加しました"
date: 2018-12-22T10:44:01+09:00
lastmod: ":git"
comments: true
category: ['Tech']
tags: ['GitLab', 'CI/CD', 'GitLab Meetup Tokyo']
published: true
slug: gitlab-meetup-tokyo-number-12
img: https://res.cloudinary.com/meganii/image/upload/c_thumb,w_160/v1545443513/2018-12-22-gitlab-meetup-tokyo_xy7flc.png
---

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1545443513/2018-12-22-gitlab-meetup-tokyo_xy7flc.png" w="670" h="384" %}} 

[GitLab Meetup Tokyo #12: 2018年振り返り - connpass](https://gitlab-jp.connpass.com/event/111427/)


12月20日(木)に、「GitLab Meetup Tokyo #12: 2018年振り返り」に参加してきました。SNSシェア/ブログ枠で申し込んだため、感じたこと得たことを残しておきます。


<!--more-->
{{% googleadsense %}}


## 参加目的

下記の内容に興味があったためです。

- GitLabのユーザにはどんな人がいるのか、どんな人がGitLabを利用しているのか
- 社内にGitLabを立てるにはどうすればよいか、どうやってCVS, SVNから移行していったか
- GitLab x CI/CD、DevOpsと内部統制をどのようにして両立させているのか

## Timetable

- 三菱地所スポンサーご紹介
- GitLab TokyoGitLab Tokyoのご紹介
- Guenjun YooGitLab direction in 2019
- @hiroponz 「GitLabとKubernetesではじめるAuto DevOps」
- @tnirre 「cap of KubeCon+CloudNativeCon 2018 (GitLab Serverless)」
- @jvasseur(LT) 「GitLabソースにコントリビュートしてみて勉強になったこと」
- @xorphitus(LT) 「(仮) 独自パッチで進化させ過ぎたGitLabのOmnibus package移行」
- grooves(LT) 「スポンサーLT」
- @attakei(LT) 「GitLab-CI/CD+Pagesでポートフォリオを作ってみよう」
- 全員忘年会・懇親会（ネットワーキング）


遅れての参加になってしまったので、前半はあまり話を聞けませんでしたが、メモ書きです。


## GitLabとKubernetesではじめるAuto DevOps

- [Hiroyuki Sato (@hiroponz79) | Twitter](https://twitter.com/hiroponz79) 氏
- [クリエーションライン株式会社 (CREATIONLINE, INC.)](https://www.creationline.com/)
- 発表資料: [GitLabとKubernetesではじめるAuto DevOps](https://docs.google.com/presentation/d/1Rx4u9F5dikbEHWRqONQkV62fsXx4MM8l2-x7YLzxULs/preview?slide=id.g4aa9a15c84_0_0)


### Auto DevOps

- `.gitlab-ci.yml`の設定ファイルが不要。いい感じに自動設定してくれる
- e.g. Auto Build, Auto Test ....
    - Auto Review Apps・・・Topic Branchを切ってMerge Requestを送った際にそのコードで
- ただし、一部の機能は有料プランの加入が必須


### GitLab + k8s

- GitHub Runnerをk8sで並列実行させる。なるほど便利。

一時期、コンテナ技術の用語ぐらいはキャッチアップしたつもりだったが、今回の話の中でも、`Service Mesh`, `Istio`、`Ingress`など概念を説明できない単語が出てきていた。もうちょっと追ってみたい。


## recap of KubeCon+CloudNativeCon 2018 (GitLab Serverless)

- [tnir / Takuya Noguchi #KubeCon (@tn961ir) | Twitter](https://twitter.com/tn961ir) 氏


{{% speakerdeck id="4b181f1bbfa5461c94939ee4c936a92c"  %}}

- AWS re:Invent 2018 でGitLabのAWSサポートが発表された
- DevOps Tax ・・・各種ツールを繋げることでそれぞれの設定がつらい問題

`CloudNative`という表現については、下記リンク参照。

- [クラウドネイティブとは何のことなのか？なぜそれがIT組織の変革につながると期待されるのか \- THINK Blog Japan](https://www.ibm.com/blogs/think/jp-ja/jniino-san-narrative/?cm_mmc=Display_Hatena-_-Cloud%20Audience-Led_Cloud%20Audience-Led-_-JP_JP-_-27031723_Cloud%20Narrative%20Hatena%20Q4Dec%20PC%20Category&cm_mmca1=000033ZA&cm_mmca2=10007446&cm_mmca4=27031723&cm_mm)

{{% quote %}}
クラウド・ネイティブ・コンピューティングを実現する技術要素

- コンテナー化
- 動的なオーケストレーション
- マイクロサービス指向
{{% /quote %}}


- [toc/DEFINITION.md at master · cncf/toc](https://github.com/cncf/toc/blob/master/DEFINITION.md)

{{% quote %}}
Cloud native technologies empower organizations to build and run scalable applications in modern, dynamic environments such as public, private, and hybrid clouds. Containers, service meshes, microservices, immutable infrastructure, and declarative APIs exemplify this approach.

These techniques enable loosely coupled systems that are resilient, manageable, and observable. Combined with robust automation, they allow engineers to make high-impact changes frequently and predictably with minimal toil.

The Cloud Native Computing Foundation seeks to drive adoption of this paradigm by fostering and sustaining an ecosystem of open source, vendor-neutral projects. We democratize state-of-the-art patterns to make these innovations accessible for everyone.
{{% /quote %}}

## (LT) GitLabソースにコントリビュートしてみて勉強になったこと

- [jvasseurさんのプロフィール - connpass](https://connpass.com/user/jvasseur/) 氏

### 意識して良かった点

- 小さなコミットを心がける
- 毎回ローカルでRubcopを実行すること。 => Rubyのスタイル違反でビルドがこける
- TDD
- 迷ったら（困ったら）人に聞くこと(e.g. GitLabの中の人)

### OSSのすごく良いところ

- いろんなアドバイスをもらえる
- 良いコードを書かざるを得ない環境
- なによりもコントリビュートした達成感がある


実装には数時間だったが、Merge Request実施後、レビューとリファクタリングで10日間ぐらいかかったそう。


## (LT) (仮) 独自パッチで進化させ過ぎたGitLabのOmnibus package移行

- [T.Matsu (@xorphitus) | Twitter](https://twitter.com/xorphitus)　氏
- [\[SpeakerDeck\]  オリジナリティのあるGitLabを標準に近づける](https://speakerdeck.com/xorphitus/orizinariteifalsearugitlabwobiao-zhun-nijin-dukeru)

聞けば聞くほど、あー自分たちで運用したくないなぁという思いが出てきた。よっぽどコアな使い方をしない限り、サービスとして提供されるものを利用するのがよさそう。


## (LT) GitLab-CI/CD+Pagesでポートフォリオを作ってみよう

- [kAZUYA tAKEI (@attakei) | Twitter](https://twitter.com/attakei)　氏
- GitHub Pages, Netlify, GitLab Pagesを比較したときのGitLabのメリットは、全てGitLabで完結すること
    - GitHub Pagesは、CI部分は受け持ってくれない
    - Netlifyは、Repositoryは管理してくれない
- GitLab PagesでPortfolioを作成すれば、見る人からみれば、CI/CDの設定ができる人、静的ジェネレータなどを利用できる人、Gitを利用できる人など。ある程度、技術力のアピールにもなる


最近、NetlifyからGitHub Pagesに移行したところではあったのでかなり気になった。速度的に問題なさそうなら検討したい。


## grooves(LT) スポンサーLT

- 河又 涼(でぃんご) 氏
    - 人狼国内No.2らしい
    - [国内屈指の人狼最強プレイヤーが、周囲とは違う選択の連続の先に見つけた、大きな野望とは？ | 株式会社grooves](https://www.wantedly.com/companies/grooves/post_articles/126527)

> Forkwellはエンジニアのアウトプットを応援する。

スポンサー費が1,000万円に達したそうです。

- アウトプットって難しい
- [【エンジニアのキャリアアップを語る】日々のアウトプットが変える！あなたのエンジニア・ライフ - connpass](https://forkwell.connpass.com/event/102045/)
- [実践的アウトプット入門 なぜ？なにを？どうやって？ / Kwappa さん - ニコナレ](https://niconare.nicovideo.jp/watch/kn3513)
- [「日々のアウトプットが変える！あなたのエンジニア・ライフ」というイベントに登壇してきたよ #forkwell | Kwappa研究開発室](http://randd.kwappa.net/2018/10/10/705)
- [Qrunch](https://qrunch.net/)もおすすめとのこと
    - Forkwellがスポンサーになっていたはず


最近増田で[日本人ITエンジニアの90％に記事を書いてほしくない](https://anond.hatelabo.jp/20181007145044)というポストもあったという話もあったという話から始まったが、とはいえ**「アウトプットは大事」**という話の展開ではあった。

個人的にもアウトプットすることは重要だと思っており、アウトプットをなかなか出せていない自分自身にも危機感を覚えている。


## 最後に

GitLab Meetup Tokyoには初めて参加させていただきました。  
主催者、設営の方々、参加者のみなさま、ありがとうございました。


## Next Action

- [x] ブログを書く
- [x] アウトプット関連記事を漁ってみる
- [ ] インフラCI実践ガイド Ansible/GitLabを使ったインフラ改善サイクルの実現を読んでCIの勘どころを掴む
- [ ] 社内開発フローに浸透させる


## 参考図書

{{% amazon B07D2YCMJ5 %}}
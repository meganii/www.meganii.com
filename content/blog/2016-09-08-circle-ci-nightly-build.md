---
title: "Circle CIでテストを定期実行する"
date: 2016-09-08T22:33:29+09:00
comments: true
category: ['Tech']
tags: ['CircleCI','Blog', 'Hugo']
published: true
slug: circle-ci-nightly-build
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514036568/thumbnail_hugo_icon.png"
---

前回、HugoのData-driven contenを試した。
[Hugoで人気記事を表示するためJSONを返すAPIサーバを作りData\-driven Contentを試してみた \- SIS Lab](https://www.meganii.com/blog/2016/09/06/hugo-data-driven-content-for-polupar-posts/)

これによって、毎回`hugo build`することによって、人気記事を更新する仕組みができた。後は、Cicle CIを定期実行させる。これは、Circle CIのAPIを利用すれば実現できる。


<!--more-->
{{% googleadsense %}}


[Nightly Builds \- CircleCI](https://circleci.com/docs/nightly-builds/)


## Nightly Build

```bash
_token=$1

post_data='{ "build_parameters": { "BUNDLE_UPDATE": "true" } }'

curl \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data "$post_data" \
--request POST https://circleci.com/api/v1/project/meganii/meganii.com/tree/master?circle-token=${_token}

```

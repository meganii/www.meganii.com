---
title: "Basic Auth with OpenFaaS"
date: 2018-05-02T10:02:29+09:00
lastmod: 2020-07-16T21:51:05+09:00
comments: true
category: ['Tech']
tags: ['OpenFaaS']
slug: basic-auth-with-openfaas
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto/v1594902885/tech_ben4sq.png"
---

OpenFaaS環境を導入できたはよいものの、インターネット上に素の状態で晒されるのはちょっと怖いので、認証方法を確認する。

[Lock\-down OpenFaaS for the public Internet](https://blog.alexellis.io/lock-down-openfaas/)


<!--more-->
{{% googleadsense %}}


調べた中で手っ取り早くできそうなのは、basic authっぽい。

- [faas/contrib/nginx at master · openfaas/faas](https://github.com/openfaas/faas/tree/master/contrib/nginx)


## Action Plan

- [ ] OpenFaaSの設定を行う

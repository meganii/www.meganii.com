---
title: "basic auth with openfaas"
date: 2018-05-02T10:02:29+09:00
lastmod: 2018-05-02T10:02:29+09:00
comments: true
category: ['']
tags: ['']
published: false
slug: basic-auth-with-openfaas
img: 
---

[Lock\-down OpenFaaS for the public Internet](https://blog.alexellis.io/lock-down-openfaas/)


OpenFaaS環境を導入できたはよいものの、インターネット上に素の状態で晒されるのはちょっと怖いので、


<!--more-->
{{% googleadsense %}}


調べた中で手っ取り早くできそうなのは、basic auth

- [faas/contrib/nginx at master · openfaas/faas](https://github.com/openfaas/faas/tree/master/contrib/nginx)
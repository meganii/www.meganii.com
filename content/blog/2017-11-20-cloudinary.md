---
title: "画像ホスティング、画像変換サービスCloudinary"
date: 2017-11-20T21:06:14+09:00
lastmod: 2017-11-20T21:06:14+09:00
comments: true
category: ['Tech']
tags: ['Cloudinary']
published: true
slug: cloudinary
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

画像ホスティング、画像変換サービスのCloudinaryを調べたときのメモ。


## どのようにCloudinaryが容量をカウントしているのか？

[How does Cloudinary count my plan's quotas and what does every quota mean? – Cloudinary Support](https://support.cloudinary.com/hc/en-us/articles/203125631-How-does-Cloudinary-count-my-plan-s-quotas-and-what-does-every-quota-mean-)


<!--more-->
{{% googleadsense %}}


## 制限は？

[What happens if I exceed plan limits? – Cloudinary Support](https://support.cloudinary.com/hc/en-us/articles/202521702-What-happens-if-I-exceed-plan-limits-)


## Bandwidthとは？

Q: What is "Net Viewing Bandwidth" and how is bandwidth calculated?
A: For every viewed/downloaded resource, you will only be charged a flat fee according to the size (in bytes) of the resource. This means that we don't count Midgress bandwidth, you don't pay extra per request, you don't pay differently according to the geography of your visitors, there are no additional charges for HTTPS requests or for traffic to origin, and there is no additional cost for invalidations.

- Bandwidthとは、リソースを閲覧/ダウンロードするごとに、サイズ容量に応じて課金される。
- Midgress bandwith(中間帯域)はカウントされない。
　


---
title: "cloudgarage rancheros"
date: 2018-05-01T20:40:49+09:00
lastmod: 2018-05-01T20:40:49+09:00
comments: true
category: ['Tech']
tags: ['RancherOS','CloudGarage']
published: false
slug: cloudgarage-rancheros
img: 
---

<!--more-->
{{% googleadsense %}}

```
docker rm -f $(docker ps -qa)
sudo reboot
sudo rm -rf /var/lib/rancher/state
```




## Refarence

[After remove a host from rancher, how to clean agent containers and iptable rules? \- Rancher \- Rancher Forums](https://forums.rancher.com/t/after-remove-a-host-from-rancher-how-to-clean-agent-containers-and-iptable-rules/4924)
---
title: "RancherOSで全てのコンテナを削除する方法"
date: 2018-05-01T20:40:49+09:00
lastmod: 2020-07-16T21:51:05+09:00
comments: true
category: ['Tech']
tags: ['RancherOS','CloudGarage']
slug: delete-all-containers-on-rancheros
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto/v1594902885/tech_ben4sq.png"
---

```
docker rm -f $(docker ps -qa)
sudo reboot
sudo rm -rf /var/lib/rancher/state
```

## Refarence

[After remove a host from rancher, how to clean agent containers and iptable rules? \- Rancher \- Rancher Forums](https://forums.rancher.com/t/after-remove-a-host-from-rancher-how-to-clean-agent-containers-and-iptable-rules/4924)

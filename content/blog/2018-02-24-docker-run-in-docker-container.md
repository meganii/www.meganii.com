---
title: "Dockerコンテナ内からホスト側のDockerを操作する"
date: 2018-02-24T12:38:02+09:00
lastmod: 2018-02-24T12:38:02+09:00
comments: true
category: ['Tech']
tags: ['Docker','container', 'RancherOS']
published: true
slug: docker-run-in-docker-container
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

要は、あるdockerコンテナの中から新たにDockerコンテナを生成したい。


## 手順

1.dockerコマンドをインストールする

```Dockerfile
FROM alpine
RUN apk --update --no-cache add docker
CMD docker version
```

2.ホストの`docker.sock`を`-v`オプションで共有する

コンテナ内からホスト側のdockerを呼ぶためには、`-v /var/run/docker.sock:/var/run/docker.sock`でホスト側と共有させてあげればよい。注意点は、セキュリティの問題らしい。


## 参考

- [Installing only the client CLI, daemon is on another host](https://forums.docker.com/t/installing-only-the-client-cli-daemon-is-on-another-host/27635/3)
- [Docker + Minecraft = Dockercraft](https://github.com/docker/dockercraft)

Dockercraftの中でも、以下のように述べられている

```
Mounting /var/run/docker.sock inside the container is necessary to send requests to the Docker remote API.  
The default port for a Minecraft server is 25565, if you prefer a different one: -p <port>:25565
```

やっていいかどうかの議論

- [Is `-v /var/run/docker.sock:/var/run/docker.sock` a ticking time bomb?](https://github.com/moby/moby/issues/21109)
- [Flag to avoid hardcoding -v /var/run/docker.sock:/var/run/docker.sock](https://github.com/moby/moby/issues/28953)



- [Alpine Linux で軽量な Docker イメージを作る](https://qiita.com/pottava/items/970d7b5cda565b995fe7)

> Alpine Linux は 3.3 から apk で --no-cache というオプションが使えます。
> 従来は --update add でインストールした後に `rm -rf /var/cache/apk/*` で不要なゴミファイルを削除していたようですが、いまや` --no-cache `で OK です。

- [こうしたいんだぜ！ という時の逆引きdockerコマンド](http://beyondjapan.com/blog/2016/08/docker-command-reverse-resolutions)



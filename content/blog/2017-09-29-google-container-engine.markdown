---
title: "google container engine"
date: 2017-09-29T19:59:11+09:00
lastmod: 2017-09-29T19:59:11+09:00
comments: true
category: ['']
tags: ['']
published: false
slug: google-container-engine
img:
---

<!--more-->
{{% googleadsense %}}


```
$ gcloud container clusters create cluster-1 \
--num-nodes=3 \
--machine-type=f1-micro \
--zone=us-west1-a \
--disk-size=30
```

```
$ gcloud container clusters resize cluster-1 --zone=us-west1-a --size=1
```


```
$ gcloud container clusters list
NAME       ZONE        MASTER_VERSION  MASTER_IP       MACHINE_TYPE  NODE_VERSION  NUM_NODES  STATUS
cluster-1  us-west1-a  1.7.5-gke.1     35.185.222.133  f1-micro      1.7.5 *       1          RUNNING
```

```
$ gcloud container clusters get-credentials cluster-1 --zone=us-west1-a
Fetching cluster endpoint and auth data.
kubeconfig entry generated for cluster-1.
```


```
$ kubectl get pod --all-namespaces
NAMESPACE     NAME                                                  READY     STATUS    RESTARTS   AGE
kube-system   event-exporter-1421584133-v0jgz                       2/2       Running   0          8m
kube-system   fluentd-gcp-v2.0-4lv6z                                2/2       Running   0          8m
kube-system   heapster-v1.4.2-3460574887-rfx1t                      0/3       Pending   0          3m
kube-system   kube-dns-3468831164-lf2pp                             3/3       Running   0          8m
kube-system   kube-dns-autoscaler-244676396-vjc7n                   1/1       Running   0          8m
kube-system   kube-proxy-gke-cluster-1-default-pool-27f237a9-g6hk   1/1       Running   0          7m
kube-system   kubernetes-dashboard-1265873680-65m1s                 1/1       Running   0          8m
kube-system   l7-default-backend-3623108927-bvzvg                   1/1       Running   0          8m
```

## nginx

```
$ kubectl run nginx-test --image=nginx:1.11.3
deployment "nginx-test" created
```

```
$ kubectl get pods
NAME                          READY     STATUS              RESTARTS   AGE
nginx-test-2021810659-rxqw5   0/1       ContainerCreating   0          10s
```

```
$ kubectl get pods
NAME                          READY     STATUS    RESTARTS   AGE
nginx-test-2021810659-rxqw5   1/1       Running   0          41s
```

```
$ kubectl expose deployment nginx-test --port 80 --type LoadBalancer
service "nginx-test" exposed
```

```
$ kubectl get services
NAME         CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
kubernetes   10.XX.XX.XX     <none>        443/TCP        3h
nginx-test   10.XX.XX.YY     <pending>     80:32535/TCP   16s
```

```
kubectl get services
NAME         CLUSTER-IP      EXTERNAL-IP     PORT(S)        AGE
kubernetes   10.XX.XX.XX     <none>          443/TCP        3h
nginx-test   10.XX.XX.YY     XX.YY.ZZ.XX     80:32535/TCP   48s
```

## node1 の


```
$ gcloud container clusters create cluster-1 \
--num-nodes=3 \
--machine-type=f1-micro \
--zone=us-west1-a \
--disk-size=30
Creating cluster cluster-1...done.
Created [https://container.googleapis.com/v1/projects/meganii-gcp/zones/us-west1-a/clusters/cluster-1].
kubeconfig entry generated for cluster-1.
NAME       ZONE        MASTER_VERSION  MASTER_IP       MACHINE_TYPE  NODE_VERSION  NUM_NODES  STATUS
cluster-1  us-west1-a  1.7.5-gke.1     104.198.98.102  f1-micro      1.7.5         3          RUNNING
```

```
$ gcloud container node-pools create node1-pool \
--cluster=cluster-1 \
--zone=us-west1-a \
--num-nodes=1 \
--machine-type=f1-micro \
--disk-size=30

Creating node pool node1-pool...done.
Created [https://container.googleapis.com/v1/projects/meganii-gcp/zones/us-west1-a/clusters/cluster-1/nodePools/node1-pool].
NAME        MACHINE_TYPE  DISK_SIZE_GB  NODE_VERSION
node1-pool  f1-micro      30            1.7.5
```

```
$ gcloud container node-pools list \
--zone=us-west1-a \
--cluster=cluster-1

NAME          MACHINE_TYPE  DISK_SIZE_GB  NODE_VERSION
default-pool  f1-micro      30            1.7.5
node1-pool    f1-micro      30            1.7.5
```

```
$ gcloud container node-pools delete default-pool \
--zone=us-west1-a \
--cluster=cluster-1
The following node pool will be deleted.
[default-pool] in cluster [cluster-1] in zone [us-west1-a]

Do you want to continue (Y/n)?  y

Deleting node pool default-pool...done.
Deleted [https://container.googleapis.com/v1/projects/meganii-gcp/zones/us-west1-a/clusters/cluster-1/nodePools/default-pool].
```


## 単一のGCEとしてCOSを立ち上げる

```
gcloud compute instances create meganii-logserver \
--image=coreos-stable-1465-8-0-v20170921 \
--image-project=coreos-cloud \
--machine-type=f1-micro \
--zone=us-west1-a
```


gcloud compute instances create meganii-logserver \
--image=cos-stable-61-9765-66-0 \
--image-project=cos-cloud \
--machine-type=f1-micro \
--zone=us-west1-a \
--metadata-from-file user-data=cloud-config.yml



## cloud-config

```
#cloud-config

users:
- name: cloudservice
  uid: 2000

write_files:
- path: /etc/systemd/system/cloudservice.service
  permissions: 0644
  owner: root
  content: |
    [Unit]
    Description=Start a simple docker container

    [Service]
    ExecStart=/usr/bin/docker run --rm -u 2000 --name=mycloudservice busybox:latest /bin/sleep 3600
    ExecStop=/usr/bin/docker stop mycloudservice
    ExecStopPost=/usr/bin/docker rm mycloudservice

runcmd:
- systemctl daemon-reload
- systemctl start cloudservice.service
```


```
FROM fluent/fluentd:v0.12-debian-onbuild

RUN buildDeps="sudo make gcc g++ libc-dev ruby-dev" \
 && apt-get update \
 && apt-get install -y --no-install-recommends $buildDeps \
 && sudo gem install \
        fluent-plugin-google-cloud \
 && sudo gem sources --clear-all \
 && SUDO_FORCE_REMOVE=yes \
    apt-get purge -y --auto-remove \
                  -o APT::AutoRemove::RecommendsImportant=false \
                  $buildDeps \
 && rm -rf /var/lib/apt/lists/* \
           /home/fluent/.gem/ruby/2.3.0/cache/*.gem
```

docker run -it --rm --name mi-docker-fluent-logger -v $(pwd)/log:/fluentd/log -v $(pwd)/conf:/fluentd/etc  mi-fluentd:latest


docker run -it --rm --name mi-docker-fluent-logger -v $(pwd)/log:/fluentd/log mi-fluentd:latest



## Conoha

pip install

export OS_USERNAME=gncu65974344
export OS_PASSWORD=grec42191CON
export OS_TENANT_NAME=gnct65974344
export OS_TENANT_ID=f4d7162265934927b4db72d1df18fb15
export OS_AUTH_URL=https://identity.tyo1.conoha.io/v2.0
export OS_REGION_NAME=tyo1
https://image-service.tyo1.conoha.io


export OS_IMAGE_URL=https://image-service.tyo1.conoha.io
export OS_IMAGE_URL=https://image-service.tyo1.conoha.io/v2/ ## 試してみる
export OS_AUTH_TOKEN=5e7622f0469b450b85941a060b599563

glance image-create --name Container-Linux \
  --container-format bare \
  --disk-format qcow2 \
  --file coreos_production_openstack_image.img

openstack image create --disk-f rmat qcow2 --container-format bare --file

## Elasticsearch

curl -XGET http://localhost:9200/_aliases?pretty


## 参考

- [貧者の GKE / 無料枠だけでクラスタを作ろう \- Qiita](https://qiita.com/apstndb/items/788f705e71e7660967a6)
- [貧者の GKE / FluentBit でログ収集 \- Qiita](https://qiita.com/apstndb/items/78482a26b13b10eded0e#_reference-b690c9183323fb0987f6)

---
title: "[デブサミ2018夏]AIを支えるGPUコンピューティングの今"
date: 2018-07-27T10:04:56+09:00
lastmod: 2018-07-27T10:04:56+09:00
comments: true
category: ['Tech']
tags: ['Developers Summit', 'デブサミ', 'GPU']
published: false
slug: developers-summit-2018-summer-gpu-conputing
img: 
---

<!--more-->
{{% googleadsense %}}

# AIを支えるGPUコンピューティングの今

NVIDIA (@_ksasaki)


## NVIDIA HOLODECK

- 仮想空間で色を選択、部品設計はおもしろそう
    -  全てが3D CADでできているので、中身までバラせる


- グラフィックアクセラレーションは結局計算


## GPUコンピューティング12年の歩み

- 2006 CUDA発表
- 2018 summit => 世界一の性能


- Linpackベンチマーク スパコンの性能測定に使われる


## なぜGPUは早いのか

- トランジスタ数は最新CPU, GPUではあんまり変わらない
- GPUは得意分野を絞っている
    -  演算機の数 5,120 (5,120スレッド。同時に計算できる)
    - 単純な計算を並列に繰り返すことに特化している
    - グラフィックの描画に特化
- CPUは汎用的に作られている
- CPUはシングルスレッド、GPUは並列演算にステ振りしている

- GPUでなんでもできるわけではない。OSは動かない。GPUに得意なことだけをオフロードして性能をあげる



## TESLA V100

- SM単位で同じ命令を実行する
- SM: Streaming Multi processer

- Core(CPU) ≒ CODA(GPU)



## TENSOR Core
- 混在制度行列計算ユニット
- 学習、トレーニングに特化している


- CUDNN




## コンテナ環境でのGPU利用

### NVIDIA-DOCKER 1.0

- NVIDIAのドライバは、ホストのカーネルに入る
- docker内のライブラリと、ドライバのバージョンが合っていないと使えない

- NVIDA Docker 2
    - NVIDIA CONTAINER RUNTIME



- kubernetics対応


- NVIDIA GPU CLOUD (GPU対応アプリケーションの総合カタログ)
    - 何が嬉しい？
        - 環境構築の手間がかからない
        - 常に最新のコンテナ


## NGC
- nvidia.com/clouds


## NVIDIA DEPP LEARNING INSTITUTE
- オンライントレーニング
    - ディープラーニング基礎
- DLI ハンズオン
    - NVIDIA DIGITS オンラインでできるトレーニング

- 9/13-14 GTC(GPU Technology conference) Japan


---
title: PythonでBlender
date: 2014-06-22T18:12:00+09:00
category: ['Tech']
tags: ["blender"]
published: true
slug: blender-python
img: "https://farm3.staticflickr.com/2914/14483105314_fc858148c2_b.jpg"
---

PythonでBlenderを操作するためのメモ。

## メッシュ(mesh)の構成
### 頂点
(x, y, z)の座標を指定するみたい

### エッジ
よくわかっていない

### 面
頂点で指定した座標をつなげることで、面を形成する

## メソッド
### デフォルトの立方体を生成
bpy.ops.mesh.primitive_cube_add()


## サンプル(ピラミッド)

```python
import bpy
coords = [(-1.0, -1.0, -1.0), (1.0, -1.0, -1.0), (1.0, 1.0, -1.0), (-1.0, 1.0,-1.0), (0.0,0.0,1.0)]
faces = [(2,1,0,3), (0,1,4),(1,2,4),(2,3,4),(3,0,4)]
me = bpy.data.meshes.new("PyramidMesh")
ob = bpy.data.objects.new("Pyramid", me)
ob.location = bpy.context.scene.cursor_location
bpy.context.scene.objects.link(ob)
me.from_pydata(coords,[],faces)
me.update(calc_edges=True)
```

{{% img src="https://live.staticflickr.com/3878/14479984155_348fbedd9d.jpg" w="500" h="281" alt="Pyramid" %}}


## ドミノ

```python
import bpy
for y in range(0,5):
	coords = [(0,2*y,0),(2,2*y,0),(2,2*y+0.5,0),(0,2*y+0.5,0),(0,2*y,2),(2,2*y,2),(2,2*y+0.5,2),(0,2*y+0.5,2)] 
	faces = [(0,1,2,3),(0,1,5,4),(3,2,6,7),(1,2,6,5),(0,3,7,4),(4,5,6,7)]
	me = bpy.data.meshes.new("Cube")
	ob = bpy.data.objects.new("Cube", me)
	ob.location = bpy.context.scene.cursor_location
	bpy.context.scene.objects.link(ob)
	me.from_pydata(coords,[],faces)
	me.update(calc_edges=True)
```

{{% img src="https://live.staticflickr.com/5545/14500120233_7a6416072d.jpg" w="500" h="281" alt="domino5" %}}


## ドミノ part2

```python
import bpy

def create_cube(x, y):
	coords = [(4*x,2*y,0),(4*x+2,2*y,0),(4*x+2,2*y+0.5,0),(4*x,2*y+0.5,0),(4*x,2*y,2),(4*x+2,2*y,2),(4*x+2,2*y+0.5,2),(4*x,2*y+0.5,2)] 
	faces = [(0,1,2,3),(0,1,5,4),(3,2,6,7),(1,2,6,5),(0,3,7,4),(4,5,6,7)]
	me = bpy.data.meshes.new("Cube")
	ob = bpy.data.objects.new("Cube", me)
	ob.location = bpy.context.scene.cursor_location
	bpy.context.scene.objects.link(ob)
	me.from_pydata(coords,[],faces)
	me.update(calc_edges=True)

loop = 1 
for y in reversed(range(100)):
	for x in range(loop):
		create_cube(x, y)
	loop = loop + 1
```


{{% img src="https://live.staticflickr.com/2914/14483105314_fc858148c2.jpg" w="500" h="276" alt="100domino.blender" %}}


## 参考

- [Blender 2\.63 での Python の使い方についてまとめてみた \- 凹みTips](http://tips.hecomi.com/entry/20120818/1345307205)
- [Blender Python: Mathematical Mesh \- THE PROVING GROUND](http://wiki.theprovingground.org/blender-py-mathmesh)

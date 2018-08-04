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

<iframe src="https://www.flickr.com/photos/35571855@N06/14479984155/in/photostream/player/" width="500" height="281" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

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

<iframe src="https://www.flickr.com/photos/35571855@N06/14500120233/player/" width="500" height="281" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

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
<iframe src="https://www.flickr.com/photos/35571855@N06/14483105314/player/" width="500" height="276" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>



## 参考
- <a href="http://tips.hecomi.com/entry/20120818/1345307205" target="_blank"><img class="alignleft" align="left" border="0" src="https://capture.heartrails.com/150x130/shadow?http://tips.hecomi.com/entry/20120818/1345307205" alt="" width="150" height="130" /></a><a style="color:#0070C5;" href="http://tips.hecomi.com/entry/20120818/1345307205" target="_blank">Blender 2.63 での Python の使い方についてまとめてみた - 凹みTips</a><a href="http://b.hatena.ne.jp/entry/http://tips.hecomi.com/entry/20120818/1345307205" target="_blank"><img border="0" src="http://b.hatena.ne.jp/entry/image/http://tips.hecomi.com/entry/20120818/1345307205" alt="" /></a><br style="clear:both;" /><br>
- <a href="http://wiki.theprovingground.org/blender-py-mathmesh" target="_blank"><img class="alignleft" align="left" border="0" src="https://capture.heartrails.com/150x130/shadow?http://wiki.theprovingground.org/blender-py-mathmesh" alt="" width="150" height="130" /></a><a style="color:#0070C5;" href="http://wiki.theprovingground.org/blender-py-mathmesh" target="_blank">Blender Python: Mathematical Mesh - THE PROVING GROUND</a><a href="http://b.hatena.ne.jp/entry/http://wiki.theprovingground.org/blender-py-mathmesh" target="_blank"><img border="0" src="http://b.hatena.ne.jp/entry/image/http://wiki.theprovingground.org/blender-py-mathmesh" alt="" /></a><br style="clear:both;" /><br>


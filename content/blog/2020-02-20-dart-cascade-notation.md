---
title: "DartのCascade notation（カスケード表記）とは"
date: 2020-02-20T06:11:06+09:00
lastmod: 2020-02-20T06:11:06+09:00
comments: true
category: ['Tech']
tags: ['dart']
published: true
slug: dart-cascade-notation
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_75/v1514031264/thumbnail_tech.png"
---

Dartを触っていて`..`という書き方を見ましたが、どういったものか、そもそも読み方からして分からなかったので自分用のメモです。

どうやら、`..`は`Cascade notation`というDartのSyntaxのようです。

{{% toc %}}

<!--more-->
{{% googleadsense %}}


## Cascade notation/カスケード表記とは

> Cascades (..) allow you to make a sequence of operations on the same object. In addition to function calls, you can also access fields on that same object. This often saves you the step of creating a temporary variable and allows you to write more fluid code.  
> [Language tour \| Dart](https://dart.dev/guides/language/language-tour#cascade-notation-)

- Cascade（..）は、同じオブジェクトに対して複数の操作を指定できる
- 関数呼び出しに加えて、同じオブジェクトのフィールドにアクセスできる
- オブジェクトそのものを表す一時変数を省略でき、より簡潔に記述できる


公式ドキュメントには以下の例が載っています。`Cascade notation（カスケード表記）`を利用する場合は、オブジェクトそのものを示す一時変数が不要になるため、利用しない場合より簡潔に表現できます。

### Cascade notationを利用する場合
```dart
querySelector('#confirm') // Get an object.
  ..text = 'Confirm'      // Use its members.
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'));
```

### Cascade notationを利用しない場合
```dart
var button = querySelector('#confirm');
button.text = 'Confirm';
button.classes.add('important');
button.onClick.listen((e) => window.alert('Confirmed!'));
```


## Cascade notation/カスケード表記の利用シーン

必須項目はコンストラクタの引数で渡して、その他の任意項目（オプション）は`Cascade notation`で設定するというシーンで利用できそうです。
（簡易的なBuilderパターンとして利用する）

以下は、APIオブジェクト生成時に`Cascade notation`を利用した例です。
`accessKey`と`secretKey`はコンストラクタで渡して、その他の項目は`Cascade notation`で設定してみました。

メソッドチェーンの要領で指定できるため便利そうです。

```dart
final paapi = PaAPI('accessKey', 'secretKey')
  ..region = 'region'
  ..service = 'service'
  ..host = 'host'
  ..path = 'path'
  ..partnerTag = 'partnerTag';
```


## Cascade notation利用時の注意点

- `Cascade notation`を利用して関数を呼び出す場合は、オブジェクト自身を返さないといけません。以下の例だと、`sb.write()`が`void`のため動きません。

```dart
var sb = StringBuffer();
sb.write('foo')
  ..write('bar'); // Error: method 'write' isn't defined for 'void'.
```


## 参考

- [Language tour \| Dart](https://dart.dev/guides/language/language-tour#cascade-notation-)
- [Dart \-ing: カスケード呼び出しを使う](http://dart-ing.blogspot.com/2013/04/blog-post.html)
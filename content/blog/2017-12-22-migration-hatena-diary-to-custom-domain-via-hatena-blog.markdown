---
title: "はてなダイアリーからはてなブログ経由で独自ドメインのブログに記事を移行しました"
date: 2017-12-22T19:33:34+09:00
lastmod: 2017-12-22T19:33:34+09:00
comments: true
category: ['Tech']
tags: ['ブログ','Hugo']
published: true
slug: migration-hatena-diary-to-custom-domain-via-hatena-blog
img: 
---

# 概要

今まで、はてなダイアリー(d.hatena.ne.の記事は移行せずにそのまま残していました。しかし、Scrapboxのユーザー会に参加して、過去コンテンツの重要性に気付き、今のブログに全て集約したいと考えました。

そこで、はてなブログを経由させて、独自ドメインのブログに記事を全て移行しました。

その結果、はてなダイアリーからはてなブログにブックマークを含めて簡単に移行でき、その後の独自ドメインへの移行も、ページ価値を引き継いで、問題なく移行することができました。

<!--more-->
{{% googleadsense %}}


# 移行理由

Scrapboxのユーザー会に参加して、過去に書かれた文章と、今の自分を繋ぐことができるという点に感銘を受けた。ブログをScrapboxに移行することを少し考えたが、ブログはあくまでも、ブログとして記事を残し続け、少しでも過去記事への参照が容易になるようにしたかった。

- どうせなら過去記事を含めて、手元でMarkdown形式として戻したい。
- 現在のリンク




# 結果どうだった？

移行した後の記事のデザイン崩れは仕方ないにしろ、移行して満足した。

昔書いた記事を読み返すきっかけとなり、こんなこと考えていたなと振り返ることができた。

また、過去記事へアクセスも、googleに移行が認められたような挙動になっていましたので安心である。


# 移行の考え方

ブログ移行をGoogleに伝えるには、301リダイレクトが推奨されています。

{{% quote %}}

検索エンジンの結果で表示されるページの URL を変更する必要がある場合は、サーバー サイドの 301 リダイレクトを使用することをおすすめします。これは、ユーザーや検索エンジンが正しいページにたどり着くことを保証する最善の方法です。ステータス コード 301 は、ページが別の場所に完全に移転したことを意味します。

[ページの URL の変更と 301 リダイレクトの使用 \- Search Console ヘルプ](https://support.google.com/webmasters/answer/93633?hl=ja)
{{% /quote %}}

しかし、はてなダイアリー、はてなブログの無料版ではこの301リダイレクトの設定を行うことができません。

例えば、1ヶ月だけはてなブログプロに加入して、リダイレクト設定を行うことも出来るらしいのですが、301リダイレクト処理は恒常的に行うべきものらしいので選択肢として外しました。

調べてみると、簡単なJavaScriptによるリダイレクトであれば、Googleのクローラーが解釈でき、移行元から移行先にページの価値が引き継がれるようです。


はてなダイアリーでは、JavaScriptの設定方法が分からなかったので、一旦はてなブログに切り替えてからであれば設定できます。

よって今回は、このJavaScriptによるリダイレクトによって、記事を移行させます。



# やったこと

- 1. Google Search Consoleに3つのブログを追加しておく
- 2. はてなダイアリーからはてなブログへの移行処理
- 3. はてなブログから記事エクスポート
- 4. MT形式をMarkdownに変換
- 5. はてなブログにJavaScriptによるリダイレクトを設定する
- 6. GoogleにIndexされるのを待つ

## 1. Google Search Consoleに3つのブログを追加しておく

どこまで効果があるかわかりませんが、Googleにそれぞれ自分の所有サイトであることを伝えるために、Google Search Console上で以下の３つのサイトを追加しました。

1. 移行元(はてなダイアリー)
1. 経由先(はてなブログ)
1. 移行先(独自ドメインのブログ)

## 2. はてなダイアリーからはてなブログへの移行処理

ブログ移行って面倒だなぁと思っていましたが、いざやってみるとなんてことはなく、以下の記事に従うと簡単に移行できました。

[はてなダイアリーからのインポート（ブログの移行） \- はてなブログ ヘルプ](http://help.hatenablog.com/entry/import)

STEP1 記事のインポート、STEP2 はてなブックマークの移行、STEP3 記事のリダイレクトのボタンをぽちぽち押していけば、うまく設定できました。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1513941325/import_hatena_diary_l3ql4u.jpg" w="697" h="405" %}}


以下、完了時の画面です。この状態になれば、はてなダイアリーにアクセスすれば自動的にはてなブログにリダイレクトされるようになります。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1513942367/complete_qud2hf.png" w="709" h="637" %}}


はてなブックマークも以下の通り、`d.hatena.ne.jp/meganii`から`meganii.hatenablog.com`に変更されてます。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1513943538/hatena_bookmark_lxi3sd.jpg" w="802" h="673" %}}


## 3. はてなブログから記事エクスポート

問題なくはてなダイアリーからはてなブログにサイトが移行されたことを確認した後に、はてなブログから記事をエクスポートします。

[記事データをエクスポートできるようにしました。ブログのバックアップ等にご利用ください \- はてなブログ開発ブログ](http://staff.hatenablog.com/entry/2014/08/22/180000)

## 4. MT形式をMarkdownに変換

記事は、MT（Movable Type）形式でエクスポートされます。そのため、MT形式をMarkdownに変換します。

カテゴリとタグの扱いが甘いですが、まあよしとして移行しました。



### mt2md.rb
```ruby
# frozen_string_literal: true

require 'yaml'
require 'time'

def parse(filepath)
  File.open(filepath) do |f|
    contents = f.read
    posts = contents.split('--------')
    posts
  end
end

def extract(post)
  yaml, body = ''
  content = post.split('-----')
  begin
    yaml = YAML.safe_load(content[0])
    body = content[1].gsub!(/^BODY:/, '')
  rescue => exception
    puts content[0]
    puts exception.message
  end
  { frontmatter: yaml, body: body }
end

posts = parse('meganii.hatenablog.com.export.txt').map { |post| extract(post) }
posts.each do |post|
  date = Time.strptime(post[:frontmatter]['DATE'], '%m/%d/%Y %H:%M:%S')
  slug = post[:frontmatter]['BASENAME'].split('/').last
  filename = "../content/blog/#{date.strftime('%Y-%m-%d')}-#{slug}.md"
  category = post[:frontmatter]['CATEGORY']

  open(filename, 'w') do |md|
    md.puts '---'
    md.puts "title: #{post[:frontmatter]['TITLE']}"
    md.puts "date: #{date}"
    md.puts "lastmod: #{date}"
    md.puts "slug: #{slug}"
    md.puts "category: ['Tech']"
    md.puts "tags: ['#{category}']"
    md.puts 'published: true'
    md.puts '---'
    md.puts
    md.puts post[:body]
  end
end
```


### replace_url.rb
URLを現在のURLに変換します。

```ruby
# frozen_string_literal: true

require 'uri'

Dir.glob('content/*/*.*') do |file|
  buffer = File.open(file, 'r') { |f| f.read() }
  list = URI.extract(buffer, ['http']).select { |a| a.start_with? 'http://d.hatena.ne.jp/meganii' }.map { |x| x.gsub(')','') }
  list.each do |a|
    uri = URI.parse(a)
    len = uri.path.split('/')

    unless len.length > 3
      p uri
      buffer.gsub!(a, 'https://www.meganii.com/')
      next
    end

    year = len[2].slice(0, 4)
    month = len[2].slice(4, 2)
    date = len[2].slice(6, 8)
    slug = len[3]
    buffer.gsub!(a, "https://www.meganii.com/blog/#{year}/#{month}/#{date}/#{slug}")
  end

  File.open(file, 'w') { |f| f.write(buffer) }
end

```


## 5. はてなブログにJavaScriptによるリダイレクトを設定する

リダイレクトのJavaScriptを記事下と、フッタに記述しました。

### 記事下
```html
<p>移転しました。
<script type="text/javascript" language="javascript">
<!--
    var domain = "https://www.meganii.com/blog/";
    var path = location.pathname.substr(6).replace(/\//g, "");
    var slug = path.substr(8);
    var date = path.substr(0, 8);
    var yyyy = date.substr(0, 4);
    var mm = date.substr(4, 2);
    var dd = date.substr(6, 2);
    var url = domain + yyyy + "/" + mm + "/" + dd + "/" + slug + "/";
    if (location.pathname === '/') {
        url = 'https://www.meganii.com/'
    }

    document.write("<a href=\"" + url + "\">" + url + "</a></p>");

   // リダイレクト
　　setTimeout("redirect()", 3000);　// 3 sec
　　function redirect(){
　　 　location.href = url; 
　　}
　
   // canonical の書き換え
　　var link = document.querySelector("link[rel=canonical]");
　　link.href = url;
-->
</script>
```

### フッタ
```html
<script type="text/javascript" language="javascript">
  <!--
  // リダイレクト
  if (location.pathname === '/') {
    setTimeout("redirect2home()", 3000);　// 3 sec
  }

  function redirect2home(){
    location.href = 'https://www.meganii.com/'; 
  }
　
　// canonical の書き換え
　var link = document.getElementsByTagName("link")[0];
　link.href = 'https://www.meganii.com/';
  -->
</script>
```

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1513945201/javascript_redirect_sohtvr.png" w="428" h="556"  %}}


## 6. GoogleにIndexされるのを待つ

- 移行直後：　検索結果に`d.hatena.ne.jp/meganii`のみ表示される。
- 移行してしばらく： 検索結果に`d.hatena.ne.jp/meganii`と`meganii.hatenablog.com`が表示される。
- ２、３日後：　検索結果に`meganii.hatenablog.com`のみ表示される。
- １週間後：　検索結果に`www.meganii.com`が表示される。
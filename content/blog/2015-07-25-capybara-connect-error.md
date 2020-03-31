---
title: "Capybaraで「Request failed to reach server, check DNS and/or server status」のエラー"
date: 2015-07-25T17:29:00+09:00
lastmode: 2017-08-30T21:29:00+09:00
comments: true
category: ['Tech']
tags: ['capybara']
published: true
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
slug: capybara-connect-error
---


## 現象

Capybaraでhttpsのサイトにvisit('')したときに、以下のエラーが発生する。

`Request failed to reach server, check DNS and/or server status`

```
/usr/local/lib/ruby/gems/2.1.0/gems/poltergeist-1.6.0/lib/capybara/poltergeist/browser.rb:323:in `command': Request failed to reach server, check DNS and/or server status (Capybara::Poltergeist::StatusFailError)
	from /usr/local/lib/ruby/gems/2.1.0/gems/poltergeist-1.6.0/lib/capybara/poltergeist/browser.rb:31:in `visit'
	from /usr/local/lib/ruby/gems/2.1.0/gems/poltergeist-1.6.0/lib/capybara/poltergeist/driver.rb:95:in `visit'
	from /usr/local/lib/ruby/gems/2.1.0/gems/capybara-2.4.4/lib/capybara/session.rb:227:in `visit'
	from /usr/local/lib/ruby/gems/2.1.0/gems/capybara-2.4.4/lib/capybara/dsl.rb:51:in `block (2 levels) in <module:DSL>'
	from itunes.rb:24:in `login'
	from itunes.rb:61:in `<main>'
```


{{% googleadsense %}}

## 原因

SSLの通信にエラーが起きてるため。

>The problem is most likely due to SSL certificate errors. If you start phantomjs with the --ignore-ssl-errors=yes option, it should proceed to load the page as it would if there were no SSL errors:
[screen scraping - PhantomJS failing to open HTTPS site - Stack Overflow](http://stackoverflow.com/questions/12021578/phantomjs-failing-to-open-https-site/24679134#24679134)


## 対処法

以下のオプションを設定することで解決した。

phantomjs_options: ['--ignore-ssl-errors=yes']


上記オブションのみで解決しない場合は、`--load-images=no`, `--ssl-protocol=any`のオプションも試してみるとよいとのこと。

```ruby
Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, {
                    js_errors: false,
                    timeout: 1000,
                    phantomjs_options: [
                              '--load-images=no',
                              '--ignore-ssl-errors=yes',
                              '--ssl-protocol=any']})
end
```


ローカル環境では、上記の「phantomjs_options」を指定しなくても動作するが、CentOS上だとエラーになる。インストールしているphantomjsの違いなのか、SSL通信をする際の挙動が違うのか理解していないため、要調査。



## 参考

- [Capybara と Phantomjs で ChatWork をアレしようと思ったら Capybara::Poltergeist::StatusFailError とかいわれてなにも取得できなくて困った。 - MMMPA](http://mmmpa.hatenablog.com/entry/2015/01/05/Capybara_%E3%81%A8_Phantomjs_%E3%81%A7_ChatWork_%E3%82%92%E3%82%A2%E3%83%AC%E3%81%97%E3%82%88%E3%81%86%E3%81%A8%E6%80%9D%E3%81%A3%E3%81%9F%E3%82%89_Capybara%3A%3APoltergeist%3A%3AStatusFailError_%E3%81%A8)
- [selenium - Ruby: Phantom.js blocked on specific site? - Stack Overflow](http://stackoverflow.com/questions/25706563/ruby-phantom-js-blocked-on-specific-site)
- [screen scraping - PhantomJS failing to open HTTPS site - Stack Overflow](http://stackoverflow.com/questions/12021578/phantomjs-failing-to-open-https-site/24679134#24679134)
- [Command Line Interface | PhantomJS](http://phantomjs.org/api/command-line.html)


{{% amazon 4797380357 %}}

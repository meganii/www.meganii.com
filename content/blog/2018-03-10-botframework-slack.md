---
title: "Botframeworkを利用してSlack botを作る"
date: 2018-03-10T19:27:40+09:00
lastmod: 2018-03-10T19:27:40+09:00
comments: true
category: ['Tech']
tags: ['Slack','BotFramework']
published: true
slug: botframework-slack
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_300/v1514031264/thumbnail_tech.png"
---

LUISを利用したBot FrameworkからSlackへ投稿するときに困ったこと。


# 必要なこと

- Slackの`Interactive Messages`を有効にする必要がある

{{% quote %}}
To create a full-fidelity Slack message, set the Activity object's channelData property to a JSON object that specifies Slack messages, Slack attachments, and/or Slack buttons.

Note
To support buttons in Slack messages, you must enable Interactive Messages when you connect your bot to the Slack channel.
{{% /quote %}}

- [Basic message formatting \| Slack](https://api.slack.com/docs/message-formatting)
- [Attaching interactive message buttons](https://api.slack.com/docs/message-buttons)

<!--more-->
{{% googleadsense %}}


## 試すとき

以下のURLで、Slackのメッセージフォーマットを確認できる。

- [メッセージのフォーマット \| Slack](https://api.slack.com/docs/messages/builder)


- [Create a full-fidelity Slack message](https://docs.microsoft.com/en-us/bot-framework/rest-api/bot-framework-rest-connector-channeldata#create-a-full-fidelity-slack-message)


`channelData`プロパティに設定する。


```javascript
const recognizer = new builder.LuisRecognizer(LuisModelUrl);
const intents = new builder.IntentDialog({ recognizers: [recognizer] })
.matches('Greeting', (session) => {
  session.send('You reached Greeting intent, you said \'%s\'.', session.message.text);
  session.send('Hello!');
})
.matches('Weather', (session) => {
  request
    .get('http://weather.livedoor.com/forecast/webservice/json/v1?city=130010')
    .end((err, res) => {
        const forecast = res.body.forecasts[0];
        session.send(
          {
            "channelData": {
              "text": `${forecast.date}は${forecast.telop}だよ`,
              "attachments": [
                {
                  "title": "今日の天気",
                  "image_url": forecast.image.url
                }
              ]
            }
          }
        );
    });
});
```

## エンティティを抽出する

[Recognize intents and entities with LUIS](https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-recognize-intent-luis)
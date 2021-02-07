---
title: "Power AppsでMicrosoft Teamsのスレッドに出退勤をポストする"
date: 2021-01-21T20:34:05+09:00
lastmod: 2021-01-24T23:13:26+09:00
published: true
category: ["Tech"]
tags: ["PowerApps","Teams"]
comment: true
slug: "posting-attendance-to-a-microsoft-teams-thread-with-power-apps"
img: "https://res.cloudinary.com/meganii/image/upload/v1611233437/powerapps_efydgm.png"
---

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1611233437/powerapps_efydgm.png" w="1024" h="512" %}}

Power Apps入門として、リモートワーク開始と終了時に、Microsoft Teamsのスレッドに出勤、退勤をポストするというユースケースをPower Appsで実装しました。

{{% toc %}}

<!--more-->
{{% googleadsense %}}


## Power AppsでMicrosoft Teamsにおける特定チーム > チャネル > スレッドに返信する

Microsoft TeamsのAPIを利用するためには、`Power Apps`の`Connector（コネクタ）`である`Microsoft Teams`を有効化します。
これにより、`MicrosoftTeams`のAPIを利用できます。

特定のスレッドに返信する際は、`MicrosoftTeams.PostReplyToMessageV2`を利用します。


### PostReplyToMessageV2

[https://docs.microsoft.com/en-us/connectors/teams/#post-a-reply-to-a-message-(v2)-(preview)](https://docs.microsoft.com/en-us/connectors/teams/#post-a-reply-to-a-message-(v2)-(preview))


| Name    | Key       | Required | Type   | Description             | 
| ------- | --------- | -------- | ------ | ----------------------- | 
| Team    | groupId   | True     | string | Add Team ID             | 
| Channel | channelId | True     | string | Add Teams channel ID    | 
| Message | messageId | True     | string | Add Teams message ID    | 
| Subject | subject   |          | string | Subject of the message. | 
| Reply   | content   | True     | html   | Body of the message.    | 




### groupId, channelId, messageIdの取得方法

ぶら下げたい大元のスレッドの右上3点リーダー >「リンクをコピーする」をクリックして、URLを取得する。

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1611230156/c7ab2fbf7e7a64218b902aa7fcc9c031_ywnlqp.png" w="1030" h="496" alt="Microsoft TeamsのgroupId, channelId, messageIdの取得方法" %}}


取得したURLをテキストエディタなどで表示して、次の該当箇所を取得する。

```
https://teams.microsoft.com/l/message/19:1fb9299a973341d49a38cbf4932143fb@thread.tacv2/1611064421410?tenantId=8826071f-138f-4gc3-bf3a-0774182cbb26&groupId=58742cc7-f7ca-4df0-82fc-1aab7c6276c0&parentMessageId=1611064421410&teamName=sandbox&channelName=01_Channel&createdTime=1611064421410
```

上記のURLの場合、`groupId`, `channelId`, `messageId`は次のとおり。

- groupId: URLパラメタ`groupId`
    - `58742cc7-f7ca-4df0-82fc-1aab7c6276c0`
- channelId: message/{groupID}/
    - `19:1fb9299a973341d49a38cbf4932143fb@thread.tacv2` 
- messageId: URLパラメタ`parentMessageId`
    - `1611064421410`


### Teamsのスレッドに返信する

上記で取得した`groupId`, `channelId`, `messageId`を利用して`MicrosoftTeams.PostReplyToMessageV2`を呼び出します。
これにより、Teamsの特定チーム > チャネル > スレッドに返信できます。

```javascript
MicrosoftTeams.PostReplyToMessageV2(
    {groupId},
    {channelId},
    {messageId},
    {
        content: Text(Now(),"[$-ja-JP]mm/dd") & " 在宅勤務開始",
        contentType: "text"
    }
)
```

## 作ったPower Appsアプリ

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1611234084/post_to_teams_apbnhw.jpg" w="1900" h="742" %}}


## まとめ

`Power Apps`の入門として出退勤をポストするアプリを作成してみました。
Connectorを利用して、画面を作り上げていく流れをなんとなく掴むことができました。

日頃の業務改善のため、小さいけど意外とメンドくさいことはどんどん`Power Apps`や`Power Automate`で自動化していきたい。

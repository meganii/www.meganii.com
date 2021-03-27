---
title: "【Tableau】Personal Access TokensでTableau REST APIを利用する"
date: 2021-03-27T11:57:30+09:00
lastmod: 2021-03-27T11:57:30+09:00
published: true
category: ["Tech"]
tags: ["Tableau","Python"]
comment: true
slug: "how-to-use-tableau-rest-api-with-personal-access-tokens"
img: "https://res.cloudinary.com/meganii/image/upload/c_scale,f_auto,q_auto,w_1024/v1579905055/thumb_tableau_czhjxd.png"
---

Tableau Server（Tableau Online）のユーザ一覧を取得したいが、Web上からCSV出力機能のようなものが見当たりません。
調べてみると、`Tableau REST API`を利用した取得方法があり、この`Tableau REST API`を試してみたときのメモです。

{{% toc %}}

<!--more-->
{{% googleadsense %}}

## Tableau REST APIとは

> HTTP を介して、`Tableau Server`または`Tableau Online`のプロビジョニング、アクセス権、公開を管理します。`REST API`を使用すると、データ ソース、プロジェクト、ワークブック、サイト ユーザー、およびサイトの機能にアクセスできます。このアクセスを使ってカスタム アプリケーションを作成したり、サーバー リソースとの相互作用をスクリプトしたりできます。  
[開発者向けリソース
](https://help.tableau.com/current/online/ja-jp/dev_resources.htm)


要は、`Tableau REST API`を利用すれば、スクリプトから`Tableau Server`（`Tableau Online`）のデータの登録・更新・参照が可能になります。
恒常的なワークフローや、手作業での処理を自動化するのに適しています。



### 認証方法

`REST API`の認証は、次の2つの方法があります。
推奨される認証方法は、`Personal Access Tokens`（`個人用アクセストークン`）です。

1. Username / Password（ユーザ名/パスワードによる認証）
2. Personal Access Tokens（個人用アクセストークンによる認証）


1つ目のユーザ名/パスワードによる認証とは、Tableau Server（Tableau Online）へのアクセスに利用するID/PWによる認証です。
ユーザのパスワードがハードコーディングされる点や、パスワード変更の度に設定値を変更する必要があり、セキュリティ面と運用面から推奨されません。

2つ目の`Personal Access Tokens`（`個人用アクセストークン`）は、長期間有効な認証トークンを作成し、その認証トークンによって認証する方式です。

ハードコードされた認証資格情報や対話型ログインを必要とすることなく、`REST API`を利用可能です。万が一認証トークンが漏洩した場合も、利用範囲が限定される、かつ、トークンの失効が可能なため、セキュリティ上も強化されます。

- [Better Tableau REST API Security with Personal Access Tokens \- The Information Lab](https://www.theinformationlab.co.uk/2019/11/01/better-tableau-rest-api-security-with-personal-access-tokens/)
- [Authentication\-Tableau Server REST API \- Tableau](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api_concepts_auth.htm)
- [Personal Access Tokens \- Tableau](https://help.tableau.com/current/server/en-us/security_personal_access_tokens.htm)


## `Personal Access Token`の作成方法

1. Tableau Server（Tableau Online）にログイン後、右上のアイコン > 「マイアカウントの設定」をクリック

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1616832234/8000e32250f48579625c126e08fdafaa_izvwpr.png" w="209" h="147" %}}


2. 「設定 > 個人用アクセス」の「トークン名」に任意のトークン名を入力し、「新しいトークンの作成」をクリック

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1616832929/63c27ce8088626c641eefb0e691c36e6_aqcbcf.png" w="1155" h="327" %}}

3. 作成された「トークンシークレット」を控えておく

{{% img src="https://res.cloudinary.com/meganii/image/upload/v1616833105/50e7f2dfc1cd4e1ae174a9820bf368ee_a685e5.png" w="501" h="248" %}}




## `Personal Access Token`によるTableau REST APIの利用

### 今回の前提環境

- Server
    - `Tableau Developer Program`で検証中の`Tableau Online`
- Client
    - Windows 10 Pro
    - Python 3.9.2


## `Tableau Online`のユーザ一覧を取得するPythonスクリプトのサンプル

```python
# This example shows how to use the Tableau Server REST API
# to sign in to a server, get back an authentication token and
# site ID, and then sign out.
# The example runs in Python 2.7 and Python 3.3 code

import requests
import json
import logging
import xml.etree.ElementTree as ET  # Contains methods used to build and parse XML

# The namespace for the REST API is 'http://tableausoftware.com/api' for Tableau Server 9.0
# or 'http://tableau.com/api' for Tableau Server 9.1 or later
XMLNS = {'t': 'http://tableau.com/api'}
logging.captureWarnings(True)


def _encode_for_display(text):
    """
    Encodes strings so they can display as ASCII in a Windows terminal window.
    This function also encodes strings for processing by xml.etree.ElementTree functions.
    Returns an ASCII-encoded version of the text.
    Unicode characters are converted to ASCII placeholders (for example, "?").
    """
    return text.encode('ascii', errors="backslashreplace").decode('utf-8')


def get_users_in_group(server, version, auth_token, site_id, group_id, page_size, page_number):

    if page_size == 0:
        url = "https://{server}/api/{version}/sites/{site_id}/groups/{group_id}/users".format(
            server=server_name, version=version, site_id=site_id, group_id=group_id)
    else:
        url = "https://{server}/api/{version}/sites/{site_id}/groups/{group_id}/users?pageSize={page_size}&pageNumber={page_number}".format(
            server=server_name, version=version, site_id=site_id, group_id=group_id, page_size=page_size, page_number=page_number)

    req = requests.get(url, headers={'x-tableau-auth': auth_token})
    req.raise_for_status()
    xml_response = ET.fromstring(_encode_for_display(req.text))
    users = xml_response.findall('.//t:user', namespaces=XMLNS)
    return users


# Name or IP address of your installation of Tableau Server
server_name = "YOUR_TABLAU_SERVER"
version = "YOUR_TABLAU_SERVER_API_VERSION"     # API version of your server
# Site (subpath) to sign in to. An empty string is used to specify the default site.
site_url_id = "YOUR_SITE_URL_ID"

# For Personal Access Token sign in
# Name of the personal access token.
personal_access_token_name = "YOUR_TOKEN_NAME"
# Value of the token.
personal_access_token_secret = "YOUR_TOKEN_SECRET"

signin_url = "https://{server}/api/{version}/auth/signin".format(
    server=server_name, version=version)

payload = {
    "credentials": {
        "personalAccessTokenName": personal_access_token_name,
        "personalAccessTokenSecret": personal_access_token_secret,
        "site": {"contentUrl": site_url_id}
    }
}

headers = {
    'accept': 'application/json',
    'content-type': 'application/json'
}

# Send the request to the server
req = requests.post(signin_url, json=payload, headers=headers, verify=False)
req.raise_for_status()

# Get the response
response = json.loads(req.content)

# Get the authentication token from the credentials element
token = response["credentials"]["token"]

# Get the site ID from the <site> element
site_id = response["credentials"]["site"]["id"]

print('Sign in successful!')
print('\tToken: {token}'.format(token=token))
print('\tSite ID: {site_id}'.format(site_id=site_id))

# Set the authentication header using the token returned by the Sign In method.
headers['X-tableau-auth'] = token


# ... Make other calls here ...
url = "https://{server}/api/{version}/sites/{site_id}/groups".format(
    server=server_name, version=version, site_id=site_id)
req = requests.get(url, headers={'x-tableau-auth': token}, verify=False)
req.raise_for_status()
xml_response = ET.fromstring(_encode_for_display(req.text))
groups = xml_response.findall('.//t:group', namespaces=XMLNS)

for group in groups:
    group_id = group.get('id')
    users = get_users_in_group(
        server_name, version, token, site_id, group_id, 0, 1)

for user in users:
    print(user.get('name'))


# Sign out
signout_url = "https://{server}/api/{version}/auth/signout".format(
    server=server_name, version=version)

req = requests.post(signout_url, data=b'', headers=headers, verify=False)
req.raise_for_status()
print('Sign out successful!')
```

## まとめ

`Personal Access Tokens`による`Tableau REST API`の利用方法がわかりました。
これにより、Tableau Server（Tableau Online）に関連する作業の自動化が行えるようになりましたので、今後利用シーンも考えてみたいです。


{{% amazon 4798159743 %}}

{{% amazon 4798164445 %}}

{{% amazon 4798059838 %}}
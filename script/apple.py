import requests
from requests import Response

url = "https://podcasts.apple.com/us/podcast/id1546825398"

response: Response = requests.get(url)

print(response.text)

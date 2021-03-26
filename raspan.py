import requests
from datetime import date
import time 

headers = {
    'preparedvisittoken': '4437e9aa-9808-4541-950d-2802cc13fb37',
    'application-api-key': '8640a12d-52a7-4c2a-afe1-4411e00e3ac4',
    'authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InljeDFyWFRmalRjQjZIQWV1aGxWQklZZmZUbyJ9.eyJpc3MiOiJodHRwOi8vY2VudHJhbC5xbm9teS5jb20iLCJhdWQiOiJodHRwOi8vY2VudHJhbC5xbm9teS5jb20iLCJuYmYiOjE2MTY3NjcxNDUsImV4cCI6MTY0Nzg3MTE0NSwidW5pcXVlX25hbWUiOiJjZjBhM2E4ZS1lZmMyLTRlN2EtOTJjMS04ZTc1OTgzYTQ1YTYifQ.blZDLUGCjKDJTVvBNFZWswECIzu4eNY81ECNm-1XOz0m-7NQDRCwX0uf_4ut-bPxtFSdXrZaMhybQXKIjprcG8A68TXgWIaRNOJ8LidMyhQ2a-bpFXumnT6NdJCkBbxYQCBElzyU6TWHYqvBQ_WnAleQB_LFKFAuJ601yLcXKehC5BJFlwq1lO8Ig0LqBmI-TsFMzYFlc209-2QPW6SJmI9wTyOFdNfj8NpAQQfOGEMXAuNm2rTrM3s7MeLztbCpdsBPhqlDDzjfOGzzyFrouKpUXNqIfDmhnd28bHroMQvPzqBm6V25NXE2p7Te98BI1eVhkAVdGw05RwyXyfMNaQ',
    'accept': 'application/json, text/plain, */*',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
    'application-name': 'myVisit.com v3.5',
    'origin': 'https://myvisit.com',
    'sec-fetch-site': 'cross-site',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': 'https://myvisit.com/',
}


params = (
    ('maxResults', '31'),
    ('serviceId', '6142'),
    ('startDate', date.today().strftime("%Y-%m-%d")),
)

while True:
    try:
        response = requests.get('https://central.qnomy.com/CentralAPI/SearchAvailableDates', headers=headers, params=params)
        result = response.json()
        print (f"Got response: {result}")
        if not result['Success']:
            print (f"Error [{result['ErrorNumber']}]: {result['ErrorMessage']}")
        if int(result['TotalResults']) > 0:
            msg = f"{result['TotalResults']} Available dates!! {result['Messages']}"
            msg += f"\n{result['Results']}"
            requests.post("https://notify.run/SHWI3kPURqAx1Mc9", data=msg)
        print ("Sleeping 2 hours...")
        time.sleep(7200) 
    except Exception as e:
        print (f"Error: {e}")
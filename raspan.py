import requests
from datetime import date
import time 
from flask import Flask
import threading
import sys


app = Flask(__name__) 

def flaskThread():
    from os import environ
    app.run(threaded=True, host='0.0.0.0', port=environ.get("PORT", 5000))

@app.route("/")
def main():
    return "ok"

def raspanThread():
    headers = {
        'preparedvisittoken': '4437e9aa-9808-4541-950d-2802cc13fb37',
        'application-api-key': '8640a12d-52a7-4c2a-afe1-4411e00e3ac4',
        'authorization': 'JWT ' + environ.get("MYVISIT_JWT"),
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
                sys.stdout.flush()
            if int(result['TotalResults']) > 0 or True or True:
                msg = f"{result['TotalResults']} Available dates!! {result['Messages']}"
                msg += f"\n{result['Results']}"
                print (msg)
                sys.stdout.flush()
                requests.post("https://notify.run/PFkBUgOgEiJyrWsr", data=msg)
                time.sleep(172800)
            print ("Sleeping Half a hour...")
            sys.stdout.flush()
            time.sleep(1800)
        except Exception as e:
            print (f"Error: {e}")
            sys.stdout.flush()

if __name__ == '__main__':
    threading.Thread(target=raspanThread).start()
    threading.Thread(target=flaskThread).start()
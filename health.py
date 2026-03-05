import requests
import time
from datetime import datetime

# Replace with your actual Render URL
URL1 = "https://ctf-challenge-c.onrender.com"
URL2 = "https://ctf-challenge-r.onrender.com"

INTERVAL = 14 * 60


def keep_alive():
    while True:
        try:
            response = requests.get(URL1)
            status = response.status_code
            print(f"[{datetime.now()}] Ping sent to {URL1}. Status: {status}")

            response = requests.get(URL2)
            status = response.status_code
            print(f"[{datetime.now()}] Ping sent to {URL2}. Status: {status}")
        except Exception as e:
            print(f"[{datetime.now()}] Error pinging server: {e}")

        # Wait for the next interval
        time.sleep(INTERVAL)


if __name__ == "__main__":
    print("Starting Keep-Alive script...")
    keep_alive()

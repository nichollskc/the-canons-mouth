import base64
import time
from api import app

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/search/<encoded_request>', methods=['GET'])
def process_search(encoded_request):
    print(encoded_request)
    print(base64.b64decode(encoded_request))
    return {"matches": [{"id": 4, "match": "bloobla", "text": "The Iliad", "name": "random"}]}

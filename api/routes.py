import base64
import json
import time
from api import app

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/search/<encoded_request>', methods=['GET'])
def process_search(encoded_request):
    print(encoded_request)
    print(base64.b64decode(encoded_request))
    request_b64 = base64.b64decode(encoded_request)
    request = json.loads(request_b64)
    print(request)
    matches = [{"id": i, "match": f"{request['pattern']} {i}", "text": "The Iliad"} for i in range(20)]
    print(matches)
    return {"matches": matches}

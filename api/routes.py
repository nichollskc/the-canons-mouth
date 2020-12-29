import base64
import json
import time
from api import app

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/search/<encoded_request>/pp<per_page>/p<page>', methods=['GET'])
def process_search(encoded_request, per_page, page):
    request_b64 = base64.b64decode(encoded_request)
    request = json.loads(request_b64)
    print(request)
    pattern = request['pattern']
    if len(pattern) > 0:
        matches = [{"id": i, "match": f"{pattern} {i}", "text": "The Iliad"} for i in range(len(pattern)*7)]
    else:
        matches = []

    start_index = int(page) * int(per_page)
    end_index = start_index + int(per_page)
    restricted_matches = matches[start_index:end_index]
    return {"matches": restricted_matches, "num_results": len(matches)}

#!flask/bin/python
from werkzeug.contrib.profiler import ProfilerMiddleware
from api import app
from api import search


app.config['PROFILE'] = True
app.wsgi_app = ProfilerMiddleware(app.wsgi_app, restrictions=[30])
app.run(debug = True)

import base64
import json
import os
import time

import flask

print("PROFILING!")

@app.route("/search/<encoded_request>/pp<per_page>/p<page>", methods=["GET"])
def process_search(encoded_request, per_page, page):
    request_b64 = base64.b64decode(encoded_request)
    request = json.loads(request_b64)
    print(request)
    pattern = request["pattern"]
    config = request["config"]

    result = search.search(pattern, config, per_page, page)
    return result

@app.route('/')
def index():
    filename = 'index.html'
    path = os.path.abspath(app.static_folder) + '/' + filename
    print(os.getcwd())
    print(path)
    print(os.path.exists(path))
    return flask.send_from_directory(app.static_folder, filename)
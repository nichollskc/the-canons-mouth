from flask import Flask

app = Flask(__name__)

from api import routes

from api import keepalive

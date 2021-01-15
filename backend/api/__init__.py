from flask import Flask

app = Flask(__name__)

from api import routes

from api import keepalive

keepalive.setup_recurring_function(seconds=60)

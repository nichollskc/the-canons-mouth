from flask import Flask

import os
print(os.getcwd())
app = Flask(__name__,
            static_folder=os.path.abspath('frontend/build'),
            static_url_path='/')

from api import routes

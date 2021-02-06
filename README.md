# The Canon's Mouth

A tool to search through a collection of archaic texts (the canon).

# Rebuild static site

In frontend/
npm install
npm run build
Then commit changes to frontend/build/

# Profile

Using code in backend/api/profile.py (after deleting the import routes line from __init__)
FLASK_APP=backend/api/profile flask run

# TODO

* Allow for ignoring punctuation or other character sets (e.g. whitespace and vowels?)
* Implement wildcard search
* Implement edit distance search
* Speed up search further?



# The Canon's Mouth

A tool to search through a collection of archaic texts (the canon).

# Rebuild static site

In frontend/
npm install
npm run build
Then commit changes to frontend/build/

# Adding a new text

* Find Gutenberg page and put URLS into backend/config.json
* Add second entry in second list in backend/config.json
* conda activate spyglass && snakemake -j1 update_texts
* cd frontend && npm install && npm run build
* Commit changes to frontend/build, push
* In pythonanywhere terminal, git fetch && git pull && touch /var/www/halflistening_pythonanywhere_com_wsgi.py

# Profile

Using code in backend/api/profile.py (after deleting the import routes line from __init__)
FLASK_APP=backend/api/profile flask run

# TODO

* Allow for ignoring punctuation or other character sets (e.g. whitespace and vowels?)
* Implement wildcard search
* Implement edit distance search
* Speed up search further?



# The Canon's Mouth

A tool to search through a collection of archaic texts (the canon).

# Rebuild static site

In frontend/
npm install
npm run build
Then commit changes to frontend/build/

# TODO

* Combine Malory parts into single text
* Allow for case insensitive search
* Allow for ignoring punctuation or other character sets (e.g. whitespace and vowels?)
* Implement wildcard search
* Implement edit distance search
* Deploy to cloud
* Add pages for each text (e.g. public/mabinogion.html)
* Link from each result to html, with actual line of match (e.g. using anchors for each line)
* Decrease size of suffix tree to make loading faster

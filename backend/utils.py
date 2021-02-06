import re

def slugify(string):
    return re.sub(r'\W+', '-', string.lower())

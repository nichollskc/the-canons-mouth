import suffixtrie

def search(pattern):
    if len(pattern) > 0:
        matches = [{"id": i, "match": f"{pattern} {i}", "text": "The Iliad"} for i in range(len(pattern)*7)]
    else:
        matches = []

    return matches

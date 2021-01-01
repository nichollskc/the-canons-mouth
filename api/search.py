import suffixtrie

def search(pattern):
    if len(pattern) > 0:
        matches = suffixtrie.find_exact(pattern)
    else:
        matches = {'matches': [], 'num_matches': 0}

    print(matches)

    return matches

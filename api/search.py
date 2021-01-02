import suffixtrie

from api import text_info

def search(pattern):
    if len(pattern) > 0:
        matches = suffixtrie.find_exact(pattern)
    else:
        matches = {'matches': [], 'num_matches': 0}

    print(matches)
    counts_by_text = {text_id: 0 for text_id in text_info.TEXT_INFO.keys()}

    for match in matches["matches"]:
        text_info.add_text_info_to_match(match)
        counts_by_text[match["text_id"]] += 1

    print(counts_by_text)

    return matches

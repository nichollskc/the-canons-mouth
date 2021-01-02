import suffixtrie

from api import text_info

def search(pattern, config):
    if len(pattern) > 0:
        result = suffixtrie.find_exact(pattern)
    else:
        result = {"matches": [], "num_matches": 0}

    print(result)
    counts_by_text = {text_id: 0 for text_id in text_info.TEXT_INFO.keys()}
    filtered_matches = []

    for match in result["matches"]:
        text_info.add_text_info_to_match(match)
        text_id = match["text_id"]
        counts_by_text[text_id] += 1
        if text_id in config["selected_texts"]:
            filtered_matches.append(match)

    print(counts_by_text)
    result["matches"] = filtered_matches
    result["counts_by_text"] = counts_by_text

    return result

import subprocess

from api import text_info

def search(pattern, config):
    if len(pattern) > 1:
        match_dicts = awk_search(pattern)
        result = {"matches": match_dicts, "num_matches": len(match_dicts)}
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
    result["num_filtered_matches"] = len(filtered_matches)

    return result


def awk_search(pattern):
    result = subprocess.run(['backend/api/exact_match.sh',
                             pattern,
                             'backend/texts/search/mabinogion.txt'],
                            stdout=subprocess.PIPE)
    output = result.stdout.decode('utf-8')

    matches = output.split('\nMATCHEND\n')[:-1]
    match_dicts = []

    for match_index, match in enumerate(matches):
        fields = match.split('===')
        assert len(fields) == 6, f"Expecting 6 fields, found {len(fields)}. Match is {match}"
        match_dict = {
            'errors': 0,
            'length': len(pattern),
            'key': f"match_{match_index}",
            'text': fields[0],
            'before': fields[1],
            'matching': fields[2],
            'after': fields[3],
            'start_line': int(fields[4]),
            'end_line': int(fields[5]),
        }
        match_dicts.append(match_dict)

    return match_dicts


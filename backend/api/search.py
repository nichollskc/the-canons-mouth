#!/usr/bin/python3.8
import subprocess

from api import text_info

def search(pattern, config, per_page, page):
    # Restrict to only the matches required for this page
    start_index = int(page) * int(per_page)
    end_index = start_index + int(per_page)

    if len(pattern) > 1:
        num_matches, counts_by_text, match_dicts = awk_search(pattern, config, start_index, end_index)
        result = {"matches": match_dicts, "num_matches": num_matches}
    else:
        result = {"matches": [], "num_matches": 0}

    print(result)
    print(counts_by_text)
    result["counts_by_text"] = counts_by_text
    result["num_filtered_matches"] = result["num_matches"]

    return result


def awk_search(pattern, config, start_index, end_index):
    print(config)
    if config['case_insensitive']:
        ignore_case_arg = "-v IGNORECASE=1"
    else:
        ignore_case_arg = ""

    matches = []
    counts_by_text = {text_id: 0 for text_id in text_info.TEXT_INFO.keys()}
    for text in config['selected_texts']:
        max_match_index = end_index - len(matches)
        full_filename = "backend/texts/search/" + text + ".txt"
        result = subprocess.run(['backend/api/exact_match.sh',
                                 pattern,
                                 full_filename,
                                 max_match_index,
                                 ignore_case_arg],
                                stdout=subprocess.PIPE)
        output = result.stdout.decode('utf-8')
        text_matches = output.split('\nMATCHEND\n')[:-1]

        matches.extend(text_matches)
        counts_by_text[text] = len(text_matches)
    match_dicts = []

    print("Finished awk search")
    print(counts_by_text)

    restricted_matches = matches[start_index:end_index]
    for match_index, match in enumerate(restricted_matches):
        fields = match.split('===')
        assert len(fields) == 6, "Expecting 6 fields, found " + str(len(fields)) + ". Match is " + str(match)
        match_dict = {
            'errors': 0,
            'length': len(pattern),
            'key': "match_" + str(match_index),
            'text': fields[0],
            'before': fields[1],
            'matching': fields[2],
            'after': fields[3],
            'start_line': int(fields[4]),
            'end_line': int(fields[5]),
        }
        text_info.add_text_info_to_match(match_dict)
        match_dicts.append(match_dict)

    return len(matches), counts_by_text, match_dicts


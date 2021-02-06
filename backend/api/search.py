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

def exact_matches(pattern, filename, max_match_index, ignore_case_arg):
    result = subprocess.run(['backend/api/exact_match.sh',
                             pattern,
                             filename,
                             max_match_index,
                             ignore_case_arg],
                            stdout=subprocess.PIPE)
    output = result.stdout.decode('utf-8')
    text_matches = output.split('\nMATCHEND\n')[:-1]
    return text_matches

def quick_count_matches(pattern, filename, grep_ignore_case_arg):
    result = subprocess.run(['backend/api/count_matches.sh',
                             pattern,
                             filename,
                             grep_ignore_case_arg],
                            stdout=subprocess.PIPE)
    output = result.stdout.decode('utf-8')
    return int(output)

def awk_search(pattern, config, start_index, end_index):
    print(config)
    if config['case_insensitive']:
        ignore_case_arg = "-v IGNORECASE=1"
        grep_ignore_case_arg = "-i"
    else:
        ignore_case_arg = ""
        grep_ignore_case_arg = ""

    matches = []
    counts_by_text = {text_id: 0 for text_id in text_info.TEXT_INFO.keys()}
    total_matches = 0
    for text in config['selected_texts']:
        text_dict = text_info.TEXT_INFO[text]
        full_filename = text_dict["search_filename"]

        max_match_index = str(end_index - len(matches))
        text_matches = exact_matches(pattern, full_filename, max_match_index, ignore_case_arg)

        matches.extend(text_matches)

        count = quick_count_matches(pattern, full_filename, grep_ignore_case_arg)
        counts_by_text[text] = count
        total_matches += count
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

    return total_matches, counts_by_text, match_dicts


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
        searcher = Searcher(pattern, config, start_index, end_index)
        counts_by_text = searcher.counts_by_text

    print(result)
    print(counts_by_text)
    result["counts_by_text"] = counts_by_text
    result["num_filtered_matches"] = result["num_matches"]

    return result

class Searcher:
    def __init__(self, pattern, config, start_index, end_index):
        self.pattern = pattern
        self.config = config
        self.start_index = start_index
        self.end_index = end_index

        self.filenames = []
        self.text_ids = []

        self.matches = []
        self.total_matches = 0
        self.counts_by_text = {text_id: 0
                               for text_id in text_info.TEXT_INFO.keys()}

    def get_max_matches_left(self):
        max_match_index = str(self.end_index - len(self.matches))
        return max_match_index

    def exact_matches(self):
        if self.config['case_insensitive']:
            ignore_case_arg = "1"
        else:
            ignore_case_arg = "0"

        result = subprocess.run(['backend/api/exact_match_list.sh',
                                 self.pattern,
                                 ignore_case_arg,
                                 self.get_max_matches_left()] + self.filenames,
                                stdout=subprocess.PIPE)
        output = result.stdout.decode('utf-8')
        text_matches = output.split('\nMATCHEND\n')[:-1]
        self.matches.extend(text_matches)

    def quick_count_matches(self):
        if self.config['case_insensitive']:
            ignore_case_arg = "1"
        else:
            ignore_case_arg = "0"

        result = subprocess.run(['backend/api/count_matches_list.sh',
                                 self.pattern,
                                 ignore_case_arg] + self.filenames,
                                stdout=subprocess.PIPE)
        output = result.stdout.decode('utf-8')

        lines = output.split('\n')
        num_files = int(len(lines)/2)
        print(num_files)
        print(len(self.filenames))
        print(len(self.text_ids))
        for i in range(num_files):
            text_id = self.text_ids[i]
            count = int(lines[i*2 + 1].strip())
            self.counts_by_text[text_id] += count
            self.total_matches += count

    def add_search_file(self, filename, text_id):
        self.filenames.append(filename)
        self.text_ids.append(text_id)

def awk_search(pattern, config, start_index, end_index):
    print(config)
    searcher = Searcher(pattern, config, start_index, end_index)

    for text in config['selected_texts']:
        text_dict = text_info.TEXT_INFO[text]
        if len(text_dict["chapters"]) > 0:
            for chapter_info in text_dict["chapters"].values():
                searcher.add_search_file(chapter_info["search_filename"], text)
        else:
            searcher.add_search_file(text_dict["search_filename"], text)

    searcher.quick_count_matches()
    searcher.exact_matches()
    print(searcher.counts_by_text)
    print(len(searcher.matches))

    match_dicts = []

    print("Finished awk search")
    print(searcher.counts_by_text)

    restricted_matches = searcher.matches[start_index:end_index]
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

    return searcher.total_matches, searcher.counts_by_text, match_dicts


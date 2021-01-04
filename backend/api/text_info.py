import json

SEARCH_DIR = "./texts/tokenized/"

def construct_text_info_dict():
    with open("config.json", 'r') as f:
        config = json.load(f)

    text_info = config["texts"]
    for text_id in text_info.keys():
        text_dict = text_info[text_id]
        text_dict["search_filename"] = f"{SEARCH_DIR}{text_id}.txt"

        try:
            with open(f"./texts/chapters/{text_id}.json", 'r') as f:
                chapter_starts = json.load(f)
        except FileNotFoundError:
            chapter_starts = []

        text_dict["chapter_starts"] = chapter_starts

    text_info["unknown_text"] = {
        "full_name" : "Unknown text ID",
        "search_filename" : "",
    }

    print(text_info)

    return text_info

TEXT_INFO = construct_text_info_dict()
TEXT_FILENAME_TO_ID = {TEXT_INFO[text_id]["search_filename"] : text_id
                       for text_id in TEXT_INFO.keys()}

def find_chapter_name(line_number, text_info):
    chapter_starts = text_info["chapter_starts"]
    chapter = ""

    for chapter_start, chapter_name in chapter_starts:
        if line_number >= chapter_start:
            chapter = chapter_name

    return chapter

def add_text_info_to_match(match):
    text_filename = match["text"]

    text_id = TEXT_FILENAME_TO_ID.get(text_filename, "unknown_text")
    match["text_id"] = text_id
    text_info = TEXT_INFO[text_id]
    match["text_fullname"] = text_info["full_name"]
    match["chapter"] = find_chapter_name(match["start_line"], text_info)

#!/usr/bin/python3.8
import json

SEARCH_DIR = "backend/texts/search/"

def construct_text_info_dict():
    with open("backend/config.json", 'r') as f:
        config = json.load(f)

    text_info = config["texts"]
    for text_id in text_info.keys():
        text_dict = text_info[text_id]
        text_dict["search_filename"] = SEARCH_DIR + text_id + ".txt"

    text_info["unknown_text"] = {
        "full_name" : "Unknown text ID",
        "search_filename" : "",
    }

    print(text_info)

    return text_info

TEXT_INFO = construct_text_info_dict()
TEXT_FILENAME_TO_ID = {TEXT_INFO[text_id]["search_filename"] : text_id
                       for text_id in TEXT_INFO.keys()}

def add_text_info_to_match(match):
    text_filename = match["text"]

    text_id = TEXT_FILENAME_TO_ID.get(text_filename, "unknown_text")
    match["text_id"] = text_id
    match["text_fullname"] = TEXT_INFO[text_id]["full_name"]

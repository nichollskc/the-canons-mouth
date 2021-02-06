#!/usr/bin/python3.8
import json

SEARCH_DIR = "backend/texts/search/"

def construct_text_info_dict():
    with open("backend/config.json", 'r') as f:
        config = json.load(f)

    text_info = config["texts"].copy()
    for text_id in config["texts"].keys():
        text_dict = text_info[text_id]
        text_dict["search_filename"] = SEARCH_DIR + text_id + ".txt"

        try:
            with open(f"backend/texts/chapters/{text_id}.json", 'r') as f:
                chapters = json.load(f)
        except FileNotFoundError:
            chapters = {}

        text_dict["chapters"] = chapters

        for chapter_id, chapter_info in chapters.items():
            text_info[chapter_info["full_chapter_id"]] = {
                "search_filename": chapter_info["search_filename"],
                "full_name": text_dict["full_name"] + ": " + chapter_info["chapter_name"]
            }

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

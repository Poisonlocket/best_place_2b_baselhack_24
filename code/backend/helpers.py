import os
from os import listdir
from os.path import isfile, join

import sys
from typing import Dict, List

from flask import request, redirect

from guide import Guide
from section import Section

import functools
import operator

import base64

import json

from ai.ai_functions import *

# id and name of the hardcoded guide. make sure to use " for valid json
HARDCODED_GUIDES = ["pass_time"]

POSSIBLE_OUTCOMES = ['ADD', 'REMOVE', 'CHANGE VIEW']

IMAGE_FOLDER = 'uploads/images'
AUDIO_FOLDER = 'uploads/audio'

ALLOWED_TEXT_EXTENSIONS = ['txt']
ALLOWED_IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg']
ALLOWED_AUDIO_EXTENSIONS = ['mp3', 'm4a', 'wav', 'ogg']

def allowed_upload_file(filename: str) -> bool:
    print("file extension lower:", filename.split('.')[-1].lower())
    print("in or: ", "ogg" in (ALLOWED_IMAGE_EXTENSIONS or ALLOWED_AUDIO_EXTENSIONS))
    return '.' in filename and filename.split('.')[-1].lower() in (ALLOWED_IMAGE_EXTENSIONS + ALLOWED_AUDIO_EXTENSIONS)

def split_filename(filename: str) -> List[str]:
    return filename.split('.')

def find_guide_index(guides, guide_uuid):
    for index, guide in enumerate(guides):
        if guide.get_uuid() == guide_uuid:
            return index
    return -1

def upload_all(guides: list[Guide]) -> dict[str, Guide | str]:
    files = request.files.getlist('awesome_files')

    has_audio = False
    guide_exists = False
    sections = {} # contains section object

    for file in files:
        print(f"file {file.filename} upload allowed?: ", allowed_upload_file(file.filename))
        if file and allowed_upload_file(file.filename):
            filename = file.filename 

            name_list = split_filename(filename)

            if len(name_list) == 4:
                guide_uuid = name_list[0]
                step_sequence = name_list[1]
                file_sequence = name_list[2]
                file_extension = name_list[3]
            elif len(name_list) == 3:
                has_audio = True
                guide_uuid = name_list[0]
                step_sequence = name_list[1]
                file_extension = name_list[2]

            if guide_exists == False:
                guide_exists = True 
                if guide_uuid == "no_id":
                    current_guide = Guide()
                    frontend_guide_uuid = current_guide.get_uuid()
                else:
                    frontend_guide_uuid = guide_uuid
                    current_guide = guides[find_guide_index(guides=guides, guide_uuid=frontend_guide_uuid)]
                    current_guide.remove_sections()

            new_filename = ""
            if file_extension in ALLOWED_IMAGE_EXTENSIONS:
                new_filename = str(frontend_guide_uuid) + "." + step_sequence + "." + file_sequence + "." + file_extension
                filepath = os.path.join(IMAGE_FOLDER, new_filename)

            elif file_extension in ALLOWED_AUDIO_EXTENSIONS:
                new_filename = str(frontend_guide_uuid) + "." + step_sequence + "." + file_extension
                filepath = os.path.join(AUDIO_FOLDER, new_filename)
                
            file.save(filepath)

                
            # frontend sends the whole guide 
            if step_sequence in sections:
                current_section = sections[step_sequence]
            else:
                current_section = Section()

            if file_extension in ALLOWED_IMAGE_EXTENSIONS:
                current_section.add_image(new_filename)

            if file_extension in ALLOWED_AUDIO_EXTENSIONS:
                print("got a valid file exttension for audio conversion")
                transcribed_text = transcribe_and_format_audio(new_filename)
                current_section.set_text(transcribed_text)
                print("transcribed text: ", current_section.get_text())
            
            sections[step_sequence] = current_section
                
        else:
            raise TypeError("Invalid file type for uploaded file: ", file.filename)

    sections = dict(sorted(sections.items()))
    for section in sections.values():
        current_guide.add_section(section)

    if not has_audio:
        # Iterate through Sections --> send all images to AI method
        # Get text back for each Section
        all_images = []
        for section in sections.values():
            all_images.append(section.get_img_ids())
        guide_texts = gen_texts_from_images(all_images, POSSIBLE_OUTCOMES)
        index = 0
        for section in sections.values():
            section.set_text(guide_texts[index])
            index += 1


    return {"frontend_return": f'{{"guide_id":"{frontend_guide_uuid}", "comment":"thank you for your service!"}}', "app_return": current_guide}


def guide_list(guides):
    # creates the json response for the frontend to list all guides
    guide_uuids_list = []
    guide_titles_list = []
    for guide in guides:
        guide_uuids_list.append(guide.get_uuid())
        guide_titles_list.append(guide.get_title())

    # title of the hardcoded guide is its id
    for guide in HARDCODED_GUIDES:
        guide_uuids_list.append(guide)
        guide_titles_list.append(guide)
    
    json_uuid_list = json.dumps(guide_uuids_list)
    json_title_list = json.dumps(guide_titles_list)

    guide_list_string = f'{{"guides":{json_uuid_list}, "titles":{json_title_list}}}'
    return guide_list_string

def unique_guide(guides, guide_uuid):
    # creates the json response for the frontend for a single uuid
    section_list = []

    # hardcoded guides
    sections = {}
    if guide_uuid in HARDCODED_GUIDES:
        hardcoded_path = "../../assets"
        hc_path = os.path.join(hardcoded_path, guide_uuid)
        # read the image files 
        onlyfiles = [f for f in listdir(hc_path) if isfile(join(hc_path, f))]
        # print("all files:", onlyfiles)

        current_guide = Guide()
        current_guide._uuid = guide_uuid

        for hc_file in onlyfiles:
            hc_file_path = os.path.join(hardcoded_path, guide_uuid, hc_file)

            name_list = split_filename(hc_file)
            # print("number of elements in name: ", len(name_list))
            if len(name_list) == 4:
                guide_uuid = name_list[0]
                step_sequence = name_list[1]
                file_sequence = name_list[2]
                file_extension = name_list[3]
            elif len(name_list) == 3:
                guide_uuid = name_list[0]
                step_sequence = name_list[1]
                file_extension = name_list[2]

            # if we already have created this section add to it otherwise create a new one
            if step_sequence in sections:
                current_section = sections[step_sequence]
            else:
                current_section = Section()

            if file_extension in ALLOWED_IMAGE_EXTENSIONS:
                current_section.add_image(hc_file)

            if file_extension in ALLOWED_TEXT_EXTENSIONS:
                with open(hc_file_path, 'r') as file:
                    file_text = file.read()
                    current_section.set_text(file_text)

            sections[step_sequence] = current_section

            sections = dict(sorted(sections.items()))

            for section in sections.values():
                current_guide.add_section(section)
    # finished creation of the guide
    else:
        current_guide = guides[find_guide_index(guides=guides, guide_uuid=guide_uuid)]
  
    # read the guide as json format
    for section in current_guide.sections:
        section_json = {}
        section_json["img_ids"] = section.get_img_ids() 
        section_json["text"] = section.get_text()
        section_list.append(section_json)

    return f'{{"uuid":"{current_guide.get_uuid()}", "title":"{current_guide.get_title()}", "sections":{section_list}}}'

def guide_image_data(guides, guide_id):
    image_paths = []
    file_objects = []

    image_paths = []
    section_array = []
    section_number = 0
    # for hardcoded guides
    if guide_id in HARDCODED_GUIDES:
        hardcoded_path = "../../assets"
        image_base = os.path.join(hardcoded_path, guide_id)
        onlyfiles = [f for f in listdir(image_base) if isfile(join(image_base, f))]
        sortedfiles = (sorted(onlyfiles))
        
        for file in sortedfiles:
            name_list = split_filename(file)
            if len(name_list) == 4:
                guide_uuid = name_list[0]
                step_sequence = name_list[1]
                file_sequence = name_list[2]
                file_extension = name_list[3]
            elif len(name_list) == 3:
                guide_uuid = name_list[0]
                step_sequence = name_list[1]
                file_extension = name_list[2]

            if int(step_sequence) > section_number:
                image_paths.append(section_array)
                section_array = []
                section_number = int(step_sequence)
            
            if file_extension in ALLOWED_IMAGE_EXTENSIONS:
                section_array.append(file)

        image_paths.append(section_array)
    # other guides
    else: 
        current_guide = guides[find_guide_index(guides=guides, guide_uuid=guide_id)]
        for section in current_guide.sections:
            ids = section.get_img_ids()
            image_paths.append(ids)

        # image_paths = functools.reduce(operator.iconcat, image_paths, [])
        print("image_paths: ", image_paths)
        image_base = "./uploads/images"

    # for all image paths 
    for section_array in image_paths:
        section_image_array = []
        for filename in section_array:
            file_path = os.path.join(image_base, filename)
        
            with open(file_path, "rb") as image_file:
                encoded_string = base64.b64encode(image_file.read())
                section_image_array.append(encoded_string)
        file_objects.append(section_image_array)

    return f'{{"images":{file_objects} }}'

def guide_image_last(guides, guide_id):
    last_file = ""
    image_base = ""

    if guide_id in HARDCODED_GUIDES:
        hardcoded_path = "../../assets"
        image_base = os.path.join(hardcoded_path, guide_id)
        onlyfiles = [f for f in listdir(image_base) if isfile(join(image_base, f))]
        sortedfiles = (sorted(onlyfiles))

        
        for file in sortedfiles:
            name_list = split_filename(file)
            if len(name_list) == 4:
                last_file = file
    
    else: 
        current_guide = guides[find_guide_index(guides=guides, guide_uuid=guide_id)]
        image_base = "./uploads/images"
        img_ids = current_guide.sections.get_img_ids
        sorted_imgs = sorted(img_ids)
        last_file = sorted_imgs[-1]

    # upload the last image
    file_path = os.path.join(image_base, last_file)
    encoded_string = ""
    with open(file_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())

    return f'{{"images":{encoded_string} }}'
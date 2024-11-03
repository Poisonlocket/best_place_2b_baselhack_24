import os
from os import listdir
from os.path import isfile, join
from flask import request
from guide import Guide
from section import Section
import base64
import json

from ai.ai_functions import *

# Constants for file storage
IMAGE_FOLDER = 'uploads/images'
AUDIO_FOLDER = 'uploads/audio'

ALLOWED_TEXT_EXTENSIONS = ['txt']
ALLOWED_IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg']
ALLOWED_AUDIO_EXTENSIONS = ['mp3', 'm4a', 'wav', 'ogg']

POSSIBLE_OUTCOMES = ['ADD', 'REMOVE', 'CHANGE VIEW']

def allowed_upload_file(filename: str) -> bool:
    return '.' in filename and filename.split('.')[-1].lower() in (ALLOWED_IMAGE_EXTENSIONS + ALLOWED_AUDIO_EXTENSIONS)

def split_filename(filename: str):
    return filename.split('.')

def find_guide_index(guides, guide_uuid):
    for index, guide in enumerate(guides):
        if guide.get_uuid() == guide_uuid:
            return index
    return -1

def upload_all(guides):
    files = request.files.getlist('awesome_files')
    has_audio = False
    guide_exists = False
    sections = {}  # Contains section objects
    frontend_guide_uuid = ""
    current_guide = Guide()

    for file in files:
        if file and allowed_upload_file(file.filename):
            filename = file.filename
            name_list = split_filename(filename)

            if len(name_list) == 4:
                guide_uuid, step_sequence, file_sequence, file_extension = name_list
            elif len(name_list) == 3:
                has_audio = True
                guide_uuid, step_sequence, file_extension = name_list

            if not guide_exists:
                guide_exists = True 
                if guide_uuid == "no_id":
                    frontend_guide_uuid = current_guide.get_uuid()
                elif not guides:
                    current_guide.uuid = guide_uuid
                    frontend_guide_uuid = guide_uuid
                else:
                    frontend_guide_uuid = guide_uuid
                    guide_index = find_guide_index(guides, guide_uuid)
                    if guide_index != -1:
                        current_guide = guides[guide_index]
                        current_guide.uuid = guide_uuid
                        current_guide.remove_sections()

            # Process and save the file
            if file_extension in ALLOWED_IMAGE_EXTENSIONS:
                new_filename = f"{frontend_guide_uuid}.{step_sequence}.{file_sequence}.{file_extension}"
                filepath = os.path.join(IMAGE_FOLDER, new_filename)
            elif file_extension in ALLOWED_AUDIO_EXTENSIONS:
                new_filename = f"{frontend_guide_uuid}.{step_sequence}.{file_extension}"
                filepath = os.path.join(AUDIO_FOLDER, new_filename)

            file.save(filepath)

            if step_sequence in sections:
                current_section = sections[step_sequence]
            else:
                current_section = Section()

            if file_extension in ALLOWED_IMAGE_EXTENSIONS:
                current_section.add_image(new_filename)
            if file_extension in ALLOWED_AUDIO_EXTENSIONS:
                audio_filepath = os.path.join(AUDIO_FOLDER, new_filename)
                transcribed_text = transcribe_and_format_audio(audio_filepath, 3)
                current_section.set_text(transcribed_text)

            sections[step_sequence] = current_section

    for section in sections.values():
        current_guide.add_section(section)

    return {
        "frontend_return": json.dumps({
            "guide_id": frontend_guide_uuid,
            "comment": "Thank you for your service!"
        }),
        "app_return": current_guide
    }

def guide_list(guides):
    guide_list = []

    for guide in guides:
        description = getattr(guide, "description", "")
        startImage = ""
        if guide.sections:
            last_section = guide.sections[-1]
            if last_section.get_img_ids():
                startImage = last_section.get_img_ids()[-1]
        
        guide_list.append({
            "uuid": guide.get_uuid(),
            "title": guide.get_title(),
            "description": description,
            "startImage": startImage,
            "sections": []  # Sections are kept empty as per requirements
        })

    return json.dumps({"guides": guide_list})

def unique_guide(guides, guide_uuid):
    print(f"unique_guide: guide_uuid: {guide_uuid}")
    guide_index = find_guide_index(guides, guide_uuid)
    if guide_index == -1:
        return json.dumps({"error": "Guide not found"})

    current_guide = guides[guide_index]
    print(f"unique_guide: current_guide: {current_guide}")
    section_list = [
        {
            "img_ids": section.get_img_ids(),
            "text": section.get_text()
        } for section in current_guide.sections
    ]
    for s in current_guide.sections:
        print(f"unique_guide: s: {s.get_text()}")

    return json.dumps({
        "uuid": current_guide.get_uuid(),
        "title": current_guide.get_title(),
        "sections": section_list
    })

def guide_image_data(guides, guide_id):
    guide_index = find_guide_index(guides, guide_id)
    if guide_index == -1:
        return json.dumps({"error": "Guide not found"})

    current_guide = guides[guide_index]
    image_base = IMAGE_FOLDER
    file_objects = []

    for section in current_guide.sections:
        section_image_array = []
        for filename in section.get_img_ids():
            file_path = os.path.join(image_base, filename)
            with open(file_path, "rb") as image_file:
                encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
                section_image_array.append(encoded_string)
        file_objects.append(section_image_array)

    return json.dumps({"images": file_objects})

def guide_image_last(guides, guide_id):
    guide_index = find_guide_index(guides, guide_id)
    if guide_index == -1:
        return json.dumps({"error": "Guide not found"})

    current_guide = guides[guide_index]
    image_base = IMAGE_FOLDER
    last_file = ""

    img_ids = []
    for section in current_guide.sections:
        img_ids.extend(section.get_img_ids())
    sorted_imgs = sorted(img_ids)

    if sorted_imgs:
        last_file = sorted_imgs[-1]

    if last_file:
        file_path = os.path.join(image_base, last_file)
        with open(file_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        
        return json.dumps({"image": encoded_string})
    
    return json.dumps({"image": ""})

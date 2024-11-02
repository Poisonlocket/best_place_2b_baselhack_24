import os
from typing import Dict, List

from flask import request, redirect

from guide import Guide
from section import Section

IMAGE_FOLDER = 'uploads/images'
AUDIO_FOLDER = 'uploads/audio'
ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg'}
ALLOWED_AUDIO_EXTENSIONS = {'mp3', 'm4a', 'wav', 'ogg'}

def allowed_upload_file(filename: str) -> bool:
    return '.' in filename and filename.split('.')[-1].lower() in (ALLOWED_IMAGE_EXTENSIONS or ALLOWED_AUDIO_EXTENSIONS)

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

            new_filename = str(frontend_guide_uuid) + "." + step_sequence + "." + file_sequence + "." + file_extension

            if file_extension in ALLOWED_IMAGE_EXTENSIONS:
                filepath = os.path.join(IMAGE_FOLDER, new_filename)

            elif file_extension in ALLOWED_AUDIO_EXTENSIONS:
                filepath = os.path.join(AUDIO_FOLDER, new_filename)
                
            file.save(filepath)

                
            # frontend sends the whole guide            
            if step_sequence in sections:
                current_section = sections[step_sequence]
            else:
                current_section = Section()

            if file_extension in ALLOWED_IMAGE_EXTENSIONS:
                current_section.add_image(filename)

            # add text when AI is ready
            if file_extension in ALLOWED_AUDIO_EXTENSIONS:
                # send to AI
                # ai_text = ...
                # curren_section.set_text(ai_text)
                pass
            
            sections[step_sequence] = current_section
                
        else:
            raise TypeError("Invalid file type for uploaded file: ", file.filename)

    if not has_audio:
        # Iterate through Sections and for each --> send images to AI method
        # Get text back for each Section
        pass

    sections = dict(sorted(sections.items()))
    for section in sections.values():
        current_guide.add_section(section)


    return {"frontend_return": f'{{"guide_id":"{frontend_guide_uuid}", "comment":"thank you for your service!"}}', "app_return": current_guide}

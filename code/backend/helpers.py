import os
from flask import request, redirect
import guide


UPLOAD_FOLDER = 'uploads/'
ALLOWED_UPLOAD_EXTENSIONS = {'png', 'jpg', 'jpeg', 'mp3', 'm4a', 'wav'}

def allowed_upload_file(filename: str) -> bool:
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_UPLOAD_EXTENSIONS

def split_filename(filename: str) -> [str]:
    return filename.split('.')

def upload_all() -> str:
    files = request.files.getlist('awesome_files')

    possible_new_guide = True

    for file in files:
        if file and allowed_upload_file(file.filename):
            filename = file.filename 
            filepath = os.path.join(UPLOAD_FOLDER, filename)

            name_list = split_filename(filename)
            guide_uuid = name_list[0]
            step_sequence = name_list[1]
            file_sequence = name_list[2]
            file_extension = name_list[3]

            file.save(filepath)

            if guide_uuid != "no_id":
                possible_new_guide = False
                frontend_guide_uuid = guide_uuid

                
        else:
            raise TypeError("Invalid file type for uploaded file: ", file.filename)

    if possible_new_guide == True:
        new_guide = guide.Guide("new_guide")
        frontend_guide_uuid = new_guide.get_uuid()

    return f'{{"guide_id":"{frontend_guide_uuid}", "comment":"thank you for your service!"}}'

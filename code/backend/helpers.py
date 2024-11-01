import os
from flask import request

IMAGE_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_image():
    if 'file' not in request.files:
            print('No file part')
            print(request.files)
            return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        print('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = file.filename 
        filepath = os.path.join(IMAGE_FOLDER, filename)
        file.save(filepath)
        return f"File uploaded successfully to {filepath}"
    else:
        return "Invalid file type"
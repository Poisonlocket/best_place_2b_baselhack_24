import os
from flask import request

IMAGE_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_images():
    images = request.files.getlist('images')

    for image in images:
        if image and allowed_file(image.filename):
            filename = image.filename 
            filepath = os.path.join(IMAGE_FOLDER, filename)
            image.save(filepath)
        else:
            raise TypeError("Invalid file type")
        
def upload_audio():
    audio = request.files.get('audio')
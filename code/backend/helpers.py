import os
from flask import request

IMAGE_FOLDER = 'uploads/images'
ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg'}

AUDIO_FOLDER = 'uploads/audio'
ALLOWED_AUDIO_EXTENSIONS = {'mp3', 'm4a', 'wav'}

def allowed_image_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS

def allowed_audio_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_AUDIO_EXTENSIONS

def upload_images():
    images = request.files.getlist('images')

    for image in images:
        if image and allowed_image_file(image.filename):
            filename = image.filename 
            filepath = os.path.join(IMAGE_FOLDER, filename)
            image.save(filepath)
        else:
            raise TypeError("Invalid file type for image file: ", image.filename)
        
def upload_audio():
    audio = request.files.get('audio')

    if audio and allowed_audio_file(audio.filename):
        filename = audio.filename
        filepath = os.path.join(AUDIO_FOLDER, filename)
        audio.save(filepath)
    else:
        raise TypeError("Invalid file type for audio file: ", audio.filename)
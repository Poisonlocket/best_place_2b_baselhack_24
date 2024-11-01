import os
from flask import request

IMAGE_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_images():
    if 'images' not in request.files:
            print('No image part in the post request')
            print(request.files)
            return redirect(request.url)

    images = request.files.getlist("images")

    for image in images: 

        if image.filename == '':
            print('No selected file')
            return redirect(request.url)

        if image and allowed_file(image.filename):
            filename = image.filename 
            filepath = os.path.join(IMAGE_FOLDER, filename)
            image.save(filepath)
            
    return f"File uploaded successfully"
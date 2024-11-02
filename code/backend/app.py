import flask
from flask import Flask, Response, Request, request
from flask_cors import CORS, cross_origin
from guide import Guide
from helpers import *

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

guides: list[Guide] = []


@app.get("/creators")
def creators() -> str:
    return "This Backend was built by Leonard, Jon and Lorenzo "


@app.get("/")
def hello():
    return flask.redirect("/418", 302)



# very important endpoint, serving lots of tea
@app.get("/418")
def teapot() -> Response:
    art = r"""
            .------.____
         .-'       \ ___)
      .-'         \\\
   .-'        ___  \\)
.-'          /  (\  |)
         __  \  ( | |
        /  \  \__'| |
       /    \____).-'
     .'       /   |
    /     .  /    |
  .'     / \/     |
 /      /   \     |
       /    /    _|_
       \   /    /\ /\
        \ /    /__v__\
         '    |       |
              |     .#|
              |#.  .##|
              |#######|
              |#######|    
"""

    return Response(art, mimetype="text/plain")
# Guide Endpoints
@app.get("/guides")
def get_guides():
    return guide_list(guides)

@app.get("/guides/<guide_id>")
def get_specific_guide(guide_id):
    return unique_guide(guides, guide_id)

@app.post("/guides")
@cross_origin()
def add_guide():
    data = request.get_json()
    new_guide = Guide(sections=data["sections"]) 
    guides.append(new_guide)
    print(guides)
    return Response("Guide added successfully", 201)

@app.post("/upload")
@cross_origin()
def upload():
    returns = upload_all(guides)
    guides.append(returns["app_return"])
    return returns["frontend_return"]

@app.post("/guide_title")
@cross_origin()
def add_guide_title():
    data = request.get_json()
    current_guide = guides[find_guide_index(guides=guides, guide_uuid=data["uuid"])]
    current_guide.set_title(data["title"])
    return Response("Guide title added successfully", 201)
    

@app.get("/get_images/<str:guide_id>")
def get_images(guide_id:str):
    image_paths = []
    file_objects = []
    for guide in guides:
        if getattr(guide, guide.get_uuid(), None) == guide_id:
            sel_guide = guide
    for section in sel_guide.sections:
        data=section.get_img_ids()
        image_paths.append(data)

    for filename in image_paths:
        file_path = os.path.join("./images", filename)
        try:
            file = open(file_path, 'r')  # Opens the file in read mode; adjust mode as needed
            file_objects.append(file)
        except FileNotFoundError:
            print(f"File '{filename}' not found in directory images'")

    return file_objects

app.run()

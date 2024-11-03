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
@cross_origin()
def creators() -> str:
    return "This Backend was built by Leonard, Jon and Lorenzo "


@app.get("/")
@cross_origin()
def hello():
    return flask.redirect("/418", 302)



# very important endpoint, serving lots of tea
@app.get("/418")
@cross_origin()
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

# Static route to serve images and recordings from the `uploads` directory
@app.route('/uploads/<path:filename>')
@cross_origin()
def serve_upload(filename):
    return send_from_directory('uploads', filename)

# Guide Endpoints
@app.get("/guides")
@cross_origin()
def get_guides():
    return guide_list(guides)

@app.get("/guides/<guide_id>")
@cross_origin()
def get_specific_guide(guide_id):
    return unique_guide(guides, guide_id)

# @app.post("/guides")
# @cross_origin()
# def add_guide():
#     data = request.get_json()
#     new_guide = Guide(sections=data["sections"]) 
#     guides.append(new_guide)
#     print(guides)
#     return Response("Guide added successfully", 201)

@app.post("/upload")
@cross_origin()
def upload():
    returns = upload_all(guides)
    returned_guide = returns["app_return"]
    returned_uuid = returned_guide.get_uuid()
    index = find_guide_index(guides, returned_uuid)
    print("upload index (is guide already existing?): ", index)
    if index == -1:
        guides.append(returns["app_return"])
    print("guides:", guides)
    return returns["frontend_return"]

@app.post("/guide_title")
@cross_origin()
def add_guide_title():
    data = request.get_json()
    current_guide = guides[find_guide_index(guides=guides, guide_uuid=data["uuid"])]
    current_guide.set_title(data["title"])
    return Response("Guide title added successfully", 201)
    

@app.get("/get_images/<guide_id>")
@cross_origin()
def get_images(guide_id):
    return guide_image_data(guides, guide_id)   

@app.get("/get_images/<guide_id>/last")
@cross_origin()
def get_last_image(guide_id):
    return guide_image_last(guides, guide_id)

app.run()

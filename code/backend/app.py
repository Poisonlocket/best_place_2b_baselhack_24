import flask
from flask import Flask, Response, Request, request
from flask_cors import CORS, cross_origin
from guide import Guide
from helpers import upload_all

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
    return guides

@app.get("/guides/<int:guide_id>")
def get_specific_guide(guide_id:int):
    return guides[guide_id]

@app.post("/guides")
@cross_origin()
def add_guide():
    data = request.get_json()
    new_guide = Guide(title=data["title"], sections=data["sections"]) 
    guides.append(new_guide)
    print(guides)
    return Response("Guide added successfully", 201)

@app.post("/upload")
@cross_origin()
def upload():
    returns = upload_all(guides)
    return returns["frontend_return"]
    

app.run()

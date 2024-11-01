from flask import Flask, Response, Request, request
from guide import Guide
from helpers import upload_image

app = Flask(__name__)

guides: list[Guide] = []


@app.get("/creators")
def creators() -> str:
    return "This Backend was built by Leonard, Jon and Lorenzo "


@app.get("/app")
def hello() -> str:
    return "henlo"


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
def add_guide():
    data = request.get_json()
    new_guide = Guide(title=data["title"], sections=data["sections"])
    guides.append(new_guide)
    print(guides)
    return Response("Guide added successfully", 201)

@app.post("/upload")
def upload_file():
    upload_image()
    return "Failed"

app.run()

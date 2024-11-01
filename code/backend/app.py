from flask import Flask, Response

app = Flask(__name__)


@app.get("/app")
def hello():
    return "henlo"


@app.get("/418")
def teapot():
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


app.run()

# BaselHack 2024

This is the template repository, which makes our lives (and especially the lives of the jury) easier,
if you follow our structure.

## Explanation

Please make sure that everything, that is code related, goes into `code` directory.

If you have documentation about the code (e.g. UML Diagrams, a readme etc.), that should go into the `documentation` directory.

If you have assets (like videos, presentations etc.), this can go into the `assets` directory.

You can use the MIT license in this template. Make sure to adjust the copy right holders in the placeholder `<copyright holder>` and add every team member to it.
You are also free to choose any other license - depending on the consensus of your team.

Thanks a lot!

### Frontend

jk, we don't do documentation (read react docu)

### Backend

install flask and flask-cors

Start the backend flask server with 
```sh
python code/backend/app.py
```

To upload locally you can use 
```sh 
curl -i -X POST -H "Content-Type: multipart/form-data" -F "images=@/home/user/Pictures/pepe.jpg" -F "images=@/home/user/Pictures/hands.jpg" http://127.0.0.1:5000/upload/images
``` 
to upload multiple images.

Analog use  
```sh 
curl -i -X POST -H "Content-Type: multipart/form-data" -F "audio=@/home/user/Music/never_gonna_give_you_up.mp3" http://127.0.0.1:5000/upload/audio
``` 
to upload audio.

### AI transform from input file

Start transform from a random ```input_text.txt``` with the e.g following keywords ```beginnen```, ```anschliessend```, ```danach```, ```als nächstes```
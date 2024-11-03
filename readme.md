# BaselHack 2024

We chose the challenge from Endress&Hauser "GuideMe". Our team is "Best Place 2B". The product can be checked out on: https://2ce6-83-76-7-131.ngrok-free.app/ (Don't worry about the security warning. That is hosting service specific, and we are good people not hosting malware.)

## Explanation for Developers

Please make sure that everything, that is code related, goes into `code` directory.

If you have documentation about the code (e.g. UML Diagrams, a readme etc.), that should go into the `documentation` directory.

If you have assets (like videos, presentations etc.), this can go into the `assets` directory.

You can use the MIT license in this template. Make sure to adjust the copy right holders in the placeholder `<copyright holder>` and add every team member to it.
You are also free to choose any other license - depending on the consensus of your team.

### Frontend

We use react and tailwind.

To get it to run locally:
use `npm install` to get dependencies
then run:
```sh
npm start
```

### AI
We use API calls to OpenAI, but you can also try it locally:
install openai-whisper (this downloads a few packages of ca. 2 GB)
```sh
pip install openai-whisper
pip install openai
pip install python-dotenv
```
Make sure you set your API key in an .env file. NEVER push that to the repo.
To test the AI transcription + formatting function (audio -> text), you can run the function ```transcribe_and_format_audio```.
To test the AI generation of text descriptions from a series of images (images -> text), you can run the function ```gen_texts_from_images```.
Both are located in the file:
```sh
code/backend/ai/ai_functions.py
```

### Backend
Our backend is python flask with a SQlite3 database.
install flask and flask-cors
```sh
pip install flask flask-cors
```

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

:heart: :computer: :chocolate:

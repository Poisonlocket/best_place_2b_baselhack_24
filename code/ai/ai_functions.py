import whisper
import re
from openai import OpenAI
import os
from dotenv import load_dotenv
import base64
import requests

# Load environment variables from the .env file
load_dotenv()

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')
  
def encode_audio(audio_path):
    with open(audio_path, "rb") as audio_file:
        return base64.b64encode(audio_file.read()).decode('utf-8')

# A simple function to split the transcription into sentences
def split_into_sentences(text):
    sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)
    return sentences


# Function to identify and structure steps
def extract_steps_hardcode(text):
    sentences = split_into_sentences(text)
    steps = []
    step_number = 1
    for sentence in sentences:
        if any(keyword in sentence.lower() for keyword in ["begin", "subsequently", "after that", "next"]):
            steps.append(f"Step {step_number}: {sentence}")
            step_number += 1
        else:
            if steps:
                steps[-1] += " " + sentence
            else:
                steps.append(sentence)
    return steps


def extract_steps_openai(prompt_text, nb_steps):
    prompt_beginning = f"Please summarize this text from a manual into a series of exactly {nb_steps} steps. Include step numbers in the response (e.g. step 1, step 2, etc), starting with 1. Do not include any line breaks."
    total_prompt = prompt_beginning + prompt_text

    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "user", "content": total_prompt}
        ],
        max_tokens=300,       # Adjust for response length
        temperature=0.7       # Controls randomness; higher values yield more creative responses
    )
    text_with_steps = response.choices[0].message.content
    return text_with_steps


def transcribe_and_format_audio(audio_file, nb_steps):
    # Load the whisper model
    model = whisper.load_model("tiny")  # You can choose "small", "medium", or "large" models based on your needs

    # Transcribe the audio using Whisper
    try:
        result = model.transcribe(audio_file)
        translated_text = result['text']
    except Exception as e:
        print(f"Failed to transcribe audio: {e}")
        exit(1)

    # Extract steps from the transcription
    steps = extract_steps_openai(translated_text, nb_steps) # Choose which method to use (hardcode or openai)
    return steps


def transcribe_and_format_audio_openai(audio_file, format, nb_steps):
    base64_audio = encode_audio(audio_file)
    response = client.chat.completions.create(
        model="gpt-4o-audio-preview",
        modalities=["text", "audio"],
        audio={"voice": "alloy", "format": format},
        messages=[
            {
                "role": "user",
                "content": [
                    { 
                        "type": "text",
                        "text": "Please transcribe this recording."
                    },
                    {
                        "type": "input_audio",
                        "input_audio": {
                            "data": base64_audio,
                            "format": format
                        }
                    }
                ]
            },
        ]
    )
    translated_text = response.choices[0].message
    steps = extract_steps_openai(translated_text, nb_steps) # Choose which method to use (hardcode or openai)
    return steps


def gen_texts_from_images(images, possible_outcomes):
    # We get a series of images, where each is labeled guide_uuid.step_nb.img_seq.extension, e.g. no_id.0.0.jpg
    # Thus we can just traverse the list of images and see which outcome it needed to go from one to the next

    # There will be one text per section / step_nb
    texts = []
    
    previous_seq = int(images[0].split('.')[1])

    for image in images:
        current_text = ""
        step_nb = int(image.split('.')[1])
        img_seq = int(image.split('.')[2])

        if len(images) == 1:
            prompt = "Give me a brief summary of what you see in this image, like it's the initial state of an installation manual."
            response = client.chat.completions.create(
                model="gpt-4-turbo",
                messages=[
                    {"role": "user", "content": prompt}
                ],
                max_tokens=300,
                temperature=0.7
            )
            current_text += response.choices[0].message.content
            texts.append(current_text)
        else:
            if step_nb > previous_seq:
                texts.append(current_text)
                current_text = ""
            if (step_nb + img_seq > 0):
                prompt = f"""From these two images, tell me what needs to be done to go from image1 to image2.
                            Format it like an instruction manual (don't over do it). Categorize the transition from one of the following output categories: {possible_outcomes}.
                            From that categorization, continue the description. Be brief in your response."""
                base64_image1 = encode_image("../backend/uploads/images/"+image)
                base64_image2 = encode_image("../backend/uploads/images/"+previous_image)
                response = client.chat.completions.create(
                    model="gpt-4-turbo",
                    messages=[
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "text",
                                    "text": prompt,
                                },
                                {
                                    "type": "image_url",
                                    "image_url": {
                                        "url": f"data:image/jpeg;base64,{base64_image1}",
                                    },
                                },
                                {
                                    "type": "image_url",
                                    "image_url": {
                                        "url": f"data:image/jpeg;base64,{base64_image2}",
                                    },
                                },
                            ]
                        }
                    ],
                )
                current_text += response.choices[0].message.content

        previous_seq = step_nb
        previous_image = image
    
    if len(images) > 1:
        texts.append(current_text)

    return texts
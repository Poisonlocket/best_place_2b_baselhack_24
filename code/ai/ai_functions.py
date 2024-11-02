import whisper
import re
import openai
import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

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

# Function to format the steps into a manual
def format_manual(steps):
    #manual = f"# {title}\n\n" # If you want to add a title
    manual = "## Installation Manual\n\n"
    for step in steps:
        manual += f"{step}\n\n"
    return manual

def extract_steps_openai(prompt_text, nb_steps):
    prompt_beginning = f"Please summarize this text from a manual into a series of exactly {nb_steps} steps. Include step numbers in the response (e.g. step 1, step 2, etc), starting with 1."
    total_prompt = prompt_beginning + prompt_text

    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "user", "content": total_prompt}
        ],
        max_tokens=300,       # Adjust for response length
        temperature=0.7       # Controls randomness; higher values yield more creative responses
    )

    text_with_steps = response['choices'][0]['message']['content']
    return text_with_steps

def transcribe_and_format_audio(audio_file, nb_steps):
    # Load the whisper model
    model = whisper.load_model("base")  # You can choose "small", "medium", or "large" models based on your needs

    # Transcribe the audio using Whisper
    try:
        result = model.transcribe(audio_file)
        translated_text = result['text']
    except Exception as e:
        print(f"Failed to transcribe audio: {e}")
        exit(1)

    # Extract steps from the transcription
    steps = extract_steps_openai(translated_text, nb_steps) # Choose which method to use (hardcode or openai)
    formatted_text = format_manual(steps)

    return formatted_text
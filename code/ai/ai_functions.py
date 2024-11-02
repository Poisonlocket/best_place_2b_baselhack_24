import whisper
import re
#from pydub import AudioSegment

# A simple function to split the transcription into sentences
def split_into_sentences(text):
    sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)
    return sentences

# Function to identify and structure steps
def extract_steps(text):
    sentences = split_into_sentences(text)
    steps = []
    step_number = 1
    for sentence in sentences:
        if any(keyword in sentence.lower() for keyword in ["beginnen", "anschliessend", "danach", "als nächstes"]):
            steps.append(f"Step {step_number}: {sentence}")
            step_number += 1
        else:
            if steps:
                steps[-1] += " " + sentence
            else:
                steps.append(sentence)
    return steps

# Function to format the steps into a manual
def format_manual(title, steps):
    #manual = f"# {title}\n\n" # If you want to add a title
    manual = "## Installation Manual\n\n"
    for step in steps:
        manual += f"{step}\n\n"
    return manual

def transcribe_and_format_audio(audio_file):
    # Load the whisper model
    model = whisper.load_model("base")  # You can choose "small", "medium", or "large" models based on your needs

    # Transcribe the audio using Whisper
    try:
        result = model.transcribe(audio_file)
        text = result['text']
    except Exception as e:
        print(f"Failed to transcribe audio: {e}")
        exit(1)

    # Extract steps from the transcription
    steps = extract_steps(text)
    formatted_text = format_manual(steps)

    return formatted_text
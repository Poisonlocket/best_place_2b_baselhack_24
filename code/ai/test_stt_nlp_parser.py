import yt_dlp
import whisper
from pydub import AudioSegment

# Replace with the URL of the YouTube video
video_url = 'https://www.youtube.com/watch?v=GXP0DnpHsCY'

# Download the audio using yt-dlp
ydl_opts = {
    'format': 'bestaudio/best',
    'outtmpl': 'video_audio.mp4',  # Specify the filename
}

try:
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([video_url])
except Exception as e:
    print(f"Failed to download video: {e}")
    exit(1)

# Convert mp4 audio to wav
try:
    audio = AudioSegment.from_file("video_audio.mp4")
    audio.export("video_audio.wav", format="wav")
except Exception as e:
    print(f"Failed to convert audio: {e}")
    exit(1)

# Load the whisper model
model = whisper.load_model("base")  # You can choose "small", "medium", or "large" models based on your needs

# Transcribe the audio using Whisper
try:
    result = model.transcribe("video_audio.wav")
    text = result['text']
    print("Transcription: ", text)
except Exception as e:
    print(f"Failed to transcribe audio: {e}")
    exit(1)

# Example of how to parse the transcribed text
def parse_steps(transcribed_text):
    steps = []
    # Split the text into lines or sentences
    lines = transcribed_text.split('. ')
    
    for line in lines:
        if "step" in line.lower():  # Adjust this condition based on the structure of the instructions
            steps.append(line.strip())
    
    return steps

# Process the transcribed text
if 'text' in locals():  # Ensure that text was successfully created
    parsed_steps = parse_steps(text)
    for i, step in enumerate(parsed_steps, start=1):
        print(f"Step {i}: {step}")

    with open("instruction_manual.txt", "w") as f:
        for i, step in enumerate(parsed_steps, start=1):
            f.write(f"Step {i}: {step}\n")
else:
    print("No text transcribed, skipping parsing.")

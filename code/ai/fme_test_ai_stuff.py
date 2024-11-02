from pytube import YouTube
from pytubefix import YouTube
from pytubefix.cli import on_progress
import whisper


def download_audio(video_url):
    try:
        yt = YouTube(video_url, on_progress_callback = on_progress)
        print(yt.title)
        audio_stream = yt.streams.filter(only_audio=True).first()
        if not audio_stream:
            raise ValueError("No audio streams available.")
        audio_file = audio_stream.download(filename='downloaded_audio.mp4')
        return audio_file
    except Exception as e:
        print(f"Error downloading audio: {e}")
        return None


def transcribe_audio(audio_file):
    try:
        model = whisper.load_model("base")
        result = model.transcribe(audio_file)
        return result['text']
    except Exception as e:
        print(f"Error during transcription: {e}")
        return None

def format_transcription(transcription):
    # Split the transcription into sections based on transition words
    sections = []
    current_section = []

    for line in transcription.split('. '):  # Assuming sentences are separated by periods
        line = line.strip()
        if not line:
            continue

        # Check for transition words and create sections
        if "First," in line:
            current_section = format_to_section(current_section, sections)

        elif "Second," in line:
            current_section = format_to_section(current_section, sections)

        elif "Next," in line:
            current_section = format_to_section(current_section, sections)

        elif "Then," in line:
            current_section = format_to_section(current_section, sections)

        elif "Last," in line or "Lastly," in line or "Finally," in line:
            current_section = format_to_section(current_section, sections)

        # Add the current line to the current section
        current_section.append(line)

    # Append any remaining text
    if current_section:
        sections.append(" ".join(current_section))

    return "\n".join(sections)


def format_to_section(current_section, sections):
    if current_section:
        sections.append(" ".join(current_section))
        current_section = []
    sections.append("\n")
    return current_section


def main():
    audio_file = download_audio("https://www.youtube.com/watch?v=GXP0DnpHsCY")

    if audio_file:
        print("Audio downloaded. Now transcribing...")
        transcription = transcribe_audio(audio_file)

        if transcription:
            formatted_transcription = format_transcription(transcription)
            with open("transcription.txt", "w") as f:
                f.write(formatted_transcription)
            print("Transcription completed and saved to transcription.txt")
        else:
            print("Transcription failed.")
    else:
        print("Audio download failed.")


if __name__ == "__main__":
    main()

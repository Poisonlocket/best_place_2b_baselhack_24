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


def main():
    audio_file = download_audio("https://www.youtube.com/watch?v=GXP0DnpHsCY")

    if audio_file:
        print("Audio downloaded. Now transcribing...")
        transcription = transcribe_audio(audio_file)

        if transcription:
            with open("transcription.txt", "w") as f:
                f.write(transcription)
            print("Transcription completed and saved to transcription.txt")
        else:
            print("Transcription failed.")
    else:
        print("Audio download failed.")


if __name__ == "__main__":
    main()

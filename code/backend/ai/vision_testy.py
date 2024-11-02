import base64
import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()  # Load environment variables from .env file
api_key = os.getenv("OPENAI_API_KEY")


client = OpenAI()

## TODO: Use the image from the FE
image_path = "../../assets/test_data_pen_1.jpg"

def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

base64_image = encode_image(image_path)

## Multiple images also possible; see https://platform.openai.com/docs/guides/vision#multiple-image-inputs
response = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "What is in this image?",
        },
        {
          "type": "image_url",
          "image_url": {
            "url":  f"data:image/jpg;base64,{base64_image}"
          },
        },
      ],
    }
  ],
  max_tokens=100
)

print(response.choices[0].message.content)
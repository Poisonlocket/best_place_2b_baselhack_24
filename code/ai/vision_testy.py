from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file
api_key = os.getenv('OPENAI_API_KEY')

client = OpenAI()

# this will make the output extra cute: Describe it as if I were 5 years old.

response = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "What’s in this image?"},
        {
          "type": "image_url",
          "image_url": {
            "url": "https://assets.alliedelec.com/f_auto,q_auto/73689460.jpg",
          },
        },
      ],
    }
  ],
  max_tokens=100,
)

print(response.choices[0].message.content)
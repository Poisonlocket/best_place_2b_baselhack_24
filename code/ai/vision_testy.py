import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()  # Load environment variables from .env file
api_key = os.getenv("OPENAI_API_KEY")

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
                        "url": "https://www.endress.com/__image/a/9511035/k/966cb24d9fa10ad1514dad54e51fae2b68afdfeb/ar/1-1/w/344/t/jpg/b/ffffff/n/true/fn/Bundle%2001_Template_71481757_CDP50%20Panel%20for%20free%20Chlorine.jpg",
                    },
                },
            ],
        }
    ],
    max_tokens=100,
)

print(response.choices[0].message.content)

import re

# Function to read the text file
def read_text_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

# Path to the text file
text_file = "./input_text.txt"

# Read the text from the file
transcription = read_text_file(text_file)
print("Transcription:", transcription)

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

# Extract steps from the transcription
steps = extract_steps(transcription)
print("Extracted Steps:")
for step in steps:
    print(step)

# Function to format the steps into a manual
def format_manual(title, steps):
    manual = f"# {title}\n\n"
    manual += "## Installation Manual\n\n"
    for step in steps:
        manual += f"{step}\n\n"
    return manual

# Example title for the manual
title = "Installation Guide for [Product Name]"

# Optionally, save the manual to a text file
manual_text = format_manual(title, steps)
with open("installation_manual.txt", "w") as file:
    file.write(manual_text)

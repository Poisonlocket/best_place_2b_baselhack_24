class Section:
    def __init__(self):
        self.img_ids = []  # Paths to images
        self.text = ""     # Instruction text

    def get_img_ids(self):
        return self.img_ids

    def get_text(self):
        return self.text

    # Input: image path
    def add_image(self, image: str):
        self.img_ids.append(image)
    
    def remove_image(self, image: str):
        self.img_ids.remove(image)
    
    # Input: text block (string)
    def set_text(self, text: str):
        self.text = text
    
    def remove_text(self):
        self.text = ""

    def to_json(self):
        # Serialize the Section to a dictionary that can be converted to JSON
        return {
            "images": [{"fileContent": img_id} for img_id in self.img_ids],
            "instructionText": self.text
        }

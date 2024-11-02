class Section:
    def __init__(self, title):
        self.title = title
        self.img_ids = []
        self.text = ""

    @property
    def get_title(self):
        return self.title

    @property
    def get_img_ids(self):
        return self.img_ids

    @property
    def get_text(self):
        return self.text

    # Input: image path
    def add_image(self, image):
        self.img_ids.append(image)
    
    def remove_image(self, image):
        self.img_ids.remove(image)
    
    # Input: text block (string)
    def set_text(self, text):
        self.text = text
    
    def remove_text(self, text):
        self.text = ""
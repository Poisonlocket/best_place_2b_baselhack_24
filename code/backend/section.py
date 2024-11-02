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

    def add_image(self, image):
        return # TO BE MODIFIED

    def modify_image(self, image):
        return # TO BE MODIFIED
    
    def remove_image(self, image):
        return # TO BE MODIFIED
    
    def add_text(self, text):
        return # TO BE MODIFIED
    
    def modify_text(self, text):
        return # TO BE MODIFIED
    
    def remove_text(self, text):
        return # TO BE MODIFIED
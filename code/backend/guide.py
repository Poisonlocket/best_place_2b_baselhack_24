import uuid
from section import Section

class Guide:
    def __init__(self, sections=[]):
        self.title = ""
        self.sections = sections
        self.uuid = str(uuid.uuid4())

    def get_uuid(self):
        return self.uuid
    
    def get_title(self):
        return self.title
    
    def set_title(self, title):
        self.title = title

    def add_section(self, section):
        if isinstance(section, Section):
            self.sections.append(section)
        else:
            raise TypeError("Only Section instances can be added to Guide sections")
        
    def remove_sections(self):
        self.sections = []

    def __str__(self):
        return f"Guide Title: {self.title}\n"

    
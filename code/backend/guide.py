import uuid
from section import Section

class Guide:
    def __init__(self, sections=None):
        self.title = ""
        self.sections = sections if sections is not None else []
        self.uuid = str(uuid.uuid4())

    def get_uuid(self):
        return self.uuid
    
    def get_title(self):
        return self.title

    def get_sections(self):
        return self.sections

    def set_uuid(self, uuid):
        self.uuid = uuid

    def set_title(self, title):
        self.title = title

    def add_section(self, section):
        if isinstance(section, Section):
            self.sections.append(section)
        else:
            raise TypeError("Only Section instances can be added to Guide sections")
        
    def remove_sections(self):
        self.sections = []

    def to_json(self):
        # Serialize the Guide to a dictionary that can be converted to JSON
        return {
            "title": self.title,
            "uuid": self.uuid,
            "sections": [section.to_json() for section in self.sections]
        }

    def __str__(self):
        return f"Guide Title: {self.title}\n"

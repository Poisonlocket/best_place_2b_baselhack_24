import uuid
from section import Section

class Guide:
    def __init__(self, sections=[]):
        self.sections = sections
        self._uuid = str(uuid.uuid4())

    def get_uuid(self):
        return self._uuid
    
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
        sections_str = "\n\n".join(section.get_title for section in self.sections)
        return f"Guide Title: {self.title}\n\n{sections_str}"
from section import Section

class Guide:
    def __init__(self, title):
        self.title = title
        self.sections = []

    def add_section(self, section):
        if isinstance(section, Section):
            self.sections.append(section)
        else:
            raise TypeError("Only Section instances can be added to Guide sections")
        
    def remove_section(self, section):
        if isinstance(section, Section):
            try:
                self.sections.remove(section)
            except:
                raise Exception("Section not found in this guide!")
        else:
            raise TypeError("Only Section instances can be removed from Guide sections")

    def __str__(self):
        sections_str = "\n\n".join(section.get_title for section in self.sections)
        return f"Guide Title: {self.title}\n\n{sections_str}"
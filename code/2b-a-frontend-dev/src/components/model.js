class SectionImage {
    constructor(fileContent, image_number, image_name) {
        this.fileContent = fileContent;
        this.image_number = image_number;
        this.image_name = image_name;
    }
}

class SectionRecording {
    constructor(fileContent) {
        this.fileContent = fileContent;
    }
}

// models/Section.js
class Section {
    constructor(number) {
        this.number = number;
        this.title = "";
        this.images = []; // Array to hold image URLs or blobs
        this.recording = null; // To hold audio recording URL or blob
        this.instructionText = "";
    }

    addImage(sectionImage) {
        this.images.push(sectionImage);
    }

    setRecording(recording) {
        this.recording = recording;
    }
}


// models/Guide.js
class Guide {
    constructor(name, uuid) {
        this.name = name;
        this.uuid = uuid;
        this.startImage = "";
        this.description = "";
        this.sections = []; // Array of Section instances
    }

    addSection(section) {
        this.sections.push(section);
    }
}


export { SectionImage, SectionRecording, Section, Guide };

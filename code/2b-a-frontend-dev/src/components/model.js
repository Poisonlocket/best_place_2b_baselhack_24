class SectionImage {
    constructor(fileContent, image_number, image_name) {
        this.fileContent = fileContent;
        this.image_number = image_number;
        this.image_name = image_name;
    }


    async asBlob() {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous"; // Allows cross-origin images to be used

            // Load the image from the fileContent
            img.src = this.fileContent;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                const context = canvas.getContext("2d");
                context.drawImage(img, 0, 0);

                // Convert canvas content to a JPEG blob
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error("Could not convert image to blob"));
                    }
                }, "image/jpeg");
            };

            img.onerror = (error) => reject(error);
        });
    }
}

class SectionRecording {
    constructor(fileContent) {
        this.fileContent = fileContent;
    }
    
    async asBlob() {
        return new Promise((resolve, reject) => {
            if (typeof this.fileContent === "string") {
                // Fetch the OGG data from the provided URL or base64 string
                fetch(this.fileContent)
                    .then((response) => {
                        if (response.ok) {
                            return response.blob();
                        } else {
                            throw new Error("Failed to fetch audio data");
                        }
                    })
                    .then((blob) => resolve(blob))
                    .catch((error) => reject(error));
            } else if (this.fileContent instanceof Blob) {
                // If fileContent is already a Blob, resolve it directly
                resolve(this.fileContent);
            } else {
                reject(new Error("Unsupported fileContent format"));
            }
        });
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

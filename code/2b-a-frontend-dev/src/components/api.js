import axios from 'axios';
import { Guide } from "./model";
import { generateTestGuide } from './test_data';
// api.js
export const saveAndProcessGuide = async ({ guide }) => {
    try {
        // Simulate a delay of 1 second
        //await new Promise(resolve => setTimeout(resolve, 1000));
        let data = guideToData(guide)
        let new_uuid = await storeImages(data);
        // Mock response data
        // const response = { message: "Guide processed successfully", guide};
        // console.log("Fake API response:", response);
        let new_guide = (prevGuide => 
            new Guide(prevGuide.name, new_uuid, prevGuide.startImage, 
                prevGuide.description, prevGuide.section));
        return new_guide;
    } catch (error) {
        console.error("Failed to process guide:", error);
        throw error;
    }
};

function guideToData(guides) {
    let data = new FormData();
    for (let i = 0; i < guides.sections.length; i++) {
        let currSection = guides.sections[i];
        for (let j = 0; j < currSection.images.length; j++) {
            data.append('awesome_files', currSection.images[j], "" + guides.uuid 
                + "." + i + "." + j + ".jpg");
        }
        if(currSection.recording) {
            data.append('awesome_files', currSection.recording, "" + guides.uuid 
                + "." + i + "." + currSection.images.length + ".ogg");
        }
    }
    return data;
}

async function storeImages(data) {
    axios.post(process.env.REACT_APP_API_URL + "/upload", data, {
        headers: {
            'accept': 'application/json',
            'Content-Encoding': 'gzip',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
    }).then((response) => {
        console.log(response.data.guide_id)
        return response.data.guide_id;
    }).catch((error) => {
        console.error(error)
    });
}


// api.js
export const getGuide = async (id) => {
    
    return generateTestGuide();
};

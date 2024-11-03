import axios from 'axios';
import { Guide, Section } from "./model";
import { generateTestGuide } from './test_data';
// api.js
export const saveAndProcessGuide = async (guide) => {
    try {
        // Simulate a delay of 1 second
        //await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(guide);
        let data = await guideToData(guide)
        let new_uuid = await storeImages(data);
        await storeTitle(guide.title, new_uuid);
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

async function guideToData(guides) {
    let data = new FormData();
    for (let i = 0; i < guides.sections.length; i++) {
        let currSection = guides.sections[i];
        for (let j = 0; j < currSection.images.length; j++) {
            let imageContent = await fetch(currSection.images[j].fileContent)
            console.log(imageContent.blob)
            data.append('awesome_files', imageContent.blob(), "" + guides.uuid 
                + "." + i + "." + j + ".jpg");
        }
        if(currSection.recording) {
            data.append('awesome_files', currSection.recording.fileContent, "" + guides.uuid 
                + "." + i + "." + currSection.images.length + ".ogg");
        }
    }
    return data;
}

async function storeImages(data) {
    axios.post("" + process.env.REACT_APP_API_URL + "/upload", data, {
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

async function storeTitle(title, uuid) {
    axios.post("" + process.env.REACT_APP_API_URL + "/upload", {
        headers: {
            'accept': 'application/json',
            'Content-Encoding': 'gzip',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `application/json`,
        },
        body: {
            'uuid': "" + uuid,
            'title': "" + title
        }
    }).then((response) => {
        console.log(response.data.guide_id)
        return response.data.guide_id;
    }).catch((error) => {
        console.error(error)
    });
}

async function callGuide(id) {
    axios({
        method: 'get',
        url: "" + process.env.REACT_APP_API_URL + '/guides/' + id,
    }).then(function (response) {
        console.log(response.data);
        return response.data;
    }).catch((error) => {
        console.log(error.message);
        return null;
    });
}

async function callGuideImages(id) {
    axios({
        method: 'get',
        url: "" + process.env.REACT_APP_API_URL + '/get_images/' + id,
    }).then(function (response) {
        console.log("images returned");
        return response.data.images;
    }).catch((error) => {
        console.log(error.message);
        return null;
    });
}

function responseDataToGuide(responseData, responseImages) {
    let name = responseData.title;
    let uuid = responseData.uuid;
    let sections = [];
    for(let i = 0; i < responseData.sections.length; i++) {
        let instructionText = responseData.sections[i].text;
        let images = [];
        for(let j = 0; j < responseImages[i].length; j++) {
            images.push(responseImages[i][j]);
        }
        let newSection = new Section(i, name, images, null, instructionText);
        sections.push(newSection);
    }
    return new Guide(name, uuid, "", "", sections);
}

// api.js
export const getGuide = async (id) => {
    let responseData = await callGuide(id);
    let responseImages = await callGuideImages(id);
    if(responseData && responseData.sections && responseImages) {
        return responseDataToGuide(responseData, responseImages);
    }
    return generateTestGuide();
};


// Updated getGuides to set the last image in the last section as the startImage
export const getGuides = async () => {
    let responseData = await callAllGuides();
    if (responseData) {
        return await responseData.guides.map(e => getGuide(e));
    } else {
        const guides = [generateTestGuide(), generateTestGuide(), generateTestGuide()];
    
        // Set each guide's startImage to the last image in the last section
        guides.forEach((guide) => {
            const lastSection = guide.sections[guide.sections.length - 1];
            if (lastSection && lastSection.images.length > 0) {
                guide.startImage = lastSection.images[lastSection.images.length - 1].fileContent;
            }
        });

        return guides;
    }
};

async function callAllGuides() {
    axios({
        method: 'get',
        url: "" + process.env.REACT_APP_API_URL + '/guides',
      }).then(function (response) {
        console.log(response);
        return response.data;
      }).catch((error) => {
        return null;
    });
}
import React from 'react';
import { Button } from "flowbite-react"
import axios from 'axios';
import FormData from 'form-data';
import imageFile from '../assets/test1.jpg';

class FileWithID{
	constructor(fileContent, id="no_id", step_number, image_number){
    	this.fileContent = fileContent;
      this.id = id;
      this.step_number = step_number;
      this.image_number = image_number;
    }
  	displayInfo(){
    	return "" + this.id + "." + this.step_number + "." + this.image_number + ".jpg";
    }
}

function SendFilesButton(files) {
  async function getData() {
    let data = new FormData();
    for(let file of files) {
      data.append('awesome_files', file.fileContent, file.displayInfo());
    }
    return data;
  }

  async function storeImages() {
    const data = await getData()
    axios.post("http://localhost:5000/upload", data, {
      headers: {
        'accept': 'application/json',
        'Content-Encoding': 'gzip',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
    })
      .then((response) => {
        // TODO: add response to state here
        console.log(response)
      }).catch((error) => {
        console.error(error)
      });
  }

  return (
    id &&
    <div>
      <Button onClick={storeImages} >Save</Button>
    </div>
  );
}

export default SendFilesButton;
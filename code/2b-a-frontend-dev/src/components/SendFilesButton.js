import React, { useState } from 'react';
import { Button } from "flowbite-react"
import axios from 'axios';
import FormData from 'form-data';

function SendFilesButton({ filesWithID }) {
  const [guideID, setGuideID] = useState("no_id")

  async function getData() {
    let data = new FormData();
    for(let file of filesWithID) {
      data.append('awesome_files', file.fileContent, guideID + "." + file.displayInfo());
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
        setGuideID(response.body.guide_id)
        console.log(response)
      }).catch((error) => {
        console.error(error)
      });
  }

  return (
    <div>
      <Button onClick={storeImages} >Save</Button>
    </div>
  );
}

export default SendFilesButton;
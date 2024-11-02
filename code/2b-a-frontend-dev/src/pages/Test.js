import React from 'react';
import { Button } from "flowbite-react"
import axios from 'axios';
import FormData from 'form-data';
import imageFile from '../assets/test1.jpg';



function Test() {
  async function getData() {
    try {
      const response = await fetch(imageFile);
      const fileBlob = await response.blob();

      let data = new FormData();
      data.append('images', fileBlob, "hello darkness my old friend");
      return data
    } catch(err) {
      console.error(err)
    }
  }

  async function storeImage() {
    const data = await getData()
    axios.post("http://localhost:5000/upload/images", data, {
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
    <div>
      <Button onClick={storeImage} >Save</Button>
    </div>
  );
}

export default Test;
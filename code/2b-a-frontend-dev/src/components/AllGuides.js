import React from 'react';

function AllGuides({ setIDList }) {

  async function storeImages() {
    /* call get on /guides endpoint
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
        setGuideID(response.data.guide_id)
        console.log(response.data.guide_id)
      }).catch((error) => {
        console.error(error)
      });
    */
  }

  return (
    <div>
      <ul>
        <li>Guide 1</li>
        <li>Guide 2</li>
        <li>Guide 3</li>
        <li>Guide 4</li>
        <li>Guide 5</li>
      </ul>
    </div>
  );
}

export default AllGuides;
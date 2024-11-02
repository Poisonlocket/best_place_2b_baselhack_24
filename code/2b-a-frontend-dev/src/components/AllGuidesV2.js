import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import axios from 'axios';

function AllGuidesV2() {
  const [guideTitles, setGuideTitles] = useState([]);
  const [guideUUIDs, setGuideUUIDS] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    axios({
      method: 'get',
      url: 'https://localhost:5000/guides',
      responseType: 'application/json'
    }).then(function (response) {
      console.log(response);
      setGuideUUIDS(response.data.guides);
      setGuideTitles(response.data.titles);
      setLoading(false);
    }).catch((error) => {
      setError(error.message);
    });
  }

  // Load data on page load
  useEffect(() => {
    fetchData();
  }, []);

  // onClick handler for list items
  const handleItemClick = (item, index) => {
    alert(`You clicked on ${item.name} (Item ${index + 1})`);
  };

  return (
    <div className='h-full'>
      <h1>Item List</h1>
      <Button onClick={fetchData}>Reload</Button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {guideTitles.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item, index)}>
            {index + 1}. {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllGuidesV2;


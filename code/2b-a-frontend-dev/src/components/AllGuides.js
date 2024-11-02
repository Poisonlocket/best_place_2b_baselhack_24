import React from 'react';
import { Link } from "react-router-dom";
import Test1 from '../assets/test1.jpg'

function AllGuides({ setIDList }) {

  async function storeImages() {
    /* call get on /guides endpoint
    const data = await getData()
    axios.post(process.env.REACT_APP_API_URL + "/upload", data, {
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
    <div className="flex items-start justify-center h-[50vh]">
      <div className="Card-guide flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-[5px]">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={Test1}  alt="" />
        <div className="flex flex-col p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">How to Install your Sensor.</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Learn how to install a temperature sensor from Endress+Hauser</p>
          <div className="flex mt-4 md:mt-6">
            <Link to="/edit">
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Edit Guide
              </button>
            </Link>
            <Link to="/view">
              <button className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllGuides;

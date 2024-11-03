import React from 'react';
import { Link } from "react-router-dom";
import rubberDuck from '../assets/rubber_duck_4.jpg'; // Import the image

function AllGuides({ guides }) { // Assume guides array is passed as a prop

  guides.forEach(element => {
    console.log("Guide: ", element)
  });

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {guides.map((guide, index) => (
        <div key={index} className="flex flex-col items-center bg-slate-200 transition ease-in-out duration-150ra border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-full max-w-sm">
          <img className="w-full h-48 object-cover rounded-t-lg" src={guide.startImage || rubberDuck} alt={guide.name} />
          <div className="flex flex-col p-4 w-full">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">{guide.name}</h5>
            <p className="text-gray-700 dark:text-gray-400 mb-4">{guide.description}</p>
            <div className="flex space-x-4">
              <Link to={`/view/${guide.id}`}>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none">
                  View Guide
                </button>
              </Link>
              <Link to={`/edit/${guide.id}`}>
                <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none">
                  Edit Guide
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllGuides;

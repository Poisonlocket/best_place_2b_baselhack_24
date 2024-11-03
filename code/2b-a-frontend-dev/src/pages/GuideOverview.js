import React, { useEffect, useState } from 'react';
import AllGuides from '../components/AllGuides';
import { getGuides } from '../components/api'; // Assume fetchGuides fetches guides from API

function GuideOverview() {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const loadGuides = async () => {
      const fetchedGuides = await getGuides();
      setGuides(fetchedGuides);
    };
    loadGuides();
  }, []);

  return (
    <AllGuides guides={guides} />
  );
}

export default GuideOverview;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CarrouselView from "../components/CarrouselView";
import CarouselViewMobile from "../components/CarouselViewMobile";
import { getGuide } from "../components/api";
import useIsMobile from "../hooks/useIsMobile";

const View = () => {
    const { id } = useParams(); // Retrieve the id parameter from the URL
    const [guide, setGuide] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        const fetchGuide = async () => {
            try {
                setLoading(true);
                const guideData = await getGuide(id); // Pass the id to getGuide
                setGuide(guideData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGuide();
    }, [id]); // Re-fetch guide if the id changes

    return (
        <div className="w-full min-h-max p-4 flex flex-col items-center">
            {loading ? (
                <p className="text-center">Loading SmartGuide...</p>
            ) : error ? (
                <p className="text-center text-red-500">Error: {error}</p>
            ) : (
                <>
                    <div className="w-full max-w-6xl mb-6">
                        <h1 className="text-4xl font-bold text-center md:text-left">{guide.name}</h1> 
                        <div>v1.3</div>
                    </div>

                    {/* Conditional rendering for mobile and desktop */}
                    <div className="w-full max-w-6xl flex-grow flex justify-center">
                        <div className="w-full">
                            {isMobile ? (
                                <CarouselViewMobile sections={guide.sections} />
                            ) : (
                                <CarrouselView sections={guide.sections} />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default View;

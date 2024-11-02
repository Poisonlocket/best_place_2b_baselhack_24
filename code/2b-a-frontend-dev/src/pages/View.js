import React, { useState, useEffect } from "react";
import CarrouselView from "../components/CarrouselView";
import { getGuide } from "../components/api"; // Import the API function

const View = () => {
    const [guide, setGuide] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGuide = async () => {
            try {
                setLoading(true);
                const guideData = await getGuide();
                setGuide(guideData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGuide();
    }, []);

    return (
        <div className="w-full min-h-max p-4 flex flex-col items-center">
            {/* Guide Title */}
            {loading ? (
                <p className="text-center">Loading SmartGuide...</p>
            ) : error ? (
                <p className="text-center text-red-500">Error: {error}</p>
            ) : (
                <>
                    <div className="w-full max-w-6xl mb-6">
                        <h1 className="text-4xl font-bold text-center md:text-left">{guide.name}</h1> <div>v1.3</div>
                    </div>

                    {/* Carousel View */}
                    <div className="w-full max-w-6xl flex-grow flex justify-center">
                        <div className="w-full">
                            <CarrouselView sections={guide.sections} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default View;

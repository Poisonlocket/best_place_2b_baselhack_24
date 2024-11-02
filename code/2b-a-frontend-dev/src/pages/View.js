import React from "react";
import CarrouselView from "../components/Carrousel";

const View = () => {
    return (
        <div className="w-full min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6">SmartGuide:</h1>
            <div className="flex-grow">
                <CarrouselView />
            </div>
        </div>
    );
};

export default View;

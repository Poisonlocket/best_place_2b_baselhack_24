import React from "react";
import CarrouselView from "../components/Carrousel";

const View = () => {
    return (
        <div className="w-full min-h-screen p-4 bg-gray-100 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4 text-center">SmartGuide</h1>
            <div className="w-full max-w-4xl flex-grow">
                <CarrouselView />
            </div>
        </div>
    );
};

export default View;

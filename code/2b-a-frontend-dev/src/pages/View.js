import React from "react";
import CarrouselView from "../components/Carrousel";

const View = () => {
    return (
        <div className="h-[78vh] mx-4 flex flex-col">
            <h1 className="mb-4 text-4xl">Welcome to View</h1>
            <div className="flex-grow">
                <CarrouselView />
            </div>
        </div>
    );
};

export default View;

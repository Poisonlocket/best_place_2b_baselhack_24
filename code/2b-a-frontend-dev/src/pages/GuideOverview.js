import React from "react";
import AllGuides from "../components/AllGuides";

const GuideOverview = () => {
    return (
        <div className="w-full min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6">Overview:</h1>
            <AllGuides />
        </div>
    );
};

export default GuideOverview;
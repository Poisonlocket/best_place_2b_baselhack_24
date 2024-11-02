import React from "react";
import CameraCapture from "../components/CameraCapture";
import AudioCapture from "../components/AudioCapture";

const Edit = () => {
    return (
        <div className="w-full min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6">Editing Assembly Guide: </h1>
            <div className="w-full flex space-x-4">
                {/* Left Column - Camera */}
                <div className="w-2/3">
                    <CameraCapture />
                </div>
                
                {/* Right Column - Audio */}
                <div className="w-1/3">
                    <AudioCapture />
                </div>
            </div>
        </div>
    );
};

export default Edit;

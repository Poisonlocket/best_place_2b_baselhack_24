// components/SectionEdit.js
import React, { useState } from "react";
import CameraCapture from "./CameraCapture";
import AudioCapture from "./AudioCapture";
import { SectionImage, SectionRecording } from "./model";

const SectionEdit = ({ section, onSectionUpdate, onClose }) => {
    const [instructionText, setInstructionText] = useState(section.instructionText || "");
    const [title, setTitle] = useState(section.title || "");
    const [retakingImageNumber, setRetakingImageNumber] = useState(null);

    // Add or retake an image in the section
    const handleAddImage = (fileContent) => {
        if (retakingImageNumber !== null) {
            section.images = section.images.map(img =>
                img.image_number === retakingImageNumber
                    ? new SectionImage(fileContent, img.image_number, img.image_name)
                    : img
            );
            setRetakingImageNumber(null); // Exit retake mode
        } else {
            const imageNumber = section.images.length + 1;
            const newImage = new SectionImage(fileContent, imageNumber, `Image ${imageNumber}`);
            section.addImage(newImage);
        }
        onSectionUpdate(section);
    };

    const handleSetRecording = (fileContent) => {
        const newRecording = new SectionRecording(fileContent);
        section.setRecording(newRecording);
        onSectionUpdate(section);
    };

    const handleInstructionChange = (e) => {
        const newInstructionText = e.target.value;
        setInstructionText(newInstructionText);
        section.instructionText = newInstructionText;
        onSectionUpdate(section);
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        section.title = newTitle;
        onSectionUpdate(section);
    };

    const handleDeleteImage = (imageNumber) => {
        section.images = section.images.filter(img => img.image_number !== imageNumber);
        onSectionUpdate(section);
    };

    const handleRetakeImage = (imageNumber) => {
        setRetakingImageNumber(imageNumber);
    };

    return (
        <div className="w-full border p-4 rounded-lg bg-gray-50 mb-4 relative">
            {/* Controls at the Top Right */}
            <div className="absolute top-2 right-2 flex space-x-2">
                <button
                    onClick={onClose}
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded"
                >
                    Close
                </button>
            </div>

            <h2 className="text-lg font-bold mb-4">Step {section.number}</h2>

            {/* Layout with Camera, Image Gallery, and Audio/Instructions */}
            <div className="w-full flex space-x-4">
                {/* Camera on the far-left */}
                <div className="w-1/6">
                    <CameraCapture onCapture={handleAddImage} maxHeight="200px" />
                </div>

                {/* Gallery for Images with Overlay and Actions */}
                <div className="w-2/6">
                    <div className="flex flex-wrap gap-4">
                        {section.images.map((image) => (
                            <div key={image.image_number} className="relative bg-blue-400 p-2 rounded-md shadow-md w-40 h-40">
                                <img src={image.fileContent} alt={image.image_name} className="w-full h-full object-cover rounded-md" />
                                
                                {/* Image number overlay */}
                                <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1 text-xs rounded-tr-md rounded-bl-md">
                                    #{image.image_number}
                                </div>

                                {/* Retake mode overlay */}
                                {retakingImageNumber === image.image_number && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-sm rounded-md">
                                        Retaking...
                                    </div>
                                )}

                                {/* Image Actions */}
                                <div className="absolute top-2 right-2 flex space-x-2">
                                    <button
                                        onClick={() => handleRetakeImage(image.image_number)}
                                        className="bg-yellow-500 text-white px-2 py-1 text-xs rounded"
                                    >
                                        Retake
                                    </button>
                                    <button
                                        onClick={() => handleDeleteImage(image.image_number)}
                                        className="bg-red-500 text-white px-2 py-1 text-xs rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Audio Recording and Instructions */}
                <div className="w-3/6 space-y-4">
                    <AudioCapture onRecording={handleSetRecording} />

                    {section.recording && (
                        <audio controls className="w-full mt-2">
                            <source src={section.recording.fileContent} type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>
                    )}

                    {/* Instruction Text Input */}
                    <textarea
                        placeholder="Enter instruction text"
                        value={instructionText}
                        onChange={handleInstructionChange}
                        className="w-full mt-4 p-2 border rounded-md"
                        rows="3"
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default SectionEdit;

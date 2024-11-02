// components/SectionView.js
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const SectionView = ({ section, onEdit, onDelete }) => {
    return (
        <div className="w-full border p-4 rounded-lg bg-gray-50 mb-4 relative">
            {/* Controls at the Top Right */}
            <div className="absolute top-2 right-2 flex space-x-2">
                <button
                    onClick={onEdit}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                    <FaEdit className="inline mr-1" /> Edit
                </button>
                <button
                    onClick={onDelete}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                >
                    <FaTrash className="inline mr-1" /> Delete
                </button>
            </div>

            <h2 className="text-lg font-bold mb-4">Step {section.number}</h2>

            {/* Gallery for Images */}
            <div className="w-full flex space-x-4">
                <div className="flex flex-wrap gap-4 w-1/2">
                    {section.images.map((image) => (
                        <div key={image.image_number} className="relative bg-blue-400 p-2 rounded-md shadow-md w-40 h-40">
                            <img src={image.fileContent} alt={image.image_name} className="w-full h-full object-cover rounded-md" />
                            <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1 text-xs rounded-tr-md rounded-bl-md">
                                #{image.image_number}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Audio Recording and Instructions */}
                <div className="w-1/2 space-y-4">
                    {section.recording && (
                        <audio controls className="w-full mt-2">
                            <source src={section.recording.fileContent} type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>
                    )}
                    <p className="text-gray-700 bg-gray-100 p-3 rounded-md">
                        {section.instructionText || "No instructions available."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SectionView;

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReactMarkdown from "react-markdown"; // Import react-markdown

const SectionView = ({ section, onEdit, onDelete }) => {
    return (
        <div className="w-full border p-2 rounded-lg bg-gray-50 mb-3 relative">
            {/* Top Right Controls */}
            <div className="absolute top-2 right-2 flex space-x-1">
                <button
                    onClick={onEdit}
                    className="text-blue-500 hover:text-blue-600"
                    aria-label="Edit"
                >
                    <FaEdit size={18} />
                </button>
                <button
                    onClick={onDelete}
                    className="text-red-500 hover:text-red-600"
                    aria-label="Delete"
                >
                    <FaTrash size={18} />
                </button>
            </div>

            <h2 className="text-lg font-bold mb-2">Step {section.number}</h2>

            {/* Responsive Layout for Images and Audio/Instructions */}
            <div className="flex flex-col md:flex-row md:space-x-3">
                {/* Gallery for Images */}
                <div className="flex flex-wrap gap-2 md:w-1/2">
                    {section.images.map((image) => (
                        <div
                            key={image.image_number}
                            className="relative bg-blue-400 p-1 rounded-md shadow-md w-28 h-28 md:w-36 md:h-36"
                        >
                            <img
                                src={image.fileContent}
                                alt={image.image_name}
                                className="w-full h-full object-cover rounded-md"
                            />
                            <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-1 py-0.5 text-xs rounded-tr-md rounded-bl-md">
                                #{image.image_number}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Audio and Instructions */}
                <div className="mt-3 md:mt-0 md:w-1/2 space-y-2">
                    {section.recording && (
                        <audio controls className="w-full">
                            <source src={section.recording.fileContent} type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>
                    )}
                    <div className="text-gray-700 bg-gray-100 p-2 rounded-md text-sm">
                        <ReactMarkdown>{section.instructionText || "No instructions available."}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionView;

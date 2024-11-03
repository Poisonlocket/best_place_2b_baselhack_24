// components/CarouselViewMobile.js
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import ReactMarkdown from "react-markdown";

const CarouselViewMobile = ({ sections }) => {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const currentSection = sections[currentSectionIndex];

    const handleSwipe = (direction) => {
        if (direction === "left" && currentSectionIndex < sections.length - 1) {
            setCurrentSectionIndex(currentSectionIndex + 1);
            setSelectedImageIndex(0);
        } else if (direction === "right" && currentSectionIndex > 0) {
            setCurrentSectionIndex(currentSectionIndex - 1);
            setSelectedImageIndex(0);
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe("left"),
        onSwipedRight: () => handleSwipe("right"),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <div className="flex flex-col w-full" {...handlers}>
            {/* Main Image */}
            <div className="relative w-full h-64">
                <img
                    src={currentSection.images[selectedImageIndex]?.fileContent}
                    alt={`Image ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs">
                    #{selectedImageIndex + 1}
                </div>
            </div>

            {/* Thumbnails */}
            <div className="flex overflow-x-auto gap-2 mt-4 px-4">
                {currentSection.images.map((image, idx) => (
                    <div
                        key={idx}
                        className={`relative w-20 h-20 rounded cursor-pointer overflow-hidden ${selectedImageIndex === idx ? 'ring-4 ring-blue-500' : ''}`}
                        onClick={() => setSelectedImageIndex(idx)}
                    >
                        <img src={image.fileContent} alt={image.image_name} className="w-full h-full object-cover" />
                        <div className="absolute top-1 left-1 bg-black bg-opacity-50 text-white px-1 py-0.5 text-xs rounded-tr-md rounded-bl-md">
                            #{image.image_number}
                        </div>
                    </div>
                ))}
            </div>

            {/* Text */}
            <div className="p-4 text-left mt-4">
                <h2 className="text-2xl font-bold mb-2">
                    Step {currentSection.number}: {currentSection.title}
                </h2>
                <ReactMarkdown className="text-gray-700">{currentSection.instructionText || "No description available."}</ReactMarkdown>
            </div>
        </div>
    );
};

export default CarouselViewMobile;

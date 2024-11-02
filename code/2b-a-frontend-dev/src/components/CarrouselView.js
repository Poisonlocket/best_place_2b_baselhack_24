"use client";
import React, { useState, useEffect } from "react";
import { Carousel, Progress } from "flowbite-react";

const CarrouselView = ({ sections }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedImageIndices, setSelectedImageIndices] = useState(
        sections.map(() => 0) // Initialize with 0 for each section
    );

    // Log sections to confirm data
    useEffect(() => {
        console.log("Sections data:", sections);
    }, [sections]);

    const totalSlides = sections ? sections.length : 0;
    const progressPercentage = totalSlides > 1 ? ((currentSlide + 1) / totalSlides) * 100 : 0;

    // Set the current section based on the carousel slide
    const handleSlideChange = (newSlide) => {
        setCurrentSlide(newSlide);
    };

    // Update selected image index for the current section
    const selectImage = (index) => {
        const updatedIndices = [...selectedImageIndices];
        updatedIndices[currentSlide] = index;
        setSelectedImageIndices(updatedIndices);
    };

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col min-h-full">
            {/* Carousel Content */}
            <div className="flex-grow">
                {totalSlides > 0 ? (
                    <Carousel slide={false} indicators={false} onSlideChange={handleSlideChange}>
                        {sections.map((section, index) => (
                            <div key={index} className="relative flex flex-col md:flex-row items-start justify-between w-full h-full p-6 space-y-4 md:space-y-0 md:space-x-6">
                                {/* Step Number */}
                                <div className="text-lg font-semibold text-gray-700 absolute top-4 left-4">
                                    Step {section.number}
                                </div>

                                {/* Images on the Left */}
                                <div className="flex flex-col items-center w-full md:w-1/2">
                                    {/* Main Display Image */}
                                    {section.images[selectedImageIndices[index]] ? (
                                        <div className="relative">
                                            <img
                                                src={section.images[selectedImageIndices[index]].fileContent}
                                                alt={`Main image for ${section.title}`}
                                                className="w-full h-72 md:h-96 object-cover rounded-lg mb-4"
                                            />
                                            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs">
                                                #{section.images[selectedImageIndices[index]].image_number}
                                            </div>
                                        </div>
                                    ) : (
                                        <p>No main image available</p>
                                    )}

                                    {/* Thumbnails */}
                                    <div className="flex flex-wrap gap-2">
                                        {section.images.map((image, idx) => (
                                            <div
                                                key={idx}
                                                className={`relative w-20 h-20 rounded cursor-pointer overflow-hidden ${selectedImageIndices[index] === idx ? 'ring-4 ring-blue-500' : ''}`}
                                                onClick={() => selectImage(idx)}
                                            >
                                                <img src={image.fileContent} alt={image.image_name} className="w-full h-full object-cover" />
                                                <div className="absolute top-1 left-1 bg-black bg-opacity-50 text-white px-1 py-0.5 text-xs rounded-tr-md rounded-bl-md">
                                                    #{image.image_number}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Text on the Right */}
                                <div className="w-full md:w-1/2">
                                    <h2 className="text-2xl font-bold mb-4">{section.title || "Untitled Section"}</h2>
                                    <p className="text-gray-700">{section.instructionText || "No description available."}</p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                ) : (
                    <p className="text-center">No sections available</p>
                )}
            </div>

            {/* Progress Bar at the Bottom */}
            <div className="mt-4 w-full">
                <Progress
                    progress={progressPercentage}
                    textLabel={`${Math.round(progressPercentage)}%`}
                    size="lg"
                    labelProgress
                />
            </div>
        </div>
    );
};

export default CarrouselView;

"use client";
import React, { useState, useEffect } from "react";
import { Carousel, Progress } from "flowbite-react";
import ReactMarkdown from "react-markdown";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const CarrouselView = ({ sections }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedImageIndices, setSelectedImageIndices] = useState(
        sections.map(() => 0)
    );

    useEffect(() => {
        console.log("Sections data:", sections);
    }, [sections]);

    const totalSlides = sections ? sections.length : 0;
    const progressPercentage = totalSlides > 1 ? ((currentSlide + 1) / totalSlides) * 100 : 0;

    const handleSlideChange = (newSlide) => {
        setCurrentSlide(newSlide);
    };

    const selectImage = (index) => {
        const updatedIndices = [...selectedImageIndices];
        updatedIndices[currentSlide] = index;
        setSelectedImageIndices(updatedIndices);
    };

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col min-h-full pb-20">
            {/* Carousel Content */}
            <div className="flex-grow relative">
                {totalSlides > 0 ? (
                    <Carousel
                        slide={false}
                        indicators={false}
                        onSlideChange={handleSlideChange}
                        leftControl={
                            <SlArrowLeft 
                                style={{
                                    position: "absolute",
                                    left: "-6rem", // Adjust to position further out
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 10,
                                    height: 80,
                                    width: 80
                                }}
                                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                            />
                           
                        }
                        rightControl={
                            <SlArrowRight 
                                style={{
                                    position: "absolute",
                                    right: "-3rem", // Adjust to position further out
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 10,
                                    height: 80,
                                    width: 80
                                }}
                                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                            />
                                
                           
                        }
                    >
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                className="relative flex flex-col md:flex-row items-start justify-between w-full h-full p-2 space-y-1 md:space-y-0 md:space-x-2"
                            >
                                {/* Images on the Left */}
                                <div className="flex flex-col items-center w-5/12 relative">
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
                                                className={`relative w-20 h-20 rounded cursor-pointer overflow-hidden ${
                                                    selectedImageIndices[index] === idx ? "ring-4 ring-blue-500" : ""
                                                }`}
                                                onClick={() => selectImage(idx)}
                                            >
                                                <img
                                                    src={image.fileContent}
                                                    alt={image.image_name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-1 left-1 bg-black bg-opacity-50 text-white px-1 py-0.5 text-xs rounded-tr-md rounded-bl-md">
                                                    #{image.image_number}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Text on the Right */}
                                <div className="w-full md:w-7/12">
                                    <h2 className="text-2xl font-bold mb-4">
                                        {section.number} {section.title || "Untitled Section"}
                                    </h2>
                                    <div className="text-gray-700">
                                        <ReactMarkdown>{section.instructionText || "No description available."}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                ) : (
                    <p className="text-center">No sections available</p>
                )}
            </div>

            {/* Fixed Progress Bar at the Bottom */}
            <div className="fixed bottom-0 left-0 right-0 w-full max-w-6xl mx-auto bg-white px-4 py-2 shadow-lg">
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

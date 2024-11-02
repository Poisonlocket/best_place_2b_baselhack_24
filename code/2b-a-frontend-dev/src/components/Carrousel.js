"use client";
import React, { useState } from "react";
import { Carousel, Modal, Button, Progress } from "flowbite-react";

const imagesWithDescriptions = [
    { src: "https://flowbite.com/docs/images/carousel/carousel-1.svg", alt: "First Image" },
    { src: "https://flowbite.com/docs/images/carousel/carousel-2.svg", alt: "Second Image" },
    { src: "https://flowbite.com/docs/images/carousel/carousel-3.svg", alt: "Third Image" },
    { src: "https://flowbite.com/docs/images/carousel/carousel-4.svg", alt: "Fourth Image" },
];

const overallDescription = "This is a description that applies to all four images.";

const CarrouselView = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const itemsPerSlide = 4;
    const totalSlides = Math.ceil(imagesWithDescriptions.length / itemsPerSlide);
    const progressPercentage = (currentSlide / (totalSlides - 1)) * 100;

    const handleSlideChange = (newSlide) => setCurrentSlide(newSlide);

    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    // Group images into chunks of 4 items per slide
    const groupedImages = [];
    for (let i = 0; i < imagesWithDescriptions.length; i += itemsPerSlide) {
        groupedImages.push(imagesWithDescriptions.slice(i, i + itemsPerSlide));
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="h-80 sm:h-78 xl:h-80 2xl:h-96">
                <Carousel slide={false} onSlideChange={handleSlideChange}>
                    {groupedImages.map((group, index) => (
                        <div key={index} className="flex items-center justify-center space-x-4 w-full h-full">
                            {group.map((image, idx) => (
                                <div key={idx} className="flex-1 cursor-pointer" onClick={() => openModal(image)}>
                                    <img src={image.src} alt={image.alt} className="w-full h-auto" />
                                </div>
                            ))}
                        </div>
                    ))}
                </Carousel>
            </div>
            <p className="text-center mt-4">{overallDescription}</p> {/* Overall description moved here */}
            <div className="mt-4">
                <Progress
                    progress={progressPercentage}
                    textLabel={`${Math.round(progressPercentage)}%`}
                    size="lg"
                    labelProgress
                />
            </div>
            
            {/* Modal for showing image description */}
            {selectedImage && (
                <Modal show={isModalOpen} onClose={closeModal} size="lg">
                    <Modal.Header>{selectedImage.alt}</Modal.Header>
                    <Modal.Body>
                        <div className="max-h-90 overflow-y-auto space-y-4">
                            <img src={selectedImage.src} alt={selectedImage.alt} className="w-full h-auto" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default CarrouselView;





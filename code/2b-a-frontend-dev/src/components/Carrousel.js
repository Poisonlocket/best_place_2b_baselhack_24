"use client";
import React, { useState } from "react";
import { Carousel, Modal, Button, Progress } from "flowbite-react";

const imagesWithDescriptions = [
{ src: "https://flowbite.com/docs/images/carousel/carousel-1.svg", alt: "First Image", description: "This is the description for the first image." },
{ src: "https://flowbite.com/docs/images/carousel/carousel-2.svg", alt: "Second Image", description: "This is the description for the second image." },
{ src: "https://flowbite.com/docs/images/carousel/carousel-3.svg", alt: "Third Image", description: "This is the description for the third image." },
{ src: "https://flowbite.com/docs/images/carousel/carousel-4.svg", alt: "Fourth Image", description: "This is the description for the fourth image." },
{ src: "https://flowbite.com/docs/images/carousel/carousel-5.svg", alt: "Fifth Image", description: "This is the description for the fifth image." },
{ src: "https://flowbite.com/docs/images/carousel/carousel-6.svg", alt: "Sixth Image", description: "This is the description for the sixth image." },
{ src: "https://flowbite.com/docs/images/carousel/carousel-7.svg", alt: "Seventh Image", description: "This is the description for the seventh image." },
{ src: "https://flowbite.com/docs/images/carousel/carousel-8.svg", alt: "Eighth Image", description: "This is the description for the eighth image." },
{ src: "https://flowbite.com/docs/images/carousel/carousel-9.svg", alt: "Nineth Image", description: "This is the description for the nine image." },
{ src: "https://flowbite.com/docs/images/carousel/carousel-10.svg", alt: "tenth Image", description: "This is the description for the ten image." },
{ src: "https://flowbite.com/docs/images/carousel/carousel-11.svg", alt: "eleven Image", description: "This is the description for the eleven image." },
{ src: "https://flowbite.com/docs/images/carousel/carousel-12.svg", alt: "Twelveth Image", description: "This is the description for the twelve image." },
];

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
            <p className="text-gray-600 text-center">{selectedImage.description}</p>
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


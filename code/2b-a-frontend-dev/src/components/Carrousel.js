"use client";
import React from "react";
import { Carousel } from "flowbite-react";

const imagesWithDescriptions = [
{
    src: "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    alt: "First Image",
    description: "This is the description for the first image.",
},
{
    src: "https://flowbite.com/docs/images/carousel/carousel-2.svg",
    alt: "Second Image",
    description: "This is the description for the second image.",
},
{
    src: "https://flowbite.com/docs/images/carousel/carousel-3.svg",
    alt: "Third Image",
    description: "This is the description for the third image.",
},
{
    src: "https://flowbite.com/docs/images/carousel/carousel-4.svg",
    alt: "Fourth Image",
    description: "This is the description for the fourth image.",
},
{
    src: "https://flowbite.com/docs/images/carousel/carousel-5.svg",
    alt: "Fifth Image",
    description: "This is the description for the fifth image.",
},
];

const CarrouselView = () => {
return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
    <Carousel slide={false}>
        {imagesWithDescriptions.map((image, index) => (
        <div key={index} className="flex items-center justify-between w-full">
            <img src={image.src} alt={image.alt} className="w-1/2" />
            <div className="w-1/2 pl-4">
            <h3 className="text-lg font-semibold">{image.alt}</h3>
            <p className="text-gray-600">{image.description}</p>
            </div>
        </div>
        ))}
    </Carousel>
    </div>
);
};

export default CarrouselView;

import React, { useState } from "react";
import CameraCapture from "./CameraCapture";
import AudioCapture from "./AudioCapture";
import { SectionImage, SectionRecording } from "./model";
import { FaTimes, FaRedo, FaTrash } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const SectionEdit = ({ section, onSectionUpdate, onClose }) => {
    const [instructionText, setInstructionText] = useState(section.instructionText || "");
    const [title, setTitle] = useState(section.title || "");
    const [selectedImageNumber, setSelectedImageNumber] = useState(null);

    // Log initial images for debugging
    console.log("Initial section images:", section.images);

    // Handle adding or retaking an image
    const handleAddImage = (fileContent) => {
        if (selectedImageNumber !== null) {
            section.images = section.images.map(img =>
                img.image_number === selectedImageNumber
                    ? new SectionImage(fileContent, img.image_number, img.image_name)
                    : img
            );
            setSelectedImageNumber(null);
        } else {
            const imageNumber = section.images.length + 1;
            const newImage = new SectionImage(fileContent, imageNumber, `Image ${imageNumber}`);
            section.addImage(newImage);
        }
        console.log("Updated images after add/retake:", section.images);
        onSectionUpdate(section);
    };

    // Set a new recording
    const handleSetRecording = (fileContent) => {
        const newRecording = new SectionRecording(fileContent);
        section.setRecording(newRecording);
        onSectionUpdate(section);
    };

    const handleInstructionChange = (e) => {
        setInstructionText(e.target.value);
        section.instructionText = e.target.value;
        onSectionUpdate(section);
    };

    const handleDeleteImage = () => {
        section.images = section.images.filter(img => img.image_number !== selectedImageNumber);
        setSelectedImageNumber(null); // Exit selected mode after delete
        console.log("Updated images after delete:", section.images);
        onSectionUpdate(section);
    };

    const handleSelectImage = (imageNumber) => {
        setSelectedImageNumber(imageNumber);
    };

    // Handle drag-and-drop reorder
    const handleDragEnd = (result) => {
        console.log("Drag result:", result);
        if (!result.destination) return;

        const reorderedImages = Array.from(section.images);
        const [movedImage] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, movedImage);

        reorderedImages.forEach((img, index) => (img.image_number = index + 1)); // Update image numbers
        section.images = reorderedImages;
        console.log("Updated images after reorder:", section.images);
        onSectionUpdate(section);
    };

    return (
        <div className="w-full border p-2 rounded-lg bg-gray-50 mb-3 relative">
            {/* Close button */}
            <div className="absolute top-1 right-1">
                <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                    <FaTimes size={18} />
                </button>
            </div>

            <h2 className="text-lg font-bold mb-3">Step {section.number}</h2>

            <div className="flex flex-col md:flex-row md:space-x-3">
                
                {/* Camera Capture */}
                <div className="md:w-1/6 mb-3 md:mb-0">
                    <CameraCapture onCapture={handleAddImage} maxHeight="180px" />
                </div>

                {/* Image Gallery with Drag and Drop */}
                <div className="md:w-2/6 mb-3 md:mb-0">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="images" direction="horizontal">
                            {(provided) => (
                                <div
                                    className="flex flex-wrap gap-2"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {section.images.map((image, index) => (
                                        <Draggable
                                            key={`image-${image.image_number}`} // Ensure unique key
                                            draggableId={`image-${image.image_number}`} // Unique draggableId with prefix
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`relative p-1 rounded-md shadow-md w-32 h-32 ${
                                                        snapshot.isDragging ? "bg-blue-200" : "bg-blue-400"
                                                    }`}
                                                    onClick={() => handleSelectImage(image.image_number)}
                                                >
                                                    <img
                                                        src={image.fileContent}
                                                        alt={image.image_name}
                                                        className="w-full h-full object-cover rounded-md"
                                                    />

                                                    {/* Image number overlay */}
                                                    <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-1 py-0.5 text-xs rounded-tr-md rounded-bl-md">
                                                        #{image.image_number}
                                                    </div>

                                                    {/* Retake/Delete Overlay on Selection */}
                                                    {selectedImageNumber === image.image_number && (
                                                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center space-x-4 text-white text-sm rounded-md">
                                                            <button
                                                                onClick={() => setSelectedImageNumber(image.image_number)}
                                                                className="bg-yellow-500 p-2 rounded-full hover:bg-yellow-600"
                                                            >
                                                                <FaRedo />
                                                            </button>
                                                            <button
                                                                onClick={handleDeleteImage}
                                                                className="bg-red-500 p-2 rounded-full hover:bg-red-600"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>

                {/* Audio Capture and Instructions */}
                <div className="md:w-3/6 space-y-3">
                    <AudioCapture onRecording={handleSetRecording} />
                    {section.recording && (
                        <audio controls className="w-full mt-1">
                            <source src={section.recording.fileContent} type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>
                    )}

                    {/* Instruction Text Input */}
                    <textarea
                        placeholder="Enter instruction text"
                        value={instructionText}
                        onChange={handleInstructionChange}
                        className="w-full p-2 border rounded-md"
                        rows="25"
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default SectionEdit;

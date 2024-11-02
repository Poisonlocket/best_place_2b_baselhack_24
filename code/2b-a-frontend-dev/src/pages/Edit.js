// pages/Edit.js
import React, { useState } from "react";
import SectionView from "../components/SectionView";
import SectionEdit from "../components/SectionEdit";
import { Guide, Section } from "../components/model";
import { saveAndProcessGuide } from "../components/api";
import { generateTestGuide } from "../components/test_data";
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon

const Edit = () => {
    const [guide, setGuide] = useState(generateTestGuide());
    const [editingSectionId, setEditingSectionId] = useState(null);
    const [loading, setLoading] = useState(false); // Track loading state

    const handleAddSection = () => {
        if (editingSectionId !== null) {
            const currentSection = guide.sections.find(
                (section) => section.number === editingSectionId
            );
            if (currentSection) {
                handleSectionUpdate(currentSection);
            }
        }

        const newSection = new Section(guide.sections.length + 1);
        const updatedGuide = new Guide(guide.name, guide.uuid);
        updatedGuide.sections = [...guide.sections, newSection];
        setEditingSectionId(newSection.number);
        setGuide(updatedGuide);
    };

    const handleSectionUpdate = (updatedSection) => {
        const updatedSections = guide.sections.map((section) =>
            section.number === updatedSection.number ? updatedSection : section
        );
        const updatedGuide = new Guide(guide.name, guide.uuid);
        updatedGuide.sections = updatedSections;
        setGuide(updatedGuide);
    };

    const handleDeleteSection = (sectionNumber) => {
        const updatedSections = guide.sections.filter(section => section.number !== sectionNumber);
        const updatedGuide = new Guide(guide.name, guide.uuid);
        updatedGuide.sections = updatedSections;
        setGuide(updatedGuide);
    };

    const handleEditSection = (sectionNumber) => {
        setEditingSectionId(sectionNumber);
    };

    const handleSaveAndProcess = async () => {
        setLoading(true); // Start loading state
        try {
            const response = await saveAndProcessGuide(guide);
            console.log("Guide successfully processed:", response);
            alert("Guide successfully processed!");
        } catch (error) {
            console.error("Failed to process guide:", error);
            alert("Failed to process guide. Please try again.");
        } finally {
            setLoading(false); // End loading state
        }
    };

    return (
        <div className="w-full p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Edit Guide: {guide.name}</h1>
            
            {/* Render each section */}
            {guide.sections.map((section) => (
                <div key={section.number} className="mb-3">
                    {editingSectionId === section.number ? (
                        <SectionEdit
                            section={section}
                            onSectionUpdate={handleSectionUpdate}
                            onClose={() => setEditingSectionId(null)}
                        />
                    ) : (
                        <SectionView 
                            section={section}
                            onEdit={() => handleEditSection(section.number)}
                            onDelete={() => handleDeleteSection(section.number)}
                        />
                    )}
                </div>
            ))}

            <div className="flex space-x-4">
                <button
                    onClick={handleAddSection}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Add Section
                </button>
                
                <button
                    onClick={handleSaveAndProcess}
                    className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md flex items-center"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? (
                        <FaSpinner className="animate-spin mr-2" /> // Spinner icon with animation
                    ) : null}
                    {loading ? "Processing..." : "Save and Process"}
                </button>
            </div>
        </div>
    );
};

export default Edit;

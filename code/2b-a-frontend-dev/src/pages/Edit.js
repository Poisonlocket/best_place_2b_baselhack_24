import React, { useState } from "react";
import SectionView from "../components/SectionView";
import SectionEdit from "../components/SectionEdit";
import { Guide, Section } from "../components/model";
import { saveAndProcessGuide } from "../components/api";
import { generateTestGuide } from "../components/test_data";
import { FaSpinner } from "react-icons/fa";

const Edit = () => {
    const [guide, setGuide] = useState(generateTestGuide());
    const [editingSectionId, setEditingSectionId] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAddSection = () => {
        if (editingSectionId !== null) handleSectionUpdate(guide.sections.find(s => s.number === editingSectionId));
        const newSection = new Section(guide.sections.length + 1);
        setGuide({ ...guide, sections: [...guide.sections, newSection] });
        setEditingSectionId(newSection.number);
    };

    const handleSectionUpdate = (updatedSection) => {
        setGuide({
            ...guide,
            sections: guide.sections.map(section => section.number === updatedSection.number ? updatedSection : section),
        });
    };

    const handleDeleteSection = (sectionNumber) => {
        setGuide({
            ...guide,
            sections: guide.sections.filter(section => section.number !== sectionNumber),
        });
    };

    const handleSaveAndProcess = async () => {
        setLoading(true);
        try {
            const response = await saveAndProcessGuide(guide);
            console.log("Guide successfully processed:", response);
            alert("Guide processed successfully!");
        } catch (error) {
            console.error("Failed to process guide:", error);
            alert("Failed to process guide. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Edit Guide: {guide.name}</h1>

            {guide.sections.map(section => (
                <div key={section.number} className="mb-4">
                    {editingSectionId === section.number ? (
                        <SectionEdit
                            section={section}
                            onSectionUpdate={handleSectionUpdate}
                            onClose={() => setEditingSectionId(null)}
                        />
                    ) : (
                        <SectionView 
                            section={section}
                            onEdit={() => setEditingSectionId(section.number)}
                            onDelete={() => handleDeleteSection(section.number)}
                        />
                    )}
                </div>
            ))}

            <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 w-full">
                <button
                    onClick={handleAddSection}
                    className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md text-center"
                >
                    Add Section
                </button>
                
                <button
                    onClick={handleSaveAndProcess}
                    className="w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded-md flex items-center justify-center"
                    disabled={loading}
                >
                    {loading && <FaSpinner className="animate-spin mr-2" />}
                    {loading ? "Processing..." : "Save and Process"}
                </button>
            </div>
        </div>
    );
};

export default Edit;

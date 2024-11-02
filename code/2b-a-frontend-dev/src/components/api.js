// api.js
export const saveAndProcessGuide = async (guide) => {
    try {
        // Simulate a delay of 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock response data
        const data = { message: "Guide processed successfully", guide };

        console.log("Fake API response:", data);
        return data;
    } catch (error) {
        console.error("Failed to process guide:", error);
        throw error;
    }
};

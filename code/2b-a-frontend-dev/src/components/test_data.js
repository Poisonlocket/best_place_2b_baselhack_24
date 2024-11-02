// test_data.js (or wherever you want to create the test data)
import testImage1 from "../assets/test_data_pen_1.jpg";
import testImage2 from "../assets/test_data_pen_2.jpg";
import testImage3 from "../assets/test_data_pen_3.jpg";
import testImage4 from "../assets/test_data_pen_4.jpg";

import testAudio from "../assets/test_data_pen.ogg";

import { Guide, Section, SectionImage, SectionRecording } from "../components/model"

export const generateTestGuide = () => {
    const guide = new Guide("Pen Assembly", "1234-5678");
    guide.description = "A comperhansive guide to put the lid onto a memox.pen.";
    guide.startImage = testImage4;

    // Create Section 1
    const section1 = new Section(1);
    section1.title = "Section 1 - Introduction";
    section1.instructionText = "Instruction for section 1.";
    
    // Add images to Section 1
    section1.addImage(new SectionImage(testImage1, 1, "Image 1"));
    section1.addImage(new SectionImage(testImage2, 2, "Image 2"));
    
    // Add recording to Section 1
    section1.setRecording(new SectionRecording(testAudio));
    
    // Create Section 2
    const section2 = new Section(2);
    section2.title = "Section 2 - Further Steps";
    section2.instructionText = "Instruction for section 2.";

    // Add images to Section 2
    section2.addImage(new SectionImage(testImage3, 1, "Image 1"));
    section2.addImage(new SectionImage(testImage4, 2, "Image 2"));
    section2.addImage(new SectionImage(testImage4, 3, "Image 3"));

    // Add recording to Section 2
    section2.setRecording(new SectionRecording(testAudio));
    
    // Add sections to the Guide
    guide.addSection(section1);
    guide.addSection(section2);

    return guide;
};

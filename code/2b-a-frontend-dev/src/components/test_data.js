// test_data.js (or wherever you want to create the test data)
import testImage1 from "../assets/test_data_pen_1.jpg";
import testImage2 from "../assets/test_data_pen_2.jpg";
import testImage3 from "../assets/test_data_pen_3.jpg";
import testImage4 from "../assets/test_data_pen_4.jpg";
import testAudio from "../assets/test_data_pen.ogg";

import { Guide, Section, SectionImage, SectionRecording } from "../components/model";

export const generateTestGuide = () => {
    const guide = new Guide("Pen Assembly", "1234-5678");
    guide.description = "A comprehensive guide to assembling the memox.pen.";
    guide.startImage = testImage4;

    // Section 1: Collect Parts
    const section1 = new Section(1);
    section1.title = "Collect Parts";
    section1.instructionText = `
### Collect All Parts
To begin, gather all necessary parts for the pen assembly. You should have:
- **Pen body** 
- **Pen cap**
- **Ink cartridge**
- **Spring**

Ensure that no components are missing.  
![Example of Parts](../assets/test_data_pen_1.jpg)
    `;
    section1.addImage(new SectionImage(testImage1, 1, "Pen body"));
    section1.addImage(new SectionImage(testImage2, 2, "Pen lid"));
    section1.setRecording(new SectionRecording(testAudio));

    // Section 2: Align Parts
    const section2 = new Section(2);
    section2.title = "Align Parts";
    section2.instructionText = `
### Align Parts for Assembly
Align the pen body, ink cartridge, and spring. The ink cartridge should fit snugly into the pen body, with the spring at the tip.

1. Hold the pen body upright.
2. Insert the ink cartridge with the spring at the front.
3. Confirm all parts are correctly aligned.

![Parts Aligned](../assets/test_data_pen_2.jpg)
    `;
    section2.addImage(new SectionImage(testImage2, 1, "Parts Aligned"));
    section2.setRecording(new SectionRecording(testAudio));

    // Section 3: Assemble the Pen
    const section3 = new Section(3);
    section3.title = "Assemble the Pen";
    section3.instructionText = `
### Push Parts Together
With the parts aligned, apply gentle pressure to secure the assembly:
1. Push the ink cartridge firmly into the pen body.
2. Ensure the cap is ready to attach if applicable.
3. You should hear a click when parts are properly secured.

![Pushing Parts Together](../assets/test_data_pen_3.jpg)
    `;
    section3.addImage(new SectionImage(testImage3, 1, "Assembling the Pen"));
    section3.setRecording(new SectionRecording(testAudio));

    // Section 4: Finalize Assembly
    const section4 = new Section(4);
    section4.title = "Finalizing";
    section4.instructionText = `
### Assembly Complete
Congratulations! Your pen assembly is complete.
- **Double-check** that all parts are secure.
- **Test** the pen to ensure it writes smoothly.
- **Store** properly for future use.

![Final Product](../assets/test_data_pen_4.jpg)
    `;
    section4.addImage(new SectionImage(testImage4, 1, "Final Product"));
    section4.setRecording(new SectionRecording(testAudio));

    // Add sections to the Guide
    guide.addSection(section1);
    guide.addSection(section2);
    guide.addSection(section3);
    guide.addSection(section4);

    return guide;
};

// test_data.js (or wherever you want to create the test data)
import testImage1 from "../assets/test_data_pen_1.jpg";
import testImage2 from "../assets/test_data_pen_2.jpg";
import testImage3 from "../assets/test_data_pen_3.jpg";
import testImage4 from "../assets/test_data_pen_4.jpg";
import rubber_duck_1 from "../assets/rubber_duck_1.jpg";
import rubber_duck_2 from "../assets/rubber_duck_2.jpg";
import rubber_duck_3 from "../assets/rubber_duck_3.jpg";
import rubber_duck_4 from "../assets/rubber_duck_4.jpg";
import testAudio from "../assets/test_data_pen.ogg";

import { Guide, Section, SectionImage, SectionRecording } from "../components/model";

export const generateTestGuide = () => {
    const guide = new Guide("Pen Assembly", "pen");
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







export const generateTestGuideDuck = () => {
    const guide = new Guide("Rubber Duck Debugging", "duck");
    guide.description = "A humorous yet effective guide to debugging code with the help of a rubber duck.";
    guide.startImage = rubber_duck_4;

    // Section 1: Find the Duck
    const section1 = new Section(1);
    section1.title = "Find the Duck";
    section1.instructionText = `
### Find the Duck
Before you begin debugging, locate your rubber duck. It should be within arm's reach for easy communication.

- **Step 1**: Look around your desk or workspace.
- **Step 2**: Retrieve the rubber duck and place it in front of you.

Ensure the duck is ready for an enlightening conversation.
    `;
    section1.addImage(new SectionImage(rubber_duck_1, 1, "Finding the Duck"));
    section1.setRecording(new SectionRecording(testAudio));

    // Section 2: Say Hi
    const section2 = new Section(2);
    section2.title = "Say Hi to the Duck";
    section2.instructionText = `
### Say Hi to the Duck
Establish a friendly connection with the duck. This step is crucial for effective communication.

1. Smile and say, "**Hello, Duck!**"
2. Feel free to share a few details about your day.

The duck is now ready to listen.
    `;
    section2.addImage(new SectionImage(rubber_duck_2, 1, "Greeting the Duck"));
    section2.setRecording(new SectionRecording(testAudio));

    // Section 3: Explain the Problem
    const section3 = new Section(3);
    section3.title = "Explain the Problem";
    section3.instructionText = `
### Explain the Problem
Describe the issue you're encountering in detail. Go through your code, line by line, and explain each part to the duck.

1. Start from the beginning of your code.
2. Explain each line as if the duck has no prior knowledge of programming.
3. Articulate your logic and assumptions clearly.

Remember, the duck won't interrupt, so take your time!
    `;
    section3.addImage(new SectionImage(rubber_duck_3, 1, "Explaining the Problem"));
    section3.setRecording(new SectionRecording(testAudio));

    // Section 4: Enlightenment
    const section4 = new Section(4);
    section4.title = "Enlightenment";
    section4.instructionText = `
### Enlightenment
As you explain the problem, you may have an "aha" moment. This is the power of rubber duck debugging.

- **Reflect** on your findings as you speak.
- **Thank** the duck for its assistance.
- **Celebrate** the debugging breakthrough.

You've solved the problem with the help of your silent yet wise companion.
    `;
    section4.addImage(new SectionImage(rubber_duck_4, 1, "Celebrating Success"));
    section4.setRecording(new SectionRecording(testAudio));

    // Add sections to the Guide
    guide.addSection(section1);
    guide.addSection(section2);
    guide.addSection(section3);
    guide.addSection(section4);

    return guide;
};

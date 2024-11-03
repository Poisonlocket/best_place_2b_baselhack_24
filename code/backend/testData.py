# test_data.py

from guide import Guide
from section import Section

# Define mock UUIDs for test guides
TEST_GUIDE_UUID_PEN = "pen"
TEST_GUIDE_UUID_DUCK = "duck"

def generate_test_guide_pen():
    # Create the pen guide
    pen_guide = Guide()
    pen_guide.set_uuid(TEST_GUIDE_UUID_PEN)
    pen_guide.set_title("Pen Assembly")
    pen_guide.description = "A comprehensive guide to assembling the memox.pen."

    # Section 1: Collect Parts
    pen_section1 = Section()
    pen_section1.set_text("""
    ### Collect All Parts
    To begin, gather all necessary parts for the pen assembly. You should have:
    - **Pen body** 
    - **Pen cap**
    - **Ink cartridge**
    - **Spring**

    Ensure that no components are missing.
    """)
    pen_section1.add_image("pen.0.0.jpg")
    pen_section1.add_image("pen.0.1.jpg")

    # Section 2: Align Parts
    pen_section2 = Section()
    pen_section2.set_text("""
    ### Align Parts for Assembly
    Align the pen body, ink cartridge, and spring. The ink cartridge should fit snugly into the pen body, with the spring at the tip.

    1. Hold the pen body upright.
    2. Insert the ink cartridge with the spring at the front.
    3. Confirm all parts are correctly aligned.
    """)
    pen_section2.add_image("pen.1.0.jpg")

    # Section 3: Assemble the Pen
    pen_section3 = Section()
    pen_section3.set_text("""
    ### Push Parts Together
    With the parts aligned, apply gentle pressure to secure the assembly:
    1. Push the ink cartridge firmly into the pen body.
    2. Ensure the cap is ready to attach if applicable.
    3. You should hear a click when parts are properly secured.
    """)
    pen_section3.add_image("pen.2.0.jpg")

    # Section 4: Finalize Assembly
    pen_section4 = Section()
    pen_section4.set_text("""
    ### Assembly Complete
    Congratulations! Your pen assembly is complete.
    - **Double-check** that all parts are secure.
    - **Test** the pen to ensure it writes smoothly.
    - **Store** properly for future use.
    """)
    pen_section4.add_image("pen.3.0.jpg")

    # Add sections to the pen guide
    pen_guide.add_section(pen_section1)
    pen_guide.add_section(pen_section2)
    pen_guide.add_section(pen_section3)
    pen_guide.add_section(pen_section4)

    return pen_guide


def generate_test_guide_duck():
    # Create the duck guide
    duck_guide = Guide()
    duck_guide.set_uuid(TEST_GUIDE_UUID_DUCK)
    duck_guide.set_title("Rubber Duck Debugging")
    duck_guide.description = "A humorous yet effective guide to debugging code with the help of a rubber duck."

    # Section 1: Find the Duck
    duck_section1 = Section()
    duck_section1.set_text("""
    ### Find the Duck
    Before you begin debugging, locate your rubber duck. It should be within arm's reach for easy communication.
    
    - **Step 1**: Look around your desk or workspace.
    - **Step 2**: Retrieve the rubber duck and place it in front of you.
    
    Ensure the duck is ready for an enlightening conversation.
    """)
    duck_section1.add_image("duck.0.0.jpg")

    # Section 2: Say Hi
    duck_section2 = Section()
    duck_section2.set_text("""
    ### Say Hi to the Duck
    Establish a friendly connection with the duck. This step is crucial for effective communication.

    1. Smile and say, "**Hello, Duck!**"
    2. Feel free to share a few details about your day.

    The duck is now ready to listen.
    """)
    duck_section2.add_image("duck.1.0.jpg")

    # Section 3: Explain the Problem
    duck_section3 = Section()
    duck_section3.set_text("""
    ### Explain the Problem
    Describe the issue you're encountering in detail. Go through your code, line by line, and explain each part to the duck.

    1. Start from the beginning of your code.
    2. Explain each line as if the duck has no prior knowledge of programming.
    3. Articulate your logic and assumptions clearly.

    Remember, the duck won't interrupt, so take your time!
    """)
    duck_section3.add_image("duck.2.0.jpg")

    # Section 4: Enlightenment
    duck_section4 = Section()
    duck_section4.set_text("""
    ### Enlightenment
    As you explain the problem, you may have an "aha" moment. This is the power of rubber duck debugging.

    - **Reflect** on your findings as you speak.
    - **Thank** the duck for its assistance.
    - **Celebrate** the debugging breakthrough.

    You've solved the problem with the help of your silent yet wise companion.
    """)
    duck_section4.add_image("duck.3.0.jpg")

    # Add sections to the duck guide
    duck_guide.add_section(duck_section1)
    duck_guide.add_section(duck_section2)
    duck_guide.add_section(duck_section3)
    duck_guide.add_section(duck_section4)

    return duck_guide


def generate_test_guide():
    # Ensure that a fresh instance of each guide is created
    pen = generate_test_guide_pen()
    

    print(f"---------------")
    print(f"Pen:")
    for s in pen.get_sections():
        print(f"\t pen section: {s.get_text()}")


    duck = generate_test_guide_duck()
    print(f"---------------")
    print(f"duck:")
    for s in duck.get_sections():
        print(f"\t duck section: {s.get_text()}")

    return [pen, duck]

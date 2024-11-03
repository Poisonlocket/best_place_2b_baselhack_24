import { Avatar, Dropdown, Navbar, DarkThemeToggle } from "flowbite-react";
import peopleImage from '../assets/people.png'; // Import the image

function OurNavbar() {
  return (
    <Navbar fluid >
      <Navbar.Brand href="/">
        <img src={peopleImage} className="mr-3 h-6 sm:h-9" alt="SmartGuide" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span>
      </Navbar.Brand>
      <div className="flex md:order-2">
      
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-3.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Basler Hacker</span>
            <span className="block truncate text-sm font-medium">baslerhacker@bestplace2b.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Logout</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="/overview">Guides</Navbar.Link>
        {/* <Navbar.Link href="/view/pen">View</Navbar.Link> */}
        {/* <Navbar.Link href="/edit">Edit</Navbar.Link> */}
        {/* <Navbar.Link href="/test">Test</Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default OurNavbar

import { Avatar, Dropdown, Navbar, DarkThemeToggle } from "flowbite-react";

function OurNavbar() {
  return (
    <Navbar fluid rounded>
      <div className="flex md:order-2">
      <DarkThemeToggle />
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
        <Navbar.Link href="/view">View</Navbar.Link>
        <Navbar.Link href="/edit">Edit</Navbar.Link>
        <Navbar.Link href="/test">Test</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default OurNavbar

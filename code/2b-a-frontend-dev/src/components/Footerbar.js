"use client";

import { Footer } from "flowbite-react";

const OurFooter = () => {
return (
    <Footer container>
    <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
        <Footer.Brand
        href="#"
         className="text-white text-[20px]"
        >
            BestPlace2B
        </Footer.Brand>
        <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
        </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="BestPlace2B" year={2024} />
    </div>
    </Footer>
);
}

export default OurFooter;
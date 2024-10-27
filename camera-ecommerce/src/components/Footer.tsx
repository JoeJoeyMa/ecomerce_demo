import React from "react";
import {
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandYoutube,
} from "@tabler/icons-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer footer-center dark:bg-black bg-slate-300 text-black text-base-content rounded p-10 mx-auto dark:text-white flex flex-col gap-4 justify-center items-center">
      <nav className="grid grid-flow-col gap-4">
        <Link href="#" className="dark:text-white text-black">
          Services
        </Link>
        <Link href="#" className="dark:text-white text-black">
          Products
        </Link>
        <Link href="#" className="dark:text-white text-black">
          Pricing
        </Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link href="#">
            <IconBrandTwitter color="white" size={30} />
          </Link>
          <Link href="#">
            <IconBrandYoutube color="white" size={30} />
          </Link>
          <Link href="#">
            <IconBrandFacebook color="white" size={30} />
          </Link>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by XYZ Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;

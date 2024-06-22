import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../logo/Logo";

function Footer() {
  return (
    <div className="bg-[#627473] py-8 text-[#CED4D3] text-center space-y-3">
      <div className="flex justify-between  items-center gap-x-4">
        <div className="bg-[#CED4D3] w-full h-[2px] rounded-full"></div>
        <div className="flex justify-center items-center gap-x-5 text-xl">
          <Link className="hover:scale-125 transition-all">
            <FaFacebook />
          </Link>
          <Link className="hover:scale-125 transition-all">
            <FaYoutube />
          </Link>
          <Link className="hover:scale-125 transition-all">
            <FaInstagram />
          </Link>
          <Link className="hover:scale-125 transition-all">
            <FaLinkedin />
          </Link>
          <Link className="hover:scale-125 transition-all">
            <FaTwitter />
          </Link>
        </div>
        <div className="bg-[#CED4D3] w-full h-[2px] rounded-full"></div>
      </div>
      <div>
        <Logo/>
        <p className="text-sm">Copyright &copy; 2024 iBlog</p>
      </div>
    </div>
  );
}

export default Footer;

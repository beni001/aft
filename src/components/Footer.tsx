import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-2xl font-semibold text-[#e8ac07]">Let's keep in touch!</h4>
            <h5 className="text-lg mt-0 mb-2 text-white">
              Find us on any of these platforms, we respond within 1-2 business days.
            </h5>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="group bg-gradient-to-r from-[#0fe807] via-[#e8ac07] to-white text-black shadow-md font-normal h-10 w-10 flex items-center justify-center rounded-full transition-transform duration-300 transform hover:-translate-y-1"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="group bg-gradient-to-r from-[#0fe807] via-[#e8ac07] to-white text-black shadow-md font-normal h-10 w-10 flex items-center justify-center rounded-full transition-transform duration-300 transform hover:-translate-y-1"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="group bg-gradient-to-r from-[#0fe807] via-[#e8ac07] to-white text-black shadow-md font-normal h-10 w-10 flex items-center justify-center rounded-full transition-transform duration-300 transform hover:-translate-y-1"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="group bg-gradient-to-r from-[#0fe807] via-[#e8ac07] to-white text-black shadow-md font-normal h-10 w-10 flex items-center justify-center rounded-full transition-transform duration-300 transform hover:-translate-y-1"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <span className="block uppercase text-[#e8ac07] text-sm font-semibold mb-2">Useful Links</span>
            <ul className="list-unstyled">
              <li>
                <a className="text-white hover:text-[#e8ac07] font-semibold block pb-2 text-sm" href="#">Menu</a>
              </li>
              <li>
                <a className="text-white hover:text-[#e8ac07] font-semibold block pb-2 text-sm" href="#">About Us</a>
              </li>
              <li>
                <a className="text-white hover:text-[#e8ac07] font-semibold block pb-2 text-sm" href="#">Contact</a>
              </li>
              <li>
                <a className="text-white hover:text-[#e8ac07] font-semibold block pb-2 text-sm" href="#">Careers</a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-gray-700" />
        <div className="flex flex-wrap items-center justify-center text-center">
          <div className="text-sm text-gray-400 font-semibold">
            Copyright © <span id="get-current-year">{new Date().getFullYear()}</span> African Fresh Twists. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

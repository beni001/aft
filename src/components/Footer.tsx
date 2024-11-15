import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          {/* Contact Section */}
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-2xl font-semibold text-[#e8ac07]">Let's keep in touch!</h4>
            <p className="text-lg mt-0 mb-2 text-white">
              Find us on any of these platforms, we respond within 1-2 business days.
            </p>
            <div className="mt-4 flex space-x-4">
              {/* Social Icons */}
              {[
                { icon: <FaFacebook />, label: 'Facebook', href: '#' },
                { icon: <FaInstagram />, label: 'Instagram', href: 'https://www.instagram.com/invites/contact/?igsh=a36jt32nfxdr&utm_content=u4eljpy' },
                { icon: <FaTwitter />, label: 'Twitter', href: '#' },
                { icon: <FaTiktok />, label: 'TikTok', href: 'https://www.tiktok.com/@aft.to.the.world?_t=8rPaDHwDJR9&_r=1' },
              ].map(({ icon, label, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="group bg-gradient-to-r from-[#0fe807] via-[#e8ac07] to-white text-black shadow-md font-normal h-10 w-10 flex items-center justify-center rounded-full transition-transform duration-300 transform hover:-translate-y-1"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div className="w-full lg:w-6/12 px-4">
            <span className="block uppercase text-[#e8ac07] text-sm font-semibold mb-2">Useful Links</span>
            <ul className="list-unstyled">
              {[
                { name: 'Home', href: '/#' },
                { name: 'Menu', href: '/#menu' },
                { name: 'About Us', href: '/#about' },
                { name: 'Contact', href: '/#contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    className="text-white hover:text-[#e8ac07] font-semibold block pb-2 text-sm"
                    href={link.href}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        {/* Footer Bottom Section */}
        <div className="flex flex-wrap items-center justify-center text-center">
          <div className="text-sm text-gray-400 font-semibold">
            Copyright © {new Date().getFullYear()} African Fresh Twists. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

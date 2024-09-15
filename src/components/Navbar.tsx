import React from "react";
import { FaCartShopping } from "react-icons/fa6";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Menu",
    link: "/#menu",
  },
  {
    id: 3,
    name: "About",
    link: "/#about",
  },
  {
    id: 4,
    name: "Contact",
    link: "/#contact",
  },
];

const Navbar: React.FC = () => {
  return (
    <div className="shadow-md bg-[#e8a507] text-black">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <a
            href="#"
            className="font-bold text-2xl sm:text-3xl flex gap-2 items-center"
          >
            {/* Replace with your logo */}
            <span className="text-3xl">🍽️</span>
            African Fresh Twists
          </a>

          {/* Menu Items */}
          <div className="hidden sm:flex items-center space-x-6">
            {Menu.map((menu) => (
              <a
                key={menu.id}
                href={menu.link}
                className="hover:text-white transition duration-300"
              >
                {menu.name}
              </a>
            ))}
          </div>

          {/* Order Button */}
          <button className="ml-4 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-full flex items-center gap-2 transition duration-300">
            Order Now
            <FaCartShopping className="text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden flex flex-col space-y-2 px-4 pb-4">
        {Menu.map((menu) => (
          <a
            key={menu.id}
            href={menu.link}
            className="hover:text-white transition duration-300"
          >
            {menu.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars, FaHome, FaUtensils, FaInfoCircle, FaEnvelope } from "react-icons/fa"; 
import useCart from "../Hooks/useCart"; // Adjust the path as necessary

// Define the structure of a menu item
interface MenuItem {
  id: number;
  name: string;
  link: string;
  icon: JSX.Element;
}

// Define the menu items
const Menu: MenuItem[] = [
  { id: 1, name: "Home", link: "/#", icon: <FaHome /> },
  { id: 2, name: "Menu", link: "/#menu", icon: <FaUtensils /> },
  { id: 3, name: "About", link: "/#about", icon: <FaInfoCircle /> },
  { id: 4, name: "Contact", link: "/#contact", icon: <FaEnvelope /> },
];

const Navbar: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { cartItems, addItemToCart } = useCart(); // Use the cart hook

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    if (isMenuOpen) setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    if (isDropdownOpen) setDropdownOpen(false);
  };

  // Function to handle adding an item to the cart
  const handleAddToCart = (item: { id: string; name: string; price: number }) => {
    console.log("Clicked item:", item); // Debugging line
    addItemToCart({ id: item.id.toString(), name: item.name, price: item.price, quantity: 1 });
  };
  

  
  return (
    <div className="shadow-md bg-[#e8a507] text-black">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2 items-center">
            <span className="text-3xl">🍽️</span>
            African Fresh Twists
          </a>

          {/* Order Button / Dropdown Cart Icon */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="ml-4 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-full flex items-center gap-2 transition duration-300"
            >
              <FaCartShopping className="text-xl" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 bg-white text-black shadow-md mt-2 rounded-md z-10">
                <div className="p-2">
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                      <div key={index} className="py-1">
                        {item.name}
                      </div>
                    ))
                  ) : (
                    <div className="py-1">Your cart is empty.</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Menu Icon */}
          <div className="relative sm:hidden">
            <button
              onClick={toggleMenu}
              className="ml-4 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-full flex items-center gap-2 transition duration-300"
            >
              <FaBars className="text-xl" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 bg-white text-black shadow-md mt-2 rounded-md z-10">
                <div className="flex flex-col">
                  {Menu.map((menu) => (
                    <a
                      key={menu.id}
                      href={menu.link}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-200 transition duration-300"
                      onClick={() => handleAddToCart({ id: menu.id.toString(), name: menu.name, price: 10 })} // Replace 10 with the actual price of the item
                    >
                      {menu.icon}
                      <span>{menu.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden sm:flex items-center space-x-6">
            {Menu.map((menu) => (
              <a
                key={menu.id}
                href={menu.link}
                className="flex items-center space-x-2 hover:text-white transition duration-300"
                onClick={() => handleAddToCart({ id: menu.id.toString(), name: menu.name, price: 10 })} // Replace 10 with the actual price of the item
              >
                {menu.icon}
                <span>{menu.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { IoTime } from 'react-icons/io5';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  const socialVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200
      }
    }
  };

  return (
    <footer className="relative bg-black py-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0fe807] via-[#e8ac07] to-white"></div>
      
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* About Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-2xl font-bold text-white">
              <span className="text-[#0fe807]">Afrikan</span> <span className="text-[#e8ac07]">Fresh</span> <span className="text-white">Twists</span>
            </h4>
            <p className="text-gray-300">
              Delicious African cuisine with a modern twist. Experience the rich flavors and traditions of Africa in every bite.
            </p>
            
            {/* Social Media */}
            <div className="pt-4">
              <h5 className="text-[#e8ac07] font-semibold mb-3">Connect With Us</h5>
              <div className="flex space-x-3">
                <motion.a
                  href="https://www.facebook.com/profile.php?id=61573657468857"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialVariants}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-[#0fe807] text-black p-3 rounded-full"
                  aria-label="Facebook"
                >
                  <FaFacebook size={18} />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/afrikanfreshtwists?igsh=MnNsZndpcGJzOWIz"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialVariants}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-[#e8ac07] text-black p-3 rounded-full"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </motion.a>
                <motion.a
                  href="https://www.tiktok.com/@afrikanfreshtwists?_t=ZM-8urhvpj7Xuh&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialVariants}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-white text-black p-3 rounded-full"
                  aria-label="TikTok"
                >
                  <FaTiktok size={18} />
                </motion.a>
              </div>
            </div>
          </motion.div>
          
          {/* Opening Hours */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-2xl font-bold text-[#0fe807]">Opening Hours</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="bg-[#e8ac07] p-2 rounded-full text-black mt-1">
                  <IoTime size={16} />
                </div>
                <div className="text-gray-300">
                  <p className="font-semibold">Monday - Saturday</p>
                  <p>7:00 AM - 7:30 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="bg-white p-2 rounded-full text-black mt-1">
                  <IoTime size={16} />
                </div>
                <div className="text-gray-300">
                  <p className="font-semibold">Sunday</p>
                  <p>Closed</p>
                </div>
              </li>
            </ul>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-2xl font-bold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/#' },
                { name: 'Our Menu', href: '/#menu' },
                { name: 'About Us', href: '/#about' },
                { name: 'Services', href: '/#services' },
                { name: 'Contact', href: '/#contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <motion.a
                    className="text-gray-300 hover:text-[#0fe807] transition-colors duration-300 flex items-center space-x-2"
                    href={link.href}
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-[#e8ac07]">&#8250;</span>
                    <span>{link.name}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
        
        
        
        {/* Copyright */}
        <motion.div 
          variants={itemVariants}
          className="text-center text-gray-500"
        >
          <p>© {currentYear} Afrikan Fresh Twists. All Rights Reserved.</p>
          <div className="mt-2 text-sm">
            <span>Designed with </span>
            <span className="text-[#e8ac07]">♥</span>
            <span> for authentic African cuisine</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <p>&copy; 2024 African Fresh Twists. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">Facebook</a>
            <a href="#" className="hover:text-gray-400">Instagram</a>
            <a href="#" className="hover:text-gray-400">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

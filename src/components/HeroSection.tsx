import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactTyped } from 'react-typed';

const topItems = [
  { id: 1, name: 'Beef Chapati 🥩🍞', icon: '🥩🍞' },
  { id: 2, name: 'White Coffee + Samosas ☕🥟', icon: '☕🥟' },
  { id: 3, name: 'Chips Mbuzi 🍟🍖', icon: '🍟🍖' },
  { id: 4, name: 'Dawa Tea 🍵🍯', icon: '🍵🍯' },
  { id: 5, name: 'Chai Chapati 🍵🍞', icon: '🍵🍞' },
  { id: 6, name: 'Rice Coconut Beans 🍚🥥', icon: '🍚🥥' },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState('mixvid.mp4');
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % topItems.length;
        setActiveVideo(
          topItems[newIndex].name.includes('Beef') || topItems[newIndex].name.includes('Mbuzi')
            ? 'meatvid.mp4'
            : 'mixvid.mp4'
        );
        return newIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleExploreMenuClick = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/menu');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          key={activeVideo}
          src={`/${activeVideo}`}
        />
        {/* Watermark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#e8ac07][#0fe807] via-[#0fe807] to-white opacity-40 pointer-events-none"></div>
        {/* Dark Overlay for Better Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <div className="md:w-1/2 mb-10 md:mb-0 flex flex-col items-center md:items-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
            <span className="bg-gradient-to-r from-[#0fe807] via-[#e8ac07] to-white bg-clip-text text-transparent">
              <ReactTyped
                strings={['African Fresh Twists', 'Traditional Flavors', 'Modern African Cuisine']}
                typeSpeed={70}
                backSpeed={50}
                loop
                showCursor
                cursorChar="|"
              />
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 text-white">
            Experience Authentic African Food with a Fresh Twist
          </p>
          <button
            onClick={handleExploreMenuClick}
            className="bg-gradient-to-r from-[#0fe807] via-[#e8ac07] to-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300 shadow-lg"
          >
            Explore Menu
          </button>
        </div>

        {/* Animated Icons & Item Names */}
        <div className="md:w-1/2 flex flex-col items-center">
          <span className="text-6xl md:text-7xl mb-4 animate-bounce">{topItems[activeIndex].icon}</span>
          <span className="text-xl md:text-2xl font-semibold text-white">{topItems[activeIndex].name}</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

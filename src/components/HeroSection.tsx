import React, { useState, useEffect, useRef } from 'react';
import FoodDoodle from './FoodDoodle';

const topItems = [
  { id: 1, name: 'Beef Chapati 🥩🍞', icon: '🥩🍞' },
  { id: 2, name: 'White Coffee + Samosas ☕🥟', icon: '☕🥟' },
  { id: 3, name: 'Chips Mbuzi 🍟🍖', icon: '🍟🍖' },
  { id: 4, name: 'Dawa Tea 🍵🍯', icon: '🍵🍯' },
  { id: 5, name: 'Chai Chapati 🍵🍞', icon: '🍵🍞' },
  { id: 6, name: 'Rice Coconut Beans 🍚🥥', icon: '🍚🥥' },
];

const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % topItems.length);
    }, 1000); // Change active serving every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.clientWidth * activeIndex,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <FoodDoodle />
      </div>
      <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <div className="md:w-1/2 mb-10 md:mb-0 flex flex-col items-center md:items-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0fe807] via-[#e8ac07] to-white">
            African Fresh Twists
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 text-white">
            Experience the fusion of traditional African flavors with a modern twist
          </p>
          <button className="bg-gradient-to-r from-[#0fe807] via-[#e8ac07] to-white text-black px-4 py-2 sm:px-6 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:opacity-90 transition duration-300 shadow-lg">
            Explore Menu
          </button>
        </div>
        
        <div className="md:w-1/2 overflow-hidden">
          <div ref={scrollRef} className="flex w-full">
            {topItems.map((item, index) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-full flex flex-col items-center justify-center"
                style={{ minWidth: '100%' }}
              >
                <span className="text-5xl sm:text-6xl md:text-7xl mb-2 sm:mb-4 animate-bounce">{item.icon}</span>
                <span className="text-lg sm:text-xl md:text-2xl font-semibold text-white">{item.name}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            {topItems.map((item, index) => (
              <button
                key={item.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
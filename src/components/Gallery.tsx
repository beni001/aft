import React from 'react';

function Gallery() {
  const images = [
    'fries.jpg',
    'samosa.jpg',
    'matumbo.jpg',
    'pilau.jpg',
    'omelette.jpg',
    'shakes.jpg',
    'juices.jpg',
    'creams.jpg',
    'hotdrinks.jpg',
    'meatlovers.jpg',
    'chickencorner.jpg',
    'potatotreats.jpg',
  ];

  return (
    <div className="relative w-full sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl h-auto mx-auto">
      {/* Scrollable container */}
      <div className="overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 flex space-x-4 py-4 px-2">
        {/* Gallery Images */}
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          >
            <img
              src={image}
              alt={`Gallery item: ${image}`}
              className="object-contain w-full h-64 rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Scroll button */}
      <button
        className="absolute top-1/2 left-4 bg-white text-gray-600 rounded-full p-2 hover:text-white hover:bg-gray-700 transition duration-300"
        onClick={() => document.querySelector('.overflow-x-scroll')?.scrollBy({ left: -300, behavior: 'smooth' })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        className="absolute top-1/2 right-4 bg-white text-gray-600 rounded-full p-2 hover:text-white hover:bg-gray-700 transition duration-300"
        onClick={() => document.querySelector('.overflow-x-scroll')?.scrollBy({ left: 300, behavior: 'smooth' })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default Gallery;

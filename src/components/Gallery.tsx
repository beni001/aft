import React from 'react';

const Gallery: React.FC = () => {
  return (
    <section className="py-16 bg-[#f4f4f4] text-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Gallery</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Placeholder for images */}
          <div className="h-64 bg-gray-200"></div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

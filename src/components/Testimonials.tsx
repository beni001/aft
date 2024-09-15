import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-white text-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Customer Reviews</h2>
        <div className="flex justify-center">
          <div className="border border-gray-300 rounded-lg p-6 shadow-md">
            <p className="italic">"The food was amazing, and the service was top-notch!"</p>
            <p className="text-right mt-4">- Jane Doe</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <section className="py-16 bg-white text-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>
        <div className="flex flex-col items-center">
          <input type="text" placeholder="Your Name" className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/2" />
          <input type="email" placeholder="Your Email" className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/2" />
          <textarea placeholder="Your Message" className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/2"></textarea>
          <button className="bg-black text-white px-6 py-3 rounded-lg">Submit</button>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

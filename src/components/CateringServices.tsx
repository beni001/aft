import React, { useState } from 'react';

const faqs = [
  { question: 'What types of events do you cater for?', answer: 'We cater for weddings, corporate events, private parties, and more.' },
  { question: 'What cuisines do you offer?', answer: 'We offer a fusion of traditional African cuisine with a modern twist.' },
  { question: 'How can I get a quote?', answer: 'You can get a quote by clicking the "Get a Quote" button and filling out the form.' },
  { question: 'Do you offer vegetarian options?', answer: 'Yes, we offer a variety of vegetarian options.' },
];

const CateringServices: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleFaqClick = (index: number) => {
    setActiveFaq(index === activeFaq ? null : index);
  };

  return (
    <section className="py-16 bg-cover bg-center text-black" style={{ backgroundImage: 'url(/catering.JPG)' }}>
      <div className="max-w-6xl mx-auto px-4 bg-[#e8a507] bg-opacity-45 p-10 rounded-lg">
        <h2 className="text-4xl font-bold text-center mb-8">Outside Catering</h2>
        <p className="text-xl text-center mb-8">
          Bring the flavors of African Fresh Twists to your event. We cater for weddings, corporate events, and private parties.
        </p>
        <div className="flex justify-center mb-8">
          <button className="bg-[#e88707] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#d17a06]">
            Get a Quote
          </button>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-center mb-4">Frequently Asked Questions</h3>
          <div className="flex flex-col items-center space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-md w-full max-w-md">
                <h4
                  className="text-lg font-semibold cursor-pointer text-center"
                  onClick={() => handleFaqClick(index)}
                >
                  {faq.question}
                </h4>
                {activeFaq === index && (
                  <p className="mt-2 text-#0fe807 text-center">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CateringServices;
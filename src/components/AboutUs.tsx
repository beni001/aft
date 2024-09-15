import React from 'react';

const topItems = [
  { id: 1, name: 'Beef Chapati 🥩🍞', description: 'A delicious combination of tender beef and soft chapati.' },
  { id: 2, name: 'White Coffee + Samosas ☕🥟', description: 'A perfect pairing of rich white coffee and crispy samosas.' },
  { id: 3, name: 'Chips Mbuzi 🍟🍖', description: 'Crispy chips served with succulent goat meat.' },
  { id: 4, name: 'Dawa Tea 🍵🍯', description: 'A soothing and healthy tea made with ginger, honey, and lemon.' },
  { id: 5, name: 'Chai Chapati 🍵🍞', description: 'Traditional tea served with soft and flaky chapati.' },
  { id: 6, name: 'Rice Coconut Beans 🍚🥥', description: 'A flavorful dish of rice cooked with coconut and beans.' },
];

const AboutUs: React.FC = () => {
  return (
    <section className="py-16 bg-white text-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">About Us</h2>
        <p className="text-xl text-center mb-8">
          African Fresh Twists was founded to bring the fusion of traditional African cuisine with a modern touch.
        </p>
        <h3 className="text-3xl font-bold text-center mb-6">Top Dishes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {topItems.map(item => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 shadow-md bg-[#0fe807] text-center">
              <h4 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">{item.name}</h4>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

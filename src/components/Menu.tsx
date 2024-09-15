import React, { useState } from 'react';

const sections = [
  { id: 'hot-drinks', name: 'Hot Drinks ☕🍵', options: 12 },
  { id: 'snacks', name: 'Snacks 🍪🍿', options: 9, subSections: [{ id: 'special-snacks', name: 'Special Snacks 🍰🍩', options: 4 }] },
  { id: 'juices', name: 'Juices 🍹🍊', options: 4 },
  { id: 'shakes', name: 'Shakes 🥤🍓', options: 5 },
  { id: 'creams', name: 'Creams 🍦🍨', options: 4 },
  { id: 'meals', name: 'Meals 🍖🍗', subSections: [
    { id: 'meat-lovers', name: 'Meat Lovers 🥩🍔', options: 19 },
    { id: 'chicken-corner', name: 'Chicken Corner 🍗🍖', options: 13 }
  ]},
  { id: 'cereals', name: 'Cereals 🥣🌾', options: 14 }
];

const Menu: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId === activeSection ? null : sectionId);
  };

  return (
    <section className="py-16 bg-white text-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Our Menu</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {sections.map(section => (
            <div
              key={section.id}
              className="border border-gray-200 rounded-lg p-4 sm:p-6 shadow-md bg-gradient-to-r from-[#0fe807] via-[#e8ac07] to-white to-black text-center font-bold cursor-pointer"
              onClick={() => handleSectionClick(section.id)}
            >
              <h3 className="text-xl sm:text-2xl mb-2 sm:mb-4 text-white font-extrabold" style={{ textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000' }}>
                {section.name}
              </h3>
              {activeSection === section.id && (
                <div className="mt-2 sm:mt-4">
                  <p className="text-gray-600">Options: {section.options}</p>
                  {section.subSections && section.subSections.map(subSection => (
                    <div key={subSection.id} className="mt-2">
                      <h4 className="text-lg font-semibold">{subSection.name}</h4>
                      <p className="text-gray-600">Options: {subSection.options}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
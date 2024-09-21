import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface SubSection {
  id: string;
  name: string;
  foodItems: FoodItem[];
}

interface Section {
  id: string;
  name: string;
  foodItems: FoodItem[];
  subSections: SubSection[];
}

const Menu: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sections');
        setSections(response.data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []);

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
                  <h4 className="text-lg font-semibold">Food Items:</h4>
                  <ul className="list-disc list-inside">
                    {section.foodItems.map(item => (
                      <li key={item.id} className="mt-1">
                        <strong>{item.name}</strong> - ${item.price.toFixed(2)}
                        <br />
                        <img src={item.image} alt={item.name} className="w-32 h-32 object-cover mt-2" />
                      </li>
                    ))}
                  </ul>
                  {section.subSections && section.subSections.map(subSection => (
                    <div key={subSection.id} className="mt-2">
                      <h4 className="text-lg font-semibold">{subSection.name}</h4>
                      <ul className="list-disc list-inside">
                        {subSection.foodItems.map(item => (
                          <li key={item.id} className="mt-1">
                            <strong>{item.name}</strong> - ${item.price.toFixed(2)}
                            <br />
                            <img src={item.image} alt={item.name} className="w-32 h-32 object-cover mt-2" />
                          </li>
                        ))}
                      </ul>
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
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
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sections');
        setSections(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sections:', error);
        setIsLoading(false);
      }
    };

    fetchSections();
  }, []);

  const CategoryCard: React.FC<{ section: Section }> = ({ section }) => {
    const totalItems = section.foodItems.length + 
      section.subSections.reduce((sum, sub) => sum + sub.foodItems.length, 0);

    return (
      <div 
        className="group relative h-80 md:h-96 lg:h-[450px] overflow-hidden rounded-2xl shadow-xl cursor-pointer 
                   transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center justify-center"
        onClick={() => setSelectedSection(section)}
      >
        <div className="w-full h-full overflow-hidden">
          <img
            src={section.foodItems[0]?.image || section.subSections[0]?.foodItems[0]?.image}
            alt={section.name}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="text-3xl font-bold text-white mb-2">{section.name}</h3>
          <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100">
            {totalItems} items available
          </p>
        </div>
      </div>
    );
  };

  const FoodItemCard: React.FC<{ item: FoodItem }> = ({ item }) => (
    <div
      onClick={() => {
        setSelectedItem(item);
        setIsModalOpen(true);
      }}
      className="group bg-white rounded-xl overflow-hidden shadow-md cursor-pointer 
                 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-w-16 aspect-h-12 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
            {item.name}
          </h4>
          <span className="text-green-600 font-bold transition-colors duration-300 group-hover:text-green-500">
            ${item.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );

  const Modal: React.FC<{ item: FoodItem; onClose: () => void }> = ({ item, onClose }) => (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 
                       shadow-lg transition-all duration-300 hover:bg-white hover:rotate-90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="h-64 overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold text-gray-900">{item.name}</h3>
            <span className="text-2xl font-bold text-green-600">
              ${item.price.toFixed(2)}
            </span>
          </div>
          
          <button
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg 
                     transform transition-all duration-300 
                     hover:bg-green-500 hover:shadow-lg hover:-translate-y-0.5 
                     active:bg-green-700 active:translate-y-0"
            onClick={onClose}
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Our Menu</h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover our delicious offerings
          </p>
        </div>

        {/* Horizontal Category Navigation */}
        <div className="flex overflow-x-auto mb-8 space-x-4 pb-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setSelectedSection(section)}
              className={`whitespace-nowrap px-6 py-2 rounded-full border ${selectedSection?.id === section.id ? 'bg-green-600 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-200'} transition-colors duration-300`}
            >
              {section.name}
            </button>
          ))}
        </div>

        <div className="space-y-8 h-[650px]">
          {!selectedSection ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sections.map((section) => (
                <CategoryCard key={section.id} section={section} />
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">{selectedSection.name}</h3>
              
              {selectedSection.foodItems.length > 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedSection.foodItems.map((item) => (
                      <FoodItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}

              {selectedSection.subSections.map((subSection) => (
                <div key={subSection.id} className="space-y-4">
                  <h4 className="text-2xl font-semibold text-gray-700 text-center">{subSection.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subSection.foodItems.map((item) => (
                      <FoodItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && selectedItem && (
        <Modal
          item={selectedItem}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
};

export default Menu;

import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import useCart from "../Hooks/useCart";
import { menuData } from "./data/MenuData";
import CategoryCard from "./CategoryCard";
import FoodItemCard from "./FoodItemCard";
import MenuSkeleton from "./MenuSkeleton";
import ErrorDisplay from "./ErrorDisplay";
import { FoodItem, Section } from "../Types";
import { sendWhatsAppOrder } from "../utils/whatsappUtils";

// Define types for props
type LoadingState = {
    isLoading: boolean;
    error: string | null;
    retry: () => void;
    isUsingStaticData: boolean;
    setStaticData?: () => void; // Function to switch to static data
};

type MenuProps = {
    sections: Section[];
    loadingState: LoadingState;
};

const Menu: FC<MenuProps> = ({ sections, loadingState }) => {
    const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER || "";
    const { addItemToCart } = useCart();
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);
    const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filterItems = (items: FoodItem[]): FoodItem[] =>
        items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const getAllItems = (): FoodItem[] => {
        return sections.flatMap(section => [
            ...section.foodItems,
            ...section.subSections.flatMap(subSection => subSection.foodItems)
        ]).filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };
    useEffect(() => {
        if (loadingState.error) {
            console.error("Error loading menu:", loadingState.error);
            console.log("Using static menu data instead.");
    
            // Call the function to switch to static data
            loadingState.setStaticData?.();
        }
    }, [loadingState.error]);

    if (loadingState.isLoading) return <MenuSkeleton />;

    const getImagePath = (sectionId: string) => {
        switch (sectionId) {
          case 'hot-drinks':
            return '/hotdrinks.png';
          case 'snacks':
            return '/snacks.png';
          case 'juices':
            return '/juices.png';
          case 'shakes':
            return '/shakes.png';
          case 'creams':
            return '/creams.png';
          case 'meat-lovers':
            return '/meatlovers.png';
          case 'chicken-corner':
            return '/chickencorner.png';
          case 'cereals':
            return '/cerials.jpg';
          case 'potato-treats':
            return '/potatotreats.png';
          default:
            return '/default.jpg';
        }
      };
      
      return (
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0fe807] via-[#e8ac07] to-gray-800">
                Our Menu
              </h2>
              <p className="mt-4 text-lg text-gray-600">Discover our delicious offerings...</p>
            </div>
      
            {/* Category Selection */}
            <div className="flex overflow-x-auto mb-8 space-x-4 pb-2 scrollbar-hide">
              <button
                onClick={() => setSelectedSection(null)}
                className={`whitespace-nowrap px-6 py-2 rounded-full border ${
                  !selectedSection
                    ? "bg-gradient-to-r from-[#0fe807] via-[#e8ac07] to-white text-black font-medium"
                    : "border-gray-300 text-gray-700 hover:bg-gray-200"
                } transition-colors duration-300`}
              >
                All Categories
              </button>
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section)}
                  className={`whitespace-nowrap px-6 py-2 rounded-full border ${
                    selectedSection?.id === section.id
                      ? "bg-gradient-to-r from-[#0fe807] via-[#e8ac07] to-white text-black font-medium"
                      : "border-gray-300 text-gray-700 hover:bg-gray-200"
                  } transition-colors duration-300`}
                >
                  {section.name}
                </button>
              ))}
            </div>
      
            {/* Menu Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchTerm ? (
                getAllItems().map(item => (
                  <FoodItemCard
                    key={item.id}
                    item={item}
                    onWhatsappOrder={() => sendWhatsAppOrder(item, whatsappNumber)}
                    onClick={() => {
                      setSelectedItem(item);
                      setIsModalOpen(true);
                    }}
                  />
                ))
              ) : !selectedSection ? (
                // 🎨 Updated CategoryCard with Background Images
                sections.map(section => (
                  <div
                    key={section.id}
                    className="group relative h-80 md:h-96 lg:h-[200px] overflow-hidden rounded-2xl shadow-xl cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex-col items-center justify-center"
                    onClick={() => setSelectedSection(section)}
                    style={{
                      backgroundImage: `url('${getImagePath(section.id)}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="h-100 absolute bottom-0 left-0 right-0 p-2 text-center translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
                      <h3 className="text-xl font-bold text-white mb-1">{section.name}</h3>
                      <p className="text-white/90 text-xs opacity-0 group-hover:opacity-100">
                        {section.foodItems.length} items available
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                [...selectedSection.foodItems, ...selectedSection.subSections.flatMap(sub => sub.foodItems)].map(item => (
                  <FoodItemCard
                    key={item.id}
                    item={item}
                    onWhatsappOrder={() => sendWhatsAppOrder(item, whatsappNumber)}
                    onClick={() => {
                      setSelectedItem(item);
                      setIsModalOpen(true);
                    }}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      );
}  

export default Menu

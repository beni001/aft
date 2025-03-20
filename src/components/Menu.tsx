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

    if (loadingState.isLoading) return <MenuSkeleton />;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {loadingState.error && (
                    <ErrorDisplay
                        error={loadingState.error}
                        onRetry={loadingState.retry}
                        isUsingStaticData={loadingState.isUsingStaticData}
                    />
                )}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0fe807] via-[#e8ac07] to-gray-800">Our Menu</h2>
                    <p className="mt-4 text-lg text-gray-600">Discover our delicious offerings...</p>
                </div>
                <div className="relative max-w-md mx-auto mb-8">
                    <input
                        type="text"
                        placeholder="Search menu items..."
                        className="w-full px-4 py-2 border rounded-lg pl-10"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
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
                        sections.map(section => (
                            <CategoryCard key={section.id} section={section} onClick={() => setSelectedSection(section)} />
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
};

export default Menu;

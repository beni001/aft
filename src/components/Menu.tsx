import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { FaCartShopping } from "react-icons/fa6";
import useCart from '../Hooks/useCart';
import { menuData } from './data/MenuData';

interface FoodItem {
    id: string;
    name: string;
    price: number;
    image: string;
    _id?: string;
}

interface SubSection {
    id: string;
    name: string;
    foodItems: FoodItem[];
    _id?: string;
}

interface Section {
    id: string;
    name: string;
    foodItems: FoodItem[];
    subSections: SubSection[];
    _id?: string;
    __v?: number;
}

interface LoadingState {
    isLoading: boolean;
    error: string | null;
    retry: () => void;
    isUsingStaticData: boolean;
}

const MenuSkeleton: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        ))}
    </div>
);

const ErrorDisplay: React.FC<{ error: string; onRetry: () => void; isUsingStaticData: boolean }> = 
    ({ error, onRetry, isUsingStaticData }) => (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex">
            <div className="flex-1">
                <p className="text-yellow-700">{error}</p>
                {isUsingStaticData && (
                    <p className="text-yellow-600 text-sm mt-1">
                        🥢 
                    </p>
                    //this is when the app is showing catched data 
                )}
            </div>
            {!isUsingStaticData && (
                <button 
                    onClick={onRetry}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    Try Again
                </button>
            )}
        </div>
    </div>
);

const Menu: React.FC = () => {
    const { cartItems, addItemToCart } = useCart(); // Use the cart hook
    const [sections, setSections] = useState<Section[]>([]);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);
    const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingState, setLoadingState] = useState<LoadingState>({
        isLoading: true,
        error: null,
        retry: () => {},
        isUsingStaticData: false
    });

    const fetchData = async () => {
        setLoadingState(prev => ({ ...prev, isLoading: true, error: null, isUsingStaticData: false }));
        try {
            const response = await axios.get('http://localhost:5000/api/sections');
            setSections(response.data);
            setLoadingState(prev => ({ ...prev, isLoading: false }));
        } catch (error) {
            console.log('API fetch failed, falling back to static data');
            setSections(menuData);
            setLoadingState(prev => ({
                ...prev,
                isLoading: false,
                error: '🍤',
                isUsingStaticData: true
            }));
        }
    };

    useEffect(() => {
        setLoadingState(prev => ({ ...prev, retry: fetchData }));
        fetchData();
    }, []);

    // Filter function for search
    const filterItems = (items: FoodItem[]) => {
        return items.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    // Get all items for search when no section is selected
    const getAllItems = () => {
        let allItems: FoodItem[] = [];
        sections.forEach(section => {
            allItems = [...allItems, ...section.foodItems];
            section.subSections.forEach(subSection => {
                allItems = [...allItems, ...subSection.foodItems];
            });
        });
        return filterItems(allItems);
    };

    const CategoryCard: React.FC<{ section: Section }> = ({ section }) => {
        const totalItems = section.foodItems.length + 
            section.subSections.reduce((sum, sub) => sum + sub.foodItems.length, 0);
        
        return (
            <div 
                className="group relative h-80 md:h-96 lg:h-[200px] overflow-hidden rounded-2xl shadow-xl cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex-col items-center justify-center" 
                onClick={() => setSelectedSection(section)}
            >
                <div className="w-full h-full overflow-hidden">
                    <img 
                        src={section.foodItems[0]?.image || section.subSections[0]?.foodItems[0]?.image} 
                        alt={section.name}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="h-100 absolute bottom-0 left-0 right-0 p-2 text-center translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="text-xl font-bold text-white mb-1">{section.name}</h3>
                    <p className="text-white/90 text-xs opacity-0 group-hover:opacity-100">
                        {totalItems} items available
                    </p>
                </div>
            </div>
        );
    };

    const FoodItemCard: React.FC<{ item: FoodItem }> = ({ item }) => (
        <div 
            onClick={() => { setSelectedItem(item); setIsModalOpen(true); }} 
            className="group bg-white rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative"
        >
            <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
            </div>
            <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                        {item.name}
                    </h4>
                    <span className="text-green-600 font-bold transition-colors duration-300 group-hover:text-green-500">
                        KSH.{item.price.toFixed(2)}
                    </span>
                </div>
            </div>
            <button 
            onClick={(e) => { 
                e.stopPropagation(); 
                addItemToCart({ id: item.id, name: item.name, price: item.price, quantity: 1 });
            }} 
            className="absolute top-2 right-2 bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-500 transition duration-300"
            >
            <FaCartShopping className="text-xl" />
            </button>



        </div>
    );

    if (loadingState.isLoading) {
        return <MenuSkeleton />;
    }

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
                    <h2 className="text-4xl font-bold text-gray-900">Our Menu</h2>
                    <p className="mt-4 text-lg text-gray-600">Discover our delicious offerings...</p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md mx-auto mb-8">
                    <input
                        type="text"
                        placeholder="Search menu items..."
                        className="w-full px-4 py-2 border rounded-lg pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>

                {/* Category Navigation */}
                <div className="flex overflow-x-auto mb-8 space-x-4 pb-2 scrollbar-hide">
                    <button
                        onClick={() => setSelectedSection(null)}
                        className={`whitespace-nowrap px-6 py-2 rounded-full border ${
                            !selectedSection 
                                ? 'bg-green-600 text-white' 
                                : 'border-gray-300 text-gray-700 hover:bg-gray-200'
                        } transition-colors duration-300`}
                    >
                        All Categories
                    </button>
                    {sections.map((section) => (
                        <button 
                            key={section.id} 
                            onClick={() => setSelectedSection(section)}
                            className={`whitespace-nowrap px-6 py-2 rounded-full border ${
                                selectedSection?.id === section.id 
                                    ? 'bg-green-600 text-white' 
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-200'
                            } transition-colors duration-300`}
                        >
                            {section.name}
                        </button>
                    ))}
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchTerm ? (
                        // Show search results
                        getAllItems().map((item) => (
                            <FoodItemCard key={item.id} item={item} />
                        ))
                    ) : !selectedSection ? (
                        // Show categories
                        sections.map((section) => (
                            <CategoryCard key={section.id} section={section} />
                        ))
                    ) : (
                        // Show selected category items
                        <>
                            {filterItems(selectedSection.foodItems).map((item) => (
                                <FoodItemCard key={item.id} item={item} />
                            ))}
                            {selectedSection.subSections.map((subSection) => (
                                filterItems(subSection.foodItems).map((item) => (
                                    <FoodItemCard key={item.id} item={item} />
                                ))
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;
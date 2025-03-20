import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { 
  Timer, Star, Flame, ArrowRight, TrendingUp, 
  Clock, Shield, ChefHat, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FoodItem } from "../Types";

interface FoodItemCardProps {
  item: FoodItem;
  onWhatsappOrder: (item: FoodItem) => void;
  onClick: () => void;
  featured?: boolean;
}

// Food badge types with emotion-evoking labels
const FOOD_BADGES = {
  POPULAR: { label: "Popular Choice", icon: TrendingUp, color: "#e8ac07" },
  SPICY: { label: "Spicy", icon: Flame, color: "#ff4b36" },
  NEW: { label: "New Item", icon: Sparkles, color: "#0fe807" },
  QUICK: { label: "Ready in 15min", icon: Timer, color: "#0fe807" },
  CHEF: { label: "Chef's Special", icon: ChefHat, color: "#e8ac07" },
  PREMIUM: { label: "Premium", icon: Shield, color: "#8f5cff" }
};

// Get appropriate badge based on food item
const getFoodBadge = (item: FoodItem) => {
  const text = (item.name + " " + (item.description || "")).toLowerCase();
  const price = item.price;
  
  if (price > 15) return FOOD_BADGES.PREMIUM;
  if (text.includes("spicy") || text.includes("hot")) return FOOD_BADGES.SPICY;
  if (text.includes("chef") || text.includes("special")) return FOOD_BADGES.CHEF;
  if (text.includes("new") || item.id.includes("new")) return FOOD_BADGES.NEW;
  if (text.includes("quick") || text.includes("fast")) return FOOD_BADGES.QUICK;
  
  // Default to popular for items without any specific traits
  return FOOD_BADGES.POPULAR;
};

const FoodItemCard: React.FC<FoodItemCardProps> = ({ 
  item, 
  onWhatsappOrder, 
  onClick,
  featured = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const badge = getFoodBadge(item);

  // Generate first letter with colorful background based on name
  const nameInitial = item.name.charAt(0).toUpperCase();
  const hue = (nameInitial.charCodeAt(0) % 20) * 18; // Create variety of hues

  // Get whether item is likely vegetarian
  const isLikelyVeg = (item.name + " " + (item.description || "")).toLowerCase().includes("veg");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-xl bg-white shadow-lg h-full flex flex-col`}
      onClick={onClick}
    >
      {/* Top badge bar */}
      <div className="absolute top-0 left-0 right-0 px-2 py-1 flex justify-between items-center z-10">
        <div className="flex items-center space-x-1 px-2 py-1 rounded-full backdrop-blur-sm bg-white/70 shadow-sm">
          <badge.icon size={12} className="text-white" style={{ color: badge.color }} />
          <span className="text-xs font-medium" style={{ color: badge.color }}>{badge.label}</span>
        </div>
        
        {isLikelyVeg && (
          <div className="px-2 py-1 rounded-full backdrop-blur-sm bg-white/70 shadow-sm">
            <span className="text-xs font-medium text-[#0fe807]">Vegetarian</span>
          </div>
        )}
      </div>

      {/* Image or colorful initial */}
      <div 
        className="relative h-28 overflow-hidden"
        style={{ 
          background: item.image ? 'transparent' : `linear-gradient(135deg, hsl(${hue}, 80%, 75%), hsl(${hue+40}, 80%, 60%))` 
        }}
      >
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <span className="text-4xl font-bold text-white drop-shadow-md">{nameInitial}</span>
          </div>
        )}
        
        {/* Gleaming effect on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 0.5, x: 200 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-20 h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Floating price tag */}
      <div className="absolute right-3 top-24 px-3 py-1.5 rounded-full bg-white shadow-lg border-2 border-[#e8ac07] transform translate-y-[-50%]">
        <span className="font-bold text-gray-800">${item.price.toFixed(2)}</span>
      </div>

      {/* Content area */}
      <div className="p-3 pt-4 flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-bold text-gray-800 pr-2">{item.name}</h3>
          
          {/* Star rating - making most items look positively rated for psychological effect */}
          <div className="flex items-center">
            <Star size={14} className="fill-[#e8ac07] text-[#e8ac07]" />
            <span className="ml-1 text-xs font-medium text-gray-600">
              {(4 + (item.id.charCodeAt(0) % 10) / 10).toFixed(1)}
            </span>
          </div>
        </div>
        
        {item.description ? (
          <p className="text-xs text-gray-600 line-clamp-2 mb-2">{item.description}</p>
        ) : (
          <div className="flex flex-wrap gap-1 mb-2">
            {['Tasty', 'Fresh', 'Delicious'].map((tag, i) => (
              <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Preparation time - psychological effect making food seem readily available */}
        <div className="flex items-center mb-3">
          <Clock size={12} className="text-[#0fe807]" />
          <span className="ml-1 text-xs text-gray-500">
            {10 + (item.id.charCodeAt(0) % 10)} min preparation
          </span>
        </div>
      </div>

      {/* Order button area with animated arrow */}
      <div className="p-3 pt-0">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            onWhatsappOrder(item);
          }}
          className="w-full py-2.5 rounded-lg text-white font-medium shadow-md relative overflow-hidden group"
          style={{ 
            background: `linear-gradient(90deg, #0fe807, #e8ac07)`
          }}
        >
          <div className="flex items-center justify-center gap-2 relative z-10">
            <FaWhatsapp />
            <span>Order Now</span>
          </div>
          
          <motion.div 
            initial={{ x: '0%' }}
            whileHover={{ x: '110%' }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-start pl-2 pointer-events-none"
          >
            <ArrowRight size={18} className="text-white/80" />
          </motion.div>
        </motion.button>
      </div>
      
      {/* Featured corner ribbon */}
      {featured && (
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#e8ac07] text-white text-xs font-bold py-1 px-6 shadow-md">
            FEATURED
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FoodItemCard;
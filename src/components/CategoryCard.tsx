import React from "react";

interface Section {
    id: string;
    name: string;
    description?: string;
}

interface CategoryCardProps {
    section: Section;
    onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ section, onClick }) => {
    return (
        <div
            className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={onClick}
        >
            <h3 className="text-xl font-semibold text-gray-800">{section.name}</h3>
            {section.description && (
                <p className="text-gray-600 mt-2">{section.description}</p>
            )}
        </div>
    );
};

export default CategoryCard;
import React from "react";

const MenuSkeleton: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Skeleton */}
                <div className="text-center mb-12">
                    <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto"></div>
                </div>

                {/* Search Bar Skeleton */}
                <div className="relative max-w-md mx-auto mb-8">
                    <div className="h-12 bg-gray-200 rounded-lg"></div>
                </div>

                {/* Category Navigation Skeleton */}
                <div className="flex overflow-x-auto mb-8 space-x-4 pb-2 scrollbar-hide">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-10 bg-gray-200 rounded-full w-24"></div>
                    ))}
                </div>

                {/* Menu Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuSkeleton;
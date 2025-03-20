import React from "react";

interface ErrorDisplayProps {
    error: string;
    onRetry: () => void;
    isUsingStaticData?: boolean;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry, isUsingStaticData }) => {
    return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">
            <p className="font-bold">Error</p>
            <p>{error}</p>
            {isUsingStaticData && (
                <p className="text-sm text-gray-600">Showing static data instead.</p>
            )}
            <button 
                onClick={onRetry} 
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
                Retry
            </button>
        </div>
    );
};

export default ErrorDisplay;

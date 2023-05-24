import React from 'react';

const CustomButton = ({ children, color, text, loading, onClick, disabled, width = 'w-full', textColor = 'text-white', border = '', className = '' }) => {
    const buttonClasses = `bg-${color} ${textColor} px-5 py-2 ${border} rounded ${width} hover:bg-secondary focus:ring-2 focus:ring-${color}-500 focus:outline-none ${className}`;
    const spinnerClasses = `animate-spin -ml-1 mr-3 h-5 w-5 ${textColor}`;
    return (
        <button
            type="submit"
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? (
                <svg
                    className={spinnerClasses}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l1-2.647z"
                    ></path>
                </svg>
            ) : (
                children
            )}
        </button>
    );
};

export default CustomButton;

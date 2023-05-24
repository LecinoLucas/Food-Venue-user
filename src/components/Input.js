import React from 'react';

const Input = ({ type, id, value, onChange, label, required, error, placeHolder = '' }) => {
    const borderColor = error ? 'border-red-500' : 'border-gray-300';
    const focusBorderColor = error ? 'focus:border-red-500' : 'focus:border-blue-500';
    const focusRingColor = error ? 'focus:ring-red-500' : 'focus:ring-blue-500';

    return (
        <div className="mb-4">
            <label htmlFor={id} className="block mb-1 text-highlight font-semibold">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeHolder}
                id={id}
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-2 border ${borderColor} rounded ${focusBorderColor} ${focusRingColor} focus:outline-none`}
                required={required}
            />
        </div>
    );
};

export default Input;

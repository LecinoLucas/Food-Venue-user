import React, { useEffect } from 'react';

const Toast = ({ isVisible, type, title, message, duration, onDismiss }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                if (onDismiss) {
                    onDismiss();
                }
            }, duration || 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onDismiss]);

    if (!isVisible) return null;

    const bgColor = type === 'success'
        ? 'bg-green-500'
        : type === 'error'
            ? 'bg-red-500'
            : type === 'warning'
                ? 'bg-yellow-500'
                : 'bg-blue-500';

    return (
        <div className={`p-4 ${bgColor} text-white justify-center font-semibold rounded shadow-lg flex items-center`} style={{ position: 'absolute', top: '90%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
            <div className="mr-4">
                <p className="text-xl font-bold">{title}</p>
                <p>{message}</p>
            </div>
            <button onClick={onDismiss} className="text-xl font-bold">&times;</button>
        </div>
    );
};

export default Toast;

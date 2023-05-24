/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundColor: {
                primary: '#FF7F50',
                secondary: '#FFA07A',
                app: '#FFEFD5',
                card: '#FFFFFF',
                highlight: '#F08080',
                warning: '#FF4500',
                success: '#32CD32',
            },
            textColor: {
                primary: '#FF7F50',
                secondary: '#FFA07A',
                highlight: '#F08080',
                warning: '#FF4500',
                success: '#32CD32',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};

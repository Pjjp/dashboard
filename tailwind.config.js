/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          indigo: {
            50: '#EEF2FF',
            100: '#E0E7FF',
            200: '#C7D2FE',
            500: '#6366F1',
            600: '#4F46E5',
            700: '#4338CA',
            800: '#3730A3',
            900: '#312E81'
          }
        }
      },
    },
    plugins: [],
  }
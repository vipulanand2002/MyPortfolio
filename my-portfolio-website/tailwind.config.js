/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class', // Add this line to enable dark mode with class strategy
  theme: {
    extend: {},
  },
  plugins: [],
};

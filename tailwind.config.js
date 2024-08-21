/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables dark mode with a 'class' strategy
  theme: {
    extend: {
      colors: {
        dark: '#1a202c', // Example custom dark color
        light: '#f7fafc', // Example custom light color
      },
    },
  },
  plugins: [],
}

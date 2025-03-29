/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          dark: {
            bg: '#1a1b1e',
            card: '#25262b',
            text: '#c1c2c5',
            border: '#2C2E33'
          }
        }
      },
    },
    plugins: [],
  }
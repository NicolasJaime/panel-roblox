/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class", 
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#28D6F7',   // Para acentos vibrantes en modo oscuro
          blue: '#2650F0',   // Para botones y texto principal en modo claro
          azure: '#2690F0',  // Para estados hover o secundarios
          sky: '#76B6F0',    // Para detalles suaves
          black: '#000000',  // Fondo principal oscuro
          dark: '#111111',   // Fondo de tarjetas en modo oscuro para crear contraste
        }
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],

  theme: {
    extend: {
      colors: {
        brand: '#1DA1F2', // Define el color de la marca aquí
      },
    },
  },
  plugins: [],
}


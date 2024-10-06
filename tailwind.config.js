/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#1B4242',
        secundary: '#578271',
        tertiary: '#44685A',
        quaternary: '#9EC8B9',
        quinary: '#C5EDDF',
        senary: '#8AB3A4',
        // septenary: '#D3D8D7',
        // octonary: '#F1F3F4',

      },
      boxShadow: {
        'inner-heavy': 'inset 0 0px 8px rgba(0, 0, 0, 0.3)', 
      },
    },
  },
  plugins: [],
}



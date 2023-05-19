/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'borderColor':'#dedede'
      },
      fontSize:{
        'md':'16px'
      },
      fontFamily:{
        'poppinBold':'poppin-bold',
        'poppin-medium':'poppin-medium'
      },
    },
    screens:{
      'sm':'460px',
      'md':'640px',
      'lg':'1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}
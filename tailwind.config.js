/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  corePlugins: {
    preflight: false,
  
  },
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  variants: {
    extend: {
      display: ['customNode-hover' , "group-hover"],
    },
  },
}


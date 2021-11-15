const colors = require('tailwindcss/colors')


module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        violet:colors.violet
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

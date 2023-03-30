const colors = require('tailwindcss/colors');
const typography = require('@tailwindcss/typography');

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.njk",
    "./src/**/*.js",
    "./utils/shortcodes.js",
  ],
  plugins: [ typography ],
  theme: {
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.stone,
      yellow: colors.amber,
      blue: colors.blue
    },
    extend: {
      fontFamily: {
        inter: '"Inter", sans-serif;',
      },
      // zIndex: {
      //   '-10': '-10',
      // }
    },
  },
};

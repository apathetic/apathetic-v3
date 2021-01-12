const colors = require('tailwindcss/colors');
const typography = require('@tailwindcss/typography');

module.exports = {
  purge: {
    content: [
      "./src/**/*.njk",
      "./src/**/*.js",
      "./src/**/*.svg",
    ],
  },
  plugins: [ typography ],
  theme: {
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.warmGray,
      yellow: colors.amber,
    },
    extend: {
      fontFamily: {
        inter: '"Inter", sans-serif;',
      },
      zIndex: {
        '-10': '-10',
      }
    },
  },
};

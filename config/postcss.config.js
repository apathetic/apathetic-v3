module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('tailwindcss')('./config/tailwind.config.js'),
    // require('autoprefixer'),
  ],
};

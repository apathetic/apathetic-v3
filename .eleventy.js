const markdownIt = require('markdown-it');
const filters = require('./utils/filters.js');
const shortcodes = require('./utils/shortcodes.js');

module.exports = (config) => {
  // Stuffs
  config.setLibrary('md', markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  }));

  // Filters
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName]);
  });

  // Shortcodes
  Object.keys(shortcodes).forEach((shortcodeName) => {
    config.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  })

  // Static assets
  config.addPassthroughCopy('src/manifest.json'); // copy `static/manifest.json` to `dist/manifest.json`
  config.addPassthroughCopy('static/'); // copy `static/` to `dist/static/`

  // development stuffs
  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
    open: false,
  });

  // Base Config
  config.setDataDeepMerge(true);
  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'views',
      data: 'data',
    },
    templateFormats: ['njk', 'md'],
    // markdownTemplateEngine: 'njk',
    // htmlTemplateEngine: 'njk',
    // dataTemplateEngine: 'njk',
  };
};

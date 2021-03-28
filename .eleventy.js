const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const filters = require('./utils/filters.js');
const { shortcodes, pairedshortcodes } = require('./utils/shortcodes.js');

module.exports = (config) => {
  // Stuffs
  config.addPlugin(syntaxHighlight);
  config.setLibrary('md', markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  }));

  // Filters
  Object.keys(filters).forEach((name) => {
    config.addFilter(name, filters[name]);
  });

  // Shortcodes
  Object.keys(shortcodes).forEach((name) => {
    config.addShortcode(name, shortcodes[name]);
  });
  Object.keys(pairedshortcodes).forEach((name) => {
    config.addPairedShortcode(name, pairedshortcodes[name]);
  })


  // Static assets
  config.addPassthroughCopy('src/manifest.json'); // copy `manifest.json` to `dist/manifest.json`
  config.addPassthroughCopy('static/'); // copy `static/` to `dist/static/`
  // config.addPassthroughCopy({'src/content/images/*.jpg': 'static/images'});
  config.addPassthroughCopy({'src/content/images/*': 'static/images'});

  // development stuffs
  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
    ghostMode: false, // Default changed in 1.0
    ui: false, // Default changed in 1.0
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
  };
};

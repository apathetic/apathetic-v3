/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    '../dist': { url: '/', static: true },
    '../static': { url: '/static', static: true },
  },
  plugins: [
    // '@snowpack/plugin-postcss',
    [ '@snowpack/plugin-postcss', { config: 'config/postcss.config.js' }],
    [ '@snowpack/plugin-run-script', { cmd: 'eleventy', watch: '$1 --watch --quiet' }],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2020',
  },
  packageOptions: {
    NODE_ENV: true,
  },
  devOptions: {
    hmrDelay: 300,
    port: 8080,
    open: 'none',
    hmr: true,
  },
  buildOptions: {
    clean: true,
    out: 'dist',
  },
};
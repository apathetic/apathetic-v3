import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const dev = process.env.NODE_ENV !== 'production';
const plugins = [
  postcss({
    config: {
      path: 'config/postcss.config.js',
      ctx: null,
    },
    extract: 'dist/static/main.bundle.css',
    minimize: !dev,
  }),
  resolve({
    browser: true,
  }),
  commonjs(),
  !dev && terser(),
];

export default [
  {
    input: 'src/scripts/main.js',
    output: {
      format: 'iife',
      name: 'main',
      file: 'dist/static/main.bundle.js',
      // sourcemap: false,
      // dir: 'dist/static/',
      // entryFileNames: '[name].bundle.js',
    },
    plugins,
  }, {
    input: 'src/scripts/analytics/base.js',
    output: {
      format: 'iife',
      name: 'analytics',
      file: 'dist/static/analytics.bundle.js',
    },
    plugins,
  }, {
    input: 'src/scripts/home.js',
    output: {
      format: 'iife',
      name: 'home',
      file: 'dist/static/home.bundle.js',
    },
    plugins,
  }

  // watch: {
  //   clearScreen: false,
  // },

];

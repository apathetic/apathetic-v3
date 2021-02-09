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
    // MAIN
    input: 'src/scripts/main.js',
    output: {
      format: 'es',
      name: 'main.bundle',
      entryFileNames: '[name].bundle.js',
      dir: 'dist/static/',
      sourcemap: dev,
    },
    plugins,
  }, {
    // MAIN (LEGACY / NO MODULE)
    input: 'src/scripts/main.js',
    output: {
      format: 'system',
      dir: 'dist/static/',
      sourcemap: dev,
    },
    plugins,
  }, {
    // HOME PAGE
    input: 'src/scripts/home.js',
    output: {
      format: 'iife',
      name: 'home',
      file: 'dist/static/home.bundle.js',
    },
    plugins,
  }
];

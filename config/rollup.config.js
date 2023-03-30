import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { injectManifest } from 'rollup-plugin-workbox';

const dev = process.env.NODE_ENV !== 'production';
const plugins = [
  postcss({
    config: { path: 'config/postcss.config.js', ctx: null },
    extract: 'main.bundle.css',
    minimize: !dev,
  }),
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    'process.env.PUBLIC_URL': dev ? 'localhost' : `''`,
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
  }, {
    // SERVICE WORKER
    input: 'src/scripts/service-worker/sw.js',
    output: {
      format: 'es',
      file: 'dist/sw.js',
    },
    plugins: [
      injectManifest({
        swSrc: 'dist/sw.js',
        swDest: 'dist/sw.js',
        globDirectory: 'dist',
      }),
      ...plugins
    ]
  }
];

import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const dev = process.env.NODE_ENV !== 'production';

export default {
  input: 'src/scripts/main.js',
  output: {
    sourcemap: false,
    format: 'iife',
    name: 'main',
    file: 'dist/static/main.bundle.js',
  },
  plugins: [
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
  ],
  watch: {
    clearScreen: false,
  },
};

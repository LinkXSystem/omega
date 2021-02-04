import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import typescript from '@rollup/plugin-typescript';

const input = 'bin/src/index.js';

export default [
  {
    input,
    output: {
      file: 'bundled/omega.js',
      format: 'iife',
      name: 'Omega'
    },
    plugins: [resolve(), terser()]
  },
  {
    input,
    output: {
      file: 'bundled/omega.esm.js',
      format: 'esm'
    },
    plugins: [resolve(), terser()]
  },
  {
    input,
    output: {
      file: 'bundled/omega.cjs.js',
      format: 'cjs'
    },
    plugins: [resolve(), typescript({ target: "es5" }), terser()]
  }
];

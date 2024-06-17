import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss'
import serve from "rollup-plugin-serve"

export default {
  input: "src/main.ts",
  output: {
    file: "dist/bundle.js",
    format: "iife",// 五种格式 amd es iife cjs umd
    name: "bundleName", ////当format为iife和umd时必须提供，将作为全局变量挂在window下
    globals: {
      lodash: "_",// 当引入lodash的时候 可以从全局变量_中引入
      jquery: "$",
    },
  },
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    resolve(),
    commonjs(),
    typescript(),
    postcss({
      extract: true,
      modules: true,
    }),
    terser(),
    serve({
      open: true,
      port: 8080,
      contentBase: "./dist",
    }),
  ],
  external: ['lodash', 'jquery'], //导入lodash忽略
}
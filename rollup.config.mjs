import postcss from 'rollup-plugin-postcss';  // 处理 CSS 导入
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import { defineConfig } from 'rollup';

export default defineConfig({
    input: 'src/action-flow-editor.tsx',
    output: [
        {
            file: 'dist/action-flow-editor.js',
            format: 'iife',
            name: 'FixedLayoutBundle',
        },
        {
            file: 'dist/action-flow-editor.min.js',
            format: 'iife',
            name: 'FixedLayoutBundle',
            plugins: [terser()]
        }
    ],
    plugins: [
        // 先处理 CSS 导入，避免后续插件报错
        postcss({
            extensions: ['.css'],
            extract: 'action-flow-editor.css',
            modules: false,
            minimize: true,
            sourceMap: true
        }),
        resolve({
            browser: true,
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'] // 添加 .css
        }),
        commonjs({
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }),
        typescript({
            tsconfig: './tsconfig.json',
            jsx: 'react-jsx',
            allowImportingTsExtensions: true // 允许导入 .tsx 扩展名
        }),
        babel({
            babelHelpers: 'bundled',
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            presets: [
                '@babel/preset-react',
                '@babel/preset-typescript'
            ]
        }),
    ],
});
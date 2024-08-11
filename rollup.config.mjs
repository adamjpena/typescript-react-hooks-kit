import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import path from 'path';
import fs from 'fs';

const hooksDir = path.resolve('src/hooks');

const hookFiles = fs
  .readdirSync(hooksDir)
  .filter((file) => file.endsWith('.ts'));

const configs = hookFiles.map((file) => ({
  input: path.join(hooksDir, file),
  output: {
    file: `dist/${path.basename(file, '.ts')}.js`,
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({ declaration: false }),
    terser(),
  ],
  external: ['react'],
}));

configs.push({
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [resolve(), commonjs(), typescript(), terser()],
  external: ['react'],
});

export default configs;

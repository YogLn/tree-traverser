import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
  input: 'index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.main,
      format: 'esm',
    },
  ],
  plugins: [
    typescript({
      outDir: 'dist',
      declaration: true,
      declarationDir: 'dist',
    }),
  ],
};

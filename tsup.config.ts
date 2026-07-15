import { defineConfig } from 'tsup';

const entries = [
  'src/index.ts',
  'src/hooks/useAsync.ts',
  'src/hooks/useDebounce.ts',
  'src/hooks/useFetch.ts',
  'src/hooks/useForm.ts',
  'src/hooks/useInterval.ts',
  'src/hooks/useLocalStorage.ts',
  'src/hooks/useMediaQuery.ts',
  'src/hooks/useOnClickOutside.ts',
  'src/hooks/usePrevious.ts',
  'src/hooks/useThrottle.ts',
  'src/hooks/useToggle.ts',
  'src/hooks/useWindowSize.ts',
];

export default defineConfig({
  entry: entries,
  clean: true,
  dts: false,
  external: ['react', 'react-dom'],
  format: ['esm', 'cjs'],
  outDir: 'dist',
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
  sourcemap: true,
  splitting: false,
  target: 'es2020',
  treeshake: true,
});

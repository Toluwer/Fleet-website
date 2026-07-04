import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        notFound: resolve(import.meta.dirname, '404.html')
      }
    }
  }
});

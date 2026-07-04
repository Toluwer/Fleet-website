import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        features: resolve(import.meta.dirname, 'features.html'),
        docs: resolve(import.meta.dirname, 'docs.html'),
        download: resolve(import.meta.dirname, 'download.html'),
        changelog: resolve(import.meta.dirname, 'changelog.html'),
        notFound: resolve(import.meta.dirname, '404.html')
      }
    }
  }
});


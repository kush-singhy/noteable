import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/books': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/book': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/delete': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/edit': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/search': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});

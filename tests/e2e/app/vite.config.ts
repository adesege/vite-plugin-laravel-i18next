import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import laravelI18nextPlugin from '../../../src';

export default defineConfig({
  plugins: [
    react(),
    laravelI18nextPlugin({
      laravelLangPath: path.resolve(__dirname, '../fixtures/lang'),
      outputPath: path.resolve(__dirname, 'src/locales'),
    }),
  ],
  root: __dirname,
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

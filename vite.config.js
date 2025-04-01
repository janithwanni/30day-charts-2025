import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '$data': path.resolve(__dirname, './data'),
      '$src': path.resolve(__dirname, './src'),
      '$comp': path.resolve(__dirname, './src/components')
    }
  },
	plugins: [tailwindcss(), sveltekit()],
  server: {
    port: 5175
  }
});

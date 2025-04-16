import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vite';
import VitePluginWebc from 'vite-plugin-webc';

export default defineConfig({
  build: {
    entry: resolve(__dirname, 'src/lib-main.js'),
    name: 'funkode-ui',
    fileName: 'funkode-ui',
  },
	plugins: [VitePluginWebc()],
});

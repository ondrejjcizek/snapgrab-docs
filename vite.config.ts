import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fantasticonPlugin from './plugins/fantasticonPlugin';
import sassGlobImports from 'vite-plugin-sass-glob-import';

export default defineConfig({
	plugins: [
		sveltekit(),
		fantasticonPlugin({
			inputDir: './src/icons',
			outputDir: './src/lib/styles/fantasticon'
		}),
		sassGlobImports()
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '' // Make sure this is empty to avoid redundant imports
			}
		}
	}
});

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fantasticonPlugin from './plugins/fantasticonPlugin';

export default defineConfig({
	plugins: [
		sveltekit(),
		fantasticonPlugin({
			inputDir: './src/icons',
			outputDir: './src/lib/styles/fantasticon'
		})
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import './src/lib/styles/global.scss';`
			}
		}
	}
});

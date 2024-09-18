import fs from 'fs'
import path, { resolve } from 'path'
import { createLogger, defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import mkcert from 'vite-plugin-mkcert'
import sassGlob from 'vite-plugin-sass-glob-import'
import { viteStaticCopy } from 'vite-plugin-static-copy'

import fantasticonPlugin from './plugins/fantasticonPlugin'
import postBuild from './plugins/postBuild'
import sharpPlugin from './plugins/sharpPlugin'

const customCodepoints = {
	'arrow-right': 0xf200,
	'arrow-left': 0xf201,
}

function customLogger() {
	const logger = createLogger()
	return {
		...logger,
		info(msg, options) {
			if (msg.includes('Collected')) {
				return
			}
			if (msg.includes('iconfont')) {
				return
			}
			if (msg.includes('page reload')) {
				return
			}
			logger.info(msg, options)
		},
	}
}

const metadata = JSON.parse(fs.readFileSync(resolve(__dirname, './src/_metadata.json')))
const fileNameList = fs.readdirSync(resolve(__dirname, './src/'))
const htmlFileList = fileNameList.filter(file => /.html$/.test(file))
const inputFiles = htmlFileList.reduce((acc, file) => {
	acc[file.slice(0, -5)] = resolve(__dirname, './src', file)
	return acc
}, {})

function handleSpecificLine(filePath, lineToRemove) {
	let originalContent = ''

	return {
		name: 'handle-specific-line',
		apply: 'build',
		buildStart() {
			const fullPath = resolve(__dirname, filePath)
			originalContent = fs.readFileSync(fullPath, 'utf8')
			let content = originalContent.split('\n').filter(line => line.trim() !== lineToRemove)
			fs.writeFileSync(fullPath, content.join('\n'), 'utf8')
			console.log(`Removed @import 'kit/**/*' from ${filePath}`)
		},
		closeBundle() {
			const fullPath = resolve(__dirname, filePath)
			fs.writeFileSync(fullPath, `${originalContent}`, 'utf8')
			console.log(`Restored @import 'kit/**/*' to ${filePath}`)
		},
	}
}

export default defineConfig(({ mode }) => {
	const plugins = [
		sassGlob(),
		viteStaticCopy({
			targets: [
				{
					src: 'img/favicon/android-chrome-192x192.png',
					dest: './assets/other',
				},
				{
					src: 'img/favicon/android-chrome-512x512.png',
					dest: './assets/other',
				},
			],
		}),
		handleSpecificLine('src/css/main.scss', `@import 'kit/**/*'`),
		mkcert(),
		handlebars({
			partialDirectory: resolve(__dirname, './src/_partials'),
			context(pagePath) {
				return metadata[pagePath]
			},
		}),
		fantasticonPlugin({
			codepoints: customCodepoints,
			normalize: true,
		}),
		sharpPlugin(),
		postBuild(),
	]

	return {
		define: {
			__DEV__: mode === 'development'
		},
		server: {
			host: true,
		},
		publicDir: 'public',
		root: 'src',
		css: {
			devSourcemap: true,
			preprocessorOptions: {
				scss: {
					api: 'modern',
				},
			}
		},
		build: {
			manifest: false,
			outDir: '../build',
			rollupOptions: {
				external: source => {
					return mode === 'production' && source.includes('js/components/_')
				},
				output: {
					assetFileNames: assetInfo => {
						let extType = assetInfo.name.split('.').pop()
						if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
							extType = 'fonts'
						} else if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
							extType = 'img'
						} else if (/css/i.test(extType)) {
							extType = 'css'
						} else {
							extType = 'other'
						}
						return `assets/${extType}/[name][extname]`
					},
					chunkFileNames: 'assets/js/[name].js',
					manualChunks(id) {
						if (id.includes(path.resolve(__dirname, 'src/components'))) {
							const name = path.basename(id).split('.')[0]
							return `component-${name}`
						}
					},
				},
				input: inputFiles,
			},
			cssCodeSplit: false,
			minify: true
		},
		plugins: plugins,
		customLogger: customLogger(),
	}
})

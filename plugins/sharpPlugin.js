import { createFilter } from '@rollup/pluginutils'
import path from 'path'
import sharp from 'sharp'
import { loadConfig, optimize } from 'svgo'

export default function sharpPlugin(options = {}) {
	const filter = createFilter(options.include || ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg'], options.exclude)

	const excludePatterns = [
		/\/og\.png$/, // Match "og.png" anywhere in the path
		/\/favicon/,
		/\/apple-touch/,
		/\/android-chrome/,
	]

	return {
		name: 'vite-plugin-sharp',
		apply: 'build',
		async generateBundle(options, bundle) {
			const files = Object.keys(bundle).filter(filter)

			for (const file of files) {

				const asset = bundle[file]
				const inputBuffer = asset.source
				const basename = path.basename(file)

				// Check if the file should be excluded
				if (excludePatterns.some(pattern => pattern.test(file) || pattern.test(basename))) {
					continue // Skip to the next file
				}

				const extname = path.extname(file).toLowerCase()

				if (extname === '.jpg' || extname === '.jpeg' || extname === '.png') {
					await handleRasterImages(file, extname, inputBuffer, asset, bundle)
				} else if (extname === '.svg') {					
					await handleSVG(file, inputBuffer, asset, bundle)
				}
			}
		},
	}
}

async function handleRasterImages(file, extname, inputBuffer, asset, bundle) {
	let webpOutputBuffer
	let originalOutputBuffer
	let newFileName

	if (extname === '.jpg' || extname === '.jpeg') {
		originalOutputBuffer = await sharp(inputBuffer)
			.jpeg({ quality: 75 })
			.toBuffer()
		webpOutputBuffer = await sharp(inputBuffer)
			.webp({ quality: 75 })
			.toBuffer()
		newFileName = file.replace(/\.(jpg|jpeg)$/i, '.webp')
	} else if (extname === '.png') {
		originalOutputBuffer = await sharp(inputBuffer)
			.png({ compressionLevel: 6 })
			.toBuffer()
		webpOutputBuffer = await sharp(inputBuffer)
			.webp({ quality: 75 })
			.toBuffer()
		newFileName = file.replace(/\.png$/i, '.webp')
	}

	if (originalOutputBuffer) {
		asset.source = originalOutputBuffer
	}

	if (newFileName && webpOutputBuffer) {
		bundle[newFileName] = {
			fileName: newFileName,
			source: Buffer.from(webpOutputBuffer),
			type: 'asset',
		}
	}

}

async function handleSVG(file, inputBuffer, asset, bundle) {
	const config = await loadConfig() // Load default SVGO config or specify your own
	const result = await optimize(inputBuffer.toString(), { ...config })

	if (result.data) {
		const newFileName = `assets/img/${path.basename(file)}`
		bundle[newFileName] = {
			fileName: newFileName,
			source: Buffer.from(result.data),
			type: 'asset',
		}
	}
}

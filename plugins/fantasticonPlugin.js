import chokidar from 'chokidar'
import crypto from 'crypto'
import { generateFonts } from 'fantasticon'
import fs from 'fs-extra'
import path from 'path'

const generateFileHash = (filePath) => {
	const fileBuffer = fs.readFileSync(filePath)
	const hashSum = crypto.createHash('md5')
	hashSum.update(fileBuffer)
	return hashSum.digest('hex')
}

export default function fantasticonPlugin(options = {}) {
	const sourceDir = options.inputDir || path.resolve(__dirname, '../src/icons')
	const outputDir = options.outputDir || path.resolve(__dirname, '../src/css/fantasticon')
	const codepoints = {
		'arrow-right': 0xf200,
	}

	let fileHashes = new Map()

	const generate = async (files = []) => {
		if (files.length === 0) {
			files = fs.readdirSync(sourceDir).map(file => path.join(sourceDir, file))
		}

		const updatedFiles = files.filter(file => {
			const hash = generateFileHash(file)
			if (!fileHashes.has(file) || fileHashes.get(file) !== hash) {
				fileHashes.set(file, hash)
				return true
			}
			return false
		})

		if (updatedFiles.length > 0) {
			await generateFonts({
				inputDir: sourceDir,
				outputDir: outputDir,
				fontTypes: options.fontTypes || ['woff', 'woff2', 'svg'],
				assetTypes: options.assetTypes || ['css', 'html'],
				name: options.name || 'fantasticon',
				prefix: 'icon',
				codepoints: codepoints,
				...options,
			})
			// console.log('Fonts generated successfully.')
		}
	}

	return {
		name: 'vite-plugin-fantasticon',
		async buildStart() {
			try {
				if (!fs.existsSync(outputDir)) {
					fs.mkdirSync(outputDir, { recursive: true })
				}
				const files = fs.readdirSync(sourceDir).map(file => path.join(sourceDir, file))
				await generate(files)
				if (process.env.NODE_ENV !== 'production') {
					const watcher = chokidar.watch(`${sourceDir}/*.svg`, { persistent: true })
					watcher.on('add', file => {
						// console.log(`File added: ${file}`)
						generate([file])
					})
					watcher.on('change', file => {
						console.log(`File changed: ${file}`)
						generate([file])
					})
					watcher.on('unlink', async file => {
						console.log(`File removed: ${file}`)
						fileHashes.delete(file)
						await generate()
					})
				}
			} catch (error) {
				console.error('Error during buildStart:', error)
			}
		},
		configureServer(server) {
			const watcher = chokidar.watch(`${sourceDir}/*.svg`, { persistent: true })
			watcher.on('add', file => {
				// console.log(`File added: ${file}`)
				generate([file]).then(() => server.ws.send({ type: 'full-reload', path: '*' }))
			})
			watcher.on('change', file => {
				console.log(`File changed: ${file}`)
				generate([file]).then(() => server.ws.send({ type: 'full-reload', path: '*' }))
			})
			watcher.on('unlink', async file => {
				console.log(`File removed: ${file}`)
				fileHashes.delete(file)
				await generate()
				server.ws.send({ type: 'full-reload', path: '*' })
			})
		}
	}
}

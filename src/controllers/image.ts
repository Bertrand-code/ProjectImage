import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import ImageProcessor from '../services/image'

export class ImageController {
	async getImage(req: Request, res: Response, next: NextFunction) {
		const { filename, height, width } = req.query
		const image = fs.readFileSync(path.join(__dirname, '../assets/images', filename + '.jpg'))
		const processedImage = await ImageProcessor.resize(image, Number(height), Number(width))
		await ImageProcessor.toFile(processedImage, filename + '_' + height + 'x' + width)
		res.setHeader('Content-Type', 'image/jpeg')
		res.send(processedImage)
		next()
	}
}

export default new ImageController()

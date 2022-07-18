import fs from 'fs'
import { NextFunction, Request, Response } from 'express'
import path from 'path'

export const queryValidator = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { filename, height, width } = req.query
		if (!filename || !height || !width) {
			next('Incorrect request')
			return
		}
		if ([height, width].some((item) => isNaN(Number(item)))) next('Incorrect request')
		if (Number(width) > 1000 || Number(height) > 1000 || Number(width) < 100 || Number(height) < 100)
			next('Incorrect request')

		const filepath = path.join(__dirname, '../assets/images', filename + '.jpg')
		if (!fs.existsSync(filepath)) next('File not found')
		next()
	} catch (error) {
		if (error instanceof Error) next(error.message)
		console.log(error)
	}
}
export const cachedValidator = (req: Request, res: Response, next: NextFunction) => {
	const { filename, height, width } = req.query
	const filepath = path.join(__dirname, '../assets/thumbs', filename + '_' + height + 'x' + width + '.jpg')
	if (fs.existsSync(filepath)) {
		res.setHeader('Content-Type', 'image/jpeg')
		res.sendFile(filepath)
		return
	}
	next()
}

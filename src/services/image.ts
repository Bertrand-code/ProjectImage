import path from 'path'
import sharp from 'sharp'
export class ImageProcessor {
	resize(image: Buffer, width: number, height: number): Promise<Buffer> {
		return sharp(image).resize(width, height).toBuffer()
	}
	toFile(image: Buffer, filename: string) {
		return sharp(image).toFile(path.join(__dirname, '../assets/thumbs', filename + '.jpg'))
	}
}
export default new ImageProcessor()

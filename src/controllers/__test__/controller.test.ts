import { Request, Response } from 'express'
import ImageController from '../image'

describe('image controller', () => {
	const req = {
		query: {
			filename: 'messi',
			height: 100,
			width: 100,
		},
	} as unknown as Request
	const res = {} as unknown as Response
	res.setHeader = jest.fn()
	res.send = jest.fn()
	const next = jest.fn()
	afterEach(() => {
		jest.clearAllMocks()
	})
	it('should return processed image', async () => {
		await ImageController.getImage(req, res, next)
		expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'image/jpeg')
		expect(res.send).toHaveBeenCalled()
		expect(res.send).toHaveBeenCalledWith(expect.any(Buffer))
		expect(next).toHaveBeenCalled()
	})
})

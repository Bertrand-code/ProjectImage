import { Request, Response } from 'express'
import { cachedValidator, queryValidator } from '../validator'

describe('middleware', () => {
	const req = {
		query: {
			filename: 'messi',
			height: 100,
			width: 100,
		},
	} as unknown as Request
	const res = {} as unknown as Response
	res.setHeader = jest.fn()
	res.sendFile = jest.fn()
	const next = jest.fn()
	afterEach(() => {
		jest.clearAllMocks()
	})
	it('should check and return cached image', async () => {
		await cachedValidator(req, res, next)
		expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'image/jpeg')
		expect(next).not.toHaveBeenCalled()
	})

	it('should call next', async () => {
		req.query.filename = 'test'
		await cachedValidator(req, res, next)
		expect(res.setHeader).not.toHaveBeenCalled()
		expect(res.sendFile).not.toHaveBeenCalled()
		expect(next).toBeCalled()
	})
	it('should call next after checking', async () => {
		await queryValidator(req, res, next)
		expect(next).toBeCalled()
	})

	it('should not call next after checking', async () => {
		delete req.query.filename
		await queryValidator(req, res, next)
		expect(next).toBeCalledWith('Incorrect request')
	})

	it('should check height and width', async () => {
		req.query.height = '50'
		await queryValidator(req, res, next)
		expect(next).toBeCalledWith('Incorrect request')
		req.query.height = '1000'
		await queryValidator(req, res, next)
		expect(next).toBeCalledWith('Incorrect request')
		req.query.height = '100'
		req.query.width = '50'
		await queryValidator(req, res, next)
		expect(next).toBeCalled()
	})
})

import request from 'supertest'
import app from '../../server'

describe('routes', () => {
	it('should return a 200 status code', async () => {
		await request(app)
			.get('/image')
			.query({ filename: 'messi', height: 100, width: 100 })
			.expect(200)
			.expect('Content-Type', 'image/jpeg')
	})
	it('should return a 500 status code if file doesnt exist', async () => {
		await request(app)
			.get('/image')
			.query({ filename: 'test', height: 100, width: 100 })
			.expect(500)
			.expect((res) => {
				expect(res.body.error).toBeUndefined()
			})
	})
})

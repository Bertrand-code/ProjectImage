import app from './server'
const PORT = 4000
app.get('/', (req, res) => {
	res.status(200).send('server is running')
})
app.listen(PORT, (): void => console.log(`running on port ${PORT}`))

export default app

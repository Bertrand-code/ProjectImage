import express from 'express'
import router from './routes/image'
const app = express()
app.use('/image', router)
export default app

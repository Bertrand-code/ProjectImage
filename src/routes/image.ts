import { Router } from 'express'
import ImageController from '../controllers/image'
import { cachedValidator, queryValidator } from '../middleware/validator'

const router = Router()
router.get('/', queryValidator, cachedValidator, ImageController.getImage)

export default router

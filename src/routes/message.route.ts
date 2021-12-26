import { Router } from 'express'
import messageController from '../controllers/message.controller'
import AuthMiddleware from '../middlewares/auth.middleware'

const router = Router()

router.post('/:id', AuthMiddleware.authorizeUserByParams, AuthMiddleware.authorizeUserByToken, messageController.send)

export default router
import { Router } from 'express'
import userController from '../controllers/user.controller'
import AuthMiddleware from '../middlewares/auth.middleware'

const router = Router()

router.post('/register', userController.register)

router.post('/login', userController.authenticate)

router.get('/:id', AuthMiddleware.authorizeUserByParams, AuthMiddleware.authorizeUserByToken, userController.getById)
router.get('/', AuthMiddleware.authorizeUserByToken, userController.list)

export default router
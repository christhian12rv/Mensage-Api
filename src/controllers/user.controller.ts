import { Request, Response } from 'express'
import UserModel from '../models/user.model'
import MessageModel from '../models/message.model'
import messageService from '../services/message.service'

class UserController {
    public async register(req: Request, res: Response): Promise<Response> {
        const user = await UserModel.create(req.body)
        const response = {
            message: "Usuário cadastrado com sucesso!",
            _id: user._id,
            name: user.name
        }
        return res.json(response)
    }

    public async authenticate(req: Request, res: Response): Promise<Response> {
        const { name, password } = req.body

        const user = await UserModel.findOne({ name })
        if (!user)
            return res.status(400).send({ message: 'Usuário não encontrado' })

        const validPassword = await user.comparePasswords(password)
        if (!validPassword)
            return res.status(400).send({ message: 'Senha incorreta' })

        return res.json({
            user,
            token: user.generateToken()
        })
    }
    public getById(req: Request, res: Response): Response {
        return res.json(req.userReceiver)
    }

    public async list(req: Request, res: Response): Promise<Response> {
        const userLoggedId = req.user._id

        const users = await UserModel.find({ _id: { $ne: userLoggedId } })

        const userMessage = await Promise.all(users.map(async (user) => {
            const messages = await MessageModel.findChat(userLoggedId, String(user._id)).sort({ 'createdAt': -1 }).limit(1)
            return messageService.getUserMessage(user, messages)
        }))

        const userMessageOrdened = messageService.orderUserMessage(userMessage)

        return res.json(userMessageOrdened)
    }
}

export default new UserController
import { Request, Response } from 'express'
import UserModel from '../models/user.model'

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
}

export default new UserController
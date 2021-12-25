import { Request, Response } from 'express'
import userModel from '../models/User.model'

class UserController {
    public async register(req: Request, res: Response): Promise<Response> {
        const user = await userModel.create(req.body)
        const response = {
            message: "Usuário cadastrado com sucesso!",
            _id: user._id,
            name: user.name
        }
        return res.json(response)
    }
}

export default new UserController
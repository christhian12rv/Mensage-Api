import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { UserInterface } from "../interfaces/user.interface"
import UserModel from "../models/user.model"

class AuthMiddleware {

    public async authorizeUserByToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const token = req.query.token || req.headers['x-access-token']

        if (!token)
            return res.status(401).send({ message: 'Acesso restrito' })

        try {
            const userToken = jwt.verify(String(token), 'TBMePKqb1c') as UserInterface
            const user = await UserModel.findById(userToken['_id'])

            if (!user)
                return res.status(400).send({ message: 'Usuário inválido' })

            req.user = user

            return next()
        } catch (error) {
            return res.status(401).send({ message: 'Token inválido' })
        }
    }

    public async authorizeUserByParams(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const user = await UserModel.findById(req.params.id)

            if (!user)
                return res.status(400).send({ message: 'Usuário inválido' })

            req.userChat = user

            return next()
        } catch (error) {
            return res.status(401).send({ message: 'Usuário inválido' })
        }
    }
}

export default new AuthMiddleware()
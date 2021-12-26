import { Request, Response } from "express"
import MessageModel from "../models/message.model"

class MessageController {
    public async send(req: Request, res: Response): Promise<Response> {
        const message = await MessageModel.create({
            text: req.body.text,
            sender: req.user._id,
            receiver: req.userChat._id
        })

        return res.json(message)
    }

    public async list(req: Request, res: Response): Promise<Response> {

    }
}

export default new MessageController
import { Request, Response } from "express"
import MessageModel from "../models/message.model"

class MessageController {
    public async send(req: Request, res: Response): Promise<Response> {
        const message = await MessageModel.create({
            text: req.body.text,
            sender: req.user._id,
            receiver: req.userReceiver._id
        })

        return res.json(message)
    }

    public async list(req: Request, res: Response): Promise<Response> {
        const userId = req.user._id
        const userReceiverId = req.userReceiver._id

        const messages = await MessageModel.findChat(userId, userReceiverId).sort({ 'createdAt': 1 })

        const messagesChat = messages.map((message) => {
            return {
                text: message.text,
                isReceiver: message.receiver == String(userReceiverId),
                createdAt: message.createdAt
            }
        })

        return res.json(messagesChat);
    }
}

export default new MessageController
import { Schema, model, Model, Document } from 'mongoose'
import { MessageInterface } from '../interfaces/message.interface'

interface MessageModel extends MessageInterface, Document { }

interface MessageStatic extends Model<MessageModel> {
    findChat(userId: string, userReceiverId: string): Promise<Array<MessageModel>>
}

const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

messageSchema.statics.findChat = function (userId: string, userReceiverId: string): Promise<Array<MessageModel>> {
    return this.find({
        $or: [
            { $and: [{ sender: userId }, { receiver: userReceiverId }] },
            { $and: [{ sender: userReceiverId }, { receiver: userId }] }
        ]
    })
}

export default model<MessageModel, MessageStatic>('Message', messageSchema)
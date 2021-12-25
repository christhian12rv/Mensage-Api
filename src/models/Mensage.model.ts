import { Schema, model } from 'mongoose'

const mensageSchema = new Schema({
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

export default model('Mensage', mensageSchema)
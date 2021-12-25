import { Schema, model, Document } from 'mongoose'
import { UserInterface } from '../interfaces/user.interface'

//interface UserModel extends UserInterface, Document { }

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
})

export default model('User', userSchema)
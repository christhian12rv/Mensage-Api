import { Schema, model, Document, ObjectId } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserInterface } from '../interfaces/user.interface'

interface UserModel extends UserInterface, Document {
    _id: ObjectId
    comparePasswords(password: string): Promise<boolean>
    generateToken(): string
}

const UserSchema = new Schema({
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

UserSchema.pre('save', async function encryptPassword() {
    this.password = await bcrypt.hash(this.password, 8)

})

UserSchema.pre('save', function generateAvatar() {
    const randomId = Math.floor(Math.random() * (1000000)) + 1
    this.avatar = `https://avatars.dicebear.com/api/identicon/${randomId}.svg`
})

UserSchema.methods.comparePasswords = function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
}

UserSchema.methods.generateToken = function (): string {
    const decodedToken = {
        _id: String(this._id),
        name: this.name,
        avatar: this.avatar
    }

    return jwt.sign(decodedToken, 'TBMePKqb1c', {
        expiresIn: '1d'
    })
}

export default model<UserModel>('User', UserSchema)
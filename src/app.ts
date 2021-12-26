import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import messageRoute from './routes/message.route'
import userRoute from './routes/user.route'

export class App {
    private express: express.Application
    private port = 9000

    constructor() {
        this.express = express()
        this.database()
        this.middlewares()
        this.routes()
        this.listen()
    }

    public getApp(): express.Application {
        return this.express
    }

    private database(): void {
        mongoose.connect('mongodb://localhost/curso_nodejs_typescript', (error) => {
            if (!error)
                console.log('Conectado ao MongoDB')
        })
    }

    private middlewares(): void {
        this.express.use(express.json())
        this.express.use(cors())
    }

    private routes(): void {
        this.express.use('/messages', messageRoute)
        this.express.use('/users', userRoute)
    }

    private listen(): void {
        this.express.listen(this.port, () => {
            console.log(`Servidor iniciado na porta ${this.port}`)
        })
    }
}
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

export class App {
    private express: express.Application
    private port = 9000

    constructor() {
        this.express = express()
        this.listen()
        this.middlewares()
        this.database()
    }

    public getApp(): express.Application {
        return this.express
    }

    private middlewares(): void {
        this.express.use(express.json())
        this.express.use(cors())
    }

    private listen(): void {
        this.express.listen(this.port, () => {
            console.log(`Servidor iniciado na porta ${this.port}`)
        })
    }

    private database(): void {
        mongoose.connect('mongodb://localhost/curso_nodejs_typescript')
    }
}
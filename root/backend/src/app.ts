import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import http from 'http';
import socketio from 'socket.io';

import messageRoute from './routes/message.route'
import userRoute from './routes/user.route'

const users = []

export class App {
    private express: express.Application
    private port = 5000
    private httpServer
    private io

    constructor() {
        this.express = express()
        this.database()
        this.middlewares()
        this.routes()
        this.sockets()
        this.ioConnection()
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

    private sockets(): void {
        this.httpServer = http.createServer(this.express);
        this.io = new socketio.Server(this.httpServer);
    }

    private ioConnection(): void {
        this.io.on('connection', (socket) => {
            this.io.emit('connection', socket.id)

            socket.on('connected', (userId, socketId) => {
                if (!(userId in users['userId']))
                    users.push({ userId, socketId })
                console.log(users)
            })
        });
    }

    private listen(): void {
        this.httpServer.listen(this.port, () => {
            console.log(`Servidor iniciado na porta ${this.port}`)
        })
    }

}
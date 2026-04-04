import dotenv from 'dotenv/config'
import http from 'http'
import { connectDB } from './src/config/db.js'
import app from './src/app.js'
import { initSocket } from "./src/sockets/server.socket.js"


const PORT = process.env._PORT || 8000

const httpServer = http.createServer(app)
initSocket(httpServer)
connectDB().then(() => {
    httpServer.listen(PORT, () => {
        console.log("server is running on the port ", PORT)
    })
}).catch((err) => {
    console.log("something went wrong while connecting with the server ", err.message)
})



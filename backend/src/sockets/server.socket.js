import { Server } from "socket.io"

let io

export const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    })
    console.log("socket io server is running")
    io.on("connection", (socket) => {
        console.log(" user is connected to socket server " + socket.id)
    })

}

export const getIO = () => {
    if (!io) {
        throw new Error("io is not init")
    }

    return io

}
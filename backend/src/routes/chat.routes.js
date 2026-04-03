import { Router } from "express";
import { authUser } from '../middleware/verify.user.middleware.js'
import { chatController } from '../controllers/chat.controller.js'

const chatRoutes = Router()

chatRoutes.post("/message", authUser, chatController.sendMessage)


export default chatRoutes
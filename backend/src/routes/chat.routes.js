import { Router } from "express";
import { authUser } from '../middleware/verify.user.middleware.js'
import { chatController } from '../controllers/chat.controller.js'

const chatRoutes = Router()

chatRoutes.post("/message", authUser, chatController.sendMessage)
chatRoutes.get("/", authUser, chatController.getAllChats)
chatRoutes.get("/messages/:chatID", authUser, chatController.getChatMessages)
chatRoutes.get("/delete/:chatID", authUser, chatController.deleteChat)
chatRoutes.post("/export-as-pdf", authUser, chatController.getPdf)


export default chatRoutes
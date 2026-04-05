
import { generateResponse, generateChatTittle } from "../services/ai.service.js"
import ApiResponse from "../utils/ApiResponse.js"
import chatModel from "../models/chat.model.js"
import messageModel from '../models/message.model.js'

const sendMessage = async (req, res) => {
    const { message } = req.body

    const title = await generateChatTittle(message)
    const result = await generateResponse(message)

    const chat = await chatModel.create({
        user: req.user._id,
        tittle: title
    })
    const messages = await messageModel.create({
        chat: chat._id,
        content: result,
        role: "ai"
    })

    res.status(201).json(new ApiResponse(201, { chat, response: messages }))

}

export const chatController = {
    sendMessage
}
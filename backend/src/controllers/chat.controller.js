
import { generateResponse, generateChatTittle } from "../services/ai.service.js"
import ApiResponse from "../utils/ApiResponse.js"
import chatModel from "../models/chat.model.js"
import messageModel from '../models/message.model.js'

const sendMessage = async (req, res) => {
    const { message, chat: chatID } = req.body

    let tittle = null, chat = null

    if (!chatID) {
        tittle = await generateChatTittle(message)
        chat = await chatModel.create({
            user: req.user._id,
            tittle
        })

    }
    const userMessage = await messageModel.create({
        chat: chatID || chat._id,
        content: message,
        role: "user"

    })
    const allMessages = await messageModel.find({ chat: chatID || chat._id })


    const result = await generateResponse(allMessages)
    const aiResponse = await messageModel.create({
        chat: chatID || chat._id,
        content: result,
        role: "ai"
    })




    res.status(201).json(new ApiResponse(201, { chat: userMessage, response: aiResponse }))

}

export const chatController = {
    sendMessage
}
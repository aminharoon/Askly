
import { generateResponse, generateChatTittle } from "../services/ai.service.js"
import ApiResponse from "../utils/ApiResponse.js"
import chatModel from "../models/chat.model.js"
import messageModel from '../models/message.model.js'
import ApiError from "../utils/ApiError.js"

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

const getAllChats = async (req, res) => {

    const chats = await chatModel.find(
        { user: req.user._id }
    )

    res.status(200).json(new ApiResponse(200, chats))

}



const getChatMessages = async (req, res) => {
    const { chatID } = req.params
    const chat = await chatModel.findOne({
        _id: chatID,
        user: req.user._id

    })
    if (!chat) {
        return res.status(404).json(new ApiError(404, "something went wrong chat not found "))
    }
    const messages = await messageModel.find({ chat: chatID })

    res.status(200).json(new ApiResponse(200, messages))
}

const deleteChat = async (req, res) => {
    const { chatID } = req.params


    const chat = await chatModel.findOneAndDelete({
        _id: chatID,
        user: req.user._id
    })

    if (!chat) {
        throw new ApiError(404, "chat not found ")
    }
    const message = await messageModel.deleteMany({
        chat: chatID
    })
    res.status(200).json(new ApiResponse(200, "chat has been deleted successfully "))

}
export const chatController = {
    sendMessage,
    getAllChats,
    getChatMessages,
    deleteChat
}
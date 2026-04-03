
import { generateResponse, generateChatTittle } from "../services/ai.service.js"
import ApiResponse from "../utils/ApiResponse.js"
const sendMessage = async (req, res) => {
    const { message } = req.body

    const title = await generateChatTittle(message)
    const result = await generateResponse(message)

    res.status(200).json(new ApiResponse(200, { title, result: "" }))

}

export const chatController = {
    sendMessage

}
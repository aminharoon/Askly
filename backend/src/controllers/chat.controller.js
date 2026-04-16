
import { generateResponse, generateChatTittle } from "../services/ai.service.js"
import ApiResponse from "../utils/ApiResponse.js"
import chatModel from "../models/chat.model.js"
import messageModel from '../models/message.model.js'
import ApiError from "../utils/ApiError.js"
import { marked } from "marked"
import puppeteer from "puppeteer"

const sendMessage = async (req, res) => {
    const { message, chat: chatID } = req.body

    let chat = null

    if (!chatID) {
        const title = await generateChatTittle(message)
        chat = await chatModel.create({
            user: req.user._id,
            tittle: title
        })
    } else {
        chat = await chatModel.findOne({
            _id: chatID,
            user: req.user._id
        })

        if (!chat) {
            throw new ApiError(404, "chat not found")
        }
    }

    const userMessage = await messageModel.create({
        chat: chat._id,
        content: message,
        role: "user"

    })
    const allMessages = await messageModel.find({ chat: chat._id })

    const result = await generateResponse(allMessages)
    const aiResponse = await messageModel.create({
        chat: chat._id,
        content: result,
        role: "ai"
    })

    res.status(201).json(
        new ApiResponse(201, "success", { chat, userMessage, response: aiResponse })
    )

}

const getAllChats = async (req, res) => {

    const chats = await chatModel.find(
        { user: req.user._id }
    )

    res.status(200).json(new ApiResponse(200, "success", { chats }))

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

    res.status(200).json(new ApiResponse(200, "success", { messages }))
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
const getPdf = async (req, res) => {
    const { content } = req.body

    const htmlContent = marked(content)

    const fullHtml = `
    <html>
      <head>
        <style>
          body { font-family: Arial; padding: 30px; line-height: 1.6; }
          h1,h2,h3 { margin-top: 20px; }
          pre { background: #0f172a; color: white; padding: 15px; border-radius: 10px; }
          code { background: #f5f5f5; padding: 4px 6px; border-radius: 6px; }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;

    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage()
    await page.setContent(fullHtml, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true })

    await browser.close()

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=response.pdf"
    });

    res.end(pdfBuffer);


}
export const chatController = {
    sendMessage,
    getAllChats,
    getChatMessages,
    deleteChat,
    getPdf
}
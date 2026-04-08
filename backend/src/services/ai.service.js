import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, tool, createAgent, AIMessage } from 'langchain'
import { sendEmail } from "./mail.service.js";
import * as z from 'zod'
import ApiError from '../utils/ApiError.js'


/**
 * define some tools like email and real time data fetching useing tavi    
 */
const emailTool = tool(sendEmail, {
    name: "emailTool",
    description: "Use this tool to send emails",
    schema: z.object({
        to: z.string().describe("email of the receiver"),
        subject: z.string().describe("subject of the email"),

        html: z.string().describe("html content of the email"),
    })
})
const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    // model: "gemini-2.5-flash",


    apiKey: process.env.GEMINI_API_KEY
})

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API
});

const agent = createAgent({
    model: geminiModel,
    tools: [emailTool]
})
export const generateResponse = async (messages) => {


    const response = await mistralModel.invoke(messages.map(msg => {
        if (msg.role == "user") { return new HumanMessage(msg.content) }
        else if (msg.role == "ai") {
            return new AIMessage(msg.content)
        }
    }))

    return response.content


}
export const generateChatTittle = async (message) => {
    const response = await mistralModel.invoke([
        new SystemMessage("You are a helpful assistant that generates concise and descriptive chat titles based on the content of the conversation.user will provide you with the content of the conversation and you will generate a suitable title for it in less than 5 words."),
        new HumanMessage(`generate a concise and descriptive title for the following conversation: ${message}`)
    ])

    return response.text
}



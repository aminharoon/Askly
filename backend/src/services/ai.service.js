import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, tool, createAgent, AIMessage } from 'langchain'
import { sendEmail } from "./mail.service.js";
import * as z from 'zod'
import { getLatestData } from "./realTime.search.js"




const emailTool = tool(sendEmail, {
    name: "emailTool",
    description: "Use this tool to send emails",
    schema: z.object({
        to: z.string().describe("email of the receiver"),
        subject: z.string().describe("subject of the email"),

        html: z.string().describe("html content of the email"),
    })
})

const searchInterNetTool = tool(
    getLatestData, {
    name: "searchInterNetTool",
    description: "Use this tool to fetch the latest data on a given topic from the internet using tavily",
    schema: z.object({
        message: z.string().describe("the message or topic to search for")
    })

}
)

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash-lite",


    apiKey: process.env.GEMINI_API_KEY
})




const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API
});

const agent = createAgent({
    model: geminiModel,
    tools: [searchInterNetTool, emailTool]
})


export const generateResponse = async (messages) => {


    const response = await agent.invoke({
        messages: [
            new SystemMessage(`
You are Perplexxity — an intelligent AI assistant with access to real-time web search and email tools.

## STRICT RULES YOU MUST FOLLOW:

1. **ALWAYS use tools first** — never answer from your own knowledge directly.
2. For ANY question about current events, news, facts, data, prices, people, or anything time-sensitive → ALWAYS call searchInterNetTool first.
3. For ANY request to send an email → ALWAYS call emailTool.
4. **Only respond from your own knowledge if:**
   - The tool call fails or returns no useful result
   - The question is purely conversational (e.g., "how are you?")

## BEHAVIOR:

- If the user asks "what is today's date?" → use searchInterNetTool
- If the user asks "send an email to X" → use emailTool
- If search returns results → summarize them clearly and concisely
- If search fails → say "I couldn't fetch real-time data, but based on my knowledge: ..." and answer from your training
- Never say "I don't have access to the internet" — you do, via searchInterNetTool
- Never make up facts — always search first

## RESPONSE STYLE:
- Be concise, clear, and informative
- Use bullet points for lists
- Cite what you found from the search when relevant
`),
            ...(messages.map(msg => {
                if (msg.role == "user") {
                    return new HumanMessage(msg.content)
                } if (msg.role == "ai") {

                    return new AIMessage(msg.content)
                }
                return null

            }
            ).filter(Boolean))]
    })

    return response.messages[response.messages.length - 1].content


}



export const generateChatTittle = async (message) => {
    const response = await mistralModel.invoke([
        new SystemMessage("You are a helpful assistant that generates concise and descriptive chat titles based on the content of the conversation.user will provide you with the content of the conversation and you will generate a suitable title for it in less than 5 words."),
        new HumanMessage(`generate a concise and descriptive title for the following conversation: ${message}`)
    ])

    return response.text
}



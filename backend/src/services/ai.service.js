import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
})

export const testAi = async () => {
    try {
        model.invoke("what is AI explain in 100 woreds").then((res) => {
            console.log(res.text)
        })
    } catch (e) {
        console.log("something went wrong while generating an response ", e.message)

    }
}
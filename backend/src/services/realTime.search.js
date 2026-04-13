import { tavily } from "@tavily/core"


const tavi = tavily(
    { apiKey: process.env.TAVALI_API }
)
// export const getLatestData = async ({ message }) => {
//     console.log("🔍 Tool called with:", message)
//     try {
//         const response = await tavi.search(message, {
//             maxResults: 5,
//             searchDepth: "fast"
//         })


//         return JSON.stringify(response)
//     } catch (e) {
//         console.log(`something went wrong white getting the real time data ${e.message}`)

//     }
// }
export const getLatestData = async ({ message }) => {
    console.log("🔍 Tool called with:", message)
    try {
        const response = await tavi.search(message, {
            maxResults: 5,
            searchDepth: "advanced"
        })

        const results = response.results.map((r, i) =>
            `${i + 1}. ${r.title}\n${r.content}\nSource: ${r.url}`
        ).join("\n\n")

        return `Search results for "${message}":\n\n${results}`

    } catch (e) {
        console.log(`Search failed: ${e.message}`)
        return `Search failed: ${e.message}`
    }
}
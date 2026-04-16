const baseURI = `http://localhost:3000/api/chats`

export const sendMessage = async ({ message, chatId }) => {
    try {
        const res = await fetch(`${baseURI}/message`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, chat: chatId })

        })
        if (!res.ok) {
            const err = await res.json().catch(() => { })
            throw new Error(err.message || `something went wrong ${res.status}`)
        }
        const response = await res.json()
        return response.data


    } catch (e) {
        throw new Error(`something went wrong ${e.message}`)

    }

}

export const getChats = async () => {
    try {
        const res = await fetch(`${baseURI}/`, {
            method: "GET",
            credentials: "include",

        })
        const response = await res.json()
        return response.data
    } catch (e) {
        console.log(`something went wrong ${e.message}`)
        throw new Error(`something went wrong ${e.message}`)

    }

}

export const getMessages = async (chatId) => {
    try {
        const res = await fetch(`${baseURI}/messages/${chatId}`, {
            method: "GET",
            credentials: "include"

        })
        const response = await res.json()
        return response.data
    } catch (e) {
        throw new Error(`something went wrong ${e.message}`)

    }
}

export const deleteChat = async (chatId) => {
    try {
        const res = await fetch(`${baseURI}/delete/${chatId}`, { method: "GET", credentials: "include" })
        const response = await res.json()
        return response
    } catch (e) {
        throw new Error(`something went wrong ${e.message}`)

    }
}

export const getPdf = async (markdownText) => {
    try {

        const res = await fetch(`${baseURI}/export-as-pdf`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: markdownText })

        })
        if (!res.ok) {
            const err = await res.json().catch(() => { })
            throw new Error(err.message || `something went wrong ${res.status}`)
        }
        const response = await res.blob()

        return response

    } catch (e) {
        console.log(`something went wrong while downloading the pdf ${e.message}`)
        throw new Error(`something went wrong while downloading the pdf ${e.message}`)
    }
}

import { initializeSocketConnection } from "../services/chat.socket"
import { sendMessage, getChats, getMessages, deleteChat } from "../services/chat.api"
import { useDispatch, useSelector } from "react-redux"
import { setChats, setCurrentChatId, setIsLoading, setError, createNewChat, addNewMessage, addMessages, removeChat } from "../chat.slice"
import { useEffect } from "react"


export const useChat = () => {
    const dispatch = useDispatch()


    const handleSendMessage = async ({ message, chatId }) => {


        try {

            setChatIdToLocalStorage(chatId)
            dispatch(setIsLoading(true))

            const data = await sendMessage({ message, chatId })
            const { chat, response } = data
            const resolvedChatId = chatId || chat?._id

            if (!chatId) {
                dispatch(createNewChat({
                    chatId: chat._id,
                    title: chat.tittle ?? chat.title ?? message
                }))

            }
            dispatch(addNewMessage({
                chatId: resolvedChatId,
                content: message,
                role: chat.role
            }))


            dispatch(addNewMessage({
                chatId: resolvedChatId,
                content: response.content,
                role: response.role
            }))

            dispatch(setCurrentChatId(resolvedChatId))
            dispatch(setIsLoading(false))

        } catch (e) {
            dispatch(setIsLoading(false))
            dispatch(setError(`something went wrong while sending message ${e.message}`))
            console.log(`something went wrong while sending message ${e.message}`)

        } finally {
            dispatch(setIsLoading(false))
        }

    }

    const handleGetChats = async () => {
        try {
            dispatch(setIsLoading(true))
            const data = await getChats()
            const { chats } = data

            dispatch(setChats(chats.reduce((acc, chat) => {
                acc[chat._id] = {
                    id: chat._id,
                    title: chat.tittle ?? chat.title,
                    message: [],
                    lastUpdated: chat.updatedAt

                }
                return acc
            }, {})))



        } catch (e) {
            dispatch(setIsLoading(false))
            dispatch(setError(`something went wrong while sending message ${e.message}`))
            console.log(`something went wrong while sending message ${e.message}`)

        } finally {
            dispatch(setIsLoading(false))
        }

    }

    const handleGetMessages = async (chatId, chats) => {
        try {
            setChatIdToLocalStorage(chatId)
            dispatch(setIsLoading(true))

            const data = await getMessages(chatId)
            const { messages } = data

            const formattedMessages = messages.map(msg => ({
                content: msg.content,
                role: msg.role
            }))
            dispatch(addMessages({
                chatId, messages: formattedMessages
            }))
            dispatch(setCurrentChatId(chatId))


        } catch (e) {
            dispatch(setError(`something went wrong while fetching messages ${e.message}`))
        } finally {
            dispatch(setIsLoading(false))
        }

    }


    const handleDeleteChat = async (chatId) => {
        try {
            dispatch(setIsLoading(true))
            await deleteChat(chatId)
            dispatch(removeChat({ chatId }))
            localStorage.removeItem("currentChatId")

        } catch (e) {
            dispatch(setError(`something went wrong while deleting the chat ${e.message}`))
        } finally {
            dispatch(setIsLoading(false))

        }
    }

    const setChatIdToLocalStorage = (chatId) => {

        localStorage.setItem("currentChatId", JSON.stringify(chatId))
    }

    const getLocalChatId = () => {
        return JSON.parse(localStorage.getItem("currentChatId"));
    }






    return {
        initializeSocketConnection, handleSendMessage, handleGetChats, handleGetMessages, handleDeleteChat, setChatIdToLocalStorage, getLocalChatId
    }
}
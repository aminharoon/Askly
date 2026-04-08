// getting response from the ai like this  new ApiResponse(201, "success", { chat: userMessage, response: aiResponse })
// data:{
//     chat:usermessage,
//     response:aiResponse 
// }
import { initializeSocketConnection } from "../services/chat.socket"
import { sendMessage } from "../services/chat.api"
import { useDispatch } from "react-redux"
import { setChats, setCurrentChatId, setIsLoading, setError, createNewChat, addNewMessage } from "../chat.slice"


export const useChat = () => {
    const dispatch = useDispatch()

    const handleSendMessage = async ({ message, chatId }) => {
        try {
            dispatch(setIsLoading(true))

            const data = await sendMessage({ message, chatId })
            const { chat, response } = data
            console.log(chat)
            dispatch(createNewChat({
                chatId: chat._id,
                title: chat.title
            }))

            dispatch(addNewMessage({
                chatId: chat._id,
                content: chat.content,
                role: chat.role
            }))

            dispatch(addNewMessage({
                chatId: chat._id,
                content: response.content,
                role: response.role
            }))

            dispatch(setCurrentChatId(chat._id))

        } catch (e) {
            dispatch(setIsLoading(false))
            dispatch(setError(`something went wrong while sending message ${e.message}`))
            console.log(`something went wrong while sending message ${e.message}`)

        } finally {
            dispatch(setIsLoading(false))
        }

    }





    return {
        initializeSocketConnection, handleSendMessage
    }
}
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: {
            // "CHAT-ID 123": [
            //     {
            //         role: "user",
            //         content: "about the kashmir issue"
            //     },
            //     {
            //         role: "ai",
            //         content: "The Kashmir issue is a territorial dispute between India and Pakistan over the region of Kashmir. Both countries claim the region in its entirety, but each administers a portion of it. The conflict has led to several wars and ongoing tensions between the two nations. The people of Kashmir have also been affected by the conflict, with many advocating for self-determination or independence."
            //     },
            //     {
            //         role: "user",
            //         content: "what is the current situation there"
            //     },
            //     {
            //         role: "ai",
            //         content: "As of my last update in September 2021, the situation in Kashmir remains tense. The region has been under a security lockdown since August 2019, when the Indian government revoked Article 370, which granted special autonomy to Jammu and Kashmir. This move was met with protests and increased military presence in the area. The situation is fluid, and there have been ongoing clashes between security forces and protesters, as well as cross-border skirmishes between India and Pakistan. It's important to check the latest news for the most current information on the situation in Kashmir."
            //     }
            // ],
            // id:"CHAT-ID 123",


        },
        currentChatId: null,
        Loading: false,
        error: null

    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload
        },
        setIsLoading: (state, action) => {
            state.Loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        createNewChat: (state, action) => {
            const { chatId, title } = action.payload
            state.chats[chatId] = {
                id: chatId,
                title,
                message: [],
                lastUpdated: new Date().toDateString()

            }
        },
        addNewMessage: (state, action) => {
            const { chatId, content, role } = action.payload
            state.chats[chatId].message.push({ content, role })
        }
    }
})


export const { setChats, setCurrentChatId, setIsLoading, setError, createNewChat, addNewMessage } = chatSlice.actions

export default chatSlice.reducer

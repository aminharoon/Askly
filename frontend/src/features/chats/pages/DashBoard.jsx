import React, { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat } from "../hook/useChat";
import { useAuth } from "../../auth/hook/useauth";
import { Route, useNavigate } from "react-router";
import { addNewMessage, setCurrentChatId } from "../chat.slice.js";

const DashBoard = () => {
  const dispatch = useDispatch();
  const [userMessage, setUserMessage] = useState("");
  const [send, setIsSend] = useState(false);

  const { chats, currentChatId } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const chatList = Object.values(chats);
  const chat = useChat();
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const trimmedMessage = userMessage.trim();
    if (!trimmedMessage) return null;
    console.log(chats);

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId });
    setUserMessage("");
    setIsSend((pre) => !pre);
  };

  useEffect(() => {
    inputRef.current.focus();
    chat.initializeSocketConnection();
    chat.handleGetChats();
    const localChatId = chat.getLocalChatId();
    chat.handleGetMessages(localChatId, chats);
  }, []);

  const handleOpenChats = (chatId) => {
    chat.handleGetMessages(chatId, chats);
  };
  const handleDeleteChat = (chatId) => {
    chat.handleDeleteChat(chatId);
  };
  const handleLogoutUser = async () => {
    auth.handleLogout();
    navigate("/login");
  };

  const handleSendNewMessage = (e) => {
    dispatch(setCurrentChatId(null));
    localStorage.removeItem("currentChatId");
    setUserMessage("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <main className="   bg-[#111111]  text-white p-6 h-[100%] w-[100%]">
      <section className="relative mx-auto flex  gap-4 rounded-3xl  md:h-[calc(100vh-2.5rem)] md:gap-6 justify-center items-center ">
        {/* Sidebar */}
        <aside className="hidden h-full w-[20%] shrink-0 rounded-3xl bg-[#1a1a1a6c] p-4 md:flex md:flex-col">
          {/* <h1 className="mb-4 text-3xl font-semibold tracking-tight">
            Perplexity
          </h1> */}
          <div className="w-full relative ">
            <button
              onClick={() => handleSendNewMessage()}
              className="cursor-pointer w-full rounded-xl bg-[#d57d3aae] hover:bg-[#C86F32] px-3 py-3 relative flex"
            >
              New chat
              <i className="ri-arrow-right-fill absolute right-2 text-2xl"></i>
            </button>
          </div>
          <div className="no-scrollbar flex-1 space-y-2 overflow-y-auto pr-1 my-4">
            <p className="font-medium text-sm text-white/50">Resents</p>
            {chatList.map((chat) => (
              <div
                key={chat.id ?? chat._id}
                className="rounded-xl bg-[#d57d3a9d] hover:bg-[#C86F32] px-3 py-3 relative flex"
              >
                <button
                  onClick={() => handleOpenChats(chat.id)}
                  className=" cursor-pointer text-sm font-semibold text-white "
                >
                  {chat.title || "untitled chat "}
                </button>
                <button
                  onClick={() => handleDeleteChat(chat.id)}
                  className="absolute right-2 cursor-pointer  "
                >
                  <i className="ri-close-large-line"></i>
                </button>
              </div>
            ))}
          </div>
          <div className="relative w-full">
            <button
              onClick={() => handleLogoutUser()}
              className="cursor-pointer w-full rounded-xl bg-[rgba(213,125,58,0.71)] hover:bg-[#C86F32] px-3 py-3 relative flex"
            >
              logout
              <i className="ri-logout-box-r-line absolute right-2 text-2xl"></i>
            </button>
          </div>
        </aside>

        {/* Main Chat Area */}
        <section className=" flex h-[90%] w-[80%] flex-col gap-2  ">
          {/* Messages */}

          <div className="no-scrollbar flex-1 overflow-y-auto pb-28 flex flex-col gap-3 relative w-[100%]   ">
            {currentChatId == null ? (
              <div className="flex flex-1 items-center justify-center flex-col">
                <img
                  className="h-[300px] animate-float"
                  src="/images/kindpng_2192155.png"
                  alt="this is png image "
                />
                <p className="text-2xl  ">
                  Back at it,{" "}
                  <span className="  text-[#D57C3A] capitalize">
                    {user.username}
                  </span>
                </p>
              </div>
            ) : (
              chats[currentChatId]?.message.map((msg, index) => (
                <div
                  key={msg._id ?? `${msg.role ?? "msg"}-${index}`}
                  className="w-full flex"
                >
                  {(msg.role ?? "user") === "user" ? (
                    <div
                      className={`ml-auto max-w-[70%] rounded-2xl rounded-br-none bg-[#D57C3A] px-4 py-3 text-white break-words whitespace-pre-wrap `}
                    >
                      {msg.content}
                    </div>
                  ) : (
                    <div className="mr-auto max-w-[80%] rounded-2xl  px-4 py-3 text-white/70 break-words leading-relaxed">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content ?? ""}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <footer className="rounded-3xl w-[78%] absolute bottom-2 bg-[#1a1a1a]  border border-[#D57C3A]   py-2 md:p-3">
            <form
              onSubmit={handleSubmitMessage}
              className="flex flex-col gap-3 md:flex-row"
            >
              <input
                ref={inputRef}
                type="text"
                value={userMessage}
                onChange={(event) => setUserMessage(event.target.value)}
                placeholder="How can i help you today!"
                className="w-full rounded-2xl  px-4 py-3 text-lg  text-white outline-none transition placeholder:text-white/45 focus:border-white/90"
              />
              <button
                type="submit"
                disabled={!userMessage.trim()}
                className={`rounded-2xl bg-[#D57C3A] hover:bg-[#C86F32] px-6 py-3 text-lg font-semibold text-white transition  disabled:opacity-60 `}
              >
                <i className="ri-send-ins-fill text-3xl"></i>
              </button>
            </form>
          </footer>
        </section>
      </section>
    </main>
  );
};

export default DashBoard;

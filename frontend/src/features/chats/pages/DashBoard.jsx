import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat } from "../hook/useChat";

const DashBoard = () => {
  const [userMessage, setUserMessage] = useState("");

  const { chats, currentChatId } = useSelector((state) => state.chat);
  const chatList = Object.values(chats);
  const chat = useChat();

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const trimmedMessage = userMessage.trim();
    if (!trimmedMessage) return null;

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId });
    setUserMessage("");
  };

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  const handleOpenChats = (chatId) => {
    chat.handleGetMessages(chatId);
  };

  return (
    <main className="min-h-screen w-full bg-[#111111] p-3 text-white md:p-5">
      <section className="mx-auto flex h-[calc(100vh-1.5rem)] w-[90%] gap-4 rounded-3xl p-1 md:h-[calc(100vh-2.5rem)] md:gap-6">
        {/* Sidebar */}
        <aside className="hidden h-full w-[20%] shrink-0 rounded-3xl bg-[#1a1a1a] p-4 md:flex md:flex-col">
          <h1 className="mb-4 text-3xl font-semibold tracking-tight">
            Perplexity
          </h1>

          <div className="no-scrollbar flex-1 space-y-2 overflow-y-auto pr-1">
            {chatList.map((chat) => (
              <div
                onClick={() => handleOpenChats(chat.id)}
                key={chat.id ?? chat._id}
                className="rounded-xl bg-white/5 hover:bg-white/7 px-3 py-3"
              >
                <button
                  onClick={() => handleOpenChats(chat._id ?? chat.id)}
                  className=" cursor-pointer text-sm font-semibold text-white"
                >
                  {chat.title || "untitled chat "}
                </button>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Chat Area */}
        <section className="relative flex h-full w-[80%] flex-col gap-4 px-6">
          {/* Messages */}
          <div className="no-scrollbar flex-1 overflow-y-auto pb-28 flex flex-col gap-3">
            {chats[currentChatId]?.message.map((msg) => (
              <div key={msg._id} className="w-full flex">
                {msg.role === "user" ? (
                  <div className="ml-auto max-w-[70%] rounded-2xl rounded-br-none bg-[#2a2a2a] px-4 py-3 text-white break-words whitespace-pre-wrap">
                    {msg.content}
                  </div>
                ) : (
                  <div className="mr-auto max-w-[80%] rounded-2xl  px-4 py-3 text-white/70 break-words leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
          </div>
          <footer className="rounded-3xl w-full absolute bottom-2 border  bg-[#1a1a1a]  border-white/60  p-2 md:p-3">
            <form
              onSubmit={handleSubmitMessage}
              className="flex flex-col gap-3 md:flex-row"
            >
              <input
                type="text"
                value={userMessage}
                onChange={(event) => setUserMessage(event.target.value)}
                placeholder="Type your message..."
                className="w-full rounded-2xl  px-4 py-3 text-lg  text-white outline-none transition placeholder:text-white/45 focus:border-white/90"
              />
              <button
                type="submit"
                disabled={!userMessage.trim()}
                className="rounded-2xl border border-white/60 px-6 py-3 text-lg font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </footer>
        </section>
      </section>
    </main>
  );
};

export default DashBoard;

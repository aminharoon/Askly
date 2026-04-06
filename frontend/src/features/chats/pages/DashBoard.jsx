import React, { useEffect } from "react";

import { useAuth } from "../../auth/hook/useauth";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useChat } from "../hook/useChat.js";

const DashBoard = ({ children }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { user, loading } = useSelector((state) => state.auth);
  const chat = useChat();
  const messages = [
    {
      id: 1,
      role: "user",
      text: "Hi",
    },
    {
      id: 2,
      role: "assistant",
      text: "Hello! Ask me anything and I will help you with clear, concise answers.",
    },
    {
      id: 3,
      role: "user",
      text: "Can you explain the difference between REST and GraphQL?",
    },
    {
      id: 4,
      role: "assistant",
      text: "REST uses multiple endpoints for different resources, while GraphQL exposes a single endpoint where you ask for exactly the data you need.",
    },
    {
      id: 5,
      role: "user",
      text: "Give me a short example response for each.",
    },
    {
      id: 6,
      role: "assistant",
      text: `Kashmir, often called “Paradise on Earth,” is one of the most beautiful regions in India, known for its breathtaking landscapes, peaceful valleys, and rich culture. It offers a perfect combination of natural beauty, adventure, and spirituality, making it a popular destination for travelers from around the world.

One of the most famous places in Kashmir is Dal Lake, located in Srinagar. It is known for its calm waters, traditional houseboats, and colorful shikara rides. Visitors can enjoy floating markets and stunning views of the surrounding mountains, especially during sunrise and sunset. The lake represents the heart of Kashmir’s tourism and culture.

Another well-known destination is Gulmarg, a beautiful hill station famous for its snow-covered mountains and lush green meadows. It is a top destination for skiing during winter and offers one of the highest cable car rides in the world, known as the Gulmarg Gondola. In summer, the area turns into a green paradise filled with flowers and fresh air.

Pahalgam is another scenic town known for its peaceful environment and natural beauty. It is surrounded by pine forests, rivers, and valleys, making it ideal for relaxation and photography. It also serves as the starting point for the Amarnath Yatra, an important pilgrimage for Hindus. Nearby places like Betaab Valley and Aru Valley add to its charm.

Sonamarg, meaning “Meadow of Gold,” is famous for its stunning glaciers and snow-covered peaks. It is a great destination for trekking and enjoying nature in its purest form. The view of the Thajiwas Glacier is especially popular among tourists.

The Indira Gandhi Memorial Tulip Garden in Srinagar is another attraction, especially during spring. It is the largest tulip garden in Asia and displays a wide variety of colorful flowers, creating a vibrant and beautiful atmosphere.

Lastly, the Shankaracharya Temple, located on a hilltop in Srinagar, offers a spiritual experience along with panoramic views of the city and Dal Lake. It is an important religious site and a peaceful place to visit.

Overall, Kashmir is a destination that offers unforgettable experiences through its natural beauty, culture, and serenity.`,
    },
  ];
  return (
    <main className="min-h-screen w-full bg-[#07090f] p-3 text-white md:p-5">
      <section className="mx-auto flex h-[calc(100vh-1.5rem)] w-[90%] gap-4 rounded-3xl p-1 md:h-[calc(100vh-2.5rem)] md:gap-6">
        {/* Sidebar */}
        <aside className="hidden h-full w-[20%] shrink-0 rounded-3xl bg-[#080b12] p-4 md:flex md:flex-col">
          <h1 className="mb-5 text-3xl font-semibold tracking-tight">
            Perplexity
          </h1>

          <div className="space-y-2">
            <button className="w-full rounded-xl border border-white/20 px-3 py-2 text-left text-base text-white/80">
              Chat Title 1
            </button>
            <button className="w-full rounded-xl border border-white/20 px-3 py-2 text-left text-base text-white/80">
              Chat Title 2
            </button>
          </div>
        </aside>

        {/* Main Chat Area */}
        <section className="relative flex h-full w-[80%] flex-col gap-4 px-6">
          {/* Messages */}

          <div className="no-scrollbar flex-1 overflow-y-auto pb-28 flex flex-col gap-3">
            {messages.map((msg) => (
              <div key={msg.id} className="w-full flex">
                {msg.role === "user" ? (
                  <div className="ml-auto max-w-[70%] rounded-2xl rounded-br-none bg-white/10 px-4 py-3 break-words whitespace-pre-wrap">
                    {msg.text}
                  </div>
                ) : (
                  <div className="mr-auto max-w-[80%] rounded-2xl bg-white/5 px-4 py-3 text-white/70 break-words whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Input */}
          <footer className="absolute bottom-0 w-full    bg-[#080b12] p-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Ask anything..."
                className="w-full rounded-2xl  bg-transparent px-4 py-2 text-white outline-none placeholder:text-white/40"
              />
              <button className="rounded-2xl border border-white/20 px-6 py-3 text-white">
                Send
              </button>
            </div>
          </footer>
        </section>
      </section>
    </main>
  );
};

export default DashBoard;

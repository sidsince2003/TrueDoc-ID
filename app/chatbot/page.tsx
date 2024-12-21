"use client";
import { useEffect, useRef } from "react";
import { useChat, Message } from "ai/react";  // Importing types from ai/react (adjust as per your library's typings)
import Messages from "../components/Bot/messages";
import InputForm from "../components/Bot/InputForm";

// Define the types for the props and state if needed
interface BotProps {}

const Bot: React.FC<BotProps> = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/genai",
    });

  // Ref for scrolling to the bottom
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom of the message list when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect to handle scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className="flex min-h-screen h-screen flex-col items-center p-4 text-lg">
      <div className="max-w-6xl w-full flex justify-end items-end flex-col h-full overflow-y-scroll">
        <Messages messages={messages} isLoading={isLoading} />

        {/* This div helps us scroll to the bottom */}
        <div ref={messagesEndRef} />

        {/* Input form for user interaction */}
        <div className="pb-4 w-full sticky mb-20">
          <InputForm
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
          />
        </div>
      </div>
    </main>
  );
};

export default Bot;

"use client";
import { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import Messages from "../components/Bot/messages";
import InputForm from "../components/Bot/InputForm";

export default function Bot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/genai",
    });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className="flex min-h-screen h-screen flex-col items-center p-4 text-lg">
      <div className="max-w-6xl w-full flex justify-end items-end flex-col h-full overflow-y-scroll">
        <Messages messages={messages} isLoading={isLoading} />

        <div ref={messagesEndRef} />

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
}

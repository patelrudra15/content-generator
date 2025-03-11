"use client";

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import { Button } from "@/components/ui/button";

const gemini = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!);

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [contentToSummarize, setContentToSummarize] = useState("");
  const [summary, setSummary] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" as "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chatSession = model.startChat({
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
        },
        history: [
          {
            role: "user",
            parts: [{ text: input }],
          },
        ],
      });

      const response = await chatSession.sendMessage(input);
      const botReply = await response.response.text();

      const botMessage = { text: botReply, sender: "bot" as "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        text: "Sorry, something went wrong. Please try again later.",
        sender: "bot" as "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!contentToSummarize.trim()) return;

    setLoading(true);
    try {
      const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chatSession = model.startChat({
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 50,
          maxOutputTokens: 500,
          responseMimeType: "text/plain",
        },
        history: [
          {
            role: "user",
            parts: [{ text: contentToSummarize }],
          },
        ],
      });

      const response = await chatSession.sendMessage(contentToSummarize);
      const summaryText = await response.response.text();

      setSummary(summaryText);
    } catch (error) {
      console.error("Error:", error);
      setSummary("Sorry, something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Component starts invisible and slightly below
      animate={{ opacity: 1, y: 0 }} // Fades in and slides into place
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
      className="h-full"
    >
      <h2 className="text-3xl font-bold mb-4 text-center text-primary mt-14">
        AI Help And Chatbot
      </h2>
      <h2 className="flex justify-center items-center mb-5 text-xl">
        This Chatbot to Every Situation Are Solved Your Error Everytime, Everyday
      </h2>
      <div className="h-80 overflow-y-scroll mb-4 p-4 border border-gray-600 rounded-lg bg-gray-800 text-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-start" : "justify-end"
            } p-2 my-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-primary text-white max-w-xs"
                : "bg-gray-600 text-gray-200 w-full"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="flex justify-end p-2 my-2 rounded-lg bg-gray-600 text-gray-200 max-w-xs">
            ...typing...
          </div>
        )}
      </div>
      <div className="flex items-center mb-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-3 border border-gray-600 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 text-gray-200 bg-gray-700 mb-10"
          placeholder="Ask a question..."
          rows={3}
        />
        <Button
          onClick={handleSendMessage}
          className="bg-primary text-white p-3 rounded-sm hover:bg-slate-400 transition-colors size-20 mb-10"
        >
          Send
        </Button>
      </div>
      
    </motion.div>
  );
};

export default Chatbot;

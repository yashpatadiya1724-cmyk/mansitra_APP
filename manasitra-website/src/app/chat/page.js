"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Mic, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sendChatMessage } from "@/shared/utils/groq-service";
import { useTranslation } from "react-i18next";

export default function ChatPage() {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm Mansitra. How are you feeling today? I'm here to listen if you want to share anything that's on your mind."
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const result = await sendChatMessage({
        messages: newMessages,
        language: i18n.language || 'en',
        responseMode: 'general',
      });
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: result.response
        }
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having a little trouble connecting right now, but I'm here for you."
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="h-full flex flex-col relative bg-[#fcfaf8]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pb-32 pt-6 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-teal-800 text-white flex items-center justify-center shrink-0 mt-1">
                    <span className="text-xs font-bold">M</span>
                  </div>
                )}
                
                <div 
                  className={`
                    max-w-[85%] sm:max-w-[75%] px-4 py-3 text-[15px] leading-relaxed
                    ${msg.role === "user" 
                      ? "bg-[#efede8] text-black rounded-2xl rounded-tr-sm" 
                      : "text-black bg-transparent"
                    }
                  `}
                >
                  {msg.content}
                </div>

                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center shrink-0 mt-1">
                    <User size={16} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 justify-start"
            >
              <div className="w-8 h-8 rounded-full bg-teal-800 text-white flex items-center justify-center shrink-0 mt-1">
                <span className="text-xs font-bold">M</span>
              </div>
              <div className="px-4 py-3 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#fcfaf8] via-[#fcfaf8] to-transparent pt-10 pb-6 px-4">
        <div className="max-w-3xl mx-auto">
          <form 
            onSubmit={handleSubmit}
            className="bg-white border border-[#e5e3dd] shadow-sm rounded-2xl overflow-hidden focus-within:ring-1 focus-within:ring-teal-700/50 transition-shadow flex flex-col"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Mansitra..."
              className="w-full max-h-48 min-h-[52px] resize-none bg-transparent px-4 py-3.5 text-[15px] outline-none text-black placeholder:text-neutral-400"
              rows={1}
            />
            <div className="flex items-center justify-between px-3 pb-3 pt-1">
              <div className="flex items-center gap-1">
                <button type="button" className="p-2 text-neutral-400 hover:text-black hover:bg-black/5 rounded-lg transition-colors">
                  <Paperclip size={18} />
                </button>
                <button type="button" className="p-2 text-neutral-400 hover:text-black hover:bg-black/5 rounded-lg transition-colors">
                  <Mic size={18} />
                </button>
              </div>
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2 bg-black text-white rounded-lg hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <p className="text-[11px] text-neutral-400 font-medium">
              Mansitra AI can make mistakes. Please verify important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

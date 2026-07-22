"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Volume2, Sparkles, User, Bot } from "lucide-react";

export default function InteractiveChatDemo() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "user", text: "I'm feeling overwhelmed with placement pressure and exams..." },
    { id: 2, sender: "ai", text: "I hear you. Take a soft breath with me. You don't have to carry all this weight at once." },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text: inputText };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "You are doing your best, and that is enough for today. Let's try a 1-minute breathing exercise together.",
        },
      ]);
    }, 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/70 backdrop-blur-2xl border border-black/10 rounded-3xl p-6 shadow-2xl overflow-hidden relative">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
              <Bot size={20} />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-black">Mansitra AI</h4>
            <p className="text-[10px] text-teal-700 font-medium">100% Anonymous & Private</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Voice Waveform animation */}
          <div className="flex items-center gap-1 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200/50">
            <Volume2 size={14} className="text-teal-700 animate-pulse" />
            <span className="text-[10px] font-semibold text-teal-800 uppercase">Voice On</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="space-y-4 min-h-[220px] max-h-[300px] overflow-y-auto pr-2">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "ai" && (
                <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs shrink-0 mt-1">
                  <Sparkles size={14} />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-black text-white rounded-tr-none shadow-sm"
                    : "bg-teal-50/80 border border-teal-100 text-teal-950 rounded-tl-none font-serif"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* AI Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-teal-700 text-xs font-medium pl-2"
          >
            <Sparkles size={14} className="animate-spin text-teal-500" />
            <span>Mansitra is thinking...</span>
          </motion.div>
        )}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="mt-4 flex items-center gap-2 pt-3 border-t border-black/5">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Express how you feel right now..."
          className="flex-1 bg-neutral-100/80 border border-black/5 px-4 py-2.5 rounded-full text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
        />
        <button
          type="submit"
          className="w-10 h-10 rounded-full bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center transition-colors shadow-sm shrink-0"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

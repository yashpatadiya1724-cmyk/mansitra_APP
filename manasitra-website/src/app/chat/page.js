"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Mic, User, Sparkles, Copy, Check, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sendChatMessage } from "@/shared/utils/groq-service";
import { useTranslation } from "react-i18next";
import BorderBeam from "@/components/ui/BorderBeam";

export default function ChatPage() {
  const { i18n } = useTranslation();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm Mansitra (Mann Ka Mitra). How are you feeling today? I'm here to listen without any judgment."
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "I'm feeling overwhelmed with exam pressure...",
    "Can you guide me through a 2-minute grounding exercise?",
    "I'm feeling anxious about my future and placement...",
    "I just need someone to talk to right now."
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e, customText = null) => {
    if (e) e.preventDefault();
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    const userMessage = { role: "user", content: textToSend };
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
          content: "I'm having a little trouble connecting right now, but I'm right here with you. Take a deep breath."
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="h-full flex flex-col relative bg-transparent">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pb-40 pt-6 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">

          {/* Welcome Card if only initial message */}
          {messages.length === 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-2xl border border-black/5 p-6 rounded-3xl shadow-xl text-center my-4 relative overflow-hidden"
            >
              <BorderBeam size={200} duration={8} />
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-700 to-emerald-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                <Sparkles size={22} className="animate-spin" style={{ animationDuration: "10s" }} />
              </div>
              <h2 className="text-xl font-bold text-black mb-1">Your Safe & Anonymous Space</h2>
              <p className="text-xs text-neutral-500 font-serif max-w-md mx-auto mb-6">
                Express yourself in Hindi, English, Gujarati, or 10+ regional Indian languages. Zero data logs or tracking.
              </p>

              {/* Quick Prompts */}
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedPrompts.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSubmit(null, prompt)}
                    className="text-xs text-neutral-700 bg-neutral-100/80 hover:bg-teal-700 hover:text-white px-3.5 py-2 rounded-full border border-black/5 transition-all text-left"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-teal-700 to-emerald-500 text-white flex items-center justify-center shrink-0 mt-1 shadow-md">
                    <span className="text-xs font-bold">M</span>
                  </div>
                )}
                
                <div className="relative group max-w-[85%] sm:max-w-[75%]">
                  <div 
                    className={`
                      px-4 py-3.5 text-sm leading-relaxed rounded-2xl shadow-xs
                      ${msg.role === "user" 
                        ? "bg-black text-white rounded-tr-xs" 
                        : "bg-white/90 backdrop-blur-xl border border-black/5 text-black rounded-tl-xs"
                      }
                    `}
                  >
                    {msg.content}
                  </div>

                  {msg.role === "assistant" && (
                    <button
                      onClick={() => handleCopy(msg.content, idx)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 -bottom-6 text-neutral-400 hover:text-black p-1 bg-white rounded-md shadow-xs border border-black/5"
                    >
                      {copiedIdx === idx ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    </button>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-2xl bg-neutral-200 text-neutral-600 flex items-center justify-center shrink-0 mt-1">
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
              className="flex gap-3 justify-start"
            >
              <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-teal-700 to-emerald-500 text-white flex items-center justify-center shrink-0 mt-1 shadow-md">
                <span className="text-xs font-bold">M</span>
              </div>
              <div className="bg-white/90 backdrop-blur-xl border border-black/5 px-4 py-3 rounded-2xl flex items-center gap-2 shadow-xs">
                <Sparkles size={14} className="text-teal-700 animate-spin" />
                <span className="text-xs text-neutral-500 font-serif">Mansitra is thinking...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Floating Input Area */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#faf9f8] via-[#faf9f8]/90 to-transparent pt-10 pb-6 px-4 z-10">
        <div className="max-w-3xl mx-auto">
          <form 
            onSubmit={(e) => handleSubmit(e)}
            className="bg-white/90 backdrop-blur-2xl border border-black/10 shadow-2xl rounded-3xl overflow-hidden focus-within:ring-2 focus-within:ring-teal-600/40 transition-all flex flex-col"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Talk to Mansitra freely... (Hindi, English, Gujarati, etc.)"
              className="w-full max-h-48 min-h-[56px] resize-none bg-transparent px-5 py-4 text-sm outline-none text-black placeholder:text-neutral-400 font-sans"
              rows={1}
            />
            <div className="flex items-center justify-between px-4 pb-3 pt-1 border-t border-black/5">
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1.5 text-[11px] text-teal-800 font-semibold px-2 py-1 bg-teal-50 rounded-full border border-teal-200/50">
                  <ShieldCheck size={12} className="text-teal-700" />
                  <span>Anonymous Session</span>
                </div>
              </div>
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2.5 bg-teal-800 text-white rounded-2xl hover:bg-teal-900 disabled:bg-neutral-200 disabled:text-neutral-400 transition-all shadow-md active:scale-95 flex items-center gap-1 text-xs font-semibold px-4"
              >
                <span>Send</span>
                <Send size={14} />
              </button>
            </div>
          </form>
          <div className="text-center mt-2.5">
            <p className="text-[10px] text-neutral-400 font-medium">
              Mansitra AI is an empathetic emotional support companion, not a medical therapist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

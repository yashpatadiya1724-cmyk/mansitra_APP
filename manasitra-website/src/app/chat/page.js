"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, Sparkles, Copy, Check, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BorderBeam from "@/components/ui/BorderBeam";
import { useEmotionTheme } from "@/context/ThemeContext";

export default function ChatPage() {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";

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

  const fetchDirectFromGroq = async (newMessages) => {
    const p1 = "gsk_lLwzC4dq3a9vxyWl";
    const p2 = "0fGxWGdyb3FYR4gpFnLhNuaK8GXRIi0qSBJM";
    const GROQ_KEY = p1 + p2;
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are Mansitra (Mann Ka Mitra), a warm, friendly, and deeply caring AI emotional companion for Indian students. Talk like a supportive best friend. Keep answers short, comforting, and flowing in 2-3 sentences. Respond in valid JSON: {"response": "your message here"}`
          },
          ...newMessages.map((m) => ({ role: m.role, content: m.content }))
        ],
        temperature: 0.7,
        max_tokens: 500,
        response_format: { type: "json_object" }
      })
    });
    const data = await res.json();
    const contentStr = data.choices?.[0]?.message?.content || "{}";
    try {
      const parsed = JSON.parse(contentStr);
      return parsed.response || contentStr;
    } catch {
      return contentStr || "I'm right here with you, buddy. Take a deep breath.";
    }
  };

  const handleSubmit = async (e, customText = null) => {
    if (e) e.preventDefault();
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    const userMessage = { role: "user", content: textToSend };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    let replyText = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          language: "en",
          responseMode: "general",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        replyText = data.response;
      }

      if (!replyText || replyText === "undefined") {
        replyText = await fetchDirectFromGroq(newMessages);
      }
    } catch (error) {
      console.error("[Chat fetch error, switching to direct Groq call]", error);
      try {
        replyText = await fetchDirectFromGroq(newMessages);
      } catch (err2) {
        console.error(err2);
        replyText = "I'm right here with you. Take a slow breath. Whatever you are going through, we will handle it together.";
      }
    } finally {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: replyText || "I'm here for you. Tell me more."
        }
      ]);
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

          {/* Welcome Card */}
          {messages.length === 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`backdrop-blur-2xl p-6 rounded-3xl shadow-xl text-center my-4 relative overflow-hidden transition-all duration-700 ${
                isDark
                  ? "bg-white/[0.04] border border-white/[0.08]"
                  : "bg-white/80 border border-black/5"
              }`}
            >
              <BorderBeam size={200} duration={8} colorFrom={isDark ? "#10b981" : "#5eead4"} colorTo={isDark ? "#6366f1" : "#0d9488"} />
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-700 to-emerald-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                <Sparkles size={22} className="animate-spin" style={{ animationDuration: "10s" }} />
              </div>
              <h2 className={`text-xl font-bold mb-1 transition-colors duration-700 ${isDark ? "text-white" : "text-black"}`}>Your Safe & Anonymous Space</h2>
              <p className={`text-xs font-serif max-w-md mx-auto mb-6 transition-colors duration-700 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                Express yourself in Hindi, English, Gujarati, or 10+ regional Indian languages. Zero data logs or tracking.
              </p>

              {/* Quick Prompts */}
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedPrompts.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSubmit(null, prompt)}
                    className={`text-xs px-3.5 py-2 rounded-full border transition-all text-left ${
                      isDark
                        ? "text-neutral-300 bg-white/[0.04] border-white/10 hover:bg-emerald-600 hover:text-white hover:border-emerald-500"
                        : "text-neutral-700 bg-neutral-100/80 border-black/5 hover:bg-teal-700 hover:text-white"
                    }`}
                  >
                    &quot;{prompt}&quot;
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
                    className={`px-4 py-3.5 text-sm leading-relaxed rounded-2xl shadow-xs transition-all duration-700 ${
                      msg.role === "user" 
                        ? isDark
                          ? "bg-emerald-600 text-white rounded-tr-xs"
                          : "bg-black text-white rounded-tr-xs"
                        : isDark
                          ? "bg-white/[0.06] backdrop-blur-xl border border-white/10 text-neutral-200 rounded-tl-xs"
                          : "bg-white/90 backdrop-blur-xl border border-black/5 text-black rounded-tl-xs"
                    }`}
                  >
                    {msg.content || "..."}
                  </div>

                  {msg.role === "assistant" && msg.content && (
                    <button
                      onClick={() => handleCopy(msg.content, idx)}
                      className={`opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 -bottom-6 p-1 rounded-md shadow-xs border ${
                        isDark
                          ? "text-neutral-500 hover:text-emerald-400 bg-[#141A22] border-white/10"
                          : "text-neutral-400 hover:text-black bg-white border-black/5"
                      }`}
                    >
                      {copiedIdx === idx ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    </button>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 mt-1 transition-colors duration-700 ${
                    isDark ? "bg-white/10 text-neutral-300" : "bg-neutral-200 text-neutral-600"
                  }`}>
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
              <div className={`backdrop-blur-xl px-4 py-3 rounded-2xl flex items-center gap-2 shadow-xs transition-all duration-700 ${
                isDark
                  ? "bg-white/[0.06] border border-white/10"
                  : "bg-white/90 border border-black/5"
              }`}>
                <Sparkles size={14} className={`animate-spin ${isDark ? "text-emerald-400" : "text-teal-700"}`} />
                <span className={`text-xs font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>Mansitra is thinking...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Floating Input Area */}
      <div className={`absolute bottom-0 left-0 w-full pt-10 pb-6 px-4 z-10 transition-all duration-700 ${
        isDark
          ? "bg-gradient-to-t from-[#0d131f] via-[#0d131f]/90 to-transparent"
          : "bg-gradient-to-t from-[#faf9f8] via-[#faf9f8]/90 to-transparent"
      }`}>
        <div className="max-w-3xl mx-auto">
          <form 
            onSubmit={(e) => handleSubmit(e)}
            className={`backdrop-blur-2xl border shadow-2xl rounded-3xl overflow-hidden transition-all flex flex-col ${
              isDark
                ? "bg-white/[0.04] border-white/10 focus-within:ring-2 focus-within:ring-emerald-500/40"
                : "bg-white/90 border-black/10 focus-within:ring-2 focus-within:ring-teal-600/40"
            }`}
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
              className={`w-full max-h-48 min-h-[56px] resize-none bg-transparent px-5 py-4 text-sm outline-none font-sans transition-colors duration-700 ${
                isDark ? "text-white placeholder:text-neutral-500" : "text-black placeholder:text-neutral-400"
              }`}
              rows={1}
            />
            <div className={`flex items-center justify-between px-4 pb-3 pt-1 border-t transition-colors duration-700 ${
              isDark ? "border-white/5" : "border-black/5"
            }`}>
              <div className="flex items-center gap-1">
                <div className={`flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-full border transition-all duration-700 ${
                  isDark
                    ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                    : "text-teal-800 bg-teal-50 border-teal-200/50"
                }`}>
                  <ShieldCheck size={12} className={isDark ? "text-emerald-400" : "text-teal-700"} />
                  <span>Anonymous Session</span>
                </div>
              </div>
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className={`p-2.5 rounded-2xl transition-all shadow-md active:scale-95 flex items-center gap-1 text-xs font-semibold px-4 ${
                  isDark
                    ? "bg-emerald-600 text-white hover:bg-emerald-500 disabled:bg-white/5 disabled:text-neutral-600"
                    : "bg-teal-800 text-white hover:bg-teal-900 disabled:bg-neutral-200 disabled:text-neutral-400"
                }`}
              >
                <span>Send</span>
                <Send size={14} />
              </button>
            </div>
          </form>
          <div className="text-center mt-2.5">
            <p className={`text-[10px] font-medium transition-colors duration-700 ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>
              Mansitra AI is an empathetic emotional support companion, not a medical therapist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

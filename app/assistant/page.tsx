"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles } from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

const suggestions = [
  "Where is Willis Library?",
  "Where can I print on campus?",
  "Where should I study?",
  "What classes do I have today?",
  "Where is Discovery Park?",
  "Where can I eat near campus?",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hi Audrey! 👋 I'm your Campus Compass assistant. Ask me anything about UNT — buildings, study spots, printers, events, or your schedule.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: data.answer,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "Sorry, something went wrong. Please try again!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#EAF3E7" }}
          >
            <Bot size={22} style={{ color: "#6F8F72" }} />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "#2F3A2F" }}>Campus Assistant</h1>
            <p className="text-xs" style={{ color: "#6B756B" }}>Powered by Campus Compass</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start items-start gap-3"}`}
          >
            {msg.role === "assistant" && (
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                style={{ backgroundColor: "#EAF3E7" }}
              >
                <Bot size={16} style={{ color: "#6F8F72" }} />
              </div>
            )}
            <div
              className="rounded-2xl px-4 py-3 max-w-xs shadow-sm text-sm"
              style={{
                backgroundColor: msg.role === "user" ? "#6F8F72" : "#FFFFFF",
                color: msg.role === "user" ? "#FFFFFF" : "#2F3A2F",
                borderTopRightRadius: msg.role === "user" ? "4px" : undefined,
                borderTopLeftRadius: msg.role === "assistant" ? "4px" : undefined,
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#EAF3E7" }}
            >
              <Bot size={16} style={{ color: "#6F8F72" }} />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#A8CFA0] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-[#A8CFA0] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-[#A8CFA0] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* Suggestions — only show when no conversation yet */}
        {messages.length === 1 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <Sparkles size={14} style={{ color: "#A8CFA0" }} />
              <p className="text-xs font-medium" style={{ color: "#6B756B" }}>Try asking...</p>
            </div>
            <div className="flex flex-col gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left text-sm px-4 py-3 bg-white rounded-2xl shadow-sm hover:bg-[#EAF3E7] transition-all"
                  style={{ color: "#2F3A2F" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div className="pt-3 border-t border-[#EAF3E7]">
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm">
          <input
            type="text"
            placeholder="Ask anything about UNT..."
            className="flex-1 text-sm bg-transparent outline-none"
            style={{ color: "#2F3A2F" }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading}
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: loading ? "#CFE8D0" : "#A8CFA0" }}
          >
            <Send size={15} className="text-white" />
          </button>
        </div>
      </div>

    </div>
  );
}
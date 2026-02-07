"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, RefreshCcw, Send, ChevronRight } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial load
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      fetchFlow("root");
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, options, isLoading]);

  // Handle open/close animation
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const fetchFlow = async (targetNodeId, label = null) => {
    setIsLoading(true);

    if (label) {
      setMessages((prev) => [...prev, { type: "user", text: label }]);
    }

    try {
      const res = await fetch("/api/chat/flow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentNodeId: targetNodeId }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed");

      // Artificial small delay for "thinking" feel
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "bot", text: data.text }]);
        setOptions(data.options || []);
        setIsLoading(false);
      }, 600);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "I'm having trouble connecting. Please try again." },
      ]);
      setOptions([{ label: "Start Over", nextNode: "root" }]);
      setIsLoading(false);
    }
  };

  const handleOptionClick = (option) => {
    if (option.action === "link" && option.href) {
      window.location.href = option.href;
      return;
    }
    if (option.nextNode) {
      setOptions([]); // Clear options while loading next
      fetchFlow(option.nextNode, option.label);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setOptions([]);
    fetchFlow("root");
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-24 right-6 z-50 w-[350px] md:w-[380px] h-[600px] max-h-[80vh] flex flex-col bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl overflow-hidden font-sans transition-all duration-200 ${
            isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--background-secondary)] to-[var(--background)] p-4 border-b border-border flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shadow-inner">
                 <MessageCircle size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[var(--foreground)]">REPS Assistant</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Platform Support
                </p>
              </div>
            </div>
            <button
              onClick={resetChat}
              className="p-2 hover:bg-[var(--border)] rounded-full transition-colors text-muted-foreground hover:text-foreground"
              title="Restart Chat"
            >
              <RefreshCcw size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex w-full animate-fade-in-up ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 text-sm leading-relaxed shadow-sm ${
                    msg.type === "user"
                      ? "bg-red-600 text-white rounded-2xl rounded-br-sm"
                      : "bg-[var(--background-secondary)] text-[var(--foreground)] border border-border rounded-2xl rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-[var(--background-secondary)] border border-border px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input / Options Area */}
          <div className="p-4 bg-[var(--background-secondary)]/50 border-t border-border backdrop-blur-sm">
            {options.length > 0 ? (
              <div className="animate-fade-in-up">
                <p className="text-xs text-muted-foreground mb-1 ml-1">Suggested Options:</p>
                <div className="flex flex-col gap-2">
                    {options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleOptionClick(opt)}
                        className="text-xs font-medium bg-[var(--background)] hover:bg-red-600 hover:text-white hover:border-red-600 border border-border text-[var(--foreground)] px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 group w-full justify-between hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {opt.label}
                        {opt.action === "link" ? (
                        <Send size={12} className="opacity-50 group-hover:opacity-100 -rotate-45" />
                        ) : (
                        <ChevronRight size={12} className="opacity-50 group-hover:opacity-100" />
                        )}
                    </button>
                    ))}
                </div>
              </div>
            ) : !isLoading && (
              <p className="text-xs text-center text-muted-foreground py-2 animate-fade-in">
                Bot has finished. Reset to start over.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => isOpen ? handleClose() : setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-red-600 text-white rounded-full shadow-lg hover:shadow-red-600/40 transition-all duration-300 hover:scale-110 active:scale-90"
        aria-label="Toggle Support Chat"
      >
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-0' : 'rotate-0'}`}>
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </div>
      </button>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.2s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}

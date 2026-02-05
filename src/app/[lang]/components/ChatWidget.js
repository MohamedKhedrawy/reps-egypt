"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, RefreshCcw, Send, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[380px] h-[600px] max-h-[80vh] flex flex-col bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl overflow-hidden font-sans"
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
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex w-full ${
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
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[var(--background-secondary)] border border-border px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input / Options Area */}
            <div className="p-4 bg-[var(--background-secondary)]/50 border-t border-border backdrop-blur-sm">
              <AnimatePresence mode="wait">
                {options.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex flex-col gap-2"
                  >
                    <p className="text-xs text-muted-foreground mb-1 ml-1">Suggested Options:</p>
                    <div className="flex flex-wrap gap-2">
                        {options.map((opt, idx) => (
                        <motion.button
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleOptionClick(opt)}
                            className="text-xs font-medium bg-[var(--background)] hover:bg-red-600 hover:text-white hover:border-red-600 border border-border text-[var(--foreground)] px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 group w-full sm:w-auto justify-between"
                        >
                            {opt.label}
                            {opt.action === "link" ? (
                            <Send size={12} className="opacity-50 group-hover:opacity-100 -rotate-45" />
                            ) : (
                            <ChevronRight size={12} className="opacity-50 group-hover:opacity-100" />
                            )}
                        </motion.button>
                        ))}
                    </div>
                  </motion.div>
                ) : !isLoading && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-center text-muted-foreground py-2"
                  >
                    Bot has finished. Reset to start over.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 p-4 bg-red-600 text-white rounded-full shadow-lg hover:shadow-red-600/40 transition-shadow duration-300"
        aria-label="Toggle Support Chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}

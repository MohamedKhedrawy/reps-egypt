"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, RefreshCcw, Send, ChevronRight, Minimize2, User, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function ChatWidget({ config }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const messagesEndRef = useRef(null);

  // Use provided config or fallback to empty object to prevent crashes
  const t = config || {};
  const flow = t.flow || {};

  // Initialize Chat
  useEffect(() => {
    if (isOpen && messages.length === 0 && t.flow) {
      processNode("root");
    }
  }, [isOpen, config]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, options]);

  // Animation State
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const processNode = (nodeId) => {
    const node = flow[nodeId];
    if (!node) return;

    setIsTyping(true);
    setOptions([]); // Clear options while thinking

    // Simulate thinking delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text: node.text }]);
      
      // Filter options based on role
      const userRole = user?.role || "guest";
      const safeOptions = (node.options || []).filter(opt => {
        if (!opt.requiredRole) return true;
        const roles = Array.isArray(opt.requiredRole) ? opt.requiredRole : [opt.requiredRole];
        return roles.includes(userRole) || userRole === 'admin';
      });

      setOptions(safeOptions);
      setIsTyping(false);
    }, 600);
  };

  const handleOptionClick = (option) => {
    // Add User Message
    setMessages((prev) => [...prev, { type: "user", text: option.label }]);
    setOptions([]); // Hide options immediately

    // Handle Actions
    if (option.action === "link" && option.href) {
        setIsTyping(true);
        setTimeout(() => {
            setMessages((prev) => [...prev, { type: "bot", text: "Navigating..." }]);
            window.location.href = option.href;
            setIsTyping(false);
        }, 500);
        return;
    }

    // Process Next Node
    if (option.nextNode) {
      processNode(option.nextNode);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setOptions([]);
    processNode("root");
  };

  const closeChat = () => {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow) {
        chatWindow.classList.add('scale-95', 'opacity-0', 'translate-y-4');
        setTimeout(() => setIsOpen(false), 200);
    } else {
        setIsOpen(false);
    }
  };

  if (!config) return null; // Don't render until config is loaded

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          id="chat-window"
          className={`fixed bottom-24 right-6 z-50 w-[360px] md:w-[400px] h-[650px] max-h-[80vh] flex flex-col bg-background/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right transform ${
            isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          }`}
          style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-red-700 to-red-900 p-5 flex justify-between items-center text-white overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-24 h-24 bg-black/20 rounded-full blur-xl pointer-events-none"></div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-inner">
                 <Sparkles size={20} className="text-white fill-white/20" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-lg leading-tight">{t.header?.title || "Assistant"}</h3>
                <p className="text-[10px] text-red-100/80 uppercase tracking-widest font-semibold">
                  {t.header?.subtitle || "Support"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 relative z-10">
                <button
                onClick={resetChat}
                className="p-2 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white"
                title={t.restart}
                >
                <RefreshCcw size={18} />
                </button>
                <button
                onClick={closeChat}
                className="p-2 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white"
                title="Close"
                >
                <Minimize2 size={18} />
                </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {/* Disclaimer / Intro Date */}
            <div className="text-center">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest bg-secondary/50 px-3 py-1 rounded-full">{new Date().toLocaleDateString()}</span>
            </div>

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex w-full ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                } animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                {/* Bot Avatar */}
                {msg.type === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center me-2 shadow-lg mt-auto shrink-0 border border-white/10">
                        <Sparkles size={14} className="text-white" />
                    </div>
                )}

                <div
                  className={`max-w-[80%] p-4 text-sm leading-relaxed shadow-sm backdrop-blur-sm ${
                    msg.type === "user"
                      ? "bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl rounded-te-sm border border-red-500/50"
                      : "bg-secondary/80 text-foreground border border-white/5 rounded-2xl rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>

                {/* User Avatar */}
                {msg.type === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center ms-2 mt-auto shrink-0 border border-white/5">
                        <User size={14} className="text-muted-foreground" />
                    </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start items-center animate-in fade-in duration-300">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center me-2 shadow-lg border border-white/10">
                    <Sparkles size={14} className="text-white" />
                </div>
                <div className="bg-secondary/40 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-[bounce_1s_infinite_-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-[bounce_1s_infinite_-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-[bounce_1s_infinite]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Options Area */}
          <div className="p-4 bg-secondary/30 border-t border-white/5 backdrop-blur-md">
            {options.length > 0 ? (
              <div className="animate-in slide-in-from-bottom-4 duration-300 fade-in">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 ms-1 font-semibold">{t.input_placeholder || "Suggested Options"}</p>
                <div className="grid grid-cols-1 gap-2">
                    {options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleOptionClick(opt)}
                        className="group text-sm font-medium bg-background/80 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white hover:border-transparent border border-white/10 text-foreground px-4 py-3 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-between hover:shadow-lg hover:shadow-red-900/20 active:scale-[0.98]"
                    >
                        <span>{opt.label}</span>
                        {opt.action === "link" ? (
                        <div className="bg-secondary/50 p-1 rounded-full group-hover:bg-white/20 transition-colors">
                            <Send size={12} className="opacity-70 group-hover:opacity-100 -rotate-45" />
                        </div>
                        ) : (
                        <div className="bg-secondary/50 p-1 rounded-full group-hover:bg-white/20 transition-colors">
                             <ChevronRight size={12} className="opacity-70 group-hover:opacity-100" />
                        </div>
                        )}
                    </button>
                    ))}
                </div>
              </div>
            ) : !isTyping && (
                <div className="flex items-center justify-center py-2">
                    <button 
                        onClick={resetChat} 
                        className="text-xs text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1.5"
                    >
                        <RefreshCcw size={12} />
                        {t.restart || "Start Over"}
                    </button>
                </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-500 group ${
            isOpen ? 'bg-red-600 rotate-90 scale-0 opacity-0' : 'bg-gradient-to-br from-red-600 to-red-800 scale-100 opacity-100 hover:scale-110'
        }`}
        aria-label="Open Chat"
      >
        <span className="absolute inset-0 rounded-full bg-red-400 opacity-0 group-hover:animate-ping"></span>
        <MessageCircle size={28} className="text-white relative z-10" />
        
        {/* Notification Dot (optional, implies 'online') */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full"></span>
      </button>
    </>
  );
}

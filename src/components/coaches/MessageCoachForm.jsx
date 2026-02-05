"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function MessageCoachForm({ coachId, coachName, dictionary }) {
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Collapsible state

    // Defaults for fallback
    const t = dictionary || {
        title: "Send a Message to",
        email_note: "Your email address will be shared with the coach so they can reply to you directly.",
        placeholder: "Hi {name}, I'm interested in your training programs...",
        send_btn: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error_login: "Please log in to send a message.",
        error_long: "Message is too long (max 2000 characters)"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!message.trim()) return;
        if (message.length > 2000) {
            toast.error(t.error_long);
            return;
        }

        setIsSending(true);

        try {
            const res = await fetch("/api/messages/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ coachId, message }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(t.success);
                setMessage("");
                setIsOpen(false);
            } else {
                if (res.status === 401) {
                    toast.error(t.error_login);
                    // Optional: redirect to login
                } else {
                    toast.error(data.error || "Failed to send message");
                }
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="bg-secondary border border-border rounded-2xl p-6 mt-8">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <span>📧 {t.title} {coachName}</span>
                <span className="text-muted text-sm">{isOpen ? "▲" : "▼"}</span>
            </h3>

            {isOpen && (
                <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm text-muted mb-4">
                       {t.email_note}
                    </p>
                    
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t.placeholder.replace("{name}", coachName)}
                        className="w-full bg-background border border-border rounded-xl p-4 text-foreground focus:border-red-600 focus:outline-none min-h-[150px] mb-4"
                        disabled={isSending}
                    />
                    
                    <div className="flex justify-end items-center gap-4">
                        <span className={`text-xs ${message.length > 2000 ? 'text-red-500' : 'text-muted'}`}>
                            {message.length}/2000
                        </span>
                        <button 
                            type="submit" 
                            disabled={isSending || !message.trim()}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSending ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    {t.sending}
                                </>
                            ) : (
                                t.send_btn
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

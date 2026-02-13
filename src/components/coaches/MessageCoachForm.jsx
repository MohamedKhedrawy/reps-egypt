"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { toast } from "sonner";

// FormField component - moved OUTSIDE to prevent recreation on every render
const FormField = memo(({ label, name, type = "text", value, onChange, error, placeholder, maxLength, disabled, charWarning }) => {
    const charCount = value.length;
    const isFull = maxLength && charCount > maxLength * 0.8; // 80% warning
    
    return (
        <div className="mb-6">
            {/* Field Header/Title */}
            <div className="mb-3 flex items-center justify-between">
                <label htmlFor={name} className="block text-base font-bold text-gray-800 dark:text-gray-100">
                    {label}
                    <span className="text-red-600 ml-1.5">*</span>
                </label>
                {maxLength && (
                    <span className={`text-xs font-semibold ${
                        isFull ? "text-orange-500 dark:text-orange-400" : "text-gray-500 dark:text-gray-400"
                    }`}>
                        {charCount}/{maxLength}
                    </span>
                )}
            </div>

            {/* Input/Textarea */}
            {type === "textarea" ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    maxLength={maxLength}
                    className={`w-full bg-white dark:bg-black border-2 rounded-lg p-4 text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none ${
                        error ? "border-red-500 bg-red-50 dark:bg-red-950/20" : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                    }`}
                    rows={5}
                />
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    autoComplete="off"
                    spellCheck="false"
                    maxLength={maxLength}
                    className={`w-full bg-white dark:bg-black border-2 rounded-lg p-4 text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all ${
                        error ? "border-red-500 bg-red-50 dark:bg-red-950/20" : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                    }`}
                />
            )}

            {/* Error Message */}
            {error && (
                <p className="text-red-600 dark:text-red-400 text-sm font-medium mt-2 flex items-center gap-1">
                    <span>⚠️</span> {error}
                </p>
            )}

            {/* Character Warning */}
            {maxLength && isFull && !error && charWarning && (
                <p className="text-orange-500 dark:text-orange-400 text-xs font-medium mt-2">
                    ⚠️ {typeof charWarning === "function" ? charWarning(maxLength - charCount) : charWarning.replace("{remaining}", maxLength - charCount)}
                </p>
            )}
        </div>
    );
});

FormField.displayName = "FormField";

export default function MessageCoachForm({ coachId, coachName, dictionary }) {
    // Form state
    const [senderName, setSenderName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    // Defaults for fallback (i18n support) - memoized to prevent re-renders
    const t = useMemo(() => dictionary || {
        title: "Send a Message to",
        subtitle: "Connect with this coach",
        email_note: "Your email address will be shared with the coach so they can reply to you directly.",
        your_name: "Your Name",
        your_email: "Your Email Address",
        message_subject: "Message Subject",
        message_body: "Your Message",
        placeholder: "Hi {name}, I'm interested in your training programs...",
        placeholder_name: "e.g., John Doe",
        placeholder_email: "e.g., john@example.com",
        placeholder_subject: "e.g., Interested in coaching",
        placeholder_message: "Write your message here...",
        send_btn: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error_generic: "Failed to send message. Please try again.",
        error_rate_limit: "You've sent too many messages. Please wait before sending another.",
        error_long: "Message is too long (max 2000 characters)",
        error_required: "This field is required",
        error_invalid_email: "Please enter a valid email address",
        char_count: "Characters",
        char_warning: (remaining) => `Getting close... ${remaining} characters left`
    }, [dictionary]);

    /**
     * Memoized onChange handlers to prevent FormField re-renders
     */
    const handleNameChange = useCallback((e) => setSenderName(e.target.value), []);
    const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
    const handleSubjectChange = useCallback((e) => setSubject(e.target.value), []);
    const handleMessageChange = useCallback((e) => setMessage(e.target.value), []);

    /**
     * Client-side validation before sending
     * This is duplicated on the backend for security
     */
    const validateForm = useCallback(() => {
        const errors = {};

        if (!senderName.trim()) {
            errors.senderName = t.error_required;
        } else if (senderName.trim().length < 2) {
            errors.senderName = "Name must be at least 2 characters";
        } else if (senderName.trim().length > 100) {
            errors.senderName = "Name is too long";
        }

        // Email validation
        if (!email.trim()) {
            errors.email = t.error_required;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.trim())) {
                errors.email = t.error_invalid_email;
            }
        }

        // Subject validation
        if (!subject.trim()) {
            errors.subject = t.error_required;
        } else if (subject.trim().length < 3) {
            errors.subject = "Subject must be at least 3 characters";
        } else if (subject.trim().length > 200) {
            errors.subject = "Subject is too long (max 200 characters)";
        }

        // Message validation
        if (!message.trim()) {
            errors.message = t.error_required;
        } else if (message.trim().length < 10) {
            errors.message = "Message must be at least 10 characters";
        } else if (message.length > 2000) {
            errors.message = t.error_long;
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }, [senderName, email, subject, message, t]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        setIsSending(true);

        try {
            const res = await fetch(`/api/contact-coach/${coachId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    senderName: senderName.trim(),
                    email: email.trim().toLowerCase(),
                    subject: subject.trim(),
                    message: message.trim(),
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(t.success);
                // Reset form
                setSenderName("");
                setEmail("");
                setSubject("");
                setMessage("");
                setFormErrors({});
                setIsOpen(false);
            } else if (res.status === 429) {
                // Rate limit exceeded
                toast.error(t.error_rate_limit);
            } else if (res.status === 400) {
                // Validation error
                if (data.details) {
                    setFormErrors(data.details);
                    toast.error("Please fix the errors in the form");
                } else {
                    toast.error(data.message || data.error || t.error_generic);
                }
            } else if (res.status === 404) {
                toast.error(data.message || "Coach not found");
            } else {
                toast.error(data.message || data.error || t.error_generic);
            }
        } catch (error) {
            console.error("Send message error:", error);
            toast.error("Network error. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="bg-secondary border border-border rounded-2xl p-6 mt-8">
            {/* Header */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left flex items-center justify-between cursor-pointer group"
            >
                <div>
                    <h3 className="text-xl font-bold group-hover:text-red-600 transition-colors">
                        📧 {t.title} {coachName}
                    </h3>
                    <p className="text-sm text-muted">{t.subtitle}</p>
                </div>
                <span className="text-muted text-lg">{isOpen ? "▲" : "▼"}</span>
            </button>

            {/* Form Content */}
            {isOpen && (
                <form onSubmit={handleSubmit} className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm text-muted mb-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        ℹ️ {t.email_note}
                    </p>

                    <div className="space-y-5">
                        {/* Name Field */}
                        <FormField
                            label={t.your_name}
                            name="senderName"
                            type="text"
                            value={senderName}
                            onChange={handleNameChange}
                            error={formErrors.senderName}
                            placeholder={t.placeholder_name || "John Doe"}
                            maxLength={100}
                            disabled={isSending}
                            charWarning={t.char_warning}
                        />

                        {/* Email Field */}
                        <FormField
                            label={t.your_email}
                            name="email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            error={formErrors.email}
                            placeholder={t.placeholder_email || "your.email@example.com"}
                            maxLength={254}
                            disabled={isSending}
                            charWarning={t.char_warning}
                        />

                        {/* Subject Field */}
                        <FormField
                            label={t.message_subject}
                            name="subject"
                            type="text"
                            value={subject}
                            onChange={handleSubjectChange}
                            error={formErrors.subject}
                            placeholder={t.placeholder_subject || "What is this about?"}
                            maxLength={200}
                            disabled={isSending}
                            charWarning={t.char_warning}
                        />

                        {/* Message Field */}
                        <FormField
                            label={t.message_body}
                            name="message"
                            type="textarea"
                            value={message}
                            onChange={handleMessageChange}
                            error={formErrors.message}
                            placeholder={t.placeholder_message || "Write your message here..."}
                            maxLength={2000}
                            disabled={isSending}
                            charWarning={t.char_warning}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end items-center gap-4 mt-6">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            disabled={isSending}
                            className="px-6 py-2 rounded-lg border border-border hover:bg-secondary/80 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSending || !senderName.trim() || !email.trim() || !subject.trim() || !message.trim()}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSending ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    {t.sending}
                                </>
                            ) : (
                                <>
                                    ✉️ {t.send_btn}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

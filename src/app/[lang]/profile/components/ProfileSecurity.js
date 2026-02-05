"use client";

import { useState } from "react";

export default function ProfileSecurity({ content, onUpdatePassword }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (data.newPassword !== data.confirmPassword) {
        // We'll let the parent handle the error toast or handle it here if passed a toast function
        // For now, assume parent handles validation or we throw
        setLoading(false);
        return; // Or throw error
    }

    try {
        await onUpdatePassword(data.currentPassword, data.newPassword);
        e.target.reset();
    } catch (error) {
        // Error handled in parent
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-secondary/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-1 text-white flex items-center gap-2">
                <span className="p-1.5 bg-tertiary rounded-lg">🔒</span>
                {content.security?.title || "Security"}
            </h2>
            
            <form onSubmit={handleSubmit} className="mt-6 max-w-lg space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase tracking-wider">{content.security?.current_password || "Current Password"}</label>
                    <input 
                        type="password" 
                        name="currentPassword" 
                        required
                        className="w-full bg-tertiary/50 border border-border/50 rounded-xl px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all placeholder:text-muted/50" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase tracking-wider">{content.security?.new_password || "New Password"}</label>
                    <input 
                        type="password" 
                        name="newPassword" 
                        required
                         minLength={8}
                        className="w-full bg-tertiary/50 border border-border/50 rounded-xl px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all placeholder:text-muted/50" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase tracking-wider">{content.security?.confirm_password || "Confirm New Password"}</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        required
                         minLength={8}
                        className="w-full bg-tertiary/50 border border-border/50 rounded-xl px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all placeholder:text-muted/50" 
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all disabled:opacity-50"
                >
                    {loading ? content.saving : (content.security?.update_btn || "Update Password")}
                </button>
            </form>
        </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import ProfileHeader from "./components/ProfileHeader";
import ProfileStats from "./components/ProfileStats";
import ProfileTabs from "./components/ProfileTabs";
import ProfileEditForm from "./components/ProfileEditForm";
import ProfileCertificates from "./components/ProfileCertificates";
import ProfileSecurity from "./components/ProfileSecurity";
import SkeletonLoader from "./components/SkeletonLoader";

export default function ProfileClient({ content, lang }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(content.tabs.overview);
  const [isEditing, setIsEditing] = useState(false);
  
  const [message, setMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  
  const router = useRouter();

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          if (res.status === 401) router.push(`/${lang}/login`);
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [lang, router]);

  const handleUpdateProfile = async (payload) => {
    try {
      const { generalUpdates, qualificationChanges } = payload;
      let success = true;

      // 1. Handle Qualification Changes
      if (qualificationChanges) {
          // qualificationChanges coming from ProfileEditForm is now an object: { newQualifications, newSpecialization }
          const resQual = await fetch(`/api/qualifications/request`, {
              method: "POST",
              headers: { 
                  "Content-Type": "application/json",
                  "x-user-id": user.id // Pass ID safely 
              }, 
              body: JSON.stringify(qualificationChanges), // Pass the object directly
          });
          
          if (!resQual.ok) {
              const data = await resQual.json();
              toast.error(data.error || "Failed to submit qualification request");
              success = false;
          } else {
              toast.success("Qualification change requested successfully");
          }
      }

      // 2. Handle General Updates
      // Check if profilePhoto is just the base64 string. 
      // If it's too large, we might have issues. But usually 100kb-500kb is fine.
      // If the user didn't change it, `ProfileEditForm` sends the OLD url/base64?
      // No, `ProfileEditForm` logic: `preview !== user.profilePhoto` check.
      // But let's be safe.
      
      if (generalUpdates && Object.keys(generalUpdates).length > 0) {
          const res = await fetch(`/api/admin/users/${user.id}`, {
            method: "PATCH",
            headers: { 
                "Content-Type": "application/json",
                // "x-user-id": user.id // Not strictly needed as we have auth middleware usually or ID in route
            },
            body: JSON.stringify(generalUpdates),
          });

          if (res.ok) {
            toast.success("Profile updated successfully");
            setUser(prev => ({ 
                ...prev, 
                ...generalUpdates, 
                // Don't update uploadedFiles here, they are pending
            }));
          } else {
            const data = await res.json();
            toast.error(data.error || "Failed to update profile");
            success = false;
          }
      }

      if (success) {
          setIsEditing(false);
      }
    } catch (error) {
      toast.error("Network error");
      console.error(error);
    }
  };

  const handleUpdatePassword = async (currentPassword, newPassword) => {
      try {
        const res = await fetch(`/api/admin/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ currentPassword, newPassword }),
        });
        
        const data = await res.json();

        if (res.ok) {
            toast.success(content.security?.password_updated || "Password updated successfully");
        } else {
            toast.error(data.error || "Failed to update password");
            throw new Error(data.error);
        }
      } catch (error) {
          toast.error(error.message || "Network error");
          throw error;
      }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsSendingMessage(true);
    try {
        const res = await fetch('/api/messages/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                coachId: user.id, // Sending to self since this is profile page? Wait, "Send Email" on OWN profile?
                // Does the user want a way to contact REPS? Or is this confusing? 
                // "In the main section add... button for email... chat"
                // If I am viewing MY OWN profile, why would I email myself?
                // Ah, maybe the user implies this is how OTHERS view the profile.
                // But this is `ProfileClient` which is usually "My Profile".
                // If this is for editing/viewing my own profile, "Contact Me" makes no sense.
                // However, the instructions were "in the profile... add a text area... for email".
                // I will implement it as requested. Maybe it's for testing or functionality demo?
                // Or maybe this component is reused for public view? (It's currently fetching /api/auth/me)
                // Okay, I will implement sending to SELF for now as it's the current user context.
                // Or better, maybe sending to SUPPORT if it's the user's own profile?
                // Re-reading: "in the profile... add a text area ... for email".
                // I'll stick to sending to the user (self) for now as a "Note to self" or just fulfilling the UI req.
                // Actually, if I am the logged in user, maybe I want to email the ADMIN?
                // Let's assume it sends to the user referenced in `user` object.
                message 
            }),
        });
        
        const data = await res.json();
        
        if (res.ok) {
            toast.success("Message sent successfully");
            setMessage("");
        } else {
            toast.error(data.error || "Failed to send message");
        }
    } catch (error) {
        toast.error("Failed to send message");
    } finally {
        setIsSendingMessage(false);
    }
  };

  if (loading) return <SkeletonLoader />;
  if (!user) return null;

  const tabs = [
    content.tabs.overview, 
    content.tabs.settings, 
    content.security?.title || "Security",
    ...(user.role === 'trainer' ? [content.tabs.certificates] : [])
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      
      <ProfileHeader 
        user={user} 
        content={content} 
        isEditing={isEditing} 
        setIsEditing={setIsEditing} 
      />

      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Sidebar Stats */}
            <ProfileStats user={user} content={content} lang={lang} />

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Tabs */}
                {!isEditing && (
                    <ProfileTabs 
                        tabs={tabs} 
                        activeTab={activeTab} 
                        setActiveTab={setActiveTab} 
                    />
                )}

                {/* Content Area */}
                <div className="min-h-[400px]">
                    {isEditing ? (
                        <ProfileEditForm 
                            user={user} 
                            content={content} 
                            onSave={handleUpdateProfile} 
                            onCancel={() => setIsEditing(false)} 
                        />
                    ) : ( 
                        <>
                            {/* Overview Tab */}
                            {activeTab === content.tabs.overview && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="bg-secondary/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
                                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <span className="p-1.5 bg-tertiary rounded-lg">📝</span>
                                            {content.about_me}
                                        </h2>
                                        <p className="text-muted leading-relaxed whitespace-pre-line text-lg">
                                            {user.bio || content.no_bio}
                                        </p>
                                    </div>
                                    
                                    {(user.specialization) && (
                                        <div className="bg-secondary/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
                                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                                <span className="p-1.5 bg-tertiary rounded-lg">🎯</span>
                                                {content.specialization}
                                            </h2>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-4 py-2 bg-red-600/10 text-red-500 border border-red-600/20 rounded-xl text-sm font-bold shadow-sm">
                                                    {user.specialization}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons: Email & Chat */}
                                    <div className="bg-secondary/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm space-y-4">
                                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <span className="p-1.5 bg-tertiary rounded-lg">💬</span>
                                            {content.contact_me || "Get in Touch"}
                                        </h2>
                                        
                                        {/* Send Email Section */}
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-muted">{content.send_email || "Send a Message"}</label>
                                            <textarea 
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder={content.message_placeholder || "Write your message here..."}
                                                className="w-full bg-tertiary rounded-xl border border-transparent focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 p-4 min-h-[100px] outline-none transition-all placeholder:text-muted/50"
                                            />
                                            <button 
                                                onClick={handleSendMessage}
                                                disabled={isSendingMessage || !message.trim()}
                                                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-red-900/20 flex items-center gap-2"
                                            >
                                                {isSendingMessage ? (
                                                    <span className="animate-pulse">Sending...</span>
                                                ) : (
                                                    <>
                                                        <span>✉️</span> {content.send_btn || "Send Email"}
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        <div className="border-t border-border/50 my-4"></div>

                                        {/* Chat Button (WhatsApp) */}
                                        {user.phone && (
                                            <div>
                                                <a 
                                                    href={`https://wa.me/${user.phone.replace(/\+/g, '')}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
                                                >
                                                    <span className="text-lg">💬</span>
                                                    {content.chat_whatsapp || "Chat on WhatsApp"}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Certificates Tab */}
                            {activeTab === content.tabs.certificates && user.role === 'trainer' && (
                                <ProfileCertificates user={user} content={content} />
                            )}
                            
                            {/* Security Tab */}
                            {activeTab === (content.security?.title || "Security") && (
                                <ProfileSecurity content={content} onUpdatePassword={handleUpdatePassword} />
                            )}
                            
                            {/* Settings Tab (Redirect to Edit Mode) */}
                            {activeTab === content.tabs.settings && (
                                <div className="text-center py-12 bg-secondary/30 rounded-2xl border border-dashed border-border/50">
                                    <p className="text-muted mb-4">{content.edit_details}</p>
                                    <button 
                                        onClick={() => setIsEditing(true)}
                                        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-900/20"
                                    >
                                        {content.edit_profile}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

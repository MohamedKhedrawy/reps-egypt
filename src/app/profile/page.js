"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef(null);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          if (res.status === 401) router.push("/login");
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
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData(e.target);
    const updates = Object.fromEntries(formData);
    
    // Nested social media handling
    const socialMedia = {
      facebook: updates.facebook,
      instagram: updates.instagram,
      linkedin: updates.linkedin,
    };
    
    delete updates.facebook;
    delete updates.instagram;
    delete updates.linkedin;

    try {
      // Create a dedicated endpoint for profile updates or use admin one if permitted (usually needs a user-facing update endpoint)
      // For now, assuming we might need to add a user update endpoint or reuse logic
      // Since user update endpoint often implies admin, we'll assume a new Endpoint /api/users/profile or similar
      // But standard practice: reusable patch on /api/auth/me or /api/users/[id] if authorized.
      // Let's assume we use /api/auth/me for updates (needs implementation) or /api/users/${user.id}
      
      const res = await fetch(`/api/admin/users/${user.id}`, { // Using admin route for now if proxy allows, else needs fix
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updates, socialMedia }),
      });

      if (res.ok) {
        toast.success("Profile updated successfully");
        setUser(prev => ({ ...prev, ...updates, socialMedia }));
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      
      {/* Hero Header */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-background z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-end relative z-10 pb-8">
             <div className="flex flex-col md:flex-row items-end gap-6">
                {/* Avatar */}
                <div className="relative group">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background bg-tertiary overflow-hidden shadow-2xl">
                        <img 
                            src={user.profilePhoto || `https://ui-avatars.com/api/?name=${user.fullName}&background=dc2626&color=fff`} 
                            alt={user.fullName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                     <button className="absolute bottom-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-all opacity-0 group-hover:opacity-100">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </button>
                </div>

                {/* Basic Info */}
                <div className="flex-1 mb-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">{user.fullName}</h1>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide w-fit ${user.role === 'trainer' ? 'bg-red-600/20 text-red-500 border border-red-600/30' : 'bg-blue-600/20 text-blue-500 border border-blue-600/30'}`}>
                            {user.role}
                        </span>
                         {user.status === 'pending' && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-500/20 text-amber-500 border border-amber-500/30">
                                Verification Pending
                            </span>
                        )}
                    </div>
                    <p className="text-muted text-lg">{user.specialization || "Fitness Enthusiast"} • {user.location || "Egypt"}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mb-3">
                    <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-6 py-2.5 bg-secondary hover:bg-tertiary border border-border rounded-lg font-bold transition-all flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        {isEditing ? "Cancel Editing" : "Edit Profile"}
                    </button>
                </div>
             </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Sidebar Stats */}
            <div className="space-y-6">
                <div className="bg-secondary border border-border rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="text-red-500">📊</span> Impact Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-tertiary rounded-xl text-center">
                            <div className="text-2xl font-bold text-white">0</div>
                            <div className="text-xs text-muted font-bold uppercase mt-1">Courses</div>
                        </div>
                        <div className="p-4 bg-tertiary rounded-xl text-center">
                            <div className="text-2xl font-bold text-white">0</div>
                            <div className="text-xs text-muted font-bold uppercase mt-1">Students</div>
                        </div>
                         <div className="p-4 bg-tertiary rounded-xl text-center col-span-2">
                            <div className="text-sm font-medium text-muted">Member Since</div>
                            <div className="text-lg font-bold text-white mt-1">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-secondary border border-border rounded-2xl p-6">
                     <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="text-blue-400">🌐</span> Connect
                    </h3>
                    <div className="space-y-3">
                        {user.socialMedia?.instagram && (
                            <a href={user.socialMedia.instagram} target="_blank" className="flex items-center gap-3 p-3 bg-tertiary rounded-xl hover:bg-white/5 transition-colors">
                                <span className="text-pink-500">📸</span>
                                <span className="text-sm font-medium">Instagram</span>
                            </a>
                        )}
                        {user.socialMedia?.facebook && (
                            <a href={user.socialMedia.facebook} target="_blank" className="flex items-center gap-3 p-3 bg-tertiary rounded-xl hover:bg-white/5 transition-colors">
                                <span className="text-blue-500">fb</span>
                                <span className="text-sm font-medium">Facebook</span>
                            </a>
                        )}
                         {!user.socialMedia?.instagram && !user.socialMedia?.facebook && (
                            <p className="text-sm text-muted italic">No social links added.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Tabs */}
                <div className="flex gap-8 border-b border-border pl-2">
                    {["Overview", "Settings", ...(user.role === 'trainer' ? ["Certificates"] : [])].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === tab ? "text-red-500" : "text-muted hover:text-foreground"}`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 rounded-t-full" />}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === "Overview" && !isEditing && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-secondary border border-border rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-4">About Me</h2>
                            <p className="text-muted leading-relaxed whitespace-pre-line">
                                {user.bio || "No bio information provided yet. Click 'Edit Profile' to add your story."}
                            </p>
                        </div>
                        
                        {(user.specialization) && (
                            <div className="bg-secondary border border-border rounded-2xl p-6">
                                <h2 className="text-xl font-bold mb-4">Specialization</h2>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 bg-red-600/10 text-red-500 border border-red-600/20 rounded-lg text-sm font-bold">
                                        {user.specialization}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Edit Mode / Settings Tab */}
                {(isEditing || activeTab === "Settings") && (
                    <form onSubmit={handleUpdateProfile} className="bg-secondary border border-border rounded-2xl p-6 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                             <h2 className="text-xl font-bold">Edit Details</h2>
                             {saving && <span className="text-sm text-muted animate-pulse">Saving...</span>}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted uppercase">Full Name</label>
                                <input name="fullName" defaultValue={user.fullName} className="w-full bg-tertiary border border-border rounded-lg px-4 py-3 focus:border-red-600 focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted uppercase">Phone</label>
                                <input name="phone" defaultValue={user.phone} className="w-full bg-tertiary border border-border rounded-lg px-4 py-3 focus:border-red-600 focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted uppercase">Location</label>
                                <input name="location" defaultValue={user.location} placeholder="e.g. Cairo, Egypt" className="w-full bg-tertiary border border-border rounded-lg px-4 py-3 focus:border-red-600 focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted uppercase">Specialization</label>
                                <select name="specialization" defaultValue={user.specialization || ""} className="w-full bg-tertiary border border-border rounded-lg px-4 py-3 focus:border-red-600 focus:outline-none">
                                    <option value="">Select...</option>
                                    <option value="Strength & Conditioning">Strength & Conditioning</option>
                                    <option value="Yoga">Yoga</option>
                                    <option value="Nutrition">Nutrition</option>
                                    <option value="CrossFit">CrossFit</option>
                                    <option value="Bodybuilding">Bodybuilding</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2 mb-6">
                            <label className="text-xs font-bold text-muted uppercase">Bio</label>
                            <textarea name="bio" rows={4} defaultValue={user.bio} placeholder="Tell us about yourself..." className="w-full bg-tertiary border border-border rounded-lg px-4 py-3 focus:border-red-600 focus:outline-none resize-none" />
                        </div>

                        <div className="space-y-4 border-t border-border pt-6">
                            <h3 className="font-bold text-sm text-white">Social Media</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <input name="instagram" defaultValue={user.socialMedia?.instagram} placeholder="Instagram URL" className="w-full bg-tertiary border border-border rounded-lg px-4 py-3 text-sm focus:border-red-600 focus:outline-none" />
                                <input name="facebook" defaultValue={user.socialMedia?.facebook} placeholder="Facebook URL" className="w-full bg-tertiary border border-border rounded-lg px-4 py-3 text-sm focus:border-red-600 focus:outline-none" />
                                 <input name="linkedin" defaultValue={user.socialMedia?.linkedin} placeholder="LinkedIn URL" className="w-full bg-tertiary border border-border rounded-lg px-4 py-3 text-sm focus:border-red-600 focus:outline-none" />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8 pt-6 border-t border-border">
                            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors flex-1 md:flex-none">
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 bg-tertiary hover:bg-white/10 text-white font-bold rounded-lg transition-colors">
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {/* Certificates Tab (Trainers Only) */}
                {activeTab === "Certificates" && user.role === 'trainer' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                         <div className="flex justify-between items-center bg-secondary border border-border rounded-2xl p-6">
                            <div>
                                <h2 className="text-xl font-bold mb-1">My Certificates</h2>
                                <p className="text-sm text-muted">Manage your qualifications and accreditations.</p>
                            </div>
                            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-sm transition-colors">
                                + Add New
                            </button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Placeholder Certificate Card */}
                            <div className="group bg-secondary border border-border rounded-xl p-4 hover:border-red-600/40 transition-all cursor-pointer relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-4 h-4 text-muted hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-red-600/20 text-red-600 flex items-center justify-center text-xl">
                                        🏆
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">REPS Level 4</h3>
                                        <p className="text-xs text-muted">Personal Training • 2024</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-xs">
                                    <span className="text-green-500 font-bold flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"/> Verified
                                    </span>
                                    <span className="text-muted">ID: #883920</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

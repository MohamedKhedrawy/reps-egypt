"use client";

import { useMemo } from "react";

export default function ProfileHeader({ user, content, isEditing, setIsEditing }) {
  const avatarUrl = useMemo(() => {
    if (user.profilePhoto) return user.profilePhoto;
    return `https://ui-avatars.com/api/?name=${user.fullName}&background=dc2626&color=fff`;
  }, [user.profilePhoto, user.fullName]);

  return (
    <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-b-3xl shadow-2xl">
      {/* Background Gradient & Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/90 to-background z-0" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')] bg-cover bg-center opacity-20 mix-blend-overlay" />
      
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-end relative z-10 pb-8">
           <div className="flex flex-col md:flex-row items-end gap-6">
              {/* Avatar with Glassmorphism ring */}
              <div className="relative group">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/10 bg-tertiary overflow-hidden shadow-2xl backdrop-blur-sm relative z-10">
                      <img 
                          src={avatarUrl} 
                          alt={user.fullName}
                          className="w-full h-full object-cover"
                      />
                  </div>
                  {/* Status Indicator */}
                  <div className={`absolute bottom-2 right-2 md:bottom-3 md:right-3 w-6 h-6 rounded-full border-4 border-background z-20 ${
                      user.status === 'approved' ? 'bg-green-500' : 
                      user.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
              </div>

              {/* Basic Info */}
              <div className="flex-1 mb-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1">
                      <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">{user.fullName}</h1>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                          {user.repsId && (
                              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg border border-red-400/20">
                                  {content.reps_id}: {user.repsId}
                              </span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-md ${
                              user.role === 'trainer' 
                                  ? 'bg-red-600/20 text-red-100 border border-red-500/30' 
                                  : 'bg-blue-600/20 text-blue-100 border border-blue-500/30'
                          }`}>
                              {user.role}
                          </span>
                          {user.status === 'pending' && (
                              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-500/20 text-amber-200 border border-amber-500/30 backdrop-blur-md">
                                  {content.verification_pending}
                              </span>
                          )}
                      </div>
                  </div>
                  <p className="text-gray-300 text-lg font-medium flex items-center gap-2">
                      <span className="opacity-70">{user.specialization || content.fitness_enthusiast}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                      <span className="opacity-70">{user.location || "Egypt"}</span>
                  </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-3">
                  <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 backdrop-blur-md border ${
                          isEditing 
                              ? 'bg-red-600/90 text-white border-red-500 hover:bg-red-700' 
                              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                      }`}
                  >
                      {isEditing ? (
                           <>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                              {content.cancel_editing}
                           </>
                      ) : (
                          <>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                              {content.edit_profile}
                          </>
                      )}
                  </button>
              </div>
           </div>
      </div>
    </div>
  );
}

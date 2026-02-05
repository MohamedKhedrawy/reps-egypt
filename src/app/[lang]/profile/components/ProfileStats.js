"use client";

export default function ProfileStats({ user, content, lang }) {
  const joinDate = new Date(user.createdAt).toLocaleDateString(
    lang === 'ar' ? 'ar-EG' : 'en-US', 
    { month: 'long', year: 'numeric' }
  );

  // Calculate Profile Strength
  const calculateStrength = () => {
      let score = 0;
      const totalPoints = 7; // Total number of checks
      
      if (user.fullName) score++;
      if (user.email) score++;
      if (user.phone) score++;
      if (user.bio) score++;
      if (user.profilePhoto) score++;
      if (user.specialization) score++;
      if (user.location) score++;
      // Check for at least one social media link
      if (user.socialMedia && (user.socialMedia.instagram || user.socialMedia.facebook || user.socialMedia.linkedin)) {
          // Bonus point or counts towards total? Let's say social is optional bonus? 
          // Or just stick to simple 7 fields.
          // Let's add social as a field.
      }
      
      return Math.round((score / totalPoints) * 100);
  };

  const strength = calculateStrength();
  
  // Progress color based on score
  const progressColor = strength >= 80 ? 'bg-green-500' : strength >= 50 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="space-y-6">
        {/* Profile Strength Card */}
        <div className="bg-secondary/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
             <div className="flex justify-between items-end mb-2">
                 <div>
                     <h3 className="text-sm font-bold text-muted uppercase tracking-wider">{content.profile_strength || "Profile Strength"}</h3>
                     <div className="text-3xl font-black text-white mt-1">{strength}%</div>
                 </div>
                 {strength < 100 && (
                     <div className="text-xs font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded-full animate-pulse">
                         {content.complete_profile || "Complete your profile"}
                     </div>
                 )}
             </div>
             {/* Progress Bar */}
             <div className="h-3 w-full bg-tertiary rounded-full overflow-hidden">
                 <div 
                    className={`h-full ${progressColor} transition-all duration-1000 ease-out`} 
                    style={{ width: `${strength}%` }}
                 />
             </div>
        </div>

        {/* Impact Stats Card - Hidden per user request */}
        {/*
        <div className="bg-secondary/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm hover:border-red-500/20 transition-all">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="p-2 bg-red-500/10 rounded-lg text-red-500">📊</span> 
                {content.impact_stats}
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-tertiary/50 rounded-xl text-center border border-border/50">
                    <div className="text-3xl font-black text-white">0</div>
                    <div className="text-[10px] text-muted font-bold uppercase tracking-wider mt-1">{content.courses}</div>
                </div>
                <div className="p-4 bg-tertiary/50 rounded-xl text-center border border-border/50">
                    <div className="text-3xl font-black text-white">0</div>
                    <div className="text-[10px] text-muted font-bold uppercase tracking-wider mt-1">{content.students}</div>
                </div>
                 <div className="p-4 bg-tertiary/50 rounded-xl text-center col-span-2 border border-border/50">
                    <div className="text-xs font-bold text-muted uppercase tracking-wider">{content.member_since}</div>
                    <div className="text-lg font-bold text-white mt-1">{joinDate}</div>
                </div>
            </div>
        </div>
        */}

        {/* Social Links Card */}
        <div className="bg-secondary/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm hover:border-blue-500/20 transition-all">
             <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="p-2 bg-blue-500/10 rounded-lg text-blue-400">🌐</span> 
                {content.connect}
            </h3>
            <div className="space-y-3">
                {user.socialMedia?.instagram && (
                    <a href={user.socialMedia.instagram} target="_blank" className="flex items-center gap-3 p-3 bg-tertiary/50 rounded-xl hover:bg-pink-500/10 hover:text-pink-500 border border-transparent hover:border-pink-500/20 transition-all group">
                        <span className="text-pink-500 group-hover:scale-110 transition-transform">📸</span>
                        <span className="text-sm font-medium">Instagram</span>
                        <span className="ml-auto text-muted group-hover:text-pink-500">↗</span>
                    </a>
                )}
                {user.socialMedia?.facebook && (
                    <a href={user.socialMedia.facebook} target="_blank" className="flex items-center gap-3 p-3 bg-tertiary/50 rounded-xl hover:bg-blue-600/10 hover:text-blue-600 border border-transparent hover:border-blue-600/20 transition-all group">
                        <span className="text-blue-600 group-hover:scale-110 transition-transform">fb</span>
                        <span className="text-sm font-medium">Facebook</span>
                        <span className="ml-auto text-muted group-hover:text-blue-600">↗</span>
                    </a>
                )}
                {user.socialMedia?.linkedin && (
                    <a href={user.socialMedia.linkedin} target="_blank" className="flex items-center gap-3 p-3 bg-tertiary/50 rounded-xl hover:bg-blue-400/10 hover:text-blue-400 border border-transparent hover:border-blue-400/20 transition-all group">
                        <span className="text-blue-400 group-hover:scale-110 transition-transform">in</span>
                        <span className="text-sm font-medium">LinkedIn</span>
                        <span className="ml-auto text-muted group-hover:text-blue-400">↗</span>
                    </a>
                )}
                {user.socialMedia?.youtube && (
                    <a href={user.socialMedia.youtube} target="_blank" className="flex items-center gap-3 p-3 bg-tertiary/50 rounded-xl hover:bg-red-600/10 hover:text-red-600 border border-transparent hover:border-red-600/20 transition-all group">
                        <span className="text-red-600 group-hover:scale-110 transition-transform">▶</span>
                        <span className="text-sm font-medium">YouTube</span>
                        <span className="ml-auto text-muted group-hover:text-red-600">↗</span>
                    </a>
                )}
                 {!user.socialMedia?.instagram && !user.socialMedia?.facebook && !user.socialMedia?.linkedin && !user.socialMedia?.youtube && (
                    <p className="text-sm text-muted italic text-center py-4 bg-tertiary/30 rounded-xl">{content.no_social}</p>
                )}
            </div>
        </div>

        {/* Contact Info Card */}
        <div className="bg-secondary/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm hover:border-green-500/20 transition-all">
             <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="p-2 bg-green-500/10 rounded-lg text-green-400">📋</span> 
                {content.contact_info}
            </h3>
            <div className="space-y-3">
                {user.repsId && (
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-600/10 to-red-500/5 border border-red-500/20 rounded-xl">
                        <span className="text-red-500 font-bold">🆔</span>
                        <div>
                            <div className="text-[10px] text-muted uppercase font-bold tracking-wider">{content.reps_id}</div>
                            <div className="text-lg font-bold text-red-500">{user.repsId}</div>
                        </div>
                    </div>
                )}
                
                {/* Age Display */}
                {user.age && (
                    <div className="flex items-center gap-3 p-3 bg-tertiary/50 rounded-xl">
                        <span className="text-purple-400">🎂</span>
                        <div>
                            <div className="text-[10px] text-muted uppercase font-bold tracking-wider">{content.age || "Age"}</div>
                            <div className="text-sm font-medium">{user.age} {content.years || "years"}</div>
                        </div>
                    </div>
                )}

                <a href={`mailto:${user.email}`} className="flex items-center gap-3 p-3 bg-tertiary/50 rounded-xl hover:bg-red-500/5 border border-transparent hover:border-red-500/20 transition-all group">
                    <span className="text-muted group-hover:text-red-500 transition-colors">✉️</span>
                    <div className="flex-1 overflow-hidden">
                        <div className="text-[10px] text-muted uppercase font-bold tracking-wider">{content.email}</div>
                        <div className="text-sm font-medium truncate group-hover:text-red-400 transition-colors">{user.email}</div>
                    </div>
                </a>
                
                {user.phone && (
                    <a href={`tel:${user.phone}`} className="flex items-center gap-3 p-3 bg-tertiary/50 rounded-xl hover:bg-green-500/5 border border-transparent hover:border-green-500/20 transition-all group">
                        <span className="text-muted group-hover:text-green-500 transition-colors">📱</span>
                        <div className="flex-1">
                            <div className="text-[10px] text-muted uppercase font-bold tracking-wider">{content.phone}</div>
                            <div className="text-sm font-medium group-hover:text-green-400 transition-colors">{user.phone}</div>
                        </div>
                    </a>
                )}
            </div>
        </div>
    </div>
  );
}

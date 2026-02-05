"use client";

export default function ProfileCertificates({ content }) {
  // In a real app, certificates would be fetched from the API
  // For now, we'll keep the static/mock implementation but structured better
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
         <div className="flex justify-between items-center bg-secondary/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
            <div>
                <h2 className="text-xl font-bold mb-1 text-white">{content.my_certificates}</h2>
                <p className="text-sm text-muted">{content.manage_qualifications}</p>
            </div>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg text-sm transition-colors border border-white/10">
                {content.add_new}
            </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
            {/* Mock Certificate Card */}
            <div className="group bg-secondary/50 border border-border/50 rounded-xl p-4 hover:border-red-600/40 transition-all cursor-pointer relative overflow-hidden backdrop-blur-sm hover:shadow-lg hover:shadow-red-900/10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-red-600/20 text-red-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                        🏆
                    </div>
                    <div>
                        <h3 className="font-bold text-white group-hover:text-red-500 transition-colors">REPS Level 4</h3>
                        <p className="text-xs text-muted">Personal Training • 2024</p>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center text-xs">
                    <span className="text-green-500 font-bold flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/> {content.verified}
                    </span>
                    <span className="text-muted font-mono bg-tertiary px-2 py-1 rounded">ID: #883920</span>
                </div>
            </div>
        </div>
    </div>
  );
}

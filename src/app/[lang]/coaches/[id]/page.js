import { notFound } from "next/navigation";
import { findUserById } from "@/lib/user";
import MessageCoachForm from "@/components/coaches/MessageCoachForm";
import { getDictionary } from "@/lib/get-dictionary";

export async function generateMetadata({ params }) {
    const { id, lang } = await params;
    const coach = await findUserById(id);
    if (!coach) return { title: "Coach Not Found" };
    
    return {
        title: `${coach.fullName} | REPS Egypt`,
        description: coach.bio || `Connect with ${coach.fullName}, a certified coach at REPS Egypt.`,
    };
}

export default async function CoachProfilePage({ params }) {
    const { id, lang } = await params;
    const coach = await findUserById(id);
    const dictionary = await getDictionary(lang);
    const t = dictionary.coach_profile;

    if (!coach || coach.role !== 'trainer') {
        notFound();
    }

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
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background bg-tertiary overflow-hidden shadow-2xl">
                            <img 
                                src={coach.profilePhoto || `https://ui-avatars.com/api/?name=${coach.fullName}&background=dc2626&color=fff`} 
                                alt={coach.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Basic Info */}
                        <div className="flex-1 mb-2">
                            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1">
                                <h1 className="text-3xl md:text-4xl font-bold text-white">{coach.fullName}</h1>
                                {coach.repsId && (
                                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg">
                                        {t.reps_id}: {coach.repsId}
                                    </span>
                                )}
                            </div>
                            <p className="text-muted text-lg">{coach.specialization || t.certified_coach} • {coach.location || t.default_location}</p>
                        </div>
                     </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Sidebar */}
                    <div className="space-y-6">
                         <div className="bg-secondary border border-border rounded-2xl p-6">
                             <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="text-red-500">ℹ️</span> {t.about_title}
                            </h3>
                            <div className="space-y-4">
                                {coach.specialization && (
                                    <div>
                                        <div className="text-xs text-muted uppercase font-bold">{t.label_specialization}</div>
                                        <div className="font-medium">{coach.specialization}</div>
                                    </div>
                                )}
                                {coach.experience && (
                                    <div>
                                        <div className="text-xs text-muted uppercase font-bold">{t.label_experience}</div>
                                        <div className="font-medium">{coach.experience} {t.label_years}</div>
                                    </div>
                                )}
                                <div className="pt-4 border-t border-border">
                                    <div className="text-xs text-muted uppercase font-bold mb-2">{t.label_social}</div>
                                    <div className="flex gap-3">
                                        {coach.socialMedia?.instagram && (
                                            <a href={coach.socialMedia.instagram} target="_blank" className="text-pink-500 hover:text-white transition-colors">Instagram</a>
                                        )}
                                        {coach.socialMedia?.facebook && (
                                            <a href={coach.socialMedia.facebook} target="_blank" className="text-blue-500 hover:text-white transition-colors">Facebook</a>
                                        )}
                                        {!coach.socialMedia?.instagram && !coach.socialMedia?.facebook && (
                                            <span className="text-muted text-sm italic">{t.no_social}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-secondary border border-border rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-4">{t.bio_title}</h2>
                            <p className="text-muted leading-relaxed whitespace-pre-line">
                                {coach.bio || t.no_bio}
                            </p>
                        </div>
                        
                        {/* Secure Messaging System */}
                        <MessageCoachForm 
                            coachId={coach._id.toString()} 
                            coachName={coach.fullName} 
                            dictionary={t.form}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

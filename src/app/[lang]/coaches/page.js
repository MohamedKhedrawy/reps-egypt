import { getUsers } from "@/lib/user";
import Link from "next/link";
import { getDictionary } from '@/lib/get-dictionary';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: `${dictionary.coaches_page.title_prefix} ${dictionary.coaches_page.title_highlight} | Reps Egypt`,
        description: dictionary.coaches_page.subtitle,
    };
}

export default async function CoachesPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const content = dictionary.coaches_page;

  // Fetch approved trainers
  const coaches = await getUsers({ role: 'trainer', status: 'approved' });

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* Search Header */}
      <section className="pt-32 pb-12 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
           <h1 className="text-4xl lg:text-5xl font-bold mb-6">{content.title_prefix} <span className="text-red-600">{content.title_highlight}</span></h1>
           <p className="text-muted max-w-2xl mb-10 text-lg">{content.subtitle}</p>
           
           {/* Filters */}
           <div className="grid md:grid-cols-4 gap-4 p-4 bg-secondary rounded-2xl border border-border">
              <input type="text" placeholder={content.search_placeholder} className="bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-red-600 focus:outline-none text-foreground placeholder-muted" />
              <div className="relative">
                <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-red-600 focus:outline-none appearance-none text-muted">
                   <option>{content.filter_specialty}</option>
                   {content.filter_specialty_options.map((opt, i) => <option key={i}>{opt}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-muted">
                     <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                   </svg>
                </div>
              </div>
               <div className="relative">
                <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-red-600 focus:outline-none appearance-none text-muted">
                   <option>{content.filter_experience}</option>
                   {content.filter_experience_options.map((opt, i) => <option key={i}>{opt}</option>)}
                </select>
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-muted">
                     <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                   </svg>
                </div>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg px-6 py-3 transition-colors">
                {content.btn_search}
              </button>
           </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
         {coaches.length === 0 ? (
             <div className="text-center py-20 text-muted">
                 <h3 className="text-2xl font-bold mb-2">{content.no_coaches_title}</h3>
                 <p>{content.no_coaches_desc}</p>
             </div>
         ) : (
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {coaches.map((trainer) => (
                  <div key={trainer._id.toString()} className="group relative bg-secondary rounded-xl overflow-hidden border border-border hover:border-red-600/50 transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-red-600/5">
                    <div className="aspect-[4/5] w-full overflow-hidden relative">
                       {/* Badge */}
                       <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          {content.available}
                       </div>

                       <img 
                            src={trainer.profilePhoto || `https://ui-avatars.com/api/?name=${trainer.fullName}&background=dc2626&color=fff`} 
                            alt={trainer.fullName} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                       />
                       
                       {/* Gradient Overlay */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 w-full p-5">
                       {/* Specialization Badge */}
                       {trainer.repsId && (
                           <div className="inline-block mb-2 px-2 py-1 rounded bg-red-600/20 text-red-500 text-[10px] font-bold uppercase tracking-wider">REPS #{trainer.repsId}</div>
                       )}
                       
                       <h3 className="text-lg font-bold text-white mb-1">{trainer.fullName}</h3>
                       <p className="text-gray-300 text-sm mb-4 flex items-center justify-between">
                         {trainer.specialization || content.certified_coach}
                         {trainer.experience && (
                             <span className="text-xs text-gray-400 font-medium">{trainer.experience} Exp</span>
                         )}
                       </p>
                       
                       <Link 
                            href={`/${lang}/coaches/${trainer._id.toString()}`}
                            className="w-full py-2.5 bg-white/10 hover:bg-red-600 text-xs text-white font-bold uppercase rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          {content.view_profile}
                       </Link>
                    </div>
                  </div>
                ))}
             </div>
         )}
         
         {/* Load More */}
         {coaches.length > 12 && (
             <div className="mt-16 text-center">
                 <button className="px-8 py-3 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors text-muted hover:text-foreground">
                    {content.load_more}
                 </button>
             </div>
         )}
      </section>

    </div>
  );
}

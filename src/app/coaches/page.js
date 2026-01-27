export const metadata = {
  title: "Find a Coach | Reps Egypt",
  description: "Connect with certified elite personal trainers and coaches in Egypt.",
};

export default function CoachesPage() {
  const coaches = [
    { name: "Ahmed Ali", role: "Strength & Conditioning", tag: "Lvl 4 Certified", exp: "8 Years", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop" },
    { name: "Sara Mahmoud", role: "Yoga & Flexibility", tag: "Yoga Master", exp: "5 Years", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop" },
    { name: "Omar Hassan", role: "CrossFit Specialist", tag: "Elite Trainer", exp: "6 Years", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1470&auto=format&fit=crop" },
    { name: "Nour El-Sherif", role: "Sports Nutrition", tag: "PhD Nutrition", exp: "10 Years", img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=1470&auto=format&fit=crop" },
    { name: "Mahmoud Gamal", role: "Bodybuilding", tag: "Pro Card", exp: "12 Years", img: "https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?q=80&w=1374&auto=format&fit=crop" },
    { name: "Laila Youssef", role: "Pilates Instructor", tag: "Certified", exp: "4 Years", img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1470&auto=format&fit=crop" },
    { name: "Sherif Adel", role: "Boxing Coach", tag: "National Champ", exp: "15 Years", img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1374&auto=format&fit=crop" },
    { name: "Rana Ezzat", role: "HIIT Specialist", tag: "Group Fitness", exp: "3 Years", img: "https://images.unsplash.com/photo-1574680096141-983200526388?q=80&w=1469&auto=format&fit=crop" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      
      {/* Search Header */}
      <section className="pt-32 pb-12 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
           <h1 className="text-4xl lg:text-5xl font-bold mb-6">Find Your <span className="text-red-600">Perfect Coach</span></h1>
           <p className="text-gray-400 max-w-2xl mb-10 text-lg">Browse our directory of elite certified professionals. Filter by specialty, experience, and certifications to find the right match for your goals.</p>
           
           {/* Filters */}
           <div className="grid md:grid-cols-4 gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
              <input type="text" placeholder="Search by name..." className="bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-red-600 focus:outline-none" />
              <div className="relative">
                <select className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-red-600 focus:outline-none appearance-none text-gray-400">
                   <option>All Specialties</option>
                   <option>Strength</option>
                   <option>Yoga</option>
                   <option>Nutrition</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500">
                     <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                   </svg>
                </div>
              </div>
               <div className="relative">
                <select className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-red-600 focus:outline-none appearance-none text-gray-400">
                   <option>Experience Level</option>
                   <option>1-3 Years</option>
                   <option>3-5 Years</option>
                   <option>5+ Years</option>
                </select>
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500">
                     <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                   </svg>
                </div>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg px-6 py-3 transition-colors">
                Search
              </button>
           </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coaches.map((trainer, idx) => (
              <div key={idx} className="group relative bg-[#121212] rounded-xl overflow-hidden border border-white/5 hover:border-red-600/50 transition-all duration-300 shadow-xl shadow-black/50">
                <div className="aspect-[4/5] w-full overflow-hidden relative">
                   {/* Badge */}
                   <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      Available
                   </div>

                   <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                   
                   {/* Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-90" />
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 w-full p-5">
                   {/* Experience Badge */}
                   <div className="inline-block mb-2 px-2 py-1 rounded bg-red-600/20 text-red-500 text-[10px] font-bold uppercase tracking-wider">{trainer.tag}</div>
                   
                   <h3 className="text-lg font-bold text-white mb-1">{trainer.name}</h3>
                   <p className="text-gray-400 text-sm mb-4 flex items-center justify-between">
                     {trainer.role}
                     <span className="text-xs text-gray-500 font-medium">{trainer.exp} Exp</span>
                   </p>
                   
                   <button className="w-full py-2.5 bg-white/10 hover:bg-red-600 text-xs font-bold uppercase rounded-lg transition-colors flex items-center justify-center gap-2">
                      View Profile
                   </button>
                </div>
              </div>
            ))}
         </div>
         
         {/* Load More */}
         <div className="mt-16 text-center">
             <button className="px-8 py-3 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
                Load More Coaches
             </button>
         </div>
      </section>

    </div>
  );
}

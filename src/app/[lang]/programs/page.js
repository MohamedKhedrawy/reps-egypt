import Link from "next/link";
import { getPrograms } from "@/lib/programs";

export const metadata = {
  title: "Specializations | Reps Egypt",
  description: "Explore our wide range of fitness certifications and specializations.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();


  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* Search Header */}
      <section className="pt-32 pb-12 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
           <h1 className="text-4xl lg:text-5xl font-bold mb-6">Fitness <span className="text-red-600">Specializations</span></h1>
           <p className="text-muted max-w-2xl mb-10 text-lg">World-class fitness education tailored for the Egyptian market. Choose your path and get certified.</p>
           
           {/* Filters */}
           <div className="grid md:grid-cols-4 gap-4 p-4 bg-secondary rounded-2xl border border-border">
              <input type="text" placeholder="Search specializations..." className="bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-red-600 focus:outline-none placeholder:text-muted text-foreground" />
              <div className="relative">
                <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-red-600 focus:outline-none appearance-none text-muted">
                   <option>All Categories</option>
                   <option>Certification</option>
                   <option>Workshop</option>
                   <option>Diploma</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                     <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                   </svg>
                </div>
              </div>
               <div className="relative">
                <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-red-600 focus:outline-none appearance-none text-muted">
                   <option>Price Range</option>
                   <option>Under $100</option>
                   <option>$100 - $500</option>
                   <option>$500+</option>
                </select>
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                     <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                   </svg>
                </div>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg px-6 py-3 transition-colors shadow-lg shadow-red-600/20 active:scale-[0.98]">
                Filter
              </button>
           </div>
        </div>
      </section>

      {/* Program Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
           {programs.map((program, idx) => (
             <div key={idx} className="group bg-secondary border border-border rounded-2xl overflow-hidden hover:border-red-600/30 transition-all duration-500 flex flex-col shadow-2xl shadow-black/10 hover:shadow-red-600/5">
               <div className="h-56 overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10 bg-red-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg text-white">
                    {program.category}
                  </div>
                  <img src={program.img} alt={program.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-60" />
               </div>
               
               <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-red-500 transition-colors">{program.title}</h3>
                  <p className="text-sm text-muted mb-8 line-clamp-2 leading-relaxed">{program.desc}</p>
                  
                  <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-background border border-border overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?u=${program.instructor}`} alt={program.instructor} className="w-full h-full object-cover" />
                       </div>
                       <span className="text-xs font-semibold text-muted">REPS Certified</span>
                    </div>
                  </div>
                  
                  <button className="mt-8 w-full py-3.5 bg-background hover:bg-red-600 text-sm font-bold rounded-xl transition-all border border-border hover:border-red-600 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] text-foreground hover:text-white">
                     Enroll Now
                  </button>
               </div>
             </div>
           ))}
        </div>
        
        {/* Newsletter / CTA */}
        <div className="mt-32 p-12 bg-secondary border border-border rounded-3xl text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] -z-10" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/5 blur-[100px] -z-10" />
           
           <h2 className="text-3xl font-bold mb-4 text-foreground">Don't miss a beat</h2>
           <p className="text-muted mb-8 max-w-xl mx-auto">Subscribe to our newsletter to receive updates on new programs, workshops, and exclusive early-bird discounts.</p>
           
           <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input type="email" placeholder="Email address" className="flex-1 bg-background border border-border rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-red-600 transition-colors text-foreground" />
              <button className="bg-foreground text-background font-extrabold px-8 py-3.5 rounded-xl hover:bg-muted transition-colors">Join Now</button>
           </div>
        </div>
      </section>

    </div>
  );
}

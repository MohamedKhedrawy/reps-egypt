import Link from "next/link";

export const metadata = {
  title: "Latest News & Updates | Reps Egypt",
  description: "Stay updated with the latest in the fitness industry, Reps Egypt announcements, and expert articles.",
};

export default function NewsPage() {
  const articles = [
    { 
      title: "New International Standards for 2026", 
      category: "Announcement", 
      date: "Jan 28, 2026",
      desc: "Reps Egypt adopts new global certification standards to ensure our trainers remain world-class.",
      img: "https://images.unsplash.com/photo-1517438476312-10d79c077309?q=80&w=1470&auto=format&fit=crop"
    },
    { 
      title: "Nutrition vs. Training: What Matters More?", 
      category: "Article", 
      date: "Jan 25, 2026",
      desc: "An in-depth look at how nutrition fuels performance and why you can't out-train a bad diet.",
      img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1470&auto=format&fit=crop"
    },
    { 
      title: "Success Story: Trainer Sarah's Journey", 
      category: "Community", 
      date: "Jan 20, 2026",
      desc: "From trainee to Master Coach, read how Sarah transformed her career with Reps Egypt certifications.",
      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop"
    },
    { 
      title: "The Rise of Calisthenics in Egypt", 
      category: "Trends", 
      date: "Jan 15, 2026",
      desc: "Exploring the growing popularity of bodyweight training and street workout parks across Cairo.",
      img: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1469&auto=format&fit=crop"
    },
    { 
      title: "Upcoming Workshop Schedule", 
      category: "Events", 
      date: "Jan 10, 2026",
      desc: "Mark your calendars for our Q1 2026 workshop series including Kettlebells, Recovery, and Mobility.",
      img: "https://images.unsplash.com/photo-1574680096141-983200526388?q=80&w=1469&auto=format&fit=crop"
    },
    { 
      title: "Reps Egypt Partners with Global Gyms", 
      category: "Partnership", 
      date: "Jan 05, 2026",
      desc: "Exclusive employment opportunities for Reps Egypt graduates at top-tier fitness chains.",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      
      {/* Header */}
      <section className="pt-32 pb-12 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
           <h1 className="text-4xl lg:text-5xl font-bold mb-6">Latest <span className="text-red-600">News</span></h1>
           <p className="text-gray-400 max-w-2xl text-lg mb-10">Insights, updates, and stories from the heart of Egypt's fitness community.</p>
           
           {/* Featured Article layout could go here, but keeping simple grid for now */}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
           {articles.map((article, idx) => (
             <article key={idx} className="flex flex-col group">
                <div className="h-64 rounded-2xl overflow-hidden bg-[#121212] border border-white/5 mb-6 relative">
                   <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/10">
                     {article.category}
                   </div>
                   <img src={article.img} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                
                <div className="flex flex-col flex-grow">
                   <div className="flex items-center gap-3 text-xs text-red-500 font-bold mb-3 uppercase tracking-wider">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                      <span className="text-gray-500 font-normal">5 min read</span>
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors leading-tight">
                     <Link href="#">{article.title}</Link>
                   </h3>
                   <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                     {article.desc}
                   </p>
                   <Link href="#" className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-white hover:text-red-500 transition-colors">
                     Read Article
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                     </svg>
                   </Link>
                </div>
             </article>
           ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-32 p-12 bg-gradient-to-r from-[#110505] to-[#0a0a0a] border border-white/5 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] -z-10" />
           
           <div className="max-w-xl">
             <h2 className="text-3xl font-bold mb-4">Subscribe to our newsletter</h2>
             <p className="text-gray-400">Get the latest news and specialized fitness articles delivered directly to your inbox every week.</p>
           </div>
           
           <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Email address" className="w-full sm:w-80 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-red-600 transition-colors text-white" />
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/20 whitespace-nowrap">
                Subscribe
              </button>
           </div>
        </div>
      </section>

    </div>
  );
}

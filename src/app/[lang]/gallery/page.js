import Link from "next/link";

export const metadata = {
  title: "Gallery | Reps Egypt",
  description: "A glimpse into our training sessions, events, and community.",
};

export default function GalleryPage() {
  const media = [
    { type: "image", src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop", caption: "Advanced Strength Workshop" },
    { type: "image", src: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1469&auto=format&fit=crop", caption: "Calisthenics Certification" },
    { type: "image", src: "https://images.unsplash.com/photo-1574680096141-983200526388?q=80&w=1469&auto=format&fit=crop", caption: "Personal Trainer Exams" },
    { type: "image", src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop", caption: "Powerlifting Meet" },
    { type: "image", src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop", caption: "Group Class" },
    { type: "image", src: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1470&auto=format&fit=crop", caption: "Mobility Seminar" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* Search Header */}
       <section className="pt-32 pb-12 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
           <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our <span className="text-red-600">Gallery</span></h1>
           <p className="text-muted max-w-2xl mx-auto text-lg mb-10">See our champions in action. Highlights from our certification programs, workshops, and community events across Egypt.</p>
           
           {/* Filters */}
            <div className="flex justify-center flex-wrap gap-4">
               {['All', 'Certifications', 'Workshops', 'Events', 'Community'].map((tag, i) => (
                 <button key={i} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${i === 0 ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' : 'bg-tertiary text-muted hover:bg-background border border-transparent hover:border-border hover:text-foreground'}`}>
                   {tag}
                 </button>
              ))}
           </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {media.map((item, idx) => (
             <div key={idx} className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary border border-border cursor-pointer">
                <img src={item.src} alt={item.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                   <div>
                     <span className="text-red-500 text-xs font-bold uppercase tracking-wider mb-2 block">Event</span>
                     <h3 className="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.caption}</h3>
                   </div>
                </div>
             </div>
           ))}
        </div>
        
        {/* Load More */}
         <div className="mt-16 text-center">
            <button className="px-8 py-3.5 border border-border rounded-xl text-sm font-bold text-muted hover:text-foreground hover:border-border-border transition-colors">
             Load More Photos
           </button>
        </div>
      </section>

    </div>
  );
}

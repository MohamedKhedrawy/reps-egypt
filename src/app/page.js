import Link from "next/link";

export const metadata = {
  title: "Home",
  description: "Welcome to Reps Egypt - Your premier digital solutions platform for innovative technology and seamless user experiences.",
};

// Inline Icons for Portability
const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
  </svg>
);

const CheckBadge = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-foreground">
    <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.086a.75.75 0 0 0 .374 0c5.499-1.153 9.563-6.144 9.563-12.086 0-1.91-.487-3.686-1.335-5.265a.75.75 0 0 0-.722-.515 11.208 11.208 0 0 1-7.877-3.08ZM12 7a.75.75 0 0 1 .75.75v3.25H16a.75.75 0 0 1 0 1.5h-3.25V16a.75.75 0 0 1-1.5 0v-3.5H8a.75.75 0 0 1 0-1.5h3.25V7.75A.75.75 0 0 1 12 7Z" clipRule="evenodd" />
    <path d="M12 7a.75.75 0 0 1 .75.75v.938l.68-.313a.75.75 0 1 1 .632 1.378L12.75 9.39l-1.312-.604a.75.75 0 0 1 .632-1.378l.68.313V7.75A.75.75 0 0 1 12 7Z" /> 
    {/* Simplified check visuals for badge */}
  </svg>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-red-600 selection:text-white">
      {/* 
        --------------------------------------------------
        NAVBAR
        Structure: Logo (Left) | Links (Center) | Auth (Right)
        Visuals: Dark, sticky, red accent on CTA
        --------------------------------------------------
      */}
      {/* Hero Section */}

      {/* 
        --------------------------------------------------
        HERO SECTION
        Structure: Left Text, Right Background/Image Presence
        Visuals: Premium Dark, Red Accent Text, Bold Typography
        --------------------------------------------------
      */}
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background & Overlay */}
        <div className="absolute inset-0 z-0">
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background z-10 opacity-70" />
            <div className="absolute inset-0 bg-background z-10 mix-blend-multiply" style={{ opacity: 'var(--hero-overlay-opacity)' }} />
            <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                alt="Gym Background" 
                className="w-full h-full object-cover"
            />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
          
          {/* Glass Card Container for Hero Content to ensure readability on Light Mode */}
          <div className="backdrop-blur-[2px] bg-background/10 dark:bg-transparent p-8 rounded-3xl border border-white/10 shadow-2xl dark:shadow-none dark:border-none">
            {/* Top Badge */}
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-tertiary/90 border border-red-600/40 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.1)] backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_#dc2626]" />
              <span className="text-red-600 dark:text-red-500 text-[11px] font-bold uppercase tracking-widest">Egypt's Premier Fitness Certification</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white dark:text-foreground leading-tight drop-shadow-lg">
              Transform Your <span className="text-red-600 drop-shadow-md">Fitness Career</span>
            </h1>

            {/* Subtext */}
            <p className="text-white/90 dark:text-muted text-lg mb-8 max-w-2xl leading-relaxed drop-shadow-md mx-auto font-medium">
              Join Egypt's most trusted fitness certification organization. Get accredited, connect with professionals, and elevate your coaching to world-class standards.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-xl mb-10 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search for training programs or coaches..." 
              className="w-full bg-secondary border border-border rounded-xl px-12 py-4 text-sm text-foreground placeholder-muted focus:outline-none focus:border-red-600/50 focus:bg-secondary focus:ring-1 focus:ring-red-600/20 transition-all shadow-xl"
            />
          </div>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
            <Link 
              href="/certification" 
              className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-red-600/20 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Get Certified <ArrowRight />
            </Link>
            <Link 
              href="/programs" 
              className="w-full sm:w-auto px-8 py-3.5 bg-secondary border border-border hover:bg-tertiary text-foreground font-bold rounded-lg backdrop-blur-sm transition-all hover:-translate-y-0.5 text-center"
            >
              Explore Programs
            </Link>
          </div>

          {/* Secondary Segments */}
          {/* <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "I'm a Trainer", href: "/trainer" },
              { label: "I'm a Trainee", href: "/trainee" },
              { label: "Admin Portal", href: "/admin" }
            ].map((btn, idx) => (
              <Link 
                key={idx}
                href={btn.href}
                className="px-5 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-gray-400 text-sm font-medium hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all"
              >
                {btn.label}
              </Link>
            ))}
          </div> */}
        </div>
      </section>

      {/* 
        --------------------------------------------------
        STATS BAR
        Structure: 4 Columns
        Visuals: Minimal, High Contrast Numbers
        --------------------------------------------------
      */}
      <section className="border-y border-border bg-secondary">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-theme">
            {[
              { number: "500+", label: "Certified Coaches" },
              { number: "12k+", label: "Active Trainees" },
              { number: "350+", label: "Programs" },
              { number: "10 Years", label: "Excellence" },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl lg:text-4xl font-bold text-foreground mb-1 tracking-tight">{stat.number}</span>
                <span className="text-xs font-bold text-muted uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        --------------------------------------------------
        TRAINERS SECTION
        Structure: Header, Grid of 4 Cards
        Visuals: Dark Cards, Red Tags
        --------------------------------------------------
      */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-red-500 font-bold uppercase tracking-wider text-sm">World Class Talent</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-foreground">Meet Our Elite Trainers</h2>
          </div>
          <Link href="/coaches" className="hidden sm:flex items-center gap-2 text-sm font-bold text-muted hover:text-foreground transition-colors">
            View All Coaches <ArrowRight />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Ahmed Ali", role: "Strength & Conditioning", tag: "Lvl 4 Certified", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop" },
            { name: "Sara Mahmoud", role: "Yoga & Flexibility", tag: "Yoga Master", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop" },
            { name: "Omar Hassan", role: "CrossFit Specialist", tag: "Elite Trainer", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1470&auto=format&fit=crop" },
            { name: "Nour El-Sherif", role: "Sports Nutrition", tag: "PhD Nutrition", img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=1470&auto=format&fit=crop" },
          ].map((trainer, idx) => (
            <div key={idx} className="group relative bg-secondary rounded-xl overflow-hidden border border-border hover:border-red-600/50 transition-all duration-300">
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              
              {/* Overlay Gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

              {/* Tag */}
              <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                {trainer.tag}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 w-full p-4">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-red-500 transition-colors">{trainer.name}</h3>
                <p className="text-sm text-gray-300 mb-4">{trainer.role}</p>
                
                <button className="w-full py-2 bg-black/40 hover:bg-red-600 text-xs text-white font-bold uppercase rounded transition-colors flex items-center justify-center gap-2">
                   View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        --------------------------------------------------
        PROGRAMS SECTION
        Structure: 3 Card Grid
        Visuals: Landscape Cards, Price Tag
        --------------------------------------------------
      */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-red-500 font-bold uppercase tracking-wider text-sm">Start Your Journey</span>
              <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-foreground">Latest Training Programs</h2>
            </div>
            <Link href="/programs" className="hidden sm:flex items-center gap-2 text-sm font-bold text-muted hover:text-foreground transition-colors">
              Browse All Programs <ArrowRight />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Advanced Hypertrophy", 
                category: "Certification", 
                desc: "Master the science of muscle growth with our comprehensive level 3 certification.",
                price: "$299",
                instructor: "Mike R.",
                img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop"
              },
              { 
                title: "Calisthenics Basics", 
                category: "Workshop", 
                desc: "Learn to control your bodyweight and build functional strength from the ground up.",
                price: "$99",
                instructor: "Sarah J.",
                img: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1469&auto=format&fit=crop"
              },
              { 
                title: "Personal Trainer L4", 
                category: "Diploma", 
                desc: "The gold standard for aspiring personal trainers. Get accredited internationally.",
                price: "$899",
                instructor: "Dr. Samy",
                img: "https://images.unsplash.com/photo-1574680096141-983200526388?q=80&w=1469&auto=format&fit=crop"
              },
            ].map((program, idx) => (
              <div key={idx} className="group bg-background border border-border rounded-2xl overflow-hidden hover:border-red-600/30 hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-300">
                {/* Image Area */}
                <div className="h-48 overflow-hidden relative">
                   <div className="absolute top-4 left-4 z-10 bg-red-600 text-[10px] font-bold px-2 py-1 rounded uppercase">
                     {program.category}
                   </div>
                   <img src={program.img} alt={program.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                
                {/* Content Area */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{program.title}</h3>
                  <p className="text-sm text-muted mb-6 line-clamp-2">{program.desc}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-700 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${program.instructor}`} alt="" />
                      </div>
                      <span className="text-xs font-medium text-muted">By {program.instructor}</span>
                    </div>
                    <span className="text-lg font-bold text-foreground">{program.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        --------------------------------------------------
        WHY CHOOSE US & CTA
        --------------------------------------------------
      */}
      <section className="py-24 bg-background relative overflow-hidden">
        
        {/* Why Choose Us */}
        <div className="max-w-7xl mx-auto px-6 mb-32">
           <div className="text-center mb-16">
             <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">Why Choose Reps Egypt?</h2>
             <p className="text-muted text-lg">The leading choice for fitness professionals across Egypt</p>
           </div>

           <div className="grid md:grid-cols-3 gap-12">
              {[
                { 
                  title: "Accredited Standards", 
                  desc: "Internationally recognized certification programs that meet the highest industry standards.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="G9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                  )
                },
                { 
                  title: "Expert Community", 
                  desc: "Connect with top coaches and trainers in Egypt's most active fitness community.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  )
                },
                { 
                  title: "Career Growth", 
                  desc: "Access exclusive opportunities and resources to advance your fitness career.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                  )
                },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 border border-border text-red-500 shadow-[0_0_20px_rgba(220,38,38,0.1)]">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* New Bottom CTA */}
        <div className="max-w-4xl mx-auto px-6 text-center">
           <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">Ready to Elevate Your Fitness Journey?</h2>
              <p className="text-muted text-lg mb-10">Join thousands of certified professionals who trust Reps Egypt for their career development.</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/certification" 
                  className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all hover:-translate-y-1"
                >
                  Apply for Certification
                </Link>
                <Link 
                  href="/contact" 
                  className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-border hover:border-border-hover text-foreground font-bold rounded-lg transition-all hover:-translate-y-1"
                >
                  Contact Us
                </Link>
              </div>
           </div>
           
           {/* Subtle background glow for CTA */}
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-red-600/10 blur-[100px] pointer-events-none -z-0" />
        </div>

      </section>

      {/* 
        --------------------------------------------------
        FOOTER
        --------------------------------------------------
      */}

    </div>
  );
}

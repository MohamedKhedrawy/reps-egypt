import Link from "next/link";
import { getUsersPaginated, getUserStats } from "@/lib/user";
import { getFeaturedPrograms, getProgramsCount } from "@/lib/programs";
import { getDictionary } from "@/lib/get-dictionary";
import HomeClient from "./HomeClient";

// Force dynamic rendering to avoid MongoDB timeout during static build
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return {
    title: dictionary.home.meta_title,
    description: dictionary.home.meta_description,
  };
}

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

export default async function LandingPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const stats = await getUserStats();
  const coachesData = await getUsersPaginated({ role: 'trainer', status: 'approved' }, { limit: 4 });
  const coaches = JSON.parse(JSON.stringify(coachesData));
  const featuredPrograms = await getFeaturedPrograms();
  const programsCount = await getProgramsCount();

  const { home } = dictionary;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-red-600 selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden pt-12">
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
              <span className="text-red-600 dark:text-red-500 text-[11px] font-bold uppercase tracking-widest">{home.hero_badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white dark:text-foreground leading-tight drop-shadow-lg">
              {home.hero_title_prefix} <span className="text-red-600 drop-shadow-md">{home.hero_title_highlight}</span>
            </h1>

            {/* Subtext */}
            <p className="text-white/90 dark:text-muted text-lg mb-8 max-w-2xl leading-relaxed drop-shadow-md mx-auto font-medium">
              {home.hero_subtitle}
            </p>
          </div>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full sm:w-auto">
            <Link 
              href={`/${lang}/register/trainer`}
              className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-red-600/20 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {home.cta_get_certified} <ArrowRight />
            </Link>
            <Link 
              href={`/${lang}/coaches`}
              className="w-full sm:w-auto px-8 py-3.5 bg-secondary border border-border hover:bg-tertiary text-foreground font-bold rounded-lg backdrop-blur-sm transition-all hover:-translate-y-0.5 text-center"
            >
              {home.cta_explore_programs}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-secondary">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-theme">
            {[
              { number: `${stats.activeTrainers}+`, label: home.stats_coaches },
              { number: `${stats.activeTrainees}+`, label: home.stats_trainees },
              { number: `${programsCount}+`, label: home.stats_programs },
              { number: `10 ${home.stats_years}`, label: home.stats_excellence },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl lg:text-4xl font-bold text-foreground mb-1 tracking-tight">{stat.number}</span>
                <span className="text-xs font-bold text-muted uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <HomeClient coaches={coaches} home={home} lang={lang} />

      {/* Programs Section */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-red-500 font-bold uppercase tracking-wider text-sm">{home.section_programs_badge}</span>
              <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-foreground">{home.section_programs_title}</h2>
            </div>
            <Link href={`/${lang}/programs`} className="hidden sm:flex items-center gap-2 text-sm font-bold text-muted hover:text-foreground transition-colors">
              {home.section_programs_view_all} <ArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPrograms.map((program, idx) => {
              // Translation lookup
              const translatedProgram = dictionary.program_content?.programs?.[program.title?.trim()] || {};
              const title = translatedProgram.title || program.title;
              const desc = translatedProgram.desc || program.desc;
              const category = dictionary.program_content?.categories?.[program.category] || program.category;

              return (
              <div key={idx} className="group bg-background border border-border rounded-2xl overflow-hidden hover:border-red-600/30 hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-300">
                {/* Image Area */}
                <div className="h-48 overflow-hidden relative">
                   <div className="absolute top-4 left-4 z-10 bg-red-600 text-[10px] font-bold px-2 py-1 rounded uppercase">
                     {category}
                   </div>
                   <img src={program.img} alt={program.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                
                {/* Content Area */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted mb-6 line-clamp-2">{desc}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-700 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${program.instructor}`} alt="" />
                      </div>
                      <span className="text-xs font-medium text-muted">{home.reps_certified}</span>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us & CTA */}
      <section className="py-24 bg-background relative overflow-hidden">
        
        {/* Why Choose Us */}
        <div className="max-w-7xl mx-auto px-6 mb-32">
           <div className="text-center mb-16">
             <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">{home.section_why_title}</h2>
             <p className="text-muted text-lg">{home.section_why_subtitle}</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { 
                  title: home.why_standards_title, 
                  desc: home.why_standards_desc,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="G9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                  )
                },
                { 
                  title: home.why_community_title, 
                  desc: home.why_community_desc,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  )
                },
                { 
                  title: home.why_growth_title, 
                  desc: home.why_growth_desc,
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
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">{home.footer_cta_title}</h2>
              <p className="text-muted text-lg mb-10">{home.footer_cta_subtitle}</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href={`/${lang}/register/trainer`}
                  className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all hover:-translate-y-1"
                >
                  {home.footer_cta_apply}
                </Link>
                <Link 
                  href={`/${lang}/contact`}
                  className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-border hover:border-border-hover text-foreground font-bold rounded-lg transition-all hover:-translate-y-1"
                >
                  {home.footer_cta_contact}
                </Link>
              </div>
           </div>
           
           {/* Subtle background glow for CTA */}
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-red-600/10 blur-[100px] pointer-events-none -z-0" />
        </div>

      </section>

      {/* Footer is handled by layout.js */}

    </div>
  );
}

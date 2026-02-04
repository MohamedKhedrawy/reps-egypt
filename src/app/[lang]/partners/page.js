import Link from "next/link";
import { getDictionary } from '@/lib/get-dictionary';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: dictionary.partners_page.title_prefix + ' ' + dictionary.partners_page.title_highlight + ' | Reps Egypt',
        description: dictionary.partners_page.subtitle,
    };
}

export default async function PartnersPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  const tiers = [
    {
      name: dictionary.partners_page.tier_strategic.name,
      description: dictionary.partners_page.tier_strategic.description,
      size: "large",
      members: [
        { name: "Global Standards Body", logo: "https://ui-avatars.com/api/?name=GSB&background=dc2626&color=fff&size=200" },
        { name: "Ministry of Sports", logo: "https://ui-avatars.com/api/?name=MOS&background=000&color=fff&size=200" },
      ]
    },
    {
      name: dictionary.partners_page.tier_gold.name,
      description: dictionary.partners_page.tier_gold.description,
      size: "medium",
      members: [
        { name: "PowerGym Equip", logo: "https://ui-avatars.com/api/?name=PGE&background=1f2937&color=fff&size=150" },
        { name: "FitLife Chain", logo: "https://ui-avatars.com/api/?name=FLC&background=1f2937&color=fff&size=150" },
        { name: "Nutrition Pro", logo: "https://ui-avatars.com/api/?name=NP&background=1f2937&color=fff&size=150" },
      ]
    },
    {
      name: dictionary.partners_page.tier_educational.name,
      description: dictionary.partners_page.tier_educational.description,
      size: "small",
      members: [
        { name: "Sports Academy", logo: "https://ui-avatars.com/api/?name=SA&background=1f2937&color=fff&size=100" },
        { name: "Uni of Science", logo: "https://ui-avatars.com/api/?name=UoS&background=1f2937&color=fff&size=100" },
        { name: "Future Trainers", logo: "https://ui-avatars.com/api/?name=FT&background=1f2937&color=fff&size=100" },
        { name: "Health Institute", logo: "https://ui-avatars.com/api/?name=HI&background=1f2937&color=fff&size=100" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            {dictionary.partners_page.title_prefix} <span className="text-red-600">{dictionary.partners_page.title_highlight}</span>
          </h1>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {dictionary.partners_page.subtitle}
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {tiers.map((tier, idx) => (
            <div key={idx} className="relative">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{tier.name}</h2>
                <p className="text-muted max-w-xl mx-auto">{tier.description}</p>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mt-6 opacity-50" />
              </div>

              <div className={`grid gap-8 justify-center ${
                tier.size === "large" ? "md:grid-cols-2" : 
                tier.size === "medium" ? "md:grid-cols-3" : "grid-cols-2 md:grid-cols-4"
              }`}>
                {tier.members.map((member, mIdx) => (
                  <div 
                    key={mIdx}
                    className={`group bg-secondary border border-border rounded-3xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-red-600/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-600/5 ${
                      tier.size === "large" ? "p-12 aspect-video" : 
                      tier.size === "medium" ? "p-8 aspect-square" : "p-6 aspect-square"
                    }`}
                  >
                    <div className={`relative overflow-hidden rounded-full bg-white mb-4 ${
                      tier.size === "large" ? "w-32 h-32" : 
                      tier.size === "medium" ? "w-24 h-24" : "w-16 h-16"
                    }`}>
                       <img src={member.logo} alt={member.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className={`font-bold transition-colors group-hover:text-red-500 ${
                      tier.size === "large" ? "text-xl" : "text-base"
                    }`}>
                      {member.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 px-6">
         <div className="max-w-5xl mx-auto bg-secondary border border-border rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">{dictionary.partners_page.cta_title}</h2>
              <p className="text-muted mb-8 max-w-xl mx-auto">
                {dictionary.partners_page.cta_text}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Link 
                   href={`/${lang}/contact`} 
                   className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                 >
                   {dictionary.partners_page.cta_btn_apply}
                 </Link>
                 <Link 
                    href={`/${lang}/standards`}
                    className="px-8 py-3.5 bg-tertiary hover:bg-white/10 text-foreground font-bold rounded-xl transition-colors border border-border"
                 >
                    {dictionary.partners_page.cta_btn_guidelines}
                 </Link>
              </div>
            </div>
         </div>
      </section>

    </div>
  );
}

import Link from "next/link";
import { getDictionary } from '@/lib/get-dictionary';
import PartnersPageClient from './PartnersPageClient';

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

      {/* Partners Grid - Client Component */}
      <PartnersPageClient lang={lang} dictionary={dictionary} />

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

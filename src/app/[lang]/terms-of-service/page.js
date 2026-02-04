import { getDictionary } from '@/lib/get-dictionary';
import Link from 'next/link';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: dictionary.terms_page.title + ' | Reps Egypt',
        description: dictionary.terms_page.subtitle,
    };
}

export default async function TermsOfServicePage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-background text-foreground pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-tertiary rounded-2xl flex items-center justify-center mx-auto mb-6 border border-border shadow-[0_0_30px_rgba(220,38,38,0.1)]">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-600">
               <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clipRule="evenodd" />
               <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
             </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3">{dictionary.terms_page.title}</h1>
          <p className="text-muted">{dictionary.terms_page.subtitle}</p>
          <p className="text-xs text-muted mt-4">{dictionary.terms_page.effective_date}</p>
        </div>

        <div className="space-y-8">
            {/* Section 1 */}
            <div className="bg-secondary border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">{dictionary.terms_page.section1_title}</h2>
                <div className="text-muted text-sm leading-relaxed">
                    <p className="mb-4">
                        {dictionary.terms_page.section1_text}
                    </p>
                    <p>
                        {dictionary.terms_page.section1_text2}
                    </p>
                </div>
            </div>

            {/* Section 2 */}
            <div className="bg-secondary border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">{dictionary.terms_page.section2_title}</h2>
                <div className="text-muted text-sm leading-relaxed">
                    <p className="mb-4">{dictionary.terms_page.section2_intro}</p>
                    <ul className="list-disc pl-5 space-y-2 text-muted mb-4">
                        {dictionary.terms_page.section2_list.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <p>
                        {dictionary.terms_page.section2_outro}
                    </p>
                </div>
            </div>

            {/* Section 3 */}
            <div className="bg-secondary border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">{dictionary.terms_page.section3_title}</h2>
                <div className="text-muted text-sm leading-relaxed">
                    <p className="mb-4">
                        {dictionary.terms_page.section3_text}
                    </p>
                    <p>
                        {dictionary.terms_page.section3_text2_pre_link}
                        <Link href={`/${lang}/code-of-ethics`} className="text-red-500 hover:underline">
                          {dictionary.terms_page.section3_link_text}
                        </Link>
                        {dictionary.terms_page.section3_text2_post_link}
                    </p>
                </div>
            </div>

            {/* Section 4 */}
            <div className="bg-secondary border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">{dictionary.terms_page.section4_title}</h2>
                <div className="text-muted text-sm leading-relaxed">
                    <p>
                        {dictionary.terms_page.section4_text}
                    </p>
                </div>
            </div>

            {/* Section 5 */}
            <div className="bg-secondary border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">{dictionary.terms_page.section5_title}</h2>
                <div className="text-muted text-sm leading-relaxed">
                    <p>
                        {dictionary.terms_page.section5_text}
                    </p>
                </div>
            </div>
        </div>

        {/* Contact Footer */}
        <div className="mt-16 text-center border-t border-border pt-12">
            <p className="text-muted mb-4">{dictionary.terms_page.contact_title}</p>
            <a href="mailto:legal@repsegypt.com" className="text-red-500 hover:text-foreground font-bold transition-colors">legal@repsegypt.com</a>
        </div>

      </div>
    </div>
  );
}

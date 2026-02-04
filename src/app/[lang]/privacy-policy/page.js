import { getDictionary } from '@/lib/get-dictionary';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: dictionary.privacy_page.title + ' | Reps Egypt',
        description: dictionary.privacy_page.description,
    };
}

export default async function PrivacyPolicyPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-background text-foreground pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-tertiary rounded-2xl flex items-center justify-center mx-auto mb-6 border border-border shadow-[0_0_30px_rgba(220,38,38,0.1)]">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-600">
               <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
             </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3">{dictionary.privacy_page.title}</h1>
          <p className="text-muted">{dictionary.privacy_page.subtitle}</p>
          <p className="text-xs text-muted mt-4">{dictionary.privacy_page.updated_date}</p>
        </div>

        <div className="space-y-8">
            {/* Section 1 */}
            <div className="bg-secondary border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500 text-sm">01</span>
                    {dictionary.privacy_page.section1_title}
                </h2>
                <div className="text-muted text-sm leading-relaxed space-y-4">
                    <p>{dictionary.privacy_page.section1_text}</p>
                    <ul className="list-disc pl-5 space-y-2 text-muted">
                        {dictionary.privacy_page.section1_list.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Section 2 */}
            <div className="bg-secondary border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500 text-sm">02</span>
                    {dictionary.privacy_page.section2_title}
                </h2>
                <div className="text-muted text-sm leading-relaxed space-y-4">
                    <p>{dictionary.privacy_page.section2_text}</p>
                    <ul className="list-disc pl-5 space-y-2 text-muted">
                        {dictionary.privacy_page.section2_list.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Section 3 */}
            <div className="bg-secondary border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500 text-sm">03</span>
                    {dictionary.privacy_page.section3_title}
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-4">
                    {dictionary.privacy_page.section3_text}
                </p>
                <div className="bg-tertiary p-4 rounded-xl border-l-4 border-red-900/50">
                    <p className="text-xs text-muted">
                        <strong>{dictionary.privacy_page.section3_note_label}</strong>{dictionary.privacy_page.section3_note_text}
                    </p>
                </div>
            </div>

            {/* Section 4 */}
            <div className="bg-secondary border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500 text-sm">04</span>
                    {dictionary.privacy_page.section4_title}
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-4">
                    {dictionary.privacy_page.section4_text}
                </p>
            </div>
        </div>

        {/* Contact Footer */}
        <div className="mt-16 text-center border-t border-border pt-12">
            <p className="text-muted mb-4">{dictionary.privacy_page.contact_title}</p>
            <a href="mailto:privacy@repsegypt.com" className="text-red-500 hover:text-foreground font-bold transition-colors">privacy@repsegypt.com</a>
        </div>

      </div>
    </div>
  );
}

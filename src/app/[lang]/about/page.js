import { getDictionary } from '@/lib/get-dictionary';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: dictionary.about_page.title_prefix + ' ' + dictionary.about_page.title_highlight,
        description: dictionary.about_page.mission_desc.slice(0, 150) + '...',
        openGraph: {
            title: dictionary.about_page.title_prefix + ' ' + dictionary.about_page.title_highlight,
            description: dictionary.about_page.mission_desc.slice(0, 150) + '...',
        },
    };
}

export default async function AboutPage({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="max-w-4xl mx-auto px-6 py-20">

                <header className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-foreground mb-6">
                        {dictionary.about_page.title_prefix} <span className="text-red-600">{dictionary.about_page.title_highlight}</span>
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-900 mx-auto rounded-full" />
                </header>

                <article className="space-y-12">
                    <section className="bg-secondary backdrop-blur-lg rounded-2xl p-8 border border-border hover:border-red-600/30 transition-all duration-300">
                        <h2 className="text-2xl font-semibold text-red-500 mb-4">{dictionary.about_page.mission_title}</h2>
                        <p className="text-muted leading-relaxed text-lg">
                            {dictionary.about_page.mission_desc}
                        </p>
                    </section>

                    <section className="bg-secondary backdrop-blur-lg rounded-2xl p-8 border border-border hover:border-red-600/30 transition-all duration-300">
                        <h2 className="text-2xl font-semibold text-red-500 mb-4">{dictionary.about_page.vision_title}</h2>
                        <p className="text-muted leading-relaxed text-lg">
                            {dictionary.about_page.vision_desc}
                        </p>
                    </section>

                    <section className="bg-secondary backdrop-blur-lg rounded-2xl p-8 border border-border hover:border-red-600/30 transition-all duration-300">
                        <h2 className="text-2xl font-semibold text-red-500 mb-4">{dictionary.about_page.values_title}</h2>
                        <ul className="space-y-3 text-muted text-lg">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-red-600 rounded-full" />
                                {dictionary.about_page.values_innovation}
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-red-600 rounded-full" />
                                {dictionary.about_page.values_user}
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-red-600 rounded-full" />
                                {dictionary.about_page.values_trust}
                            </li>
                        </ul>
                    </section>
                </article>

                <footer className="mt-16 text-center">
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/25 border border-transparent"
                    >
                        {lang === 'ar' ? '→' : '←'} {dictionary.about_page.back_home}
                    </a>
                </footer>
            </div>
        </main>
    );
}

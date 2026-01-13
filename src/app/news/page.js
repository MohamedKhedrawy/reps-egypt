export const metadata = {
    title: 'News',
    description: 'Reps Egypt News - Stay updated with the latest news and announcements.',
    openGraph: {
        title: 'News | Reps Egypt',
        description: 'Reps Egypt News - Stay updated with the latest news and announcements.',
        type: 'website',
    },
};

const newsItems = [
    {
        date: 'January 10, 2026',
        category: 'Announcement',
        title: 'Reps Egypt Launches New Digital Platform',
        excerpt: 'We are excited to announce the launch of our new digital platform, designed to provide better services to our members.',
        featured: true,
    },
    {
        date: 'January 5, 2026',
        category: 'Event',
        title: 'Annual Conference 2026 Dates Announced',
        excerpt: 'Mark your calendars! Our annual conference will be held from March 15-17, 2026 in Cairo.',
        featured: false,
    },
    {
        date: 'December 28, 2025',
        category: 'Partnership',
        title: 'New Partnership with Tech Leaders',
        excerpt: 'Reps Egypt has partnered with leading technology companies to bring more resources to our members.',
        featured: false,
    },
    {
        date: 'December 20, 2025',
        category: 'Achievement',
        title: 'Member Success Stories Spotlight',
        excerpt: 'Celebrating the achievements of our members who have made significant contributions to their industries.',
        featured: false,
    },
    {
        date: 'December 15, 2025',
        category: 'Update',
        title: 'New Training Programs Available',
        excerpt: 'We have added new professional development programs to help members advance their careers.',
        featured: false,
    },
];

export default function NewsPage() {
    const featuredNews = newsItems.find(item => item.featured);
    const regularNews = newsItems.filter(item => !item.featured);

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="max-w-6xl mx-auto px-6 py-20">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
                        Reps Egypt News
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                    <p className="mt-4 text-gray-300 text-lg">Stay updated with the latest news and announcements</p>
                </header>

                {featuredNews && (
                    <article className="mb-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
                        <span className="inline-block px-3 py-1 bg-purple-500 text-white text-sm rounded-full mb-4">Featured</span>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                            <span>{featuredNews.date}</span>
                            <span className="w-1 h-1 bg-gray-500 rounded-full" />
                            <span className="text-purple-400">{featuredNews.category}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">{featuredNews.title}</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">{featuredNews.excerpt}</p>
                        <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                            Read more →
                        </a>
                    </article>
                )}

                <section className="grid md:grid-cols-2 gap-6">
                    {regularNews.map((item, index) => (
                        <article
                            key={index}
                            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                                <span>{item.date}</span>
                                <span className="w-1 h-1 bg-gray-500 rounded-full" />
                                <span className="text-pink-400">{item.category}</span>
                            </div>
                            <h2 className="text-lg font-semibold text-white mb-2">{item.title}</h2>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">{item.excerpt}</p>
                            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
                                Read more →
                            </a>
                        </article>
                    ))}
                </section>

                <footer className="mt-16 text-center">
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                    >
                        ← Back to Home
                    </a>
                </footer>
            </div>
        </main>
    );
}

import Link from "next/link";
import { getDictionary } from '@/lib/get-dictionary';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: dictionary.blogs_page.title + ' | Reps Egypt',
        description: dictionary.blogs_page.subtitle,
    };
}

const blogPosts = [
    {
        title: 'The Future of Digital Transformation in Egypt',
        excerpt: 'Exploring how emerging technologies are reshaping the business landscape in Egypt and beyond.',
        date: 'January 12, 2026',
        author: 'Sarah Ahmed',
        category: 'Technology',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    },
    {
        title: 'Building Resilient Communities',
        excerpt: 'Why community engagement is crucial for modern organizations and how to foster it effectively.',
        date: 'January 8, 2026',
        author: 'Mohamed Ali',
        category: 'Community',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
    },
    {
        title: 'Best Practices for Remote Work in 2026',
        excerpt: 'Tips and strategies for maximizing productivity and maintaining work-life balance in a remote-first world.',
        date: 'January 2, 2026',
        author: 'Laila Hassan',
        category: 'Productivity',
        image: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?q=80&w=1000&auto=format&fit=crop',
    },
    {
        title: 'Understanding the New Data Privacy Laws',
        excerpt: 'A comprehensive guide to compliance with the latest data protection regulations affecting Egyptian businesses.',
        date: 'December 28, 2025',
        author: 'Omar Khaled',
        category: 'Legal',
        image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1000&auto=format&fit=crop',
    },
    {
        title: 'Sustainable Tech: Green Computing',
        excerpt: 'How the tech industry is adopting sustainable practices to reduce carbon footprint.',
        date: 'December 20, 2025',
        author: 'Nour El-Din',
        category: 'Sustainability',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop',
    }
];

export default async function BlogsPage({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);
    const content = dictionary.blogs_page;

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
                        {content.title}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                    <p className="mt-4 text-gray-300 text-lg">{content.subtitle}</p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <article 
                            key={index}
                            className="group bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                                <img 
                                    src={post.image} 
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <span className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-purple-600/90 backdrop-blur-sm text-xs rounded-full font-medium">
                                    {post.category}
                                </span>
                            </div>
                            
                            <div className="p-6">
                                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                                    <span>{post.date}</span>
                                    <span className="w-1 h-1 bg-gray-500 rounded-full" />
                                    <span>{post.author}</span>
                                </div>
                                <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <a href="#" className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                                    {content.read_article} <span>→</span>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all font-medium">
                        {content.load_more}
                    </button>
                </div>

                <footer className="mt-16 text-center">
                    <Link
                        href={`/${lang}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                    >
                        {content.back_home}
                    </Link>
                </footer>
            </div>
        </main>
    );
}

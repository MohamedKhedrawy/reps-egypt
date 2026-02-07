import { getNewsById } from '@/lib/news';
import { getDictionary } from '@/lib/get-dictionary';
import Link from 'next/link';

export async function generateMetadata({ params }) {
    const { lang, id } = await params;
    
    try {
        const article = await getNewsById(id);
        if (!article) {
            return { title: 'Article Not Found' };
        }
        return {
            title: `${article.title} | Reps Egypt`,
            description: article.description,
        };
    } catch (error) {
        return { title: 'Article Not Found' };
    }
}

export default async function ArticlePage({ params }) {
    const { lang, id } = await params;
    const dictionary = await getDictionary(lang);
    const content = dictionary?.news_page || {};

    let article = null;

    try {
        article = await getNewsById(id);
    } catch (error) {
        console.error('Failed to fetch article:', error);
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">{content.article_not_found || "Article Not Found"}</h1>
                    <Link href={`/${lang}/news`} className="text-red-600 hover:underline">
                        {content.back_to_news || "← Back to News"}
                    </Link>
                </div>
            </div>
        );
    }

    const formattedDate = new Date(article.createdAt || Date.now()).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <div className="bg-secondary border-b border-border sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href={`/${lang}/news`} className="text-red-600 hover:text-red-500 flex items-center gap-2">
                        {content.back_to_news || "← Back to News"}
                    </Link>
                </div>
            </div>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-6 py-12">
                {/* Category & Date */}
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                        {article.category || content.read_article || "Article"}
                    </span>
                    <span className="text-sm text-muted">{formattedDate}</span>
                </div>

                {/* Title */}
                <h1 className="text-5xl font-bold mb-6 leading-tight text-foreground">
                    {article.title}
                </h1>

                {/* Cover Image */}
                {(article.imageUrl || article.image) && (
                    <div className="mb-8 rounded-xl overflow-hidden border border-border shadow-xl">
                        <img 
                            src={article.imageUrl || article.image} 
                            alt={article.title} 
                            className="w-full h-96 object-cover" 
                        />
                    </div>
                )}

                {/* Description */}
                {article.description && (
                    <div className="mb-8 p-6 bg-secondary rounded-xl border border-border">
                        <p className="text-lg text-foreground leading-relaxed">
                            {article.description}
                        </p>
                    </div>
                )}

                {/* Article Images Gallery */}
                {article.images && article.images.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">{content.article_images || "Article Images"}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {article.images.map((img, idx) => (
                                <div 
                                    key={idx} 
                                    className="rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <img 
                                        src={img} 
                                        alt={`${content.image || "Image"} ${idx + 1}`} 
                                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Full Content */}
                {article.content && (
                    <div className="mb-12 prose prose-invert max-w-none">
                        <div className="p-6 bg-tertiary rounded-xl border border-border text-foreground leading-relaxed whitespace-pre-wrap">
                            {article.content}
                        </div>
                    </div>
                )}

                {/* Footer CTA */}
                <div className="mt-12 pt-8 border-t border-border">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4">{content.did_you_like || "Did you like this article?"}</h3>
                        <p className="text-muted mb-6">{content.share_article || "Share this article with your friends or read more news"}</p>
                        <div className="flex gap-4 justify-center">
                            <Link 
                                href={`/${lang}/news`}
                                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                            >
                                {content.read_more_news || "Read More News"}
                            </Link>
                            <Link 
                                href={`/${lang}`}
                                className="px-6 py-3 bg-secondary border border-border hover:bg-tertiary text-foreground font-bold rounded-lg transition-colors"
                            >
                                {content.back_home || "Back to Home"}
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}

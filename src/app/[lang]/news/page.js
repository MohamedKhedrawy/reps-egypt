import Link from "next/link";
import { getPublishedNews } from "@/lib/news";
import { getDictionary } from '@/lib/get-dictionary';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return {
        title: `${dictionary.news_page.title_prefix} ${dictionary.news_page.title_highlight} | Reps Egypt`,
        description: dictionary.news_page.subtitle,
    };
}

export const dynamic = 'force-dynamic';

export default async function NewsPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const content = dictionary.news_page;

  let articles = [];
  
  try {
    articles = await getPublishedNews();
    articles = articles.map(a => ({
      ...a,
      id: a._id.toString(),
      _id: undefined,
    }));
  } catch (error) {
    console.error("Failed to fetch news:", error);
  }

  // Default articles if none in database
  if (articles.length === 0) {
    articles = [
      { 
        title: "New International Standards for 2026", 
        category: "Announcement", 
        createdAt: new Date("2026-01-28"),
        description: "Reps Egypt adopts new global certification standards to ensure our trainers remain world-class.",
        imageUrl: "https://images.unsplash.com/photo-1517438476312-10d79c077309?q=80&w=1470&auto=format&fit=crop"
      },
      { 
        title: "Nutrition vs. Training: What Matters More?", 
        category: "Article", 
        createdAt: new Date("2026-01-25"),
        description: "An in-depth look at how nutrition fuels performance and why you can't out-train a bad diet.",
        imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1470&auto=format&fit=crop"
      },
      { 
        title: "Success Story: Trainer Sarah's Journey", 
        category: "Community", 
        createdAt: new Date("2026-01-20"),
        description: "From trainee to Master Coach, read how Sarah transformed her career with Reps Egypt certifications.",
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop"
      },
    ];
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* Header */}
      <section className="pt-32 pb-12 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
           <h1 className="text-4xl lg:text-5xl font-bold mb-6">{content.title_prefix} <span className="text-red-600">{content.title_highlight}</span></h1>
           <p className="text-muted max-w-2xl text-lg mb-10">{content.subtitle}</p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
           {articles.map((article, idx) => (
             <article key={article.id || idx} className="flex flex-col group">
                <div className="h-64 rounded-2xl overflow-hidden bg-secondary border border-border mb-6 relative">
                   <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/10">
                     {article.category}
                   </div>
                   {article.imageUrl && (
                     <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                   )}
                </div>
                
                <div className="flex flex-col flex-grow">
                   <div className="flex items-center gap-3 text-xs text-red-500 font-bold mb-3 uppercase tracking-wider">
                      <span>{formatDate(article.createdAt)}</span>
                      <span className="w-1 h-1 rounded-full bg-background-muted"></span>
                      <span className="text-muted font-normal">5 {content.min_read}</span>
                   </div>
                   <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-red-500 transition-colors leading-tight">
                     <Link href="#">{article.title}</Link>
                   </h3>
                   <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-3">
                     {article.description}
                   </p>
                   <Link href="#" className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-red-500 transition-colors">
                     {content.read_article}
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                     </svg>
                   </Link>
                </div>
             </article>
           ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-32 p-12 bg-secondary border border-border rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] -z-10" />
           
           <div className="max-w-xl">
             <h2 className="text-3xl font-bold mb-4 text-foreground">{content.newsletter_title}</h2>
             <p className="text-muted">{content.newsletter_desc}</p>
           </div>
           
           <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3">
              <input type="email" placeholder={content.email_placeholder} className="w-full sm:w-80 bg-tertiary border border-border rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-red-600 transition-colors text-foreground" />
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/20 whitespace-nowrap">
                {content.btn_subscribe}
              </button>
           </div>
        </div>
      </section>

    </div>
  );
}

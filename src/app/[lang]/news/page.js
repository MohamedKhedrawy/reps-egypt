import Link from "next/link";
import { getPublishedNews } from "@/lib/news";
import { getDictionary } from '@/lib/get-dictionary';
import NewsClient from './NewsClient';

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
        id: "default-1",
        title: "New International Standards for 2026", 
        category: "Announcement", 
        createdAt: new Date("2026-01-28"),
        description: "Reps Egypt adopts new global certification standards to ensure our trainers remain world-class.",
        imageUrl: "https://images.unsplash.com/photo-1517438476312-10d79c077309?q=80&w=1470&auto=format&fit=crop"
      },
      { 
        id: "default-2",
        title: "Nutrition vs. Training: What Matters More?", 
        category: "Article", 
        createdAt: new Date("2026-01-25"),
        description: "An in-depth look at how nutrition fuels performance and why you can't out-train a bad diet.",
        imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1470&auto=format&fit=crop"
      },
      { 
        id: "default-3",
        title: "Success Story: Trainer Sarah's Journey", 
        category: "Community", 
        createdAt: new Date("2026-01-20"),
        description: "From trainee to Master Coach, read how Sarah transformed her career with Reps Egypt certifications.",
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop"
      },
    ];
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* Header */}
      <section className="pt-32 pb-12 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
           <h1 className="text-4xl lg:text-5xl font-bold mb-6">{content.title_prefix} <span className="text-red-600">{content.title_highlight}</span></h1>
           <p className="text-muted max-w-2xl text-lg mb-10">{content.subtitle}</p>
        </div>
      </section>

      {/* Client Component for Interactive Features */}
      <NewsClient 
        articles={articles} 
        lang={lang}
        content={content} 
        dictionary={dictionary}
      />

    </div>
  );
}

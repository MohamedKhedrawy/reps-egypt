'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NewsClient({ articles, lang, content, dictionary }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      {/* Articles Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article) => (
            <article key={article.id} className="flex flex-col group">
              <div className="h-64 rounded-2xl overflow-hidden bg-secondary border border-border mb-6 relative">
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/10">
                  {article.category}
                </div>
                {(article.imageUrl || article.image) && (
                  <img 
                    src={article.imageUrl || article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                )}
              </div>
              
              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-xs text-red-500 font-bold mb-3 uppercase tracking-wider">
                  <span>{formatDate(article.createdAt)}</span>
                  <span className="w-1 h-1 rounded-full bg-background-muted"></span>
                  <span className="text-muted font-normal">5 {content.min_read}</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-red-500 transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-3">
                  {article.description}
                </p>
                <button 
                  onClick={() => setSelectedArticle(article)}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-red-500 transition-colors"
                >
                  {content.read_article}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
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

      {/* Article Preview Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="bg-secondary border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Cover Image */}
              {(selectedArticle.imageUrl || selectedArticle.image) && (
                <div className="mb-6 rounded-xl overflow-hidden border border-border">
                  <img 
                    src={selectedArticle.imageUrl || selectedArticle.image} 
                    alt={selectedArticle.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Category & Date */}
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                  {selectedArticle.category}
                </span>
                <span className="text-sm text-muted">
                  {formatDate(selectedArticle.createdAt)}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                {selectedArticle.title}
              </h2>

              {/* Description */}
              <div className="mb-6 p-4 bg-tertiary rounded-xl border border-border">
                <p className="text-foreground leading-relaxed">
                  {selectedArticle.description}
                </p>
              </div>

              {/* Article Content Preview */}
              {selectedArticle.content && (
                <div className="mb-6 p-4 bg-background rounded-xl border border-border">
                  <p className="text-sm text-muted uppercase font-bold mb-3">{lang === 'ar' ? 'بداية المقال' : 'Article Preview'}</p>
                  <p className="text-foreground leading-relaxed line-clamp-4">
                    {selectedArticle.content}
                  </p>
                  {selectedArticle.content.length > 200 && (
                    <p className="text-xs text-muted mt-2">...</p>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-border">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="flex-1 py-3 bg-secondary border border-border hover:bg-tertiary text-foreground font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  {lang === 'ar' ? 'العودة' : 'Back'}
                </button>
                <Link
                  href={`/${lang}/news/${selectedArticle.id}`}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {lang === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5L15.75 12l-7.5 7.5" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

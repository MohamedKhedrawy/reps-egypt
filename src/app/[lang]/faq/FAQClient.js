"use client";

import { useState } from "react";
import Link from "next/link";

export default function FAQClient({ content }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-tertiary rounded-2xl flex items-center justify-center mx-auto mb-6 border border-border shadow-[0_0_30px_rgba(220,38,38,0.1)]">
             <span className="text-red-600 text-3xl font-bold">?</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">{content.title}</h1>
          <p className="text-muted">{content.subtitle}</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-16">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-muted">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder={content.search_placeholder}
            className="w-full bg-secondary border border-border rounded-xl py-4 pl-12 pr-4 text-sm text-foreground placeholder-muted focus:outline-none focus:border-red-900/50 focus:ring-1 focus:ring-red-900/50 transition-all"
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {content.categories.map((category, catIdx) => (
            <div key={catIdx}>
              <h2 className="text-xl font-bold text-red-600 mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIdx) => {
                  const uniqueIndex = `${catIdx}-${qIdx}`;
                  const isOpen = openIndex === uniqueIndex;

                  return (
                    <div 
                      key={qIdx} 
                      className={`bg-secondary border text-left overflow-hidden rounded-xl transition-all duration-300 ${isOpen ? 'border-red-900/30 shadow-[0_4px_20px_-12px_rgba(220,38,38,0.2)]' : 'border-border hover:border-border-border'}`}
                    >
                      <button 
                        onClick={() => toggleAccordion(uniqueIndex)}
                        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                      >
                        <span className={`text-sm font-bold transition-colors ${isOpen ? 'text-foreground' : 'text-muted'}`}>
                          {faq.q}
                        </span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          strokeWidth={2} 
                          stroke="currentColor" 
                          className={`w-4 h-4 text-red-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                      
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                         <div className="px-6 pb-6 pt-0 text-sm text-muted leading-relaxed border-t border-border mt-2 pt-4">
                           {faq.a}
                         </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support CTA */}
        <div className="mt-20 bg-secondary border border-border rounded-2xl p-10 text-center relative overflow-hidden">
           <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />
           <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />
           
           <h3 className="text-2xl font-bold mb-2">{content.support_title}</h3>
           <p className="text-muted text-sm mb-8">{content.support_text}</p>
           
           <Link href="#" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]">
             {content.support_btn}
           </Link>
        </div>

      </div>
    </div>
  );
}

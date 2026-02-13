"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";

// Debounce hook for optimizing search
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function ProgramsClient({ programs, lang, dictionary }) {
  const content = dictionary.programs_page;
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  
  // Debounce search query for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  // Track performance metrics (optional, for debugging)
  const filterCountRef = useRef(0);

  // Memoized filtered programs with debounced search
  const filteredPrograms = useMemo(() => {
    filterCountRef.current++;
    
    return programs.filter((program) => {
      // Search by title or description - uses debounced value
      const matchesSearch = debouncedSearchQuery === "" || 
        (program.title?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
         program.desc?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));

      // Filter by category
      const matchesCategory = selectedCategory === "" || 
        program.category === selectedCategory;

      // Filter by price range
      let matchesPrice = selectedPrice === "";
      if (selectedPrice) {
        const price = program.price || 0;
        switch (selectedPrice) {
          case "free":
            matchesPrice = price === 0;
            break;
          case "affordable":
            matchesPrice = price > 0 && price <= 500;
            break;
          case "premium":
            matchesPrice = price > 500 && price <= 1500;
            break;
          case "exclusive":
            matchesPrice = price > 1500;
            break;
          default:
            matchesPrice = true;
        }
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [programs, debouncedSearchQuery, selectedCategory, selectedPrice]);

  // Handle filter button click
  const handleFilter = useCallback(() => {
    // Filter is applied via useMemo above, this can trigger other actions if needed
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle reset filters
  const handleReset = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedPrice("");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* Search Header */}
      <section className="pt-32 pb-12 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {content.title_prefix} <span className="text-red-600">{content.title_highlight}</span>
          </h1>
          <p className="text-muted max-w-2xl mb-10 text-lg">{content.subtitle}</p>
           
          {/* Filters Section */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4 p-4 bg-secondary rounded-2xl border border-border">
              {/* Search Input */}
              <input 
                type="text" 
                placeholder={content.search_placeholder} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-red-600 focus:outline-none placeholder:text-muted text-foreground transition-colors" 
              />

              {/* Category Filter */}
              <div className="relative">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-red-600 focus:outline-none appearance-none text-foreground cursor-pointer transition-colors"
                >
                  <option value="">{content.filter_category}</option>
                  {content.filter_category_options?.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Price Filter */}
              <div className="relative">
                <select 
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-red-600 focus:outline-none appearance-none text-foreground cursor-pointer transition-colors"
                >
                  <option value="">{content.filter_price}</option>
                  {content.filter_price_options?.map((opt, i) => (
                    <option key={i} value={opt.toLowerCase().replace(/[^a-z]/g, "")}>{opt}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Filter Button */}
              <button 
                onClick={handleFilter}
                className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg px-6 py-3 transition-colors shadow-lg shadow-red-600/20 active:scale-[0.98]"
              >
                {content.btn_filter}
              </button>
            </div>

            {/* Reset & Results Count */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted">
                {filteredPrograms.length} {filteredPrograms.length === 1 ? "Program" : "Programs"} Found
              </p>
              {(searchQuery || selectedCategory || selectedPrice) && (
                <button 
                  onClick={handleReset}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold underline"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Program Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        {filteredPrograms.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPrograms.map((program, idx) => {
              // Look up translation or fallback to database value
              const translatedProgram = dictionary.program_content?.programs?.[program.title?.trim()] || {};
              const title = translatedProgram.title || program.title;
              const desc = translatedProgram.desc || program.desc;
              const category = dictionary.program_content?.categories?.[program.category] || program.category;

              return (
                <div key={idx} className="group bg-secondary border border-border rounded-2xl overflow-hidden hover:border-red-600/30 transition-all duration-500 flex flex-col shadow-2xl shadow-black/10 hover:shadow-red-600/5">
                  <div className="h-56 overflow-hidden relative">
                    <div className="absolute top-4 left-4 z-10 bg-red-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg text-white">
                      {category}
                    </div>
                    <img src={program.img} alt={program.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-60" />
                  </div>
                   
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-red-500 transition-colors">{title}</h3>
                    <p className="text-sm text-muted mb-8 line-clamp-2 leading-relaxed">{desc}</p>
                    
                    <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-background border border-border overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?u=${program.instructor}`} alt={program.instructor} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-semibold text-muted">{content.reps_certified}</span>
                      </div>
                    </div>
                    
                    <Link href={`/${lang}/register`} className="mt-8 w-full py-3.5 bg-background hover:bg-red-600 text-sm font-bold rounded-xl transition-all border border-border hover:border-red-600 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] text-foreground hover:text-white inline-flex items-center justify-center">
                      {content.btn_enroll}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl font-bold text-foreground mb-4">No Programs Found</p>
            <p className="text-muted mb-8">Try adjusting your search or filters</p>
            <button 
              onClick={handleReset}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
        
        {/* Newsletter / CTA */}
        <div className="mt-32 p-12 bg-secondary border border-border rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/5 blur-[100px] -z-10" />
           
          <h2 className="text-3xl font-bold mb-4 text-foreground">{content.newsletter_title}</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">{content.newsletter_desc}</p>
           
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input type="email" placeholder={content.email_placeholder} className="flex-1 bg-background border border-border rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-red-600 transition-colors text-foreground" />
            <button className="bg-foreground text-background font-extrabold px-8 py-3.5 rounded-xl hover:bg-muted transition-colors">{content.btn_join}</button>
          </div>
        </div>
      </section>
    </div>
  );
}

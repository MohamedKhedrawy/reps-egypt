'use client';

import { useState, useMemo } from 'react';

export default function GalleryClient({ dictionary, images, lang }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Certification', 'Workshops', 'Events', 'Community'];

  const filteredImages = useMemo(() => {
    if (activeFilter === 'All') {
      return images;
    }
    return images.filter(img => img.category === activeFilter);
  }, [activeFilter, images]);

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-12 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {dictionary.title_prefix} <span className="text-red-600">{dictionary.title_highlight}</span>
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-lg mb-10">{dictionary.subtitle}</p>

          {/* Filters */}
          <div className="flex justify-center flex-wrap gap-4">
            {categories.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeFilter === tag
                    ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                    : 'bg-tertiary text-muted hover:bg-background border border-transparent hover:border-border hover:text-foreground'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        {filteredImages.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted text-lg">No images in this category yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((item) => (
              <div
                key={item._id?.toString()}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary border border-border cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title || item.category}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <div>
                    <span className="text-red-500 text-xs font-bold uppercase tracking-wider mb-2 block">
                      {item.category}
                    </span>
                    {item.title && (
                      <h3 className="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {item.title}
                      </h3>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More - Optional for future */}
        {false && (
          <div className="mt-16 text-center">
            <button className="px-8 py-3.5 border border-border rounded-xl text-sm font-bold text-muted hover:text-foreground hover:border-border-border transition-colors">
              {dictionary.load_more}
            </button>
          </div>
        )}
      </section>
    </>
  );
}

'use client';

import Link from "next/link";
import ImageLightbox from "@/components/ImageLightbox";

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

export default function HomeClient({ coaches, home, lang }) {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-red-500 font-bold uppercase tracking-wider text-sm">{home.section_trainers_badge}</span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-foreground">{home.section_trainers_title}</h2>
        </div>
        <Link href={`/${lang}/coaches`} className="hidden sm:flex items-center gap-2 text-sm font-bold text-muted hover:text-foreground transition-colors">
          {home.section_trainers_view_all} <ArrowRight />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coaches.length > 0 ? coaches.map((trainer) => (
          <div key={trainer._id.toString()} className="group relative bg-secondary rounded-xl overflow-hidden border border-border hover:border-red-600/50 transition-all duration-300">
            <div className="aspect-[4/5] w-full overflow-hidden">
              <ImageLightbox
                image={trainer.profilePhoto || `https://ui-avatars.com/api/?name=${trainer.fullName}&background=dc2626&color=fff`}
                title={trainer.fullName}
                isOwnProfile={false}
              />
            </div>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

            {/* Tag */}
            <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
              {trainer.repsId ? `REPS #${trainer.repsId}` : home.certified}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 w-full p-4">
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-red-500 transition-colors">{trainer.fullName}</h3>
              <p className="text-sm text-gray-300 mb-4">{trainer.specialization || home.certified}</p>
              
              <Link href={`/${lang}/coaches/${trainer._id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors">
                {home.view_profile} <span>→</span>
              </Link>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center text-muted py-12">
            {home.no_trainers}
          </div>
        )}
      </div>
    </section>
  );
}

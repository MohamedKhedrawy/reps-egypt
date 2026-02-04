"use client";

import Link from "next/link";
import { useState } from "react";

export default function JobsClient({ content, lang }) {
  const [filterType, setFilterType] = useState("all");

  const jobs = content.jobs_list;

  const filteredJobs = filterType === "all" 
    ? jobs 
    : jobs.filter(j => j.type_key === filterType);

  const filters = [
    { key: "all", label: content.filters.all },
    { key: "full_time", label: content.filters.full_time },
    { key: "part_time", label: content.filters.part_time },
    { key: "contract", label: content.filters.contract }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
          <div>
             <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
               {content.title_prefix} <span className="text-red-600">{content.title_highlight}</span>
             </h1>
             <p className="text-muted text-lg max-w-xl">
               {content.subtitle}
             </p>
          </div>
          <div className="flex gap-4">
             <Link 
               href={`/${lang}/register/trainer`} 
               className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-bold rounded-xl transition-all shadow-lg"
             >
               {content.btn_upload_cv}
             </Link>
             <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)]">
               {content.btn_post_job}
             </button>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 px-6 sticky top-20 z-40 bg-background/80 backdrop-blur-md border-b border-border">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
               <input 
                 type="text" 
                 placeholder={content.search_placeholder}
                 className="w-full bg-secondary border border-border rounded-xl px-5 py-3 pl-12 focus:border-red-600 focus:outline-none transition-colors"
               />
               <svg className="w-5 h-5 text-muted absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
               {filters.map((filter) => (
                 <button
                   key={filter.key}
                   onClick={() => setFilterType(filter.key)}
                   className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                     filterType === filter.key 
                       ? "bg-foreground text-background border-foreground" 
                       : "bg-secondary text-muted border-border hover:border-red-600/50 hover:text-foreground"
                   }`}
                 >
                   {filter.label}
                 </button>
               ))}
            </div>
         </div>
      </section>

      {/* Jobs List */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {filteredJobs.length > 0 ? filteredJobs.map((job) => (
             <div 
               key={job.id} 
               className={`group bg-secondary border rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6 transition-all duration-300 hover:border-red-600/40 hover:-translate-y-1 hover:shadow-xl ${
                 job.featured ? "border-red-600/30 shadow-[0_0_15px_rgba(220,38,38,0.05)]" : "border-border"
               }`}
             >
                {/* Logo */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0">
                   <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold truncate group-hover:text-red-500 transition-colors">{job.title}</h3>
                      {job.featured && (
                        <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold uppercase rounded tracking-wider">{content.job_card.featured}</span>
                      )}
                   </div>
                   <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {job.posted}
                      </span>
                   </div>
                </div>

                {/* Access */}
                <div className="flex flex-col items-end gap-2 w-full md:w-auto mt-4 md:mt-0">
                   <span className="text-sm font-bold text-foreground">{job.salary}</span>
                   <span className="px-3 py-1 bg-tertiary border border-border rounded-lg text-xs font-medium text-muted uppercase">
                      {job.type}
                   </span>
                   <button className="w-full md:w-auto mt-2 px-6 py-2 bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold rounded-lg transition-all text-sm">
                      {content.job_card.apply_btn}
                   </button>
                </div>
             </div>
          )) : (
             <div className="text-center py-20">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                   <svg className="w-10 h-10 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{content.no_jobs.title}</h3>
                <p className="text-muted">{content.no_jobs.desc}</p>
                <button onClick={() => setFilterType("all")} className="mt-4 text-red-500 font-bold hover:underline">{content.no_jobs.clear_btn}</button>
             </div>
          )}

        </div>
      </section>

    </div>
  );
}

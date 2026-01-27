export const metadata = {
  title: "Professional Standards | Reps Egypt",
  description: "Upholding the highest standards of professionalism and ethics in the Egyption fitness industry.",
};

export default function StandardsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      
      {/* Hero Section */}
      <section className="relative py-24 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-900/10 to-transparent" />
           <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-red-900/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-900/10 border border-red-500/20 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Integrity & Excellence</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Our Commitment to <span className="text-red-600">Professional Standards</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Reps Egypt is dedicated to raising the bar for fitness professionals. We ensure that every certified coach adheres to a strict code of ethics and practice.
          </p>
        </div>
      </section>

      {/* Core Standards Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[
             {
               title: "Code of Ethical Practice",
               desc: "All members must adhere to our rigorous code of ethics, ensuring client safety, respect, and professional integrity at all times.",
               icon: (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                 </svg>
               )
             },
             {
               title: "Professional Competence",
               desc: "Members are required to maintain their skills and knowledge through continuous professional development (CPD) and regular re-accreditation.",
               icon: (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                 </svg>
               )
             },
             {
               title: "Client Safety & Welfare",
               desc: "The physical and mental well-being of training clients is paramount. Strict guidelines are in place for risk assessment and injury prevention.",
               icon: (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                 </svg>
               )
             },
             {
               title: "Insurance & Liability",
               desc: "Correct professional indemnity and public liability insurance is a mandatory requirement for all practicing members.",
               icon: (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                 </svg>
               )
             },
             {
               title: "Transparancy",
               desc: "We believe in complete transparency regarding qualifications, fees, and service deliverables. Misrepresentation is strictly prohibited.",
               icon: (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                 </svg>
               )
             },
             {
               title: "Complaint Resolution",
               desc: "A formal and impartial process is available for addressing complaints against members to maintain public trust in the registry.",
               icon: (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                 </svg>
               )
             },
           ].map((item, idx) => (
             <div key={idx} className="bg-white/5 border border-white/5 p-8 rounded-2xl hover:border-red-600/30 hover:bg-white/[0.08] transition-all group">
               <div className="w-12 h-12 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  {item.icon}
               </div>
               <h3 className="text-xl font-bold mb-3">{item.title}</h3>
               <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Compliance Download/Action */}
      <section className="py-20 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Documentation & Guidelines</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Review the official documents that govern the standards of fitness practice in Egypt.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg transition-colors text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Code of Ethics
             </button>
             <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg transition-colors text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                Full Standards Manual
             </button>
          </div>
        </div>
      </section>

    </div>
  );
}

import Link from "next/link";

export const metadata = {
  title: "Member Benefits | Reps Egypt",
  description: "Discover the exclusive advantages of being a Reps Egypt certified professional.",
};

export default function BenefitsPage() {
  const benefits = [
    {
      title: "Global Recognition",
      desc: "Your certification is recognized internationally, allowing you to work in UAE, KSA, UK, Australia, and more.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-foreground group-hover:text-red-500 transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      )
    },
    {
      title: "Career Opportunities",
      desc: "Access our exclusive job board featuring premium listings from top gyms, wellness centers, and sports clubs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-foreground group-hover:text-red-500 transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
        </svg>
      )
    },
    {
      title: "Continuing Education",
      desc: "Get discounted access to workshops and seminars to keep your skills sharp and earn your CEUs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-foreground group-hover:text-red-500 transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      )
    },
    {
      title: "Legal & Insurance",
      desc: "Protection for you and your business with group liability insurance rates designed for fitness professionals.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-foreground group-hover:text-red-500 transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.296A3.746 3.746 0 0 1 3.296 4.662A3.745 3.745 0 0 1 6.91 3.619a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      )
    },
    {
      title: "Networking Events",
      desc: "Connect with the best coaches in the industry at our exclusive quarterly meetups and social events.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-foreground group-hover:text-red-500 transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      )
    },
    {
      title: "Digital Resources",
      desc: "Access our library of program templates, assessment forms, and client management tools.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-foreground group-hover:text-red-500 transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* Header */}
      <section className="pt-32 pb-12 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
             <div className="max-w-3xl">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">Member <span className="text-red-600">Benefits</span></h1>
                <p className="text-muted text-lg">Join a network of over 5,000 certified professionals and unlock tools to accelerate your career.</p>
             </div>
             <div className="shrink-0">
               <Link href="/register" className="inline-flex items-center justify-center px-8 py-3.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                 Get Certified Now
               </Link>
             </div>
           </div>
        </div>
      </section>

      {/* Benefits Content */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        
        {/* Main Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
           {benefits.map((item, idx) => (
             <div key={idx} className="group p-8 bg-secondary border border-border rounded-3xl hover:border-red-600/30 transition-all duration-300 hover:-translate-y-1 shadow-2xl shadow-black/5 hover:shadow-red-600/5">
                <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center mb-6 border border-border group-hover:bg-red-600/10 group-hover:border-red-600/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-red-500 transition-colors">{item.title}</h3>
                <p className="text-muted leading-relaxed text-sm">{item.desc}</p>
             </div>
           ))}
        </div>

        {/* Comparison Table / Upgrade CTA */}
        <div className="rounded-3xl bg-secondary border border-border overflow-hidden">
           <div className="p-8 md:p-12 border-b border-border text-center">
             <h2 className="text-3xl font-bold mb-4 text-foreground">Membership Tiers</h2>
             <p className="text-muted">Choose the level that suits your professional goals</p>
           </div>
           
           <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              {/* Tier 1 */}
              <div className="p-8 md:p-12 hover:bg-tertiary transition-colors">
                 <div className="text-lg font-bold text-muted mb-2">Student</div>
                 <div className="text-3xl font-bold text-foreground mb-6">Free</div>
                 <ul className="space-y-4 mb-8 text-sm text-muted">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>Study Resources</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>Community Access</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>Event Discounts</li>
                 </ul>
                 <button className="w-full py-3 border border-border rounded-xl font-bold text-sm hover:bg-foreground hover:text-background transition-colors text-foreground">Register</button>
              </div>
              
              {/* Tier 2 */}
              <div className="p-8 md:p-12 bg-tertiary relative overflow-hidden">
                 <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 to-red-900"></div>
                 <div className="text-lg font-bold text-red-500 mb-2">Pro Member</div>
                 <div className="text-3xl font-bold text-foreground mb-6">1,200 EGP<span className="text-sm font-normal text-muted">/yr</span></div>
                 <ul className="space-y-4 mb-8 text-sm text-foreground/80">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>Everything in Student</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>Professional Liability</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>Job Board Access</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>Partner Discounts</li>
                 </ul>
                 <button className="w-full py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20">Upgrade Now</button>
              </div>

               {/* Tier 3 */}
              <div className="p-8 md:p-12 hover:bg-tertiary transition-colors">
                 <div className="text-lg font-bold text-muted mb-2">Master Coach</div>
                 <div className="text-3xl font-bold text-foreground mb-6">2,500 EGP<span className="text-sm font-normal text-muted">/yr</span></div>
                 <ul className="space-y-4 mb-8 text-sm text-muted">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>Everything in Pro</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>Priority Listing</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>Exclusive Mentorship</li>
                 </ul>
                 <button className="w-full py-3 border border-border rounded-xl font-bold text-sm hover:bg-foreground hover:text-background transition-colors text-foreground">Contact Us</button>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
}

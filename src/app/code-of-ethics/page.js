export const metadata = {
  title: "Code of Ethics | Reps Egypt",
  description: "Professional standards and ethical guidelines for Reps Egypt members.",
};

export default function CodeOfEthicsPage() {
  const principles = [
    {
      title: "Professional Integrity",
      desc: "Maintain the highest standards of professional conduct and honesty in all interactions with clients, colleagues, and the fitness community.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
        </svg>
      ),
      points: [
        "Practice within the scope of your certification and expertise",
        "Provide accurate information about your qualifications and experience",
        "Maintain professional boundaries with all clients",
        "Avoid conflicts of interest and disclose any potential conflicts"
      ]
    },
    {
      title: "Client Welfare",
      desc: "Prioritize the health, safety, and well-being of clients above all other considerations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
      ),
      points: [
        "Conduct thorough health screenings before beginning training",
        "Respect medical advice and work within client limitations",
        "Create safe and effective training programs",
        "Recognize when to refer clients to medical professionals"
      ]
    },
    {
      title: "Respect and Inclusivity",
      desc: "Treat all individuals with respect and dignity, fostering an inclusive environment free from discrimination.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.636A16.657 16.657 0 0 1 12 21.75c-2.33 0-4.512-.645-6.374-1.766a.75.75 0 0 1-.371-.636ZM16.611 15.468C18.025 16.59 18.9 18.23 18.9 20.08a16.551 16.551 0 0 1-1.353 3.655.75.75 0 0 1-1.29-.696A15.061 15.061 0 0 1 17.391 20.08c0-1.285-.59-2.452-1.528-3.253a.75.75 0 1 1 .948-1.159ZM5.42 16.927a15.061 15.061 0 0 1 1.133 3.153.75.75 0 1 1-1.291.696 16.553 16.553 0 0 1-1.352-3.655c0-1.85.875-3.49 2.29-4.612a.75.75 0 0 1 .947 1.16Z" clipRule="evenodd" />
        </svg>
      ),
      points: [
        "Respect diversity in age, gender, race, religion, and ability",
        "Use inclusive language and avoid discriminatory behavior",
        "Accommodate individual needs and preferences"
      ]
    },
    {
      title: "Professional Development",
      desc: "Commit to continuous learning and staying current with industry best practices and research.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v.756a14.053 14.053 0 0 1 5.96 2.01.75.75 0 0 1 .28.832 15.539 15.539 0 0 0 1.93 6.643c.25.42.067.97-.37 1.168a15.565 15.565 0 0 1-5.12 1.258V16.5a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1-.75-.75v-1.12c-1.818-.242-3.568-.69-5.197-1.306a.75.75 0 0 1-.397-1.116 15.518 15.518 0 0 0 2.002-6.505.75.75 0 0 1 .28-.832A14.053 14.053 0 0 1 11.25 3.756V3a.75.75 0 0 1 .75-.75ZM12 21.75a2.25 2.25 0 0 1-2.25-2.25H12v2.25Z" clipRule="evenodd" />
          <path d="M12.75 2.308a15.548 15.548 0 0 1 5.034 1.838.75.75 0 0 1 .15 1.157 14.004 14.004 0 0 0-4.048 3.513.75.75 0 0 1-1.072 0 13.999 13.999 0 0 0-4.048-3.513.75.75 0 0 1 .15-1.157 15.548 15.548 0 0 1 5.034-1.838Z" />
        </svg>
      ),
      points: [
        "Maintain and update professional certifications",
        "Participate in continuing education opportunities",
        "Stay informed about new research and training methodologies",
        "Share knowledge with colleagues and the fitness community"
      ]
    }
  ];

  const violationCategories = [
    {
      title: "Minor Violations",
      examples: "Late to sessions, Dress code violations, Unprofessional communication",
      consequences: "Written warning and mandatory ethics training",
      color: "amber",
      iconPath: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
    },
    {
      title: "Moderate Violations",
      examples: "Practicing outside scope of certification, Inadequate supervision, Breach of confidentiality",
      consequences: "Suspension of certification for 30-90 days and remedial training",
      color: "orange",
      iconPath: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
    },
    {
      title: "Severe Violations",
      examples: "Sexual harassment, Fraudulent claims, Endangering client safety",
      consequences: "Permanent revocation of certification and legal action",
      color: "red",
      iconPath: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
    }
  ];

  const getColorClasses = (color) => {
    switch(color) {
      case 'amber': return { text: 'text-amber-500', border: 'border-amber-900/20', borderAccent: 'border-amber-600' };
      case 'orange': return { text: 'text-orange-500', border: 'border-orange-900/20', borderAccent: 'border-orange-600' };
      case 'red': return { text: 'text-red-600', border: 'border-red-900/20', borderAccent: 'border-red-800' };
      default: return { text: 'text-gray-500', border: 'border-gray-800', borderAccent: 'border-gray-600' };
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 border border-border shadow-[0_0_30px_rgba(220,38,38,0.1)]">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-600">
               <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.352-.272-2.636-.759-3.804a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08l-.109-.092.126.111Z" clipRule="evenodd" />
             </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-foreground">Code of Ethics</h1>
          <p className="text-muted">Professional standards and ethical guidelines for Reps Egypt members</p>
        </div>

        {/* Commitment Card */}
        <div className="bg-secondary border border-border rounded-2xl p-8 mb-16">
           <h2 className="text-xl font-bold mb-4 text-foreground">Our Commitment</h2>
           <p className="text-muted text-sm leading-relaxed mb-4">
             The Reps Egypt Code of Ethics establishes the professional standards expected of all certified coaches and members. These guidelines ensure the safety, dignity, and well-being of clients while maintaining the integrity of the fitness profession.
           </p>
           <p className="text-muted text-sm leading-relaxed">
             By maintaining certification with Reps Egypt, you agree to uphold these ethical standards and understand that violations may result in disciplinary action, including suspension or revocation of certification.
           </p>
        </div>

        {/* Core Principles */}
        <div className="mb-20">
           <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Core Ethical Principles</h2>
           
           <div className="space-y-6">
              {principles.map((p, idx) => (
                <div key={idx} className="bg-secondary border border-border rounded-2xl p-8">
                   <div className="flex items-start gap-4 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-red-600/10 flex items-center justify-center shrink-0 text-red-600">
                         {p.icon}
                      </div>
                      <div>
                         <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
                         <p className="text-sm text-muted">{p.desc}</p>
                      </div>
                   </div>
                   <ul className="space-y-3 pl-[3.5rem]">
                      {p.points.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500 shrink-0">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                          </svg>
                          {item}
                        </li>
                      ))}
                   </ul>
                </div>
              ))}
           </div>
        </div>

        {/* Violations Section */}
        <div className="mb-20">
           <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Violations and Consequences</h2>
           
           <div className="space-y-6">
              {violationCategories.map((v, idx) => {
                const styles = getColorClasses(v.color);
                return (
                  <div key={idx} className={`bg-secondary border ${styles.border} rounded-2xl p-6`}>
                     <div className="flex items-center gap-3 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${styles.text}`}>
                           <path fillRule="evenodd" d={v.iconPath} clipRule="evenodd" />
                        </svg>
                        <h3 className="font-bold text-lg text-foreground">{v.title}</h3>
                     </div>
                     <p className="text-sm text-foreground/70 font-bold mb-2">Examples:</p>
                     <p className="text-sm text-muted mb-6">{v.examples}</p>
                     
                     <div className={`bg-tertiary p-4 rounded-xl border-l-4 ${styles.borderAccent}`}>
                        <p className={`text-xs font-bold ${styles.text} mb-1`}>Consequences:</p>
                        <p className="text-sm text-muted">{v.consequences}</p>
                     </div>
                  </div>
                );
              })}
           </div>
        </div>

        {/* Reporting Block */}
        <div className="bg-gradient-to-r from-secondary to-background border border-border rounded-2xl p-8 mb-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[80px] -z-0" />
           <div className="relative z-10">
              <h2 className="text-xl font-bold mb-3 text-foreground">Reporting Ethical Violations</h2>
              <p className="text-muted text-sm leading-relaxed max-w-2xl mb-8">
                If you witness or experience unethical behavior by a Reps Egypt certified professional, you have a responsibility to report it. All reports are treated confidentially and investigated thoroughly.
              </p>
              <div className="flex gap-4">
                 <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                   Report Violation
                 </button>
                 <button className="bg-background/50 hover:bg-background/80 text-foreground font-bold py-3 px-6 rounded-xl border border-border transition-colors">
                   Contact Ethics Committee
                 </button>
              </div>
           </div>
        </div>

        {/* Footer Note */}
        <div className="text-center">
           <p className="text-lg font-bold text-foreground mb-2">Ethical Commitment</p>
           <p className="text-xs text-muted max-w-lg mx-auto mb-8">
             All Reps Egypt members must acknowledge and commit to upholding this Code of Ethics. Your adherence to these standards ensures the integrity and reputation of the fitness profession in Egypt.
           </p>
           <p className="text-[10px] text-muted">Last updated: January 2026</p>
        </div>

      </div>
    </div>
  );
}

import Link from "next/link";

export const metadata = {
  title: "Register | Reps Egypt",
  description: "Create your account to start your fitness journey or professional career.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 py-24">
      
      {/* Header */}
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Create Your Account</h1>
        <p className="text-gray-400 text-lg">Join Reps Egypt and start your fitness journey today. Choose the account type that suits you best.</p>
      </div>

      {/* Cards Container */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        
        {/* Trainee Card */}
        <Link href="/register/trainee" className="group relative bg-[#121212] border border-white/5 rounded-2xl p-8 hover:border-red-600 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] flex flex-col">
          <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3">Trainee</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Join to find certified trainers, access programs, and track your fitness journey.
          </p>

          <ul className="space-y-3 mt-auto">
             {[
               "Browse certified coaches",
               "Enroll in programs",
               "Track progress",
               "Access resources"
             ].map((item, i) => (
               <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-500 shrink-0">
                   <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                 </svg>
                 {item}
               </li>
             ))}
          </ul>
        </Link>
        
        {/* Trainer Card */}
        <Link href="/register/trainer" className="group relative bg-[#121212] border border-white/5 rounded-2xl p-8 hover:border-red-600 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] flex flex-col">
          <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3">Trainer</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Get certified, connect with clients, and grow your fitness coaching business.
          </p>

          <ul className="space-y-3 mt-auto">
             {[
               "Get certified",
               "Build your profile",
               "Connect with clients",
               "Access training tools"
             ].map((item, i) => (
               <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-500 shrink-0">
                   <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                 </svg>
                 {item}
               </li>
             ))}
          </ul>
        </Link>

      </div>

      {/* Footer / Login Link */}
      <div className="mt-12 text-center">
        <p className="text-gray-400">
          Already have an account? <Link href="/login" className="text-red-500 font-bold hover:text-red-400 transition-colors">Sign In</Link>
        </p>
      </div>

    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

// Metadata cannot be exported from a client component, so we remove it or move it to layout
// export const metadata = { ... } 

export default function TraineeRegister() {
  const router = useRouter();

  const handleNext = (e) => {
    e.preventDefault();
    // In a real app, you'd save state here
    router.push("/register/details");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 py-12">
      
      {/* Main Container */}
      <div className="w-full max-w-2xl">
        
        {/* Header Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Create Your Account</h1>
          <p className="text-gray-400">Join Reps Egypt and start your fitness journey today</p>
        </div>

        {/* Stepper */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="flex items-center w-full">
            
            {/* Step 1: Role Selection */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                   <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                 </svg>
              </div>
              <div className="absolute top-12 whitespace-nowrap text-[10px] font-bold text-red-500 uppercase tracking-wider">Role Selection</div>
            </div>

            {/* Line 1 (Red) */}
            <div className="flex-1 h-[2px] bg-red-600 mx-2"></div>

            {/* Step 2: Basic Info (Active) */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                2
              </div>
              <div className="absolute top-12 whitespace-nowrap text-[10px] font-bold text-red-500 uppercase tracking-wider">Basic Info</div>
            </div>

            {/* Line 2 (Gray) */}
            <div className="flex-1 h-[2px] bg-[#333] mx-2"></div>

            {/* Step 3: Additional Details (Pending) */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#161616] border border-white/10 flex items-center justify-center text-gray-500 font-bold text-lg z-10">
                3
              </div>
              <div className="absolute top-12 whitespace-nowrap text-[10px] font-bold text-gray-500 uppercase tracking-wider">Additional Details</div>
            </div>

          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[#121212] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl">
           
           {/* Profile Picture Upload */}
           <div className="mb-8">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Profile Picture</label>
              <div className="flex items-center gap-4">
                 <div className="w-20 h-20 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                 </div>
                 <button className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload Photo
                 </button>
              </div>
           </div>

           <form className="space-y-6" onSubmit={handleNext}>
              {/* Full Name */}
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name *</label>
                 <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                    </div>
                    <input required type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors" placeholder="Enter your full name" />
                 </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address *</label>
                 <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <input required type="email" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors" placeholder="your.email@example.com" />
                 </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number *</label>
                 <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                    </div>
                    <input required type="tel" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors" placeholder="+20 123 456 7890" />
                 </div>
              </div>

              {/* Password Row */}
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password *</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                          </svg>
                        </div>
                        <input required type="password" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors" placeholder="••••••••" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Confirm Password *</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                          </svg>
                        </div>
                        <input required type="password" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors" placeholder="••••••••" />
                    </div>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-8 pt-4">
                 <Link href="/register" className="w-full md:w-auto px-8 py-3.5 bg-transparent border border-white/10 hover:bg-white/5 text-white font-bold rounded-xl transition-colors text-center">
                   Back
                 </Link>
                 <button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] shadow-lg shadow-red-900/20">
                   Next Step
                 </button>
              </div>

           </form>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
           Already have an account? <Link href="/login" className="text-red-500 hover:text-white transition-colors font-bold">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

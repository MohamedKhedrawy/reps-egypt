"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

// export const metadata = { ... } 

export default function TrainerRegister() {
  const router = useRouter();

  const handleNext = (e) => {
    e.preventDefault();
    router.push("/register/details");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 py-12">
      
      {/* Main Container */}
      <div className="w-full max-w-2xl">
        
        {/* Header Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Trainer Application</h1>
          <p className="text-gray-400">Join the elite network of fitness professionals</p>
        </div>

        {/* Stepper */}
        <div className="max-w-md mx-auto mb-12">
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
                    <input required type="email" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors" placeholder="coach.email@example.com" />
                 </div>
              </div>

              {/* Specialization */}
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Specialization *</label>
                 <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                      </svg>
                    </div>
                    <select required className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors appearance-none relative z-10">
                        <option value="">Select Primary Field</option>
                        <option value="strength">Strength & Conditioning</option>
                        <option value="yoga">Yoga & Pilates</option>
                        <option value="nutrition">Nutrition</option>
                        <option value="crossfit">CrossFit</option>
                    </select>
                    {/* Chevron */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                           <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </div>
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

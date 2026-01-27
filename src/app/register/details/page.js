export const metadata = {
  title: "Additional Details | Reps Egypt",
  description: "Complete your profile.",
};

export default function AdditionalDetails() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 py-12">
      
      {/* Main Container */}
      <div className="w-full max-w-2xl">
        
        {/* Header Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Final Step</h1>
          <p className="text-gray-400">Complete your profile to finish registration</p>
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

            {/* Step 2: Basic Info */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                   <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                 </svg>
              </div>
              <div className="absolute top-12 whitespace-nowrap text-[10px] font-bold text-red-500 uppercase tracking-wider">Basic Info</div>
            </div>

            {/* Line 2 (Red - Active) */}
            <div className="flex-1 h-[2px] bg-red-600 mx-2"></div>

            {/* Step 3: Additional Details (Active) */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                3
              </div>
              <div className="absolute top-12 whitespace-nowrap text-[10px] font-bold text-red-500 uppercase tracking-wider">Additional Details</div>
            </div>

          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[#121212] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl text-center">
           <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
               <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
             </svg>
           </div>
           
           <h3 className="text-xl font-bold text-white mb-2">Step 3 Placeholder</h3>
           <p className="text-gray-400 mb-8">This is where specific additional questions will go based on the user type (e.g., medical history, fitness goals, or certifications upload).</p>
           
           <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]">
             Complete Registration
           </button>
        </div>
      </div>
    </div>
  );
}

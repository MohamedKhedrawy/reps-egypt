"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfessionalInfo() {
  const router = useRouter();
  const [specialization, setSpecialization] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    // Retrieve data from previous steps
    const savedData = localStorage.getItem("trainerRegistrationData");
    if (!savedData) {
      alert("No registration data found. Please complete the previous steps.");
      router.push("/register/trainer");
      return;
    }
    setAllData(JSON.parse(savedData));
  }, [router]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files.map(f => f.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!specialization) {
      alert("Please select a specialization.");
      return;
    }

    if (!termsAccepted) {
      alert("You must accept the terms and agreements to continue.");
      return;
    }

    // Combine all data
    const finalData = {
      ...allData,
      specialization,
      uploadedFiles,
      termsAccepted
    };

    console.log("Final Registration Data:", finalData);
    alert("Registration Complete! (Check console for data)");
    
    // Clear data after successful submission
    localStorage.removeItem("trainerRegistrationData");
    
    // Redirect or show success
    // router.push("/dashboard"); 
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-12">
      
      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-secondary border border-border rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Terms & Agreements</h3>
              <button onClick={() => setShowTermsModal(false)} className="text-muted hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4 text-sm text-muted max-h-[60vh] overflow-y-auto pr-2">
              <div className="p-4 bg-tertiary rounded-xl border border-border">
                <p className="leading-relaxed">
                  I declare that I consent to the collection and processing of my personal data in the scope of: name, surname, telephone number and e-mail address, date of birth, place of residence.
                </p>
              </div>
              <div className="p-4 bg-tertiary rounded-xl border border-border">
                <p className="leading-relaxed">
                  I declare that I am joining the REPs Egypt Association and undertake to implement the provisions of the Statute.
                </p>
              </div>
              <div className="p-4 bg-tertiary rounded-xl border border-border">
                <p className="leading-relaxed">
                  I consent to receiving information sent to my e-mail account by REPs Egypt - Register of Professional Schools and Instructors on its own behalf or on its behalf.
                </p>
              </div>
            </div>
            <button 
              onClick={() => {
                setTermsAccepted(true);
                setShowTermsModal(false);
              }} 
              className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all"
            >
              I Accept
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="w-full max-w-2xl">
        
        {/* Header Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Professional Information</h1>
          <p className="text-muted">Final step to complete your registration</p>
        </div>

        {/* Stepper - 4 Steps */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="flex items-center w-full">
            
            {/* Step 1: Role Selection (Complete) */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                   <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                 </svg>
              </div>
              <div className="absolute top-12 whitespace-nowrap text-[10px] font-bold text-red-500 uppercase tracking-wider">Role</div>
            </div>

            {/* Line 1 (Red) */}
            <div className="flex-1 h-[2px] bg-red-600 mx-1"></div>

            {/* Step 2: Basic Info (Complete) */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                   <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                 </svg>
              </div>
              <div className="absolute top-12 whitespace-nowrap text-[10px] font-bold text-red-500 uppercase tracking-wider">Basic Info</div>
            </div>

            {/* Line 2 (Red) */}
            <div className="flex-1 h-[2px] bg-red-600 mx-1"></div>

            {/* Step 3: Personal Info (Complete) */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                   <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                 </svg>
              </div>
              <div className="absolute top-12 whitespace-nowrap text-[10px] font-bold text-red-500 uppercase tracking-wider">Personal</div>
            </div>

            {/* Line 3 (Red) */}
            <div className="flex-1 h-[2px] bg-red-600 mx-1"></div>

            {/* Step 4: Professional Info (Active) */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                4
              </div>
              <div className="absolute top-12 whitespace-nowrap text-[10px] font-bold text-red-500 uppercase tracking-wider">Professional</div>
            </div>

          </div>
        </div>

        {/* Form Card */}
        <div className="bg-secondary border border-border rounded-3xl p-8 md:p-10 shadow-2xl">
           
           <form onSubmit={handleSubmit} className="space-y-8">
              {/* Specialization */}
              <div className="space-y-2">
                 <label className="text-xs font-bold text-muted uppercase tracking-wider">Specialization *</label>
                 <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                      </svg>
                    </div>
                    <select 
                      required 
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className="w-full bg-tertiary border border-border rounded-xl pl-12 pr-4 py-3.5 text-sm text-foreground focus:outline-none focus:border-red-600 transition-colors appearance-none relative z-10"
                    >
                        <option value="">Select Primary Field</option>
                        <option value="personal-trainer">Personal Trainer</option>
                        <option value="gym-instructor">Gym Instructor</option>
                        <option value="group-fitness-instructor">Group Fitness Instructor</option>
                        <option value="group-fitness-instructor-freestyle">Group Fitness Instructor Freestyle</option>
                        <option value="yoga-teacher">Yoga Teacher</option>
                        <option value="pilates-teacher">Pilates Teacher</option>
                        <option value="pilates-instructor-comprehensive">Pilates Instructor Comprehensive</option>
                        <option value="aqua-fitness-instructor">Aqua Fitness Instructor</option>
                        <option value="childrens-fitness-instructor">Children's Fitness Instructor</option>
                        <option value="advanced-exercise-specialist">Advanced Exercise Specialist</option>
                    </select>
                    {/* Chevron */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                           <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </div>
                 </div>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                 <label className="text-xs font-bold text-muted uppercase tracking-wider">Upload Certifications / CV</label>
                 <div className="relative">
                    <input 
                      type="file" 
                      multiple 
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-red-600/50 transition-colors">
                       <div className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center mx-auto mb-3">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                         </svg>
                       </div>
                       <p className="text-sm text-muted">Drag and drop files here or <span className="text-red-500 font-semibold">browse</span></p>
                       <p className="text-xs text-muted mt-1">PDF, JPG, PNG up to 10MB</p>
                    </div>
                 </div>
                 {uploadedFiles.length > 0 && (
                   <div className="mt-3 space-y-2">
                     {uploadedFiles.map((file, index) => (
                       <div key={index} className="flex items-center gap-2 text-sm text-green-400">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                           <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                         </svg>
                         {file}
                       </div>
                     ))}
                   </div>
                 )}
              </div>

              {/* Terms & Conditions */}
              <div className="pt-4 border-t border-border">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-white/20 bg-tertiary text-red-600 focus:ring-red-600 focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                  />
                  <span className="text-sm text-muted">
                    I agree to the{" "}
                    <button 
                      type="button"
                      onClick={() => setShowTermsModal(true)}
                      className="text-red-500 hover:text-red-400 underline underline-offset-2 font-semibold"
                    >
                      Terms & Agreements
                    </button>
                  </span>
                </label>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4">
                 <Link href="/register/personal-info" className="w-full md:w-auto px-8 py-3.5 bg-transparent border border-border hover:bg-tertiary text-foreground font-bold rounded-xl transition-colors text-center">
                   Back
                 </Link>
                 <button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                   Complete Registration
                 </button>
              </div>
           </form>
           
        </div>
      </div>
    </div>
  );
}

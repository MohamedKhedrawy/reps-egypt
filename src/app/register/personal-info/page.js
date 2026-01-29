"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PersonalInfo() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    birthDate: "",
    age: "",
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: ""
  });

  useEffect(() => {
    // Check if basic info exists
    const savedData = localStorage.getItem("trainerRegistrationData");
    if (!savedData) {
      alert("No registration data found. Please complete the previous step.");
      router.push("/register/trainer");
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBirthDateChange = (e) => {
    const birthDate = e.target.value;
    setFormData(prev => ({
      ...prev,
      birthDate
    }));

    // Auto-calculate age
    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      setFormData(prev => ({
        ...prev,
        age: age.toString()
      }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.birthDate) {
      alert("Please enter your birth date.");
      return;
    }

    if (!formData.age || parseInt(formData.age) < 18) {
      alert("You must be at least 18 years old to register.");
      return;
    }

    // Save to localStorage
    const existingData = JSON.parse(localStorage.getItem("trainerRegistrationData") || "{}");
    const updatedData = {
      ...existingData,
      birthDate: formData.birthDate,
      age: formData.age,
      socialMedia: {
        facebook: formData.facebook,
        instagram: formData.instagram,
        youtube: formData.youtube,
        linkedin: formData.linkedin
      }
    };
    localStorage.setItem("trainerRegistrationData", JSON.stringify(updatedData));

    router.push("/register/details");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-12">
      
      {/* Main Container */}
      <div className="w-full max-w-2xl">
        
        {/* Header Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Personal Information</h1>
          <p className="text-muted">Tell us a bit more about yourself</p>
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

            {/* Step 3: Personal Info (Active) */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                3
              </div>
              <div className="absolute top-12 whitespace-nowrap text-[10px] font-bold text-red-500 uppercase tracking-wider">Personal</div>
            </div>

            {/* Line 3 (Gray) */}
            <div className="flex-1 h-[2px] bg-background-border mx-1"></div>

            {/* Step 4: Professional Info (Pending) */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-tertiary border border-border flex items-center justify-center text-muted font-bold text-lg z-10">
                4
              </div>
              <div className="absolute top-12 whitespace-nowrap text-[10px] font-bold text-muted uppercase tracking-wider">Professional</div>
            </div>

          </div>
        </div>

        {/* Form Card */}
        <div className="bg-secondary border border-border rounded-3xl p-8 md:p-10 shadow-2xl">
           
           <form className="space-y-6" onSubmit={handleNext}>
              
              {/* Birth Date & Age */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-muted uppercase tracking-wider">Birth Date *</label>
                   <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                      </div>
                      <input 
                        required 
                        name="birthDate" 
                        value={formData.birthDate} 
                        onChange={handleBirthDateChange} 
                        type="date" 
                        className="w-full bg-tertiary border border-border rounded-xl pl-12 pr-4 py-3.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-red-600 transition-colors" 
                      />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-muted uppercase tracking-wider">Age</label>
                   <input 
                     readOnly
                     name="age" 
                     value={formData.age} 
                     type="text" 
                     className="w-full bg-tertiary border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-red-600 transition-colors cursor-not-allowed opacity-70" 
                     placeholder="Auto-calculated" 
                   />
                </div>
              </div>

              {/* Social Media Section */}
              <div className="pt-4 border-t border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">Social Media Links <span className="text-muted font-normal">(Optional)</span></h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Facebook */}
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-muted uppercase tracking-wider">Facebook</label>
                     <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                          </svg>
                        </div>
                        <input name="facebook" value={formData.facebook} onChange={handleChange} type="url" className="w-full bg-tertiary border border-border rounded-xl pl-12 pr-4 py-3 text-sm text-foreground placeholder-muted focus:outline-none focus:border-blue-500 transition-colors" placeholder="https://facebook.com/..." />
                     </div>
                  </div>

                  {/* Instagram */}
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-muted uppercase tracking-wider">Instagram</label>
                     <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-pink-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </div>
                        <input name="instagram" value={formData.instagram} onChange={handleChange} type="url" className="w-full bg-tertiary border border-border rounded-xl pl-12 pr-4 py-3 text-sm text-foreground placeholder-muted focus:outline-none focus:border-pink-500 transition-colors" placeholder="https://instagram.com/..." />
                     </div>
                  </div>

                  {/* YouTube */}
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-muted uppercase tracking-wider">YouTube</label>
                     <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                          </svg>
                        </div>
                        <input name="youtube" value={formData.youtube} onChange={handleChange} type="url" className="w-full bg-tertiary border border-border rounded-xl pl-12 pr-4 py-3 text-sm text-foreground placeholder-muted focus:outline-none focus:border-red-500 transition-colors" placeholder="https://youtube.com/..." />
                     </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-muted uppercase tracking-wider">LinkedIn</label>
                     <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                          </svg>
                        </div>
                        <input name="linkedin" value={formData.linkedin} onChange={handleChange} type="url" className="w-full bg-tertiary border border-border rounded-xl pl-12 pr-4 py-3 text-sm text-foreground placeholder-muted focus:outline-none focus:border-blue-400 transition-colors" placeholder="https://linkedin.com/in/..." />
                     </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-8 pt-4">
                 <Link href="/register/trainer" className="w-full md:w-auto px-8 py-3.5 bg-transparent border border-border hover:bg-tertiary text-foreground font-bold rounded-xl transition-colors text-center">
                   Back
                 </Link>
                 <button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] shadow-lg shadow-red-900/20">
                   Next Step
                 </button>
              </div>

           </form>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted">
           Already have an account? <Link href="/login" className="text-red-500 hover:text-foreground transition-colors font-bold">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

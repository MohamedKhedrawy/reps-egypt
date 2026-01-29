"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useRegistration } from "@/context/RegistrationContext";

export default function TrainerRegister() {
  const router = useRouter();
  const { registrationData, updateData } = useRegistration();
  const fileInputRef = useRef(null);
  const [profilePhoto, setProfilePhoto] = useState(registrationData.profilePhoto);
  
  const [formData, setFormData] = useState({
    firstName: registrationData.firstName || "",
    lastName: registrationData.lastName || "",
    email: registrationData.email || "",
    confirmEmail: registrationData.email || "",
    phone: registrationData.phone || "",
    password: registrationData.password || "",
    confirmPassword: registrationData.password || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    // Validation
    if (formData.firstName.length < 2 || formData.lastName.length < 2) {
      alert("First and Last Name must be at least 2 characters long.");
      return;
    }

    if (formData.email !== formData.confirmEmail) {
      alert("Emails do not match.");
      return;
    }

    // Egyptian phone validation: Starts with 01, followed by 9 digits
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid Egyptian phone number (e.g., 01xxxxxxxxx).");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Save to context
    updateData({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      profilePhoto
    });

    router.push("/register/personal-info");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-12">
      
      {/* Main Container */}
      <div className="w-full max-w-2xl">
        
        {/* Header Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Trainer Application</h1>
          <p className="text-muted">Join the elite network of fitness professionals</p>
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

            {/* Step 2: Contact Info (Active) */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                2
              </div>
              <div className="absolute top-12 whitespace-nowrap text-[10px] font-bold text-red-500 uppercase tracking-wider">Contact Info</div>
            </div>

            {/* Line 2 (Gray) */}
            <div className="flex-1 h-[2px] bg-background-border mx-1"></div>

            {/* Step 3: Personal Info (Pending) */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-tertiary border border-border flex items-center justify-center text-muted font-bold text-lg z-10">
                3
              </div>
              <div className="absolute top-12 whitespace-nowrap text-[10px] font-bold text-muted uppercase tracking-wider">Personal Info</div>
            </div>

            {/* Line 3 (Gray) */}
            <div className="flex-1 h-[2px] bg-background-border mx-1"></div>

            {/* Step 4: Professional Info (Pending) */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-tertiary border border-border flex items-center justify-center text-muted font-bold text-lg z-10">
                4
              </div>
              <div className="absolute top-12 whitespace-nowrap text-[10px] font-bold text-muted uppercase tracking-wider">Professional Info</div>
            </div>

          </div>
        </div>

        {/* Form Card */}
        <div className="bg-secondary border border-border rounded-3xl p-8 md:p-10 shadow-2xl">
           
           {/* Profile Picture Upload */}
           <div className="mb-8">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Profile Picture</label>
              <div className="flex items-center gap-4">
                 <input 
                   type="file" 
                   ref={fileInputRef}
                   onChange={handlePhotoChange}
                   accept="image/*"
                   className="hidden"
                 />
                 <div className="w-20 h-20 rounded-full bg-tertiary border border-border flex items-center justify-center text-muted overflow-hidden">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                    )}
                 </div>
                 <button type="button" onClick={() => fileInputRef.current?.click()} className="px-5 py-2.5 bg-tertiary hover:bg-background border border-border rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-muted">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    {profilePhoto ? 'Change Photo' : 'Upload Photo'}
                 </button>
              </div>
           </div>

           <form className="space-y-6" onSubmit={handleNext}>
              {/* Name Split */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-muted uppercase tracking-wider">First Name *</label>
                   <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full bg-tertiary border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-red-600 transition-colors" placeholder="First Name" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-muted uppercase tracking-wider">Last Name *</label>
                   <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full bg-tertiary border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-red-600 transition-colors" placeholder="Last Name" />
                </div>
              </div>

              {/* Email & Confirm Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-muted uppercase tracking-wider">Email Address *</label>
                   <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-tertiary border border-border rounded-xl pl-12 pr-4 py-3.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-red-600 transition-colors" placeholder="coach@example.com" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-muted uppercase tracking-wider">Confirm Email *</label>
                   <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                      </div>
                      <input required name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} type="email" className="w-full bg-tertiary border border-border rounded-xl pl-12 pr-4 py-3.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-red-600 transition-colors" placeholder="Confirm Email" />
                   </div>
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                 <label className="text-xs font-bold text-muted uppercase tracking-wider">Phone Number *</label>
                 <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-tertiary border border-border rounded-xl pl-12 pr-4 py-3.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-red-600 transition-colors" placeholder="01xxxxxxxxx" />
                 </div>
              </div>

              {/* Password Row */}
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase tracking-wider">Password *</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                          </svg>
                        </div>
                        <input required name="password" value={formData.password} onChange={handleChange} type="password" className="w-full bg-tertiary border border-border rounded-xl pl-12 pr-4 py-3.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-red-600 transition-colors" placeholder="••••••••" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase tracking-wider">Confirm Password *</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                          </svg>
                        </div>
                        <input required name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" className="w-full bg-tertiary border border-border rounded-xl pl-12 pr-4 py-3.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-red-600 transition-colors" placeholder="••••••••" />
                    </div>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-8 pt-4">
                 <Link href="/register" className="w-full md:w-auto px-8 py-3.5 bg-transparent border border-border hover:bg-tertiary text-foreground font-bold rounded-xl transition-colors text-center">
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

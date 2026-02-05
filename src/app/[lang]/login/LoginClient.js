"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginClient({ content, lang }) {
  const router = useRouter();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Validation
  const validateField = (name, value) => {
    let error = "";
    if (name === "email") {
      if (!value) error = content.errors.email_required;
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = content.errors.email_invalid;
    } else if (name === "password") {
      if (!value) error = content.errors.password_required;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const emailValid = validateField("email", formData.email);
    const passwordValid = validateField("password", formData.password);
    
    if (!emailValid || !passwordValid) return;
    
    setIsSubmitting(true);
    setErrors(prev => ({ ...prev, general: "" }));

    try {
      await login(formData.email, formData.password, rememberMe);
      
      // Fetch user to check role for redirect
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.user?.role === 'admin') {
           router.push(`/${lang}/admin`);
           return;
        }
      }
      
      router.push(`/${lang}`);
    } catch (err) {
      setErrors(prev => ({ ...prev, general: err.message || content.errors.credentials_invalid }));
    } finally {
      if (!isSubmitting) setIsSubmitting(false); // Only unset if we didn't redirect (redirect unmounts)
    }
  };

  // Input class helper
  const inputClass = (name) => `w-full bg-tertiary border rounded-xl pl-12 pr-4 py-3.5 text-sm text-foreground placeholder-muted focus:outline-none transition-colors ${errors[name] ? "border-red-500 input-error" : "border-border focus:border-red-600"}`;

  // Error component
  const FieldError = ({ name }) => errors[name] ? (
    <p className="error-message mt-1">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
      </svg>
      {errors[name]}
    </p>
  ) : null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-12">
      
      {/* Main Container */}
      <div className="w-full max-w-md">
        
        {/* Header Title */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-red-600 rounded-2xl mx-auto flex items-center justify-center mb-6 transform rotate-3 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white transform -rotate-3">
              <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
          <p className="text-muted">{content.subtitle}</p>
        </div>

        {/* Form Card */}
        <div className="bg-secondary border border-border rounded-3xl p-8 md:p-10 shadow-2xl">
           
           {/* General Error */}
           {errors.general && (
             <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2">
               <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
               </svg>
               {errors.general}
             </div>
           )}

           <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">{content.email_label}</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass("email")} 
                    placeholder={content.email_placeholder}
                  />
                </div>
                <FieldError name="email" />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider">{content.password_label}</label>
                  <Link href={`/${lang}/forgot-password`} className="text-xs text-red-500 hover:text-red-400 transition-colors">{content.forgot_password}</Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`${inputClass("password")} pr-12`} 
                    placeholder={content.password_placeholder}
                  />
                  {/* Show/Hide Password Toggle */}
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    )}
                  </button>
                </div>
                <FieldError name="password" />
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-tertiary border-border text-red-600 focus:ring-red-600 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="remember" className="text-sm text-muted cursor-pointer">{content.remember_me}</label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] shadow-lg shadow-red-900/20 mt-4 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    {content.btn_submitting}
                  </>
                ) : content.btn_submit}
              </button>

           </form>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted">
           {content.no_account} <Link href={`/${lang}/register`} className="text-red-500 hover:text-foreground transition-colors font-bold">{content.register_now}</Link>
        </div>
      </div>
    </div>
  );
}

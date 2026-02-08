"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useCallback } from "react";

// Debounce helper
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function TraineeRegisterClient({ content, lang }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", confirmEmail: "",
    phone: "", password: "", confirmPassword: "", profilePhoto: null,
    birthDate: "", age: "", gender: "", governorate: "", facebook: "", instagram: "", youtube: "", linkedin: "",
    termsAccepted: false
  });
  
  // Field errors
  const [errors, setErrors] = useState({});
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Validation functions using localized error messages
  const validators = {
    firstName: (v) => !v ? content.errors.first_name_required : v.length < 2 ? content.errors.first_name_min : v.length > 50 ? content.errors.first_name_max : !/^[a-zA-Z\s\u0600-\u06FF]+$/.test(v) ? content.errors.first_name_letters : "",
    lastName: (v) => !v ? content.errors.last_name_required : v.length < 2 ? content.errors.first_name_min : v.length > 50 ? content.errors.first_name_max : !/^[a-zA-Z\s\u0600-\u06FF]+$/.test(v) ? content.errors.first_name_letters : "",
    email: (v) => !v ? content.errors.email_required : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? content.errors.email_invalid : "",
    confirmEmail: (v) => v !== formData.email ? content.errors.email_mismatch : "",
    phone: (v) => !v ? content.errors.phone_required : !/^01[0125][0-9]{8}$/.test(v) ? content.errors.phone_invalid : "",
    password: (v) => !v ? content.errors.password_required : v.length < 8 ? content.errors.password_min : !/[A-Z]/.test(v) ? content.errors.password_uppercase : !/[a-z]/.test(v) ? content.errors.password_lowercase : !/[0-9]/.test(v) ? content.errors.password_number : "",
    confirmPassword: (v) => v !== formData.password ? content.errors.password_mismatch : "",
    birthDate: (v) => !v ? content.errors.birth_date_required : "",
    age: (v) => !v ? "" : parseInt(v) < 13 ? content.errors.age_min : parseInt(v) > 100 ? content.errors.age_max : "",
    termsAccepted: (v) => !v ? content.errors.terms_required : ""
  };

  // Validate single field
  const validateField = (name, value) => {
    if (validators[name]) {
      const error = validators[name](value);
      setErrors(prev => ({ ...prev, [name]: error }));
      return !error;
    }
    return true;
  };

  // Check email uniqueness (debounced)
  const checkEmailUnique = useCallback(
    debounce(async (email) => {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
      setIsCheckingEmail(true);
      try {
        const res = await fetch("/api/auth/check-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (data.exists) {
          setErrors(prev => ({ ...prev, email: content.errors.email_exists }));
        }
      } catch {
        // Ignore network errors for this check
      } finally {
        setIsCheckingEmail(false);
      }
    }, 500),
    [content.errors.email_exists]
  );

  // Handle input change with validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    validateField(name, val);
    if (name === "email") checkEmailUnique(val);
    if (name === "password" && formData.confirmPassword) validateField("confirmPassword", formData.confirmPassword);
    if (name === "email" && formData.confirmEmail) validateField("confirmEmail", formData.confirmEmail);
  };

  // Photo handler
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, profilePhoto: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  // Birth date handler
  const handleBirthDateChange = (e) => {
    const birthDate = e.target.value;
    let age = "";
    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      age = age.toString();
    }
    setFormData(prev => ({ ...prev, birthDate, age }));
    validateField("birthDate", birthDate);
    validateField("age", age);
  };

  // Password strength
  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return "";
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[a-z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 2) return "weak";
    if (score <= 4) return "medium";
    return "strong";
  };

  // Validate step
  const validateStep = (step) => {
    const fields = step === 1 
      ? ["firstName", "lastName", "email", "confirmEmail", "phone", "password", "confirmPassword"]
      : ["birthDate", "age", "termsAccepted"];
    
    let valid = true;
    fields.forEach(f => {
      if (!validateField(f, formData[f])) valid = false;
    });
    return valid && (step !== 1 || !errors.email);
  };

  // Next step
  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep === 1 && validateStep(1)) setCurrentStep(2);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          birthDate: formData.birthDate,
          age: formData.age,
          gender: formData.gender,
          governorate: formData.governorate,
          socialMedia: {
            facebook: formData.facebook,
            instagram: formData.instagram,
            youtube: formData.youtube,
            linkedin: formData.linkedin
          },
          termsAccepted: formData.termsAccepted,
          role: "trainee"
        })
      });
      
      const data = await res.json();
      if (!res.ok) {
        if (data.field) setErrors(prev => ({ ...prev, [data.field]: data.error }));
        else setErrors(prev => ({ ...prev, general: data.error }));
        return;
      }
      
      router.push(`/${lang}/login`);
    } catch {
      setErrors(prev => ({ ...prev, general: content.errors.network_error }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Error component
  const FieldError = ({ name }) => errors[name] ? (
    <p className="error-message"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>{errors[name]}</p>
  ) : null;

  // Input class helper
  const inputClass = (name) => `w-full bg-tertiary border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder-muted focus:outline-none transition-colors ${errors[name] ? "border-red-500 input-error" : "border-border focus:border-red-600"}`;

  const stepTitles = {
    1: { title: content.step1_title, subtitle: content.step1_subtitle },
    2: { title: content.step2_title, subtitle: content.step2_subtitle }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-12">
      
      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-secondary border border-border rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">{content.terms_modal_title}</h3>
              <button onClick={() => setShowTermsModal(false)} className="text-muted hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4 text-sm text-muted max-h-[60vh] overflow-y-auto pr-2">
              {content.terms_modal_items.map((item, i) => (
                <div key={i} className="p-4 bg-tertiary rounded-xl border border-border"><p>{item}</p></div>
              ))}
            </div>
            <button onClick={() => { setFormData(prev => ({ ...prev, termsAccepted: true })); setErrors(prev => ({ ...prev, termsAccepted: "" })); setShowTermsModal(false); }} className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all">{content.terms_modal_accept}</button>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">{stepTitles[currentStep].title}</h1>
          <p className="text-muted">{stepTitles[currentStep].subtitle}</p>
        </div>

        {/* Stepper */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="flex items-center w-full justify-center">
            {[1, 2].map((step, i) => (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="relative flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 ${(step === 1 || currentStep >= step - 1) ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]" : "bg-tertiary border border-border text-muted"}`}>
                    {step === 1 || currentStep > step - 1 ? <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"/></svg> : step}
                  </div>
                  <div className={`absolute top-12 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider ${currentStep >= step - 1 ? "text-red-500" : "text-muted"}`}>
                    {content.step_labels[i]}
                  </div>
                </div>
                {i < 1 && <div className={`flex-1 h-[2px] mx-1 ${currentStep > step - 1 ? "bg-red-600" : "bg-border"}`}></div>}
              </div>
            ))}
          </div>
        </div>

        {/* General Error */}
        {errors.general && <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-xl text-red-500 text-sm">{errors.general}</div>}

        <div className="bg-secondary border border-border rounded-3xl p-8 md:p-10 shadow-2xl">
          
          {/* Step 1 */}
          {currentStep === 1 && (
            <>
              <div className="mb-8">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{content.profile_picture}</label>
                <div className="flex items-center gap-4">
                  <input type="file" ref={fileInputRef} onChange={handlePhotoChange} accept="image/*" className="hidden" />
                  <div className="w-20 h-20 rounded-full bg-tertiary border border-border flex items-center justify-center overflow-hidden">
                    {formData.profilePhoto ? <img src={formData.profilePhoto} alt="Profile" className="w-full h-full object-cover" /> : <svg className="w-8 h-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>}
                  </div>
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="px-5 py-2.5 bg-tertiary hover:bg-background border border-border rounded-lg text-sm font-medium transition-colors text-foreground">{formData.profilePhoto ? content.btn_change : content.btn_upload}</button>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleNext}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label className="text-xs font-bold text-muted uppercase tracking-wider">{content.first_name} *</label><input name="firstName" value={formData.firstName} onChange={handleChange} className={inputClass("firstName")} placeholder={content.first_name} /><FieldError name="firstName" /></div>
                  <div><label className="text-xs font-bold text-muted uppercase tracking-wider">{content.last_name} *</label><input name="lastName" value={formData.lastName} onChange={handleChange} className={inputClass("lastName")} placeholder={content.last_name} /><FieldError name="lastName" /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label className="text-xs font-bold text-muted uppercase tracking-wider">{content.email} *</label><div className="relative"><input name="email" type="email" value={formData.email} onChange={handleChange} className={`${inputClass("email")} pl-12`} placeholder="email@example.com" /><div className="absolute inset-y-0 left-4 flex items-center text-gray-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg></div>{isCheckingEmail && <div className="absolute inset-y-0 right-4 flex items-center"><div className="spinner"></div></div>}</div><FieldError name="email" /></div>
                  <div><label className="text-xs font-bold text-muted uppercase tracking-wider">{content.confirm_email} *</label><input name="confirmEmail" type="email" value={formData.confirmEmail} onChange={handleChange} className={inputClass("confirmEmail")} placeholder={content.confirm_email} /><FieldError name="confirmEmail" /></div>
                </div>
                <div><label className="text-xs font-bold text-muted uppercase tracking-wider">{content.phone} *</label><div className="relative"><input name="phone" value={formData.phone} onChange={handleChange} className={`${inputClass("phone")} pl-12`} placeholder="01xxxxxxxxx" /><div className="absolute inset-y-0 left-4 flex items-center text-gray-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg></div></div><FieldError name="phone" /></div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label className="text-xs font-bold text-muted uppercase tracking-wider">{content.password} *</label><input name="password" type="password" value={formData.password} onChange={handleChange} className={inputClass("password")} placeholder="••••••••" />{formData.password && <div className={`password-strength ${getPasswordStrength()}`}></div>}<FieldError name="password" /></div>
                  <div><label className="text-xs font-bold text-muted uppercase tracking-wider">{content.confirm_password} *</label><input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className={inputClass("confirmPassword")} placeholder="••••••••" /><FieldError name="confirmPassword" /></div>
                </div>
                <div className="flex items-center gap-4 mt-8 pt-4">
                  <Link href={`/${lang}/register`} className="w-full md:w-auto px-8 py-3.5 bg-transparent border border-border hover:bg-tertiary text-foreground font-bold rounded-xl transition-colors text-center">{content.btn_back}</Link>
                  <button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]">{content.btn_next}</button>
                </div>
              </form>
            </>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className="text-xs font-bold text-muted uppercase tracking-wider">{content.birth_date} *</label><input name="birthDate" type="date" value={formData.birthDate} onChange={handleBirthDateChange} className={inputClass("birthDate")} /><FieldError name="birthDate" /><FieldError name="age" /></div>
                <div><label className="text-xs font-bold text-muted uppercase tracking-wider">{content.age}</label><input readOnly value={formData.age} className="w-full bg-tertiary border border-border rounded-xl px-4 py-3.5 text-sm text-foreground opacity-70 cursor-not-allowed" placeholder={content.age_auto} /></div>
              </div>
              <div><label className="text-xs font-bold text-muted uppercase tracking-wider">{content.gender}</label><select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-tertiary border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:outline-none focus:border-red-600 appearance-none cursor-pointer"><option value="">{content.gender_select}</option><option value="male">{content.gender_male}</option><option value="female">{content.gender_female}</option></select></div>
              <div><label className="text-xs font-bold text-muted uppercase tracking-wider">{content.admin?.jobs?.governorate || "Governorate"} *</label><select name="governorate" value={formData.governorate} onChange={handleChange} className="w-full bg-tertiary border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:outline-none focus:border-red-600 appearance-none cursor-pointer"><option value="">{content.admin?.jobs?.select_governorate || "Select a governorate"}</option>{Object.entries(content.admin?.jobs?.governorates || {}).map(([key, label]) => (<option key={key} value={key}>{label}</option>))}</select><FieldError name="governorate" /></div>
              <div className="pt-4 border-t border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">{content.social_media} <span className="text-muted font-normal">{content.optional}</span></h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[["facebook", "Facebook"], ["instagram", "Instagram"], ["youtube", "YouTube"], ["linkedin", "LinkedIn"]].map(([name, label]) => (
                    <div key={name}><label className="text-xs font-bold text-muted uppercase tracking-wider">{label}</label><input name={name} value={formData[name]} onChange={handleChange} type="url" className="w-full bg-tertiary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted focus:outline-none focus:border-red-600" placeholder={`https://${name}.com/...`} /></div>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="w-5 h-5 mt-0.5 rounded bg-tertiary text-red-600" />
                  <span className="text-sm text-muted">{content.terms_agree} <button type="button" onClick={() => setShowTermsModal(true)} className="text-red-500 hover:text-red-400 underline font-semibold">{content.terms_link}</button></span>
                </label>
                <FieldError name="termsAccepted" />
              </div>
              <div className="flex items-center gap-4 mt-8 pt-4">
                <button type="button" onClick={() => setCurrentStep(1)} className="w-full md:w-auto px-8 py-3.5 bg-transparent border border-border hover:bg-tertiary text-foreground font-bold rounded-xl transition-colors">{content.btn_back}</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSubmitting ? <><div className="spinner"></div>{content.btn_submitting}</> : content.btn_submit}
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="mt-8 text-center text-sm text-muted">{content.have_account} <Link href={`/${lang}/login`} className="text-red-500 hover:text-foreground transition-colors font-bold">{content.sign_in}</Link></div>
      </div>
    </div>
  );
}

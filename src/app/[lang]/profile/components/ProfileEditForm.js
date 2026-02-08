"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ProfileEditForm({ user, content, dictionary, onSave, onCancel }) {
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(user.profilePhoto);
  const [files, setFiles] = useState(user.uploadedFiles || []);
  const [newFiles, setNewFiles] = useState([]);
  const [photoChanged, setPhotoChanged] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setPhotoChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
      // In a real app with cloud storage, we would upload these immediately or sign coords.
      // For now, mirroring register logic (just names or base64? Register used names? 
      // TrainerRegisterClient used names for visual but File objects for submission?
      // Wait, TrainerRegisterClient: uploadedFiles: files.map(f => f.name). 
      // It didn't actually upload files in that demo code!
      // I should do the same here to match "live data" expectation (even if just names for now).
      const selectedFiles = Array.from(e.target.files);
      setNewFiles(selectedFiles.map(f => f.name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData(e.target);
    const updates = Object.fromEntries(formData);
    
    // Convert age to number if present and not empty
    if (updates.age && updates.age !== '') {
      updates.age = parseInt(updates.age, 10);
    } else {
      delete updates.age;  // Remove if empty
    }
    
    // Extract social media links
    const socialMedia = {
      facebook: updates.facebook || '',
      instagram: updates.instagram || '',
      linkedin: updates.linkedin || '',
      youtube: updates.youtube || '',
    };
    
    // Clean up updates object
    delete updates.facebook;
    delete updates.instagram;
    delete updates.linkedin;
    delete updates.youtube;
    delete updates.uploadedFilesInput;
    
    // Handle qualifications and specialization changes
    let qualificationChanges = null;
    let newSpecialization = null;

    // Check if files changed
    if (newFiles.length > 0) {
        qualificationChanges = newFiles;
    }

    // Check if specialization changed
    if (updates.specialization && updates.specialization !== user.specialization) {
        newSpecialization = updates.specialization;
        delete updates.specialization;
    }

    // Prepare payload with explicit profilePhoto handling
    const payload = { 
        generalUpdates: { 
            ...updates, 
            socialMedia,
            // Only include profilePhoto if it changed
            ...(photoChanged && { profilePhoto: preview || null })
        }, 
        qualificationChanges: (qualificationChanges || newSpecialization) ? {
            newQualifications: qualificationChanges,
            newSpecialization: newSpecialization
        } : null 
    };

    // We pass structured data to parent
    try {
        await onSave(payload);
    } catch (error) {
        console.error("Save error:", error);
    } finally {
        setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-secondary/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

        <div className="flex justify-between items-center mb-8 relative z-10">
             <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="p-1.5 bg-red-600 rounded-lg">✏️</span>
                {content.edit_details}
             </h2>
             {saving && (
                 <span className="flex items-center gap-2 text-sm text-red-500 font-bold animate-pulse">
                     <div className="w-2 h-2 bg-red-500 rounded-full" />
                     {content.saving}
                 </span>
             )}
        </div>
        
        {/* Profile Picture Upload Section */}
        <div className="flex flex-col items-center mb-8 relative z-10">
            <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-tertiary bg-tertiary shadow-xl">
                    <img 
                        src={preview || `https://ui-avatars.com/api/?name=${user.fullName}&background=dc2626&color=fff`} 
                        alt="Profile" 
                        className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                    />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        {content.upload_photo}
                    </span>
                </div>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handlePhotoChange} 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
            </div>
            {/* Hidden input to store base64 string for submission */}
            {/* Removed - profilePhoto is now handled in payload */}
            
            {preview && preview !== user.profilePhoto && (
                <button 
                    type="button" 
                    onClick={() => setPreview(user.profilePhoto)}
                    className="text-xs text-red-500 mt-2 hover:underline"
                >
                    {content.remove_photo}
                </button>
            )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6 relative z-10">
            <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">{content.full_name}</label>
                <input 
                    name="fullName" 
                    defaultValue={user.fullName} 
                    className="w-full bg-tertiary/50 border border-border/50 rounded-xl px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all placeholder:text-muted/50" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">{content.phone}</label>
                <input 
                    name="phone" 
                    defaultValue={user.phone} 
                    className="w-full bg-tertiary/50 border border-border/50 rounded-xl px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all placeholder:text-muted/50" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">{content.birth_date || "Birth Date"}</label>
                <input 
                    name="birthDate" 
                    type="date"
                    defaultValue={user.birthDate} 
                    className="w-full bg-tertiary/50 border border-border/50 rounded-xl px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all placeholder:text-muted/50" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">{content.age || "Age"}</label>
                <input 
                    name="age" 
                    type="number"
                    defaultValue={user.age} 
                    className="w-full bg-tertiary/50 border border-border/50 rounded-xl px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all placeholder:text-muted/50" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">{content.gender || "Gender"}</label>
                <div className="relative">
                    <select 
                        name="gender" 
                        defaultValue={user.gender || ""} 
                        className="w-full bg-tertiary/50 border border-border/50 rounded-xl px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all appearance-none"
                    >
                        <option value="">{content.gender_select || "Select Gender"}</option>
                        <option value="male">{content.gender_male || "Male"}</option>
                        <option value="female">{content.gender_female || "Female"}</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">▼</div>
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">{dictionary?.admin?.jobs?.governorate || "Governorate"}</label>
                <div className="relative">
                    <select 
                        name="governorate" 
                        defaultValue={user.governorate || ""} 
                        className="w-full bg-tertiary/50 border border-border/50 rounded-xl px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all appearance-none"
                    >
                        <option value="">{dictionary?.admin?.jobs?.select_governorate || "Select a governorate"}</option>
                        {Object.entries(dictionary?.admin?.jobs?.governorates || {}).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">▼</div>
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">{content.location || "Location"}</label>
                <input 
                    type="text"
                    name="location" 
                    defaultValue={user.location} 
                    placeholder={content.location_placeholder} 
                    className="w-full bg-tertiary/50 border border-border/50 rounded-xl px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all placeholder:text-muted/50" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">{content.specialization}</label>
                <div className="relative">
                    <select 
                        name="specialization" 
                        defaultValue={user.specialization || ""} 
                        className="w-full bg-tertiary/50 border border-border/50 rounded-xl px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all appearance-none"
                    >
                        <option value="">{content.specialization_select}</option>
                        {content.specialization_options ? (
                            content.specialization_options.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                            ))
                        ) : (
                             // Fallback if content not loaded yet (though it should be)
                             <>
                                <option value="Personal Trainer">Personal Trainer</option>
                                <option value="Gym Instructor">Gym Instructor</option>
                                <option value="Group Fitness Instructor">Group Fitness Instructor</option>
                                <option value="Yoga Teacher">Yoga Teacher</option>
                                <option value="Pilates Teacher">Pilates Teacher</option>
                             </>
                        )}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">▼</div>
                </div>
            </div>
        </div>

        <div className="space-y-2 mb-8 relative z-10">
            <label className="text-xs font-bold text-muted uppercase tracking-wider">{content.bio}</label>
            <textarea 
                name="bio" 
                rows={4} 
                defaultValue={user.bio} 
                placeholder={content.bio_placeholder} 
                className="w-full bg-tertiary/50 border border-border/50 rounded-xl px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all resize-none placeholder:text-muted/50" 
            />
        </div>

        <div className="space-y-4 border-t border-border/50 pt-8 relative z-10">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span className="text-blue-400">🌐</span> {content.social_media}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                    <input 
                        name="instagram" 
                        defaultValue={user.socialMedia?.instagram} 
                        placeholder="Instagram URL" 
                        className="w-full bg-tertiary/50 border border-border/50 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none transition-all" 
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500">📸</span>
                </div>
                <div className="relative">
                    <input 
                        name="facebook" 
                        defaultValue={user.socialMedia?.facebook} 
                        placeholder="Facebook URL" 
                        className="w-full bg-tertiary/50 border border-border/50 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-all" 
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">fb</span>
                </div>
                 <div className="relative">
                    <input 
                        name="linkedin" 
                        defaultValue={user.socialMedia?.linkedin} 
                        placeholder="LinkedIn URL" 
                        className="w-full bg-tertiary/50 border border-border/50 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none transition-all" 
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">in</span>
                </div>
                <div className="relative">
                    <input 
                        name="youtube" 
                        defaultValue={user.socialMedia?.youtube} 
                        placeholder="YouTube URL" 
                        className="w-full bg-tertiary/50 border border-border/50 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-all" 
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500">▶</span>
                </div>
            </div>
        </div>

        {/* Qualifications Section */}
        <div className="space-y-4 border-t border-border/50 pt-8 mb-8 relative z-10">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span className="text-yellow-400">🎓</span> {content.qualifications || "Qualifications"}
            </h3>
            
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-xs text-amber-200 mb-4">
                ⚠️ {content.qualifications_notice || "Creating new qualifications will require admin approval."}
            </div>

            <div className="space-y-4">
                 {/* Existing Files List (Read Only-ish? Or can remove?) */}
                 {files.length > 0 && (
                     <div className="space-y-2">
                         <p className="text-xs font-bold text-muted uppercase">{content.current_files || "Current Files"}</p>
                         <div className="flex flex-wrap gap-2">
                             {files.map((f, i) => (
                                 <span key={i} className="px-3 py-1 bg-tertiary rounded-lg text-sm flex items-center gap-2">
                                     📄 {typeof f === 'string' ? f.split('/').pop() : f.name}
                                 </span>
                             ))}
                         </div>
                     </div>
                 )}
                 
                 {/* Upload New */}
                 <div>
                    <label className="text-xs font-bold text-muted uppercase tracking-wider mb-2 block">{content.upload_new || "Upload New Files"}</label>
                    <input 
                        type="file" 
                        name="uploadedFilesInput"
                        multiple 
                        onChange={handleFileChange}
                        className="block w-full text-sm text-muted file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-tertiary file:text-foreground hover:file:bg-white/10 transition-all cursor-pointer"
                    />
                    {newFiles.length > 0 && (
                        <div className="mt-2 text-sm text-green-400">
                            {newFiles.length} file(s) selected for upload request.
                        </div>
                    )}
                 </div>
            </div>
        </div>

        <div className="flex gap-4 mt-8 pt-6 border-t border-border/50 sticky bottom-0 bg-secondary/95 backdrop-blur-md p-4 -mx-6 -mb-6 rounded-b-2xl md:relative md:bg-transparent md:p-0 md:m-0 md:backdrop-blur-none">
            <button 
                type="submit" 
                disabled={saving} 
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-red-900/20 flex-1 md:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {saving ? content.saving : content.btn_save}
            </button>
            <button 
                type="button" 
                onClick={onCancel} 
                disabled={saving}
                className="px-8 py-3 bg-tertiary hover:bg-white/10 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
            >
                {content.btn_cancel}
            </button>
        </div>
    </form>
  );
}

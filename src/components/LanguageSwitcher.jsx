"use client";

import { useTheme } from "@/context/ThemeContext";
import { useRouter, usePathname } from "next/navigation";
import { i18n } from "@/i18n-config";

export default function LanguageSwitcher({ lang }) {
  const { isDark } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = lang === 'en' ? 'ar' : 'en';
    // Remove the current locale from the pathname to get the clean path
    const currentLocalePattern = new RegExp(`^/${lang}`);
    const cleanPath = pathname.replace(currentLocalePattern, '') || '/';
    
    // Construct new path
    const newPath = `/${newLocale}${cleanPath === '/' ? '' : cleanPath}`;
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`relative w-15 h-7 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 bg-tertiary shadow-inner font-bold text-[10px] flex items-center justify-between px-1.5`}
      aria-label={`Switch to ${lang === 'en' ? 'Arabic' : 'English'}`}
    >
      {/* Thumb */}
      <div
        className="absolute top-1 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 shadow-md bg-background text-foreground z-10"
        style={{
          left: lang === 'en' ? '4px' : 'calc(100% - 24px)', // Align with LTR logic visually
        }}
      >
        {lang === 'en' ? 'EN' : 'AR'}
      </div>
      
      {/* Background Labels */}
      <span className={`transition-opacity duration-300 ${lang === 'en' ? 'opacity-0' : 'opacity-100 text-foreground'}`}>EN</span>
      <span className={`transition-opacity duration-300 ${lang === 'en' ? 'opacity-100 text-foreground' : 'opacity-0'}`}>AR</span>
    </button>
  );
}

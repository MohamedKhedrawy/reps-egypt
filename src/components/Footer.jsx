"use client";

import Link from "next/link";
import { usePageSettings } from "@/context/PageSettingsContext";

export default function Footer() {
  const { pages } = usePageSettings();
  
  // Get footer and legal pages from settings
  const footerLinks = pages.footer || [];
  const legalLinks = pages.legal || [];

  return (
    <footer className="group relative bg-secondary pt-20 pb-10 overflow-hidden border-t border-border">
        {/* Decorative Top Line Gradient */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-8 mb-16">
            
            {/* Column 1: Brand (4 cols) */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 bg-background-primary rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                      <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
                    </svg>
                 </div>
                 <span className="text-xl font-bold text-foreground-primary tracking-tight">REPS EGYPT</span>
              </div>
              <p className="text-muted text-sm leading-7 max-w-sm">
                Egypt's premier fitness and training certification organization. Empowering coaches and athletes to reach their full potential through accredited programs and professional standards.
              </p>
            </div>

            {/* Column 2: Quick Links (2 or 3 cols) */}
            <div className="md:col-span-2 md:col-start-6">
              <h4 className="font-bold text-foreground mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-muted">
                <li><Link href="/coaches" className="hover:text-red-500 transition-colors">Find a Coach</Link></li>
                <li><Link href="/programs" className="hover:text-red-500 transition-colors">Training Programs</Link></li>
                <li><Link href="/standards" className="hover:text-red-500 transition-colors">Standards</Link></li>
                {footerLinks.map((page) => (
                  <li key={page.pageId}>
                    <Link href={page.path} className="hover:text-red-500 transition-colors">
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Legal (2 or 3 cols) */}
            <div className="md:col-span-2">
              <h4 className="font-bold text-foreground mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-muted">
                {legalLinks.map((page) => (
                  <li key={page.pageId}>
                    <Link href={page.path} className="hover:text-red-500 transition-colors">
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact (3 cols) */}
            <div className="md:col-span-3">
               <h4 className="font-bold text-foreground mb-6">Contact Us</h4>
               <ul className="space-y-4 text-sm text-muted mb-8">
                 <li className="flex items-center gap-3">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-600">
                     <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                     <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                   </svg>
                   info@repsegypt.com
                 </li>
                 <li className="flex items-center gap-3">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-600">
                     <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                   </svg>
                   +20 123 456 7890
                 </li>
                 <li className="flex items-center gap-3">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-600">
                     <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                   </svg>
                   Cairo, Egypt
                 </li>
               </ul>

               {/* Social Icons */}
              <div className="flex gap-4">
                  {/* Facebook */}
                  <Link href="#" className="w-9 h-9 rounded-lg bg-tertiary border border-border flex items-center justify-center hover:bg-red-600 hover:text-white transition-all cursor-pointer text-muted hover:border-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </Link>

                  {/* Instagram */}
                  <Link href="#" className="w-9 h-9 rounded-lg bg-tertiary border border-border flex items-center justify-center hover:bg-red-600 hover:text-white transition-all cursor-pointer text-muted hover:border-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </Link>

                   {/* X (Twitter) */}
                  <Link href="#" className="w-9 h-9 rounded-lg bg-tertiary border border-border flex items-center justify-center hover:bg-red-600 hover:text-white transition-all cursor-pointer text-muted hover:border-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                    </svg>
                  </Link>
                  
                  {/* WhatsApp */}
                  <Link href="#" className="w-9 h-9 rounded-lg bg-tertiary border border-border flex items-center justify-center hover:bg-red-600 hover:text-white transition-all cursor-pointer text-muted hover:border-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M.057 24l1.687-6.162c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </Link>
               </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center">
             <span className="text-xs text-muted">© 2026 Reps Egypt. All rights reserved. Empowering fitness professionals across Egypt.</span>
          </div>
        </div>
      </footer>
  );
}

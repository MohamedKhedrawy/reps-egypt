import Link from "next/link";

export default function Footer() {
  return (
    <footer className="group relative bg-[#080808] pt-20 pb-10 overflow-hidden border-t border-white/5">
        {/* Decorative Top Line Gradient */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-8 mb-16">
            
            {/* Column 1: Brand (4 cols) */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                      <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
                    </svg>
                 </div>
                 <span className="text-xl font-bold text-red-600 tracking-tight">REPS EGYPT</span>
              </div>
              <p className="text-gray-500 text-sm leading-7 max-w-sm">
                Egypt's premier fitness and training certification organization. Empowering coaches and athletes to reach their full potential through accredited programs and professional standards.
              </p>
            </div>

            {/* Column 2: Quick Links (2 or 3 cols) */}
            <div className="md:col-span-2 md:col-start-6">
              <h4 className="font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-red-500 transition-colors">Find a Coach</Link></li>
                <li><Link href="#" className="hover:text-red-500 transition-colors">Training Programs</Link></li>
                <li><Link href="/standards" className="hover:text-red-500 transition-colors">Standards</Link></li>
                <li><Link href="#" className="hover:text-red-500 transition-colors">Member Benefits</Link></li>
                <li><Link href="#" className="hover:text-red-500 transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Column 3: Legal (2 or 3 cols) */}
            <div className="md:col-span-2">
              <h4 className="font-bold text-white mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-red-500 transition-colors">Code of Ethics</Link></li>
                <li><Link href="#" className="hover:text-red-500 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-red-500 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-red-500 transition-colors">Admin Portal</Link></li>
              </ul>
            </div>

            {/* Column 4: Contact (3 cols) */}
            <div className="md:col-span-3">
               <h4 className="font-bold text-white mb-6">Contact Us</h4>
               <ul className="space-y-4 text-sm text-gray-400 mb-8">
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
                 {[1,2,3,4].map((i) => (
                    <div key={i} className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all cursor-pointer text-gray-400">
                      {/* Placeholder icon */}
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                        </svg>
                    </div>
                 ))}
               </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center">
             <span className="text-xs text-gray-600">© 2026 Reps Egypt. All rights reserved. Empowering fitness professionals across Egypt.</span>
          </div>
        </div>
      </footer>
  );
}

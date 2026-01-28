export const metadata = {
  title: "Terms of Service | Reps Egypt",
  description: "Terms and conditions governing your use of the Reps Egypt platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-[#1a0505] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-900/20 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-600">
               <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clipRule="evenodd" />
               <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
             </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3">Terms of Service</h1>
          <p className="text-gray-400">Please read these terms carefully before using our platform</p>
          <p className="text-xs text-gray-500 mt-4">Effective Date: January 1, 2026</p>
        </div>

        <div className="space-y-8">
            {/* Section 1 */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <div className="text-gray-400 text-sm leading-relaxed">
                    <p className="mb-4">
                        By accessing or using the Reps Egypt website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                    </p>
                    <p>
                        We reserve the right to modify these terms at any time. Your continued use of the platform after any such changes constitutes your acceptance of the new Terms of Service.
                    </p>
                </div>
            </div>

            {/* Section 2 */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-4">2. User Responsibilities</h2>
                <div className="text-gray-400 text-sm leading-relaxed">
                    <p className="mb-4">As a user of Reps Egypt, you agree to:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-500 mb-4">
                        <li>Provide accurate and complete registration information.</li>
                        <li>Maintain the security of your account credentials.</li>
                        <li>Use the platform only for lawful professional purposes.</li>
                        <li>Not engage in any activity that disrupts or interferes with our services.</li>
                    </ul>
                    <p>
                        Failure to adhere to these responsibilities may result in the immediate suspension or termination of your account.
                    </p>
                </div>
            </div>

            {/* Section 3 */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-4">3. Certification & Accreditation</h2>
                <div className="text-gray-400 text-sm leading-relaxed">
                    <p className="mb-4">
                        Reps Egypt provides certification and accreditation services. While we strive to maintain the highest standards, the granting of certification does not guarantee employment or specific career outcomes.
                    </p>
                    <p>
                        All certified professionals must adhere to the Reps Egypt <a href="/code-of-ethics" className="text-red-500 hover:underline">Code of Ethics</a>. Violation of these ethical standards is grounds for revocation of certification.
                    </p>
                </div>
            </div>

            {/* Section 4 */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-4">4. Intellectual Property</h2>
                <div className="text-gray-400 text-sm leading-relaxed">
                    <p>
                        All content, features, and functionality of the Service (including but not limited to all information, software, text, look and feel, and logos) are owned by Reps Egypt and are protected by international copyright, trademark, and other intellectual property laws.
                    </p>
                </div>
            </div>

            {/* Section 5 */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-4">5. Limitation of Liability</h2>
                <div className="text-gray-400 text-sm leading-relaxed">
                    <p>
                        In no event shall Reps Egypt be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                    </p>
                </div>
            </div>
        </div>

        {/* Contact Footer */}
        <div className="mt-16 text-center border-t border-white/5 pt-12">
            <p className="text-gray-400 mb-4">Questions about the Terms of Service?</p>
            <a href="mailto:legal@repsegypt.com" className="text-red-500 hover:text-white font-bold transition-colors">legal@repsegypt.com</a>
        </div>

      </div>
    </div>
  );
}

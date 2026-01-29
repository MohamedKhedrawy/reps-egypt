export const metadata = {
  title: "Privacy Policy | Reps Egypt",
  description: "How we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-tertiary rounded-2xl flex items-center justify-center mx-auto mb-6 border border-border shadow-[0_0_30px_rgba(220,38,38,0.1)]">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-600">
               <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
             </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-muted">Values that drive our commitment to your privacy</p>
          <p className="text-xs text-muted mt-4">Last Updated: January 28, 2026</p>
        </div>

        <div className="space-y-8">
            {/* Section 1 */}
            <div className="bg-secondary border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500 text-sm">01</span>
                    Information We Collect
                </h2>
                <div className="text-muted text-sm leading-relaxed space-y-4">
                    <p>We collect information you provide directly to us when you create an account, register for certification, or communicate with us. This may include:</p>
                    <ul className="list-disc pl-5 space-y-2 text-muted">
                        <li>Personal identification (Name, email address, phone number)</li>
                        <li>Professional credentials and certification history</li>
                        <li>Payment information (processed securely by third-party providers)</li>
                        <li>Profile photographs and verification documents</li>
                    </ul>
                </div>
            </div>

            {/* Section 2 */}
            <div className="bg-secondary border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500 text-sm">02</span>
                    How We Use Your Information
                </h2>
                <div className="text-muted text-sm leading-relaxed space-y-4">
                    <p>We use the information we collect to operate, maintain, and provide the features of the Reps Egypt platform. Specifically, we use your data to:</p>
                    <ul className="list-disc pl-5 space-y-2 text-muted">
                        <li>Verify your professional status and certifications</li>
                        <li>Process applications and renewals</li>
                        <li>Send important administrative notifications</li>
                        <li>Maintain the public directory of certified professionals (with your consent)</li>
                    </ul>
                </div>
            </div>

            {/* Section 3 */}
            <div className="bg-secondary border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500 text-sm">03</span>
                    Data Security
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-4">
                    We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
                <div className="bg-tertiary p-4 rounded-xl border-l-4 border-red-900/50">
                    <p className="text-xs text-muted">
                        <strong>Note:</strong> We never sell your personal data to third-party advertisers. Your data is yours.
                    </p>
                </div>
            </div>

            {/* Section 4 */}
            <div className="bg-secondary border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500 text-sm">04</span>
                    Your Rights
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-4">
                    You have the right to access, correct, or delete your personal information. You can manage most of your data directly through your account settings. For other requests, please contact our support team.
                </p>
            </div>
        </div>

        {/* Contact Footer */}
        <div className="mt-16 text-center border-t border-border pt-12">
            <p className="text-muted mb-4">Have questions about our privacy practices?</p>
            <a href="mailto:privacy@repsegypt.com" className="text-red-500 hover:text-foreground font-bold transition-colors">privacy@repsegypt.com</a>
        </div>

      </div>
    </div>
  );
}

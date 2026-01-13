export const metadata = {
    title: 'FAQ',
    description: 'Frequently Asked Questions about Reps Egypt - Find answers to common questions.',
    openGraph: {
        title: 'FAQ | Reps Egypt',
        description: 'Frequently Asked Questions about Reps Egypt - Find answers to common questions.',
        type: 'website',
    },
};

const faqs = [
    {
        question: 'What is Reps Egypt?',
        answer: 'Reps Egypt is a leading digital solutions platform dedicated to empowering businesses and individuals with innovative technology and seamless user experiences.',
    },
    {
        question: 'How do I become a member?',
        answer: 'You can become a member by clicking the Register button and filling out the registration form. Once approved, you will have access to all member benefits.',
    },
    {
        question: 'What are the membership benefits?',
        answer: 'Members enjoy exclusive access to resources, networking opportunities, professional development programs, and discounts on our services.',
    },
    {
        question: 'How can I contact support?',
        answer: 'You can reach our support team through the contact form on our website or by emailing support@repsegypt.com. We typically respond within 24 hours.',
    },
    {
        question: 'Are there any membership fees?',
        answer: 'We offer various membership tiers, including free and premium options. Visit our membership page for detailed pricing information.',
    },
    {
        question: 'How do I submit content for the blog?',
        answer: 'Members can submit blog posts through their dashboard. All submissions are reviewed by our editorial team before publication.',
    },
];

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
                        Frequently Asked Questions
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                    <p className="mt-4 text-gray-300 text-lg">Find answers to common questions about Reps Egypt</p>
                </header>

                <section className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                        >
                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                <h2 className="text-lg font-medium text-white pr-4">{faq.question}</h2>
                                <span className="text-purple-400 group-open:rotate-180 transition-transform duration-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </summary>
                            <div className="px-6 pb-6">
                                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                            </div>
                        </details>
                    ))}
                </section>

                <footer className="mt-16 text-center">
                    <p className="text-gray-400 mb-6">Still have questions?</p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                    >
                        Contact Us
                    </a>
                    <div className="mt-6">
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            ← Back to Home
                        </a>
                    </div>
                </footer>
            </div>
        </main>
    );
}

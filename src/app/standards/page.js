export const metadata = {
    title: 'Standards',
    description: 'Reps Egypt Standards - Our commitment to excellence and quality in everything we do.',
    openGraph: {
        title: 'Standards | Reps Egypt',
        description: 'Reps Egypt Standards - Our commitment to excellence and quality in everything we do.',
        type: 'website',
    },
};

const standards = [
    {
        icon: '🎯',
        title: 'Quality Assurance',
        description: 'We maintain rigorous quality control processes to ensure all our deliverables meet the highest standards of excellence.',
    },
    {
        icon: '🔒',
        title: 'Data Security',
        description: 'Your data is protected with industry-leading security protocols and encryption standards.',
    },
    {
        icon: '⚡',
        title: 'Performance',
        description: 'We optimize for speed and reliability, ensuring seamless experiences across all platforms.',
    },
    {
        icon: '♿',
        title: 'Accessibility',
        description: 'Our solutions are designed to be accessible to everyone, following WCAG guidelines.',
    },
    {
        icon: '🌍',
        title: 'Sustainability',
        description: 'We are committed to environmentally responsible practices in all our operations.',
    },
    {
        icon: '📋',
        title: 'Compliance',
        description: 'We adhere to all relevant industry regulations and best practices.',
    },
];

export default function StandardsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="max-w-6xl mx-auto px-6 py-20">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
                        Our Standards
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                    <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
                        At Reps Egypt, we hold ourselves to the highest standards in every aspect of our work.
                    </p>
                </header>

                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {standards.map((standard, index) => (
                        <article
                            key={index}
                            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
                        >
                            <span className="text-4xl mb-4 block">{standard.icon}</span>
                            <h2 className="text-xl font-semibold text-white mb-3">{standard.title}</h2>
                            <p className="text-gray-300 leading-relaxed">{standard.description}</p>
                        </article>
                    ))}
                </section>

                <section className="mt-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                    <h2 className="text-2xl font-semibold text-purple-300 mb-4 text-center">Our Commitment</h2>
                    <p className="text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
                        We continuously review and improve our standards to ensure we remain at the forefront of 
                        industry best practices. Our team undergoes regular training and certification to maintain 
                        the highest levels of expertise.
                    </p>
                </section>

                <footer className="mt-16 text-center">
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                    >
                        ← Back to Home
                    </a>
                </footer>
            </div>
        </main>
    );
}

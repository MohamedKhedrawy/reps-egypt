export const metadata = {
    title: 'Code of Ethics',
    description: 'Reps Egypt Code of Ethics - The principles and values that guide our organization.',
    openGraph: {
        title: 'Code of Ethics | Reps Egypt',
        description: 'Reps Egypt Code of Ethics - The principles and values that guide our organization.',
        type: 'website',
    },
};

const principles = [
    {
        number: '01',
        title: 'Integrity',
        description: 'We conduct all business with honesty and transparency. We keep our promises and take responsibility for our actions.',
    },
    {
        number: '02',
        title: 'Respect',
        description: 'We treat everyone with dignity and respect, valuing diverse perspectives and fostering an inclusive environment.',
    },
    {
        number: '03',
        title: 'Excellence',
        description: 'We strive for excellence in everything we do, continuously improving our skills and delivering quality results.',
    },
    {
        number: '04',
        title: 'Accountability',
        description: 'We take ownership of our decisions and their outcomes, learning from mistakes and celebrating successes together.',
    },
    {
        number: '05',
        title: 'Confidentiality',
        description: 'We protect sensitive information and respect the privacy of our members, partners, and stakeholders.',
    },
    {
        number: '06',
        title: 'Fairness',
        description: 'We make decisions based on merit and treat all stakeholders equitably, avoiding conflicts of interest.',
    },
];

export default function CodeOfEthicsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
                        Code of Ethics
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                    <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
                        Our code of ethics defines the principles that guide our behavior and decision-making.
                    </p>
                </header>

                <section className="space-y-6">
                    {principles.map((principle, index) => (
                        <article
                            key={index}
                            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex gap-6"
                        >
                            <div className="flex-shrink-0">
                                <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    {principle.number}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-2">{principle.title}</h2>
                                <p className="text-gray-300 leading-relaxed">{principle.description}</p>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="mt-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/20">
                    <h2 className="text-2xl font-semibold text-white mb-4">Reporting Violations</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        If you witness or become aware of any violations of this code of ethics, we encourage 
                        you to report them. All reports will be handled confidentially and investigated promptly.
                    </p>
                    <a
                        href="/contact"
                        className="text-purple-400 hover:text-purple-300 transition-colors underline"
                    >
                        Contact our ethics committee →
                    </a>
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

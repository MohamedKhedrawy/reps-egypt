export const metadata = {
    title: 'About Us',
    description: 'Learn more about Reps Egypt - our mission, vision, and the team behind our platform.',
    openGraph: {
        title: 'About Reps Egypt',
        description: 'Learn more about Reps Egypt - our mission, vision, and the team behind our platform.',
        type: 'website',
    },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
                        About Us
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                </header>

                <article className="space-y-12">
                    <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                        <h2 className="text-2xl font-semibold text-purple-300 mb-4">Our Mission</h2>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            We are dedicated to building innovative solutions that empower businesses
                            and individuals to achieve their goals. Our platform combines cutting-edge
                            technology with user-centric design.
                        </p>
                    </section>

                    <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-pink-500/50 transition-all duration-300">
                        <h2 className="text-2xl font-semibold text-pink-300 mb-4">Our Vision</h2>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            To be the leading platform for digital transformation, enabling seamless
                            connections and driving innovation across industries.
                        </p>
                    </section>

                    <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                        <h2 className="text-2xl font-semibold text-blue-300 mb-4">Our Values</h2>
                        <ul className="space-y-3 text-gray-300 text-lg">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                                Innovation at the core of everything we do
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-pink-500 rounded-full" />
                                User experience as our top priority
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                Transparency and trust in all relationships
                            </li>
                        </ul>
                    </section>
                </article>

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

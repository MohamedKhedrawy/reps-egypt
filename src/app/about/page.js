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
        <main className="min-h-screen bg-background text-foreground">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-foreground mb-6">
                        About <span className="text-red-600">Us</span>
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-900 mx-auto rounded-full" />
                </header>

                <article className="space-y-12">
                    <section className="bg-secondary backdrop-blur-lg rounded-2xl p-8 border border-border hover:border-red-600/30 transition-all duration-300">
                        <h2 className="text-2xl font-semibold text-red-500 mb-4">Our Mission</h2>
                        <p className="text-muted leading-relaxed text-lg">
                            We are dedicated to building innovative solutions that empower businesses
                            and individuals to achieve their goals. Our platform combines cutting-edge
                            technology with user-centric design.
                        </p>
                    </section>

                    <section className="bg-secondary backdrop-blur-lg rounded-2xl p-8 border border-border hover:border-red-600/30 transition-all duration-300">
                        <h2 className="text-2xl font-semibold text-red-500 mb-4">Our Vision</h2>
                        <p className="text-muted leading-relaxed text-lg">
                            To be the leading platform for digital transformation, enabling seamless
                            connections and driving innovation across industries.
                        </p>
                    </section>

                    <section className="bg-secondary backdrop-blur-lg rounded-2xl p-8 border border-border hover:border-red-600/30 transition-all duration-300">
                        <h2 className="text-2xl font-semibold text-red-500 mb-4">Our Values</h2>
                        <ul className="space-y-3 text-muted text-lg">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-red-600 rounded-full" />
                                Innovation at the core of everything we do
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-red-600 rounded-full" />
                                User experience as our top priority
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-red-600 rounded-full" />
                                Transparency and trust in all relationships
                            </li>
                        </ul>
                    </section>
                </article>

                <footer className="mt-16 text-center">
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/25 border border-transparent"
                    >
                        ← Back to Home
                    </a>
                </footer>
            </div>
        </main>
    );
}

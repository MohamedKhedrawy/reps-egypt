export const metadata = {
    title: 'Member Benefits',
    description: 'Discover the exclusive benefits and perks available to Reps Egypt members.',
    openGraph: {
        title: 'Member Benefits | Reps Egypt',
        description: 'Discover the exclusive benefits and perks available to Reps Egypt members.',
        type: 'website',
    },
};

const benefits = [
    {
        title: 'Professional Development',
        description: 'Access exclusive workshops, webinars, and training sessions led by industry experts to enhance your skills.',
        icon: '📚'
    },
    {
        title: 'Networking Events',
        description: 'Connect with like-minded professionals, potential partners, and industry leaders at our regular meetups and conferences.',
        icon: '🤝'
    },
    {
        title: 'Resource Library',
        description: 'Unlimited access to our comprehensive digital library containing white papers, case studies, and templates.',
        icon: '💾'
    },
    {
        title: 'Job Board Access',
        description: 'Priority access to our curated job board featuring exclusive opportunities from top companies.',
        icon: '💼'
    },
    {
        title: 'Mentorship Program',
        description: 'Get paired with experienced mentors who can guide you through your career journey and professional growth.',
        icon: '🎓'
    },
    {
        title: 'Discounts & Perks',
        description: 'Special discounts on software, tools, and services from our partner network.',
        icon: '🎁'
    }
];

const tiers = [
    {
        name: 'Standard',
        price: 'Free',
        features: [
            'Access to community forums',
            'Monthly newsletter',
            'Basic resource library',
            'Public event access'
        ],
        button: 'Get Started',
        highlight: false
    },
    {
        name: 'Professional',
        price: 'EGP 500/mo',
        features: [
            'All Standard features',
            'Full resource library access',
            'Priority event registration',
            'Mentorship program',
            'Member directory profile'
        ],
        button: 'Join Now',
        highlight: true
    },
    {
        name: 'Corporate',
        price: 'Custom',
        features: [
            'All Professional features',
            'Team management dashboard',
            'Custom training sessions',
            'Dedicated account manager',
            'API access'
        ],
        button: 'Contact Sales',
        highlight: false
    }
];

export default function MemberBenefitsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <header className="text-center mb-20">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
                        Member Benefits
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                    <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
                        Unlock a world of opportunities designed to accelerate your growth and success.
                    </p>
                </header>

                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Join Reps Egypt?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div 
                                key={index}
                                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1"
                            >
                                <span className="text-4xl mb-6 block">{benefit.icon}</span>
                                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-center mb-12 text-white">Membership Tiers</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {tiers.map((tier, index) => (
                            <div 
                                key={index}
                                className={`relative flex flex-col p-8 rounded-2xl border ${
                                    tier.highlight 
                                        ? 'bg-gradient-to-b from-purple-900/50 to-slate-900/50 border-purple-500 shadow-xl shadow-purple-900/20 scale-105 z-10' 
                                        : 'bg-white/5 border-white/10 hover:border-white/20'
                                } transition-all duration-300`}
                            >
                                {tier.highlight && (
                                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full">
                                        Most Popular
                                    </span>
                                )}
                                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                                <div className="text-3xl font-bold text-purple-300 mb-6">{tier.price}</div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                                            <span className="text-green-400">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                                    tier.highlight
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25'
                                        : 'bg-white/10 hover:bg-white/20 text-white'
                                }`}>
                                    {tier.button}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="mt-20 text-center">
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

export const metadata = {
    title: 'Partners',
    description: 'Meet our trusted partners who help us deliver excellence to our community.',
    openGraph: {
        title: 'Partners | Reps Egypt',
        description: 'Meet our trusted partners who help us deliver excellence to our community.',
        type: 'website',
    },
};

const partners = [
    {
        name: 'TechCorp Solutions',
        category: 'Technology',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=400&auto=format&fit=crop', // Placeholder logo
        description: 'Leading provider of enterprise software solutions.'
    },
    {
        name: 'Innovate Egypt',
        category: 'Innovation',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=400&auto=format&fit=crop',
        description: 'Fostering innovation and entrepreneurship across the region.'
    },
    {
        name: 'Digital Future',
        category: 'Education',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=400&auto=format&fit=crop',
        description: 'Empowering the next generation with digital skills.'
    },
    {
        name: 'Cloud Systems',
        category: 'Infrastructure',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=400&auto=format&fit=crop',
        description: 'Secure and scalable cloud infrastructure provider.'
    },
    {
        name: 'Security First',
        category: 'Security',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=400&auto=format&fit=crop',
        description: 'Top-tier cybersecurity for modern businesses.'
    },
    {
        name: 'Data Insights',
        category: 'Analytics',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=400&auto=format&fit=crop',
        description: 'Converting data into actionable business intelligence.'
    }
];

export default function PartnersPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
                        Our Partners
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                    <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
                        We collaborate with industry leaders to bring the best solutions to our members.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {partners.map((partner, index) => (
                        <div 
                            key={index}
                            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 mb-6 rounded-full overflow-hidden bg-white/10 p-2 group-hover:scale-110 transition-transform duration-300">
                                <img 
                                    src={partner.logo} 
                                    alt={partner.name}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <span className="text-sm text-purple-400 font-medium mb-2">{partner.category}</span>
                            <h3 className="text-xl font-bold text-white mb-3">{partner.name}</h3>
                            <p className="text-gray-300 leading-relaxed text-sm">
                                {partner.description}
                            </p>
                            <button className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium transition-colors">
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-12 text-center border border-purple-500/30">
                    <h2 className="text-3xl font-bold text-white mb-4">Become a Partner</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join our network of partners and collaborate with us to create value for the community.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                    >
                        Apply for Partnership
                    </a>
                </div>

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

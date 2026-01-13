export const metadata = {
    title: 'Gallery',
    description: 'Explore photos and highlights from our events, conferences, and community gatherings.',
    openGraph: {
        title: 'Gallery | Reps Egypt',
        description: 'Explore photos and highlights from our events, conferences, and community gatherings.',
        type: 'website',
    },
};

const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop',
        alt: 'Annual Tech Conference 2025',
        category: 'Events'
    },
    {
        src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop',
        alt: 'Community Networking Night',
        category: 'Community'
    },
    {
        src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
        alt: 'Strategy Workshop',
        category: 'Workshops'
    },
    {
        src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop',
        alt: 'Award Ceremony',
        category: 'Events'
    },
    {
        src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop',
        alt: 'Team Building Day',
        category: 'Team'
    },
    {
        src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop',
        alt: 'Partner Summit',
        category: 'Events'
    },
    {
        src: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=1000&auto=format&fit=crop',
        alt: 'Hackathon 2025',
        category: 'Competitions'
    },
    {
        src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop',
        alt: 'Office Life',
        category: 'Culture'
    },
    {
        src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop',
        alt: 'Leadership Summit',
        category: 'Leadership'
    }
];

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
                        Media Gallery
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                    <p className="mt-4 text-gray-300 text-lg">Capturing moments that define our journey</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((image, index) => (
                        <div 
                            key={index}
                            className="group relative overflow-hidden rounded-2xl aspect-video border border-white/10 cursor-pointer"
                        >
                            <img 
                                src={image.src} 
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="text-purple-400 text-sm font-medium mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    {image.category}
                                </span>
                                <h3 className="text-white text-lg font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {image.alt}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all font-medium">
                        View More Photos
                    </button>
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

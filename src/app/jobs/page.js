export const metadata = {
    title: 'Jobs',
    description: 'Career opportunities at Reps Egypt - Join our team and make an impact.',
    openGraph: {
        title: 'Jobs | Reps Egypt',
        description: 'Career opportunities at Reps Egypt - Join our team and make an impact.',
        type: 'website',
    },
};

const jobs = [
    {
        title: 'Senior Software Engineer',
        department: 'Engineering',
        location: 'Cairo, Egypt',
        type: 'Full-time',
        description: 'Lead development of our core platform features and mentor junior developers.',
    },
    {
        title: 'Product Designer',
        department: 'Design',
        location: 'Remote',
        type: 'Full-time',
        description: 'Create beautiful, intuitive user experiences for our digital products.',
    },
    {
        title: 'Marketing Manager',
        department: 'Marketing',
        location: 'Cairo, Egypt',
        type: 'Full-time',
        description: 'Develop and execute marketing strategies to grow our member base.',
    },
    {
        title: 'Community Manager',
        department: 'Operations',
        location: 'Cairo, Egypt',
        type: 'Full-time',
        description: 'Build and nurture our vibrant community of members and partners.',
    },
    {
        title: 'Data Analyst',
        department: 'Analytics',
        location: 'Remote',
        type: 'Contract',
        description: 'Analyze data to drive insights and improve decision-making.',
    },
];

export default function JobsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="max-w-6xl mx-auto px-6 py-20">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
                        Careers at Reps Egypt
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                    <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
                        Join our team and help us build the future of digital solutions in Egypt.
                    </p>
                </header>

                <section className="mb-12 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                    <h2 className="text-2xl font-semibold text-white mb-4">Why Work With Us?</h2>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div>
                            <span className="text-3xl mb-2 block">🚀</span>
                            <h3 className="font-medium text-white mb-1">Growth Opportunities</h3>
                            <p className="text-gray-400 text-sm">Advance your career with continuous learning</p>
                        </div>
                        <div>
                            <span className="text-3xl mb-2 block">🏠</span>
                            <h3 className="font-medium text-white mb-1">Flexible Work</h3>
                            <p className="text-gray-400 text-sm">Remote and hybrid options available</p>
                        </div>
                        <div>
                            <span className="text-3xl mb-2 block">💪</span>
                            <h3 className="font-medium text-white mb-1">Great Benefits</h3>
                            <p className="text-gray-400 text-sm">Competitive salary and comprehensive benefits</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-6">Open Positions</h2>
                    <div className="space-y-4">
                        {jobs.map((job, index) => (
                            <article
                                key={index}
                                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">{job.title}</h3>
                                    <p className="text-gray-400 text-sm mb-2">{job.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">{job.department}</span>
                                        <span className="px-3 py-1 bg-pink-500/20 text-pink-300 text-xs rounded-full">{job.location}</span>
                                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">{job.type}</span>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium text-sm hover:from-purple-500 hover:to-pink-500 transition-all duration-300 whitespace-nowrap"
                                >
                                    Apply Now
                                </a>
                            </article>
                        ))}
                    </div>
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

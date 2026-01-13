export const metadata = {
    title: 'Login',
    description: 'Login to your Reps Egypt account to access member benefits and resources.',
    openGraph: {
        title: 'Login | Reps Egypt',
        description: 'Login to your Reps Egypt account to access member benefits and resources.',
        type: 'website',
    },
};

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="max-w-md mx-auto px-6 py-20">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
                        Login
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                    <p className="mt-4 text-gray-300">Welcome back to Reps Egypt</p>
                </header>

                <form className="space-y-6">
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-white/10" />
                                <span className="text-gray-300">Remember me</span>
                            </label>
                            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                <footer className="mt-8 text-center">
                    <p className="text-gray-400">
                        Don't have an account?{' '}
                        <a href="/register" className="text-purple-400 hover:text-purple-300 transition-colors">
                            Sign up
                        </a>
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 mt-6 text-gray-400 hover:text-white transition-colors"
                    >
                        ← Back to Home
                    </a>
                </footer>
            </div>
        </main>
    );
}

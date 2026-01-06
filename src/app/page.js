import Link from "next/link";

export const metadata = {
  title: "Home",
  description: "Welcome to Reps Egypt - Your premier digital solutions platform for innovative technology and seamless user experiences.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 lg:py-32">
          {/* Navigation */}
          <nav className="flex items-center justify-between mb-20">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Reps Egypt
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/about"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/api/health"
                className="text-gray-300 hover:text-white transition-colors"
              >
                API Status
              </Link>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Build the Future with{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Empowering businesses with cutting-edge technology solutions.
              Transform your ideas into reality with our innovative platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/about"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5"
              >
                Get Started
              </Link>
              <Link
                href="/api/health"
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                View API Docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Reps Egypt
          </span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Modern Technology",
              description: "Built with Next.js and MongoDB for blazing-fast performance and scalability.",
              icon: "⚡",
              gradient: "from-purple-500 to-blue-500",
            },
            {
              title: "SEO Optimized",
              description: "Server-side rendering ensures your content is discoverable by search engines.",
              icon: "🔍",
              gradient: "from-pink-500 to-purple-500",
            },
            {
              title: "Full Stack",
              description: "Complete solution with API routes, database integration, and responsive design.",
              icon: "🚀",
              gradient: "from-blue-500 to-cyan-500",
            },
          ].map((feature, index) => (
            <article
              key={index}
              className="group bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Reps Egypt
            </div>
            <div className="flex items-center gap-6 text-gray-400">
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/api/health" className="hover:text-white transition-colors">
                API Status
              </Link>
            </div>
            <p className="text-gray-500 text-sm">
              © 2026 Reps Egypt. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

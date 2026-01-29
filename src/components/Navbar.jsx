"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, loading, isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Left: Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tighter text-white">
              REPS <span className="text-red-600">Egypt</span> <sup>®</sup>
            </span>
          </Link>

          {/* Center: Navigation Links (Absolutely Centered) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center gap-8">
              {[
                { name: "Home", href: "/" },
                { name: "Coaches", href: "/coaches" },
                { name: "Programs", href: "/programs" },
                { name: "Gallery", href: "/gallery" },
                { name: "News", href: "/news" },
                { name: "Benefits", href: "/member-benefits" },
                { name: "Standards", href: "/standards" },
              ].map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  className="text-[15px] font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
          </div>

          {/* Right: Auth / Profile */}
          <div className="flex items-center justify-end gap-6 w-[180px]">
            {loading ? (
              // Loading state - show skeleton
              <div className="w-24 h-10 bg-white/10 rounded-lg animate-pulse"></div>
            ) : isAuthenticated ? (
              // Logged in - show Profile button
              <Link 
                href="/profile" 
                className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all hover:-translate-y-0.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
                Profile
              </Link>
            ) : (
              // Not logged in - show Login and Register
              <>
                <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-0.5 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                  </svg>
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </>
            )}
          </div>

        </div>
      </nav>
  );
}

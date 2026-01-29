"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/context/ToastContext";

export default function Navbar() {
  const router = useRouter();
  const { user, loading, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const toast = useToast();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const triggerTestToast = () => {
    const types = ['success', 'error', 'warning', 'info'];
    const type = types[Math.floor(Math.random() * types.length)];
    const messages = {
      success: "Operation completed successfully!",
      error: "Something went wrong. Please try again.",
      warning: "Your session is about to expire.",
      info: "New updates are available.",
    };
    toast[type](messages[type]);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 ${isDark ? 'bg-background/95 border-border' : 'bg-[#b91c1c] border-transparent text-white'}`}
      // PREVIOUS MONOTONE LOGIC (Commented out):
      // className="fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 bg-background/95 border-border"
    >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Left: Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <span className={`text-2xl font-extrabold tracking-tighter transition-colors duration-300 ${isDark ? 'text-foreground' : 'text-black'}`}>
              REPS <span className={isDark ? "text-red-600" : "text-white"}>Egypt</span> <sup>®</sup>
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
                  className={`text-[15px] font-medium transition-colors hover:text-red-600 ${isDark ? 'text-muted hover:text-foreground' : 'text-white/80 hover:text-white'}`}
                >
                  {item.name}
                </Link>
              ))}
          </div>

          {/* Right: Theme Toggle + Auth / Profile */}
          <div className="flex items-center justify-end gap-4 w-auto">

            <button
               onClick={triggerTestToast}
               className="text-xs px-2 py-1 bg-gray-500/20 rounded border border-gray-500/30 text-muted hover:text-foreground"
            >
              Test Alert
            </button>
            
            {/* Theme Toggle Switch */}
            <button
              onClick={toggleTheme}
              className="relative w-14 h-8 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 bg-tertiary shadow-inner"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            >
              {/* Toggle Circle */}
              <div
                className="absolute top-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-md bg-background"
                style={{
                  left: isDark ? '4px' : 'calc(100% - 28px)',
                }}
              >
                {isDark ? (
                  // Moon icon
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                  </svg>
                ) : (
                  // Sun icon
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-500">
                    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                  </svg>
                )}
              </div>
            </button>

            {loading ? (
              // Loading state - show skeleton
              <div className="w-24 h-10 rounded-lg animate-pulse bg-tertiary"></div>
            ) : isAuthenticated ? (
              // Logged in - show Profile and Logout buttons
              <>
                <Link 
                  href="/profile" 
                  className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-red-600 text-red-600 hover:text-white text-sm font-bold rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                  </svg>
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className={`flex items-center gap-2 px-4 py-2.5 border text-sm font-medium rounded-lg transition-all ${isDark ? 'bg-tertiary border-border text-muted hover:text-foreground' : 'bg-white/10 border-white/20 text-white hover:bg-white/30'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              // Not logged in - show Login and Register
              <>
                <Link 
                  href="/login" 
                  className={`flex items-center gap-2 text-sm font-medium transition-colors group ${isDark ? 'text-muted hover:text-foreground' : 'text-white/80 hover:text-white'}`}
                >
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

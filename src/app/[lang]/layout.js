import { Geist, Geist_Mono, Cairo } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import NotificationCenter from "@/components/NotificationCenter";
import { Toaster } from "sonner";
import ChatWidget from "@/app/[lang]/components/ChatWidget";
import "../globals.css";
import { getDictionary } from "@/lib/get-dictionary";
import { i18n } from "@/i18n-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata = {
  title: {
    default: "Reps Egypt | Digital Solutions Platform",
    template: "%s | Reps Egypt",
  },
  description: "Reps Egypt is a cutting-edge digital solutions platform empowering businesses with innovative technology and seamless user experiences.",
  icons: {
    icon: '/logo.png',
  },
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const isRTL = lang === 'ar';

  return (
    <html lang={lang} dir={isRTL ? "rtl" : "ltr"} className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} antialiased bg-background text-foreground ${isRTL ? 'font-cairo' : 'font-sans'}`}
      >
        <Providers>
          <Navbar dictionary={dictionary.navbar} lang={lang} />
          <NotificationCenter lang={lang} content={dictionary.profile_page} />
          <div className="fixed z-[9999]">
             <Toaster position="bottom-right" theme="dark" richColors closeButton />
          </div>
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <ChatWidget />
          <Footer dictionary={dictionary} lang={lang} />
        </Providers>
      </body>
    </html>
  );
}

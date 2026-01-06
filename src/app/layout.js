import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Reps Egypt | Digital Solutions Platform",
    template: "%s | Reps Egypt",
  },
  description: "Reps Egypt is a cutting-edge digital solutions platform empowering businesses with innovative technology and seamless user experiences.",
  keywords: ["Reps Egypt", "digital solutions", "technology", "platform", "innovation"],
  authors: [{ name: "Reps Egypt Team" }],
  creator: "Reps Egypt",
  publisher: "Reps Egypt",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Reps Egypt | Digital Solutions Platform",
    description: "Reps Egypt is a cutting-edge digital solutions platform empowering businesses with innovative technology.",
    url: "/",
    siteName: "Reps Egypt",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reps Egypt | Digital Solutions Platform",
    description: "Reps Egypt is a cutting-edge digital solutions platform empowering businesses with innovative technology.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

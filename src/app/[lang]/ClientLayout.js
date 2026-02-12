"use client";

import dynamic from "next/dynamic";

// Dynamically import ChatWidget with no SSR to avoid hydration mismatch
const ChatWidget = dynamic(
  () => import("@/app/[lang]/components/ChatWidget"),
  { ssr: false }
);

export default function ClientLayout({ children, dictionary, userRole }) {
  return (
    <>
      <main className="min-h-screen pt-20">
        {children}
      </main>
      <ChatWidget config={dictionary?.chatbot} userRole={userRole} />
    </>
  );
}

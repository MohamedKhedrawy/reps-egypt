"use client";

export default function ProfileTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex gap-8 border-b border-border/50 pl-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
            <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap px-2 ${
                    activeTab === tab 
                        ? "text-red-500" 
                        : "text-muted hover:text-foreground"
                }`}
            >
                {tab}
                {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 rounded-t-full shadow-[0_-2px_10px_rgba(220,38,38,0.5)]" />
                )}
            </button>
        ))}
    </div>
  );
}

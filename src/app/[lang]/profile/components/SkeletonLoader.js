"use client";

export default function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Skeleton */}
      <div className="h-80 w-full bg-secondary/30 animate-pulse rounded-b-3xl relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full max-w-7xl mx-auto px-6 pb-8 flex items-end gap-6">
            <div className="w-40 h-40 rounded-full bg-tertiary border-4 border-background" />
            <div className="flex-1 mb-4 space-y-3">
                <div className="h-10 w-64 bg-tertiary rounded-lg" />
                <div className="h-6 w-96 bg-tertiary/50 rounded-lg" />
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 grid lg:grid-cols-3 gap-8">
        {/* Sidebar Skeleton */}
        <div className="space-y-6">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-secondary/30 rounded-2xl animate-pulse" />
            ))}
        </div>

        {/* content Skeleton */}
        <div className="lg:col-span-2 space-y-8">
            <div className="flex gap-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-10 w-24 bg-secondary/30 rounded-lg animate-pulse" />
                ))}
            </div>
            <div className="h-96 bg-secondary/30 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

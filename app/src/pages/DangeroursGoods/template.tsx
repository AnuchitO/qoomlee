"use client";

import { useEffect, useState } from "react";

function Skeleton({ className }: { className: string }) {
  return (
    <div className={`bg-gray-200 rounded-lg animate-pulse ${className}`} />
  );
}

function RuleSkeleton() {
  return (
    <div className="min-h-screen bg-blue-50 font-sans flex flex-col">
      {/* Top bar */}
      <div className="px-6 pt-5 pb-0">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <Skeleton className="w-5 h-5 mt-0.5 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="w-16 h-3.5" />
              <Skeleton className="w-24 h-3" />
            </div>
          </div>
          <Skeleton className="w-14 h-3 mt-0.5" />
        </div>
        <div className="w-full h-1 bg-blue-100 rounded-full">
          <div className="h-1 bg-blue-200 rounded-full animate-pulse" style={{ width: "80%" }} />
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 px-6 pt-6 pb-4">
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-lg mx-auto">
          {/* Title */}
          <Skeleton className="w-32 h-6 mb-2" />
          <Skeleton className="w-64 h-4 mb-5" />

          {/* Rule cards */}
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl border-2 border-gray-100 bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <Skeleton className="w-5 h-5 flex-shrink-0 mt-0.5 rounded" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Skeleton className="w-5 h-5 rounded flex-shrink-0" />
                      <Skeleton className="w-36 h-4" />
                    </div>
                    <Skeleton className="w-full h-3 mb-1.5" />
                    <Skeleton className="w-full h-3 mb-1.5" />
                    <Skeleton className="w-3/4 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Accept all */}
          <div className="mt-4 flex justify-end">
            <Skeleton className="w-24 h-7 rounded-full" />
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="px-6 pb-8">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Skeleton className="flex-1 h-14 rounded-2xl" />
          <Skeleton className="flex-1 h-14 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export default function RuleTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setLoading(false);
      // Trigger slide-in animation on the next frame after skeleton unmounts
    }, 2000);

    return () => clearTimeout(loadTimer);
  }, []);

  if (loading) return <RuleSkeleton />;

  return (
    <div>
      {children}
    </div>
  );
}

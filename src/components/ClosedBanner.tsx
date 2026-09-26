import React from "react";

export interface ClosedBannerProps {
  nextOpening?: string;
}

export function ClosedBanner({
  nextOpening = "Tuesday at 08:00",
}: ClosedBannerProps) {
  return (
    <aside
      aria-label="Closure notification"
      className="my-8 p-5 sm:p-6 rounded-2xl bg-[#131520] border-2 border-amber-500/50 shadow-2xl shadow-amber-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white transition-all animate-fade-in-rise print:hidden"
    >
      <div className="flex items-start sm:items-center gap-4 flex-1">
        <div
          className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400"
          aria-hidden="true"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div>
          <p className="font-serif text-lg sm:text-xl font-medium text-white leading-snug">
            We&apos;re closed today (Rest &amp; Roasting) — back{" "}
            <span className="text-amber-400 font-bold">{nextOpening}</span>
          </p>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Sourcing fresh Portuguese produce. Explore our complete brunch and specialty coffee menu below!
          </p>
        </div>
      </div>

      <a
        href="#hours"
        className="min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 shadow-md transition-all shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <span>View Hours &rarr;</span>
      </a>
    </aside>
  );
}

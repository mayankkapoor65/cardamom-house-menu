import React from "react";
import { Restaurant } from "@/lib/types";

export interface HeroProps {
  restaurant: Restaurant;
  isOpen: boolean;
  statusMessage?: string;
  nowFormatted: string;
}

export function Hero({
  restaurant,
  isOpen,
  statusMessage,
  nowFormatted,
}: HeroProps) {
  return (
    <header className="relative pt-12 pb-14 sm:pt-16 sm:pb-20 border-b border-white/10 warm-ambient-glow animate-fade-in-rise">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Top Eyebrow: Live State Badge & Neighborhood Heritage Marker */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Live Status Pill */}
          <div
            className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              isOpen
                ? "bg-[#0c2216] border-emerald-500/40 text-emerald-300 shadow-sm shadow-emerald-950/40"
                : "bg-[#1E1915] border-stone-700 text-stone-300"
            }`}
            role="status"
            aria-live="polite"
          >
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              {isOpen && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isOpen ? "bg-emerald-400" : "bg-stone-500"
                }`}
              />
            </span>
            <span className="tracking-wider uppercase text-[11px]">
              {isOpen ? "Open Now · Serving Brunch" : "Closed Today"}
            </span>
            <span
              suppressHydrationWarning
              className="text-amber-500/80 text-[11px] font-mono border-l border-white/15 pl-2"
            >
              {nowFormatted} (Lisbon)
            </span>
          </div>

          {/* Coordinates and District */}
          <div className="text-right text-xs font-mono tracking-wider hidden sm:block">
            <div className="text-stone-300 font-bold uppercase tracking-widest text-[11px]">
              Rua da Boavista 84
            </div>
            <div className="text-stone-400 text-[10px]">
              Santos &amp; Bica Quarter · Lisboa
            </div>
          </div>
        </div>

        {/* Café Name */}
        <h1 className="font-serif text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[1.06] mb-4 text-[#FAF5ED] break-words">
          Cardamom{" "}
          <span className="italic font-normal bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
            House
          </span>
        </h1>

        {/* Tagline */}
        <p className="font-serif italic text-base sm:text-xl text-stone-300 max-w-2xl leading-relaxed mb-7 sm:mb-8">
          {restaurant.tagline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 print:hidden">
          <a
            href="#menu-sections"
            className="min-h-[48px] inline-flex items-center justify-center px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 active:scale-[0.98] touch-manipulation text-white shadow-lg shadow-amber-950/60 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#110E0C]"
          >
            Explore All-Day Menu
          </a>

          <a
            href="#special"
            className="min-h-[48px] inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1C1713] hover:bg-[#251E19] active:scale-[0.98] touch-manipulation border border-amber-500/30 text-amber-200 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#110E0C]"
          >
            Chef&apos;s Special
          </a>
        </div>
      </div>
    </header>
  );
}

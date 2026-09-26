import React from "react";
import { MenuItem, TodaySpecial } from "@/lib/types";

export interface TodaySpecialCalloutProps {
  special: TodaySpecial;
  item?: MenuItem;
  isSoldOut: boolean;
}

export function TodaySpecialCallout({
  special,
  item,
  isSoldOut,
}: TodaySpecialCalloutProps) {
  return (
    <aside
      id="special"
      aria-label="Today's Special feature"
      className="scroll-mt-28 my-10 animate-fade-in-rise"
    >
      {/* Section Eyebrow & Headline */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 mb-1">
          <span aria-hidden="true">★</span>
          <span>Chef&apos;s Daily Board</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FAF5ED] font-medium tracking-tight">
          The plate we&apos;re proud of this morning.
        </h2>
      </div>

      {/* Featured Spiced Atelier Card */}
      <div
        className={`relative rounded-3xl p-6 sm:p-8 transition-all overflow-hidden border ${
          isSoldOut
            ? "bg-[#16120E] border-white/10 text-stone-300"
            : "bg-[#181410] border-amber-600/35 shadow-2xl shadow-amber-950/40 text-white"
        }`}
      >
        {/* Subtle ambient warm saffron glow */}
        <div
          className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
            isSoldOut ? "bg-stone-800/20" : "bg-amber-600/10"
          }`}
          aria-hidden="true"
        />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1">
            {/* Tag Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3.5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 border border-amber-500/40 text-amber-300">
                Chef&apos;s Pick
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-950/70 border border-emerald-500/40 text-emerald-300">
                Vegetarian
              </span>
              {isSoldOut && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-950/70 border border-rose-500/40 text-rose-300">
                  Sold Out
                </span>
              )}
            </div>

            {/* Title & Price Header */}
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h3
                className={`font-serif text-2xl sm:text-3xl font-medium tracking-tight ${
                  isSoldOut ? "line-through text-stone-500" : "text-[#FAF5ED]"
                }`}
              >
                {item?.name || "Saffron French Toast"}
              </h3>
              <span
                className={`font-mono text-xl sm:text-2xl font-bold tabular-nums ${
                  isSoldOut ? "line-through text-stone-600" : "text-amber-400"
                }`}
              >
                €{item?.price.toFixed(2) || "12.80"}
              </span>
            </div>

            {/* Description */}
            {item?.description && (
              <p
                className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
                  isSoldOut ? "text-stone-500" : "text-stone-300"
                }`}
              >
                {item.description}
              </p>
            )}

            {/* Chef's Blurb Quote */}
            <div className="mt-4 pt-3.5 border-t border-white/10 flex items-start gap-2 text-xs sm:text-sm text-stone-400 font-serif italic">
              <span className="text-amber-500 not-italic font-bold" aria-hidden="true">
                —
              </span>
              <span>{special.blurb}</span>
            </div>
          </div>

          {/* Right Action / Availability Status */}
          <div className="lg:w-56 shrink-0 flex flex-col items-start lg:items-end justify-center border-t lg:border-t-0 pt-4 lg:pt-0 border-white/10">
            {isSoldOut ? (
              <div className="w-full text-center lg:text-right">
                <span className="inline-block w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#221B16] border border-white/10 text-stone-400 mb-2">
                  Sold Out for Today
                </span>
                <p className="text-[11px] text-stone-500">
                  Fresh batch baked tomorrow at 08:00
                </p>
              </div>
            ) : (
              <div className="w-full text-center lg:text-right">
                <span className="inline-block w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500/15 border border-amber-500/40 text-amber-300 mb-2 shadow-xs">
                  Available This Morning
                </span>
                <p className="text-[11px] text-stone-400">
                  Baked fresh daily · Limited batch
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

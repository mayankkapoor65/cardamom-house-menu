import React from "react";
import { MenuItem } from "@/lib/types";

export interface MenuItemRowProps {
  item: MenuItem;
  soldOut?: boolean;
}

export function MenuItemRow({ item, soldOut = false }: MenuItemRowProps) {
  return (
    <li
      className={`group list-none rounded-2xl p-4 sm:p-6 transition-all border flex flex-col justify-between touch-manipulation ${
        soldOut
          ? "bg-[#14100D]/60 border-white/5 opacity-45 select-none cursor-not-allowed"
          : "bg-[#181410] hover:bg-[#1E1914] active:bg-[#221C16] border-amber-900/25 hover:border-amber-500/40 shadow-md hover:shadow-xl hover:shadow-amber-950/30"
      }`}
      aria-disabled={soldOut ? "true" : undefined}
    >
      <div>
        {/* Name and Price Header */}
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3
            className={`font-serif text-lg sm:text-xl font-medium tracking-tight ${
              soldOut
                ? "line-through text-stone-500"
                : "text-[#FAF5ED] group-hover:text-amber-300 transition-colors"
            }`}
          >
            {item.name}
          </h3>

          <div className="flex items-center gap-2 shrink-0">
            {soldOut && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-950/70 border border-rose-500/40 text-rose-300">
                Sold Out
              </span>
            )}
            <span
              className={`font-mono text-base sm:text-lg font-bold tabular-nums ${
                soldOut ? "line-through text-stone-600" : "text-amber-400"
              }`}
            >
              €{item.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Description */}
        {item.description && (
          <p
            className={`text-xs sm:text-sm leading-relaxed mb-4 ${
              soldOut ? "text-stone-500" : "text-stone-300"
            }`}
          >
            {item.description}
          </p>
        )}
      </div>

      {/* Dietary Tags Row */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-2">
          {item.tags.map((tag) => {
            if (tag === "V") {
              return (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
                >
                  <span aria-hidden="true">🌿</span>
                  <span>Vegetarian</span>
                </span>
              );
            }
            if (tag === "GF") {
              return (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-950/60 border border-amber-500/40 text-amber-300"
                >
                  <span aria-hidden="true">🌾</span>
                  <span>Gluten Free</span>
                </span>
              );
            }
            if (tag === "spicy") {
              return (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-950/60 border border-rose-500/40 text-rose-300"
                >
                  <span aria-hidden="true">🌶</span>
                  <span>Spicy</span>
                </span>
              );
            }
            return null;
          })}
        </div>
      )}
    </li>
  );
}

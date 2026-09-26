"use client";

import React from "react";

export type DietaryFilterValue = "all" | "V" | "GF";

export interface DietaryFilterProps {
  currentFilter: DietaryFilterValue;
  onFilterChange: (filter: DietaryFilterValue) => void;
  counts?: {
    all: number;
    V: number;
    GF: number;
  };
}

const FILTER_OPTIONS: {
  value: DietaryFilterValue;
  label: string;
  dotColor?: string;
}[] = [
  { value: "all", label: "All Items" },
  { value: "V", label: "Vegetarian", dotColor: "bg-emerald-600" },
  { value: "GF", label: "Gluten-Free", dotColor: "bg-amber-600" },
];

export function DietaryFilter({
  currentFilter,
  onFilterChange,
  counts,
}: DietaryFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filter menu by dietary preference"
      className="my-5 flex flex-wrap items-center gap-2 print:hidden"
    >
      <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold mr-1">
        Filter:
      </span>

      <div className="inline-flex p-1 rounded-xl bg-stone-200/70 border border-stone-200 gap-1">
        {FILTER_OPTIONS.map((opt) => {
          const isSelected = currentFilter === opt.value;
          const count = counts ? counts[opt.value] : null;

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onFilterChange(opt.value)}
              aria-pressed={isSelected}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 ${
                isSelected
                  ? "bg-white text-stone-900 shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/50"
              }`}
            >
              {opt.dotColor && (
                <span
                  className={`w-1.5 h-1.5 rounded-full ${opt.dotColor}`}
                  aria-hidden="true"
                />
              )}
              <span>{opt.label}</span>
              {count !== null && (
                <span
                  className={`text-[11px] tabular-nums px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? "bg-stone-100 text-stone-800"
                      : "bg-stone-300/60 text-stone-600"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import { MenuCategory } from "@/lib/types";
import { useScrollSpy } from "@/lib/useScrollSpy";
import { DietaryFilterValue } from "./DietaryFilter";

export interface CategoryNavProps {
  categories: MenuCategory[];
  activeIdOverride?: string;
  currentFilter?: DietaryFilterValue;
  onFilterChange?: (filter: DietaryFilterValue) => void;
  className?: string;
}

const FILTER_ITEMS: { value: DietaryFilterValue; label: string; icon?: string }[] = [
  { value: "all", label: "All Items" },
  { value: "V", label: "Vegetarian", icon: "🌿" },
  { value: "GF", label: "Gluten-Free", icon: "🌾" },
];

export function CategoryNav({
  categories,
  activeIdOverride,
  currentFilter = "all",
  onFilterChange,
  className = "",
}: CategoryNavProps) {
  const allSectionIds = [...categories.map((c) => c.id), "hours"];
  const detectedActiveId = useScrollSpy(allSectionIds, categories[0]?.id || "brunch");
  const activeId = activeIdOverride ?? detectedActiveId;
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  // Auto-center active tab on mobile scroll
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeId]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Menu category and filter navigation"
      className={`sticky top-0 z-30 bg-[#110E0C]/95 backdrop-blur-md border-y border-amber-900/30 py-2.5 transition-colors print:hidden ${className}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2.5">
        {/* Left: Category Anchor Links with smooth horizontal mobile scroll */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 touch-pan-x overscroll-x-contain -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((category) => {
            const isActive = category.id === activeId;
            return (
              <a
                key={category.id}
                ref={isActive ? activeRef : null}
                href={`#${category.id}`}
                onClick={(e) => handleLinkClick(e, category.id)}
                aria-current={isActive ? "true" : undefined}
                className={`min-h-[44px] shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center active:scale-95 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#110E0C] ${
                  isActive
                    ? "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white shadow-md shadow-amber-950/50"
                    : "text-stone-300 hover:text-white hover:bg-white/5 active:bg-white/10"
                }`}
              >
                <span>{category.name}</span>
              </a>
            );
          })}

          {/* Hours & Location Link */}
          <a
            href="#hours"
            onClick={(e) => handleLinkClick(e, "hours")}
            aria-current={activeId === "hours" ? "true" : undefined}
            className={`min-h-[44px] shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center active:scale-95 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#110E0C] ${
              activeId === "hours"
                ? "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white shadow-md shadow-amber-950/50"
                : "text-stone-300 hover:text-white hover:bg-white/5 active:bg-white/10"
            }`}
          >
            <span>Hours &amp; Location</span>
          </a>
        </div>

        {/* Right: Dietary Filter Segmented Pills */}
        {onFilterChange && (
          <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-white/10 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <span className="text-[11px] uppercase tracking-widest text-amber-500/80 font-bold shrink-0">
              Filter:
            </span>
            <div className="flex items-center gap-1.5 shrink-0 py-0.5">
              {FILTER_ITEMS.map((item) => {
                const isSelected = currentFilter === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => onFilterChange(item.value)}
                    aria-pressed={isSelected}
                    className={`min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-medium transition-all inline-flex items-center gap-1.5 active:scale-95 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      isSelected
                        ? "bg-amber-600 text-white font-bold shadow-xs"
                        : "bg-[#1A1612] hover:bg-[#241F1A] border border-amber-900/30 text-stone-300 hover:text-white active:bg-white/10"
                    }`}
                  >
                    {item.icon && <span aria-hidden="true">{item.icon}</span>}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export function CategorySidebarNav({
  categories,
  activeIdOverride,
}: CategoryNavProps) {
  const allSectionIds = [...categories.map((c) => c.id), "hours"];
  const detectedActiveId = useScrollSpy(allSectionIds, categories[0]?.id || "brunch");
  const activeId = activeIdOverride ?? detectedActiveId;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Menu categories sidebar"
      className="hidden lg:block sticky top-8 space-y-1.5 py-4 pr-6 print:hidden"
    >
      <div className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-3 px-3">
        Menu Categories
      </div>
      <ul className="space-y-1">
        {categories.map((category) => {
          const isActive = category.id === activeId;
          return (
            <li key={category.id}>
              <a
                href={`#${category.id}`}
                onClick={(e) => handleLinkClick(e, category.id)}
                aria-current={isActive ? "true" : undefined}
                className={`min-h-[44px] group flex items-center justify-between px-3.5 py-2.5 text-xs uppercase tracking-wider rounded-xl border-l-4 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isActive
                    ? "border-amber-500 text-amber-300 font-bold bg-amber-500/10 shadow-xs"
                    : "border-transparent text-stone-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{category.name}</span>
                <span
                  className={`text-[11px] tabular-nums px-2 py-0.5 rounded-full font-mono ${
                    isActive
                      ? "bg-amber-500/20 text-amber-300 font-bold"
                      : "text-stone-400 bg-white/5"
                  }`}
                >
                  {category.items.length}
                </span>
              </a>
            </li>
          );
        })}
        <li>
          <a
            href="#hours"
            onClick={(e) => handleLinkClick(e, "hours")}
            aria-current={activeId === "hours" ? "true" : undefined}
            className={`min-h-[44px] group flex items-center justify-between px-3.5 py-2.5 text-xs uppercase tracking-wider rounded-xl border-l-4 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              activeId === "hours"
                ? "border-amber-500 text-amber-300 font-bold bg-amber-500/10 shadow-xs"
                : "border-transparent text-stone-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>Hours &amp; Location</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

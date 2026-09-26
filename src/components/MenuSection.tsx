import React from "react";
import { MenuCategory, MenuItem } from "@/lib/types";
import { MenuItemRow } from "./MenuItemRow";

export interface MenuSectionProps {
  category: MenuCategory;
  index?: number;
  soldOutItemId?: string;
  items?: MenuItem[];
}

export function MenuSection({
  category,
  index = 0,
  soldOutItemId,
  items,
}: MenuSectionProps) {
  const headingId = `heading-${category.id}`;
  const displayItems = items ?? category.items;

  if (displayItems.length === 0) {
    return null;
  }

  const indexFormatted = String(index + 1).padStart(2, "0");

  return (
    <section
      id={category.id}
      aria-labelledby={headingId}
      className="scroll-mt-28 py-10 sm:py-12 border-b border-white/10 last:border-b-0 animate-fade-in-rise"
    >
      {/* Category Number & Title matching reference */}
      <div className="mb-6">
        <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-1 font-mono">
          {indexFormatted} / CATEGORY
        </div>

        <h2
          id={headingId}
          className="font-serif text-3xl sm:text-4xl text-white font-semibold tracking-wider uppercase"
        >
          {category.name}
        </h2>

        {category.description && category.description.trim().length > 0 && (
          <p className="text-xs sm:text-sm text-stone-400 mt-1.5 leading-relaxed">
            {category.description}
          </p>
        )}
      </div>

      {/* 2-Column Responsive Card Grid matching reference */}
      <ul
        role="list"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 p-0 m-0"
      >
        {displayItems.map((item) => (
          <MenuItemRow
            key={item.id}
            item={item}
            soldOut={item.id === soldOutItemId}
          />
        ))}
      </ul>
    </section>
  );
}

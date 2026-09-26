"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { menuData } from "@/lib/data";
import { parseViewState, getStateConfig } from "@/lib/state";
import { StateSwitcher } from "./StateSwitcher";
import { Hero } from "./Hero";
import { ClosedBanner } from "./ClosedBanner";
import { TodaySpecialCallout } from "./TodaySpecialCallout";
import { CategoryNav } from "./CategoryNav";
import { DietaryFilterValue } from "./DietaryFilter";
import { MenuSection } from "./MenuSection";
import { HoursTable } from "./HoursTable";
import { Footer } from "./Footer";

export function MenuPageClient() {
  const searchParams = useSearchParams();
  const rawState = searchParams.get("state");
  const viewState = parseViewState(rawState);
  const stateConfig = getStateConfig(viewState);

  // Client dietary filter state ("all" | "V" | "GF")
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilterValue>("all");

  // Filter items for each category according to active dietary filter
  const filteredCategories = useMemo(() => {
    if (dietaryFilter === "all") return menuData.categories;
    return menuData.categories.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => item.tags?.includes(dietaryFilter)),
    }));
  }, [dietaryFilter]);

  // Match today_special item_id with MenuItem object
  const specialItem = useMemo(() => {
    return menuData.categories
      .flatMap((cat) => cat.items)
      .find((item) => item.id === menuData.today_special.item_id);
  }, []);

  // Determine if today's special item should be marked sold out
  const soldOutItemId = stateConfig.isSpecialSoldOut
    ? menuData.today_special.item_id
    : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-[#110E0C] text-[#FAF5ED] print:bg-white print:text-black">
      {/* Accessible Skip to Menu Link (visible on focus, hidden on print) */}
      <a
        href="#menu-sections"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-5 focus:py-2.5 focus:bg-amber-600 focus:text-white focus:font-bold focus:shadow-2xl focus:rounded-xl focus:ring-2 focus:ring-amber-300 focus:outline-none print:hidden text-xs uppercase tracking-wider"
      >
        Skip to menu
      </a>

      {/* Clock Mode Bar (Real-Time vs Simulation) */}
      <StateSwitcher currentState={viewState} />

      {/* Hero Section */}
      <Hero
        restaurant={menuData.restaurant}
        isOpen={stateConfig.isOpen}
        statusMessage={stateConfig.statusMessage}
        nowFormatted={stateConfig.now.formatted}
      />

      {/* Sticky Navigation & Dietary Filter Bar */}
      <CategoryNav
        categories={menuData.categories}
        currentFilter={dietaryFilter}
        onFilterChange={setDietaryFilter}
      />

      {/* Main Container */}
      <main id="main-content" tabIndex={-1} className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 print:px-0">
        {/* Closed Banner (only shown when closed) */}
        {!stateConfig.isOpen && (
          <ClosedBanner nextOpening={stateConfig.nextOpening} />
        )}

        {/* Today's Special Featured Card */}
        <TodaySpecialCallout
          special={menuData.today_special}
          item={specialItem}
          isSoldOut={stateConfig.isSpecialSoldOut}
        />

        {/* Menu Sections (Brunch, Sandwiches & Toasties, Drinks, Sides & Extras) */}
        <div id="menu-sections">
          {filteredCategories.map((category, index) => (
            <MenuSection
              key={category.id}
              category={category}
              index={index}
              items={category.items}
              soldOutItemId={soldOutItemId}
            />
          ))}
        </div>

        {/* Weekly Hours Table & Visit Us Lisbon Card */}
        <HoursTable
          hours={menuData.restaurant.hours}
          currentDay={stateConfig.now.day}
        />
      </main>

      {/* Footer with Integrated Demo Switcher & Back to Top */}
      <Footer
        restaurant={menuData.restaurant}
        currentState={viewState}
      />
    </div>
  );
}

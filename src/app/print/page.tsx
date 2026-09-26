"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { menuData } from "@/lib/data";

export default function PrintMenuPage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  useEffect(() => {
    // Check if auto-print was requested via query param
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("auto") === "true") {
        const timer = setTimeout(() => {
          window.print();
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 py-6 px-4 sm:px-6 print:p-0 print:bg-white">
      {/* Top Floating Action Bar (Hidden on print) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 bg-stone-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-xl print:hidden">
        <Link
          href="/"
          className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider transition-all active:scale-95 touch-manipulation"
        >
          <span aria-hidden="true">←</span>
          <span>Back to Café</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-xs text-stone-300 hidden sm:inline">
            A4 Print-Ready Menu Sheet
          </span>
          <button
            type="button"
            onClick={handlePrint}
            className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 touch-manipulation"
          >
            <span aria-hidden="true">🖨️</span>
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet Container */}
      <main className="max-w-4xl mx-auto bg-white p-6 sm:p-12 rounded-3xl shadow-sm border border-stone-200 print:border-none print:shadow-none print:p-0">
        {/* Header */}
        <header className="border-b-2 border-stone-900 pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-1">
              Cardamom House
            </h1>
            <p className="font-serif italic text-sm text-stone-600">
              {menuData.restaurant.tagline}
            </p>
          </div>
          <div className="text-xs font-mono text-stone-600 text-center sm:text-right space-y-0.5">
            <div>{menuData.restaurant.address}</div>
            <div>
              Tel: {menuData.restaurant.phone} · IG: {menuData.restaurant.instagram}
            </div>
            <div className="font-bold text-stone-900">
              Tue–Fri: 08:00–15:00/16:00 · Sat–Sun: 09:00–17:00 (Mon Closed)
            </div>
          </div>
        </header>

        {/* Chef's Daily Special Callout */}
        <div className="border border-stone-300 rounded-xl p-4 mb-8 bg-stone-50">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-amber-800 mb-1">
            <span>★</span>
            <span>Today&apos;s Featured Special</span>
          </div>
          <div className="font-serif text-lg font-bold text-stone-900">
            Saffron &amp; Orange Blossom French Toast — €12.50
          </div>
          <p className="text-xs text-stone-600 mt-1">
            Thick brioche soaked in saffron custard, whipped mascarpone, pistachio crumb, warm cardamom syrup.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-8">
          {menuData.categories.map((category) => (
            <section key={category.id} className="break-inside-avoid">
              <h2 className="font-serif text-xl font-bold uppercase tracking-wider text-stone-900 border-b border-stone-300 pb-1.5 mb-3 flex items-center justify-between">
                <span>{category.name}</span>
                <span className="text-xs font-mono font-normal text-stone-500">
                  {category.items.length} items
                </span>
              </h2>

              {category.description && (
                <p className="text-xs text-stone-500 italic mb-3">
                  {category.description}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-stone-100 pb-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-serif font-bold text-stone-900 text-sm">
                          {item.name}
                        </span>
                        <span className="font-mono font-bold text-stone-900 text-sm">
                          €{item.price.toFixed(2)}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-stone-600 mt-0.5 leading-snug">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-stone-100 border border-stone-200 text-stone-700 font-mono"
                          >
                            {tag === "V"
                              ? "Vegetarian"
                              : tag === "GF"
                              ? "Gluten-Free"
                              : tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer Note */}
        <footer className="mt-10 pt-4 border-t border-stone-300 text-center text-xs text-stone-500 font-mono">
          Cardamom House Lisboa · All prices include VAT at the legal rate · Kitchen operates continuously until closing
        </footer>
      </main>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Restaurant } from "@/lib/types";
import { ViewState } from "@/lib/state";
import { MobileAccessModal } from "./MobileAccessModal";
import { ThemeToggle } from "./ThemeToggle";

export interface FooterProps {
  restaurant: Restaurant;
  currentState?: ViewState;
}

export function Footer({ restaurant, currentState = "live" }: FooterProps) {
  const cleanPhone = restaurant.phone.replace(/\s+/g, "");
  const instagramHandle = restaurant.instagram.replace(/^@/, "");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-20 pt-16 pb-12 border-t border-amber-900/30 text-xs sm:text-sm text-stone-400 bg-[#0C0A08] print:bg-white print:text-black print:mt-6 print:pt-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Top 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Col 1: Identity & Description (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wider uppercase text-[#FAF5ED]">
              {restaurant.name}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans max-w-sm">
              Slow brunch. Strong coffee. House-baked brioche, sourdough toasties, and specialty single-origin coffee in Santos / Bica, Lisbon.
            </p>
            <div className="pt-2 text-[11px] font-mono text-stone-400 leading-relaxed">
              <div>Rua da Boavista 84, 1200-066 Lisboa, Portugal</div>
              <div className="text-amber-500/80">
                38.7083° N, 9.1484° W · Santos &amp; Bica Quarter
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-amber-500 mb-2">
              Navigation
            </div>
            <ul className="space-y-2 text-xs uppercase tracking-wider font-semibold">
              <li>
                <a
                  href="#brunch"
                  className="text-stone-300 hover:text-amber-400 transition-colors"
                >
                  Brunch Menu
                </a>
              </li>
              <li>
                <a
                  href="#sandwiches"
                  className="text-stone-300 hover:text-amber-400 transition-colors"
                >
                  Sandwiches &amp; Toasties
                </a>
              </li>
              <li>
                <a
                  href="#drinks"
                  className="text-stone-300 hover:text-amber-400 transition-colors"
                >
                  Coffee &amp; Drinks
                </a>
              </li>
              <li>
                <a
                  href="#special"
                  className="text-stone-300 hover:text-amber-400 transition-colors"
                >
                  Today&apos;s Special
                </a>
              </li>
              <li>
                <a
                  href="#hours"
                  className="text-stone-300 hover:text-amber-400 transition-colors"
                >
                  Hours &amp; Location
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Service (4 cols) */}
          <div className="md:col-span-4 space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-amber-500 mb-2">
              Contact &amp; Service
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-stone-400 mr-2">Phone:</span>
                <a
                  href={`tel:${cleanPhone}`}
                  className="font-mono text-stone-200 hover:text-amber-400 transition-colors"
                >
                  {restaurant.phone}
                </a>
              </div>
              <div>
                <span className="text-stone-400 mr-2">Instagram:</span>
                <a
                  href={`https://instagram.com/${instagramHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-200 hover:text-amber-400 transition-colors font-medium"
                >
                  {restaurant.instagram}
                </a>
              </div>
              <div className="pt-2 text-stone-300 text-[11px] leading-relaxed">
                <span className="text-amber-500/90 font-semibold block">Weekly Kitchen Hours:</span>
                Tuesday – Friday: 08:00 – 15:00 / 16:00
                <br />
                Saturday – Sunday: 09:00 – 17:00 (Monday Closed)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Mode Switcher, Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-stone-400 print:hidden">
          {/* Copyright */}
          <div>
            © {new Date().getFullYear()} Cardamom House Lisboa. Slow brunch &amp; specialty coffee.
          </div>

          {/* Real-Time & Simulation Mode Switcher */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#181410] border border-amber-900/30 text-[11px]">
            <span className="text-[10px] uppercase font-bold text-stone-400 px-2 tracking-wider">
              Mode:
            </span>
            <Link
              href="/"
              className={`px-3 py-1 rounded-full transition-all font-semibold ${
                currentState === "live" || currentState === "open"
                  ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xs"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              Live (Real-Time)
            </Link>
            <Link
              href="/?state=closed"
              className={`px-3 py-1 rounded-full transition-all font-semibold ${
                currentState === "closed"
                  ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xs"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              Simulate Closed
            </Link>
            <Link
              href="/?state=special-sold-out#special"
              className={`px-3 py-1 rounded-full transition-all font-semibold ${
                currentState === "special-sold-out"
                  ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xs"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              Special Sold Out
            </Link>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            <ThemeToggle />
            <MobileAccessModal />
            <span className="text-stone-600 hidden sm:inline">•</span>
            <a
              href="https://maps.google.com/?q=Cardamom+House+Rua+da+Boavista+84+Lisboa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold uppercase tracking-wider text-stone-300 hover:text-white transition-colors"
            >
              Maps Directions
            </a>
            <span className="text-stone-600 hidden sm:inline">•</span>
            <Link
              href="/print?auto=true"
              className="min-h-[44px] px-3 py-2 rounded-xl inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 active:scale-95 touch-manipulation transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span aria-hidden="true">🖨️</span>
              <span>Print Menu</span>
            </Link>
            <span className="text-stone-600">•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-[11px] uppercase tracking-wider hover:from-amber-500 hover:to-amber-600 transition-colors shadow-sm"
            >
              <span>Back to Top</span>
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

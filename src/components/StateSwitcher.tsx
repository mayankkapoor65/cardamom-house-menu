"use client";

import React from "react";
import Link from "next/link";
import { ViewState } from "@/lib/state";
import { MobileAccessModal } from "./MobileAccessModal";
import { ThemeToggle } from "./ThemeToggle";

interface StateSwitcherProps {
  currentState: ViewState;
}

const STATES: { id: ViewState; label: string; desc: string; hash?: string }[] = [
  { id: "live", label: "Live", desc: "Real-Time Lisbon" },
  { id: "closed", label: "Simulate Closed", desc: "Mon 10:00" },
  { id: "special-sold-out", label: "Simulate Sold Out", desc: "Special Sold Out", hash: "#special" },
];

export function StateSwitcher({ currentState }: StateSwitcherProps) {
  const activeMode = currentState === "open" ? "live" : currentState;

  return (
    <aside
      aria-label="Simulation state switcher"
      className="bg-[#0C0A08] text-stone-300 px-4 py-2 text-xs border-b border-amber-900/30 print:hidden transition-colors"
    >
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
          <span className="font-semibold text-stone-200">
            Clock Mode:
          </span>
          <span className="text-stone-400 hidden sm:inline">
            Real-time Europe/Lisbon clock + simulation toggles
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <nav aria-label="Simulated states" className="flex items-center gap-1.5 flex-wrap">
            {STATES.map((item) => {
              const isActive = activeMode === item.id;
              const href = item.id === "live" ? "/" : `/?state=${item.id}${item.hash || ""}`;

              return (
                <Link
                  key={item.id}
                  href={href}
                  onClick={() => {
                    if (item.hash) {
                      setTimeout(() => {
                        const target = document.querySelector(item.hash!);
                        if (target) {
                          target.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }, 50);
                    } else {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`min-h-[36px] px-3 py-1.5 rounded-lg transition-all font-semibold inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isActive
                      ? "bg-amber-600 text-white shadow-xs"
                      : "text-stone-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] opacity-75 ml-1.5 hidden md:inline">
                    ({item.desc})
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="border-l border-white/10 pl-2 flex items-center gap-1.5">
            <ThemeToggle />
            <div className="hidden sm:block">
              <MobileAccessModal />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

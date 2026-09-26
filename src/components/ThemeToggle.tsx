"use client";

import React, { useEffect, useState } from "react";

// Safe localStorage access helper
const safeStorage = {
  get: (key: string): string | null => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem(key);
      }
    } catch {
      // Storage restricted / private browsing
    }
    return null;
  },
  set: (key: string, value: string): void => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
      }
    } catch {
      // Storage restricted / private browsing
    }
  },
};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = safeStorage.get("cardamom-theme") as "dark" | "light" | null;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      const initial = prefersLight ? "light" : "dark";
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!safeStorage.get("cardamom-theme")) {
        const nextTheme = e.matches ? "light" : "dark";
        setTheme(nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    safeStorage.set("cardamom-theme", next);
  };

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-60 ${className}`}
      >
        <span className="w-4 h-4 rounded-full bg-white/20 inline-block" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-90 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
        isDark
          ? "bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-md shadow-amber-950/40"
          : "bg-amber-600/15 hover:bg-amber-600/25 text-amber-800 border border-amber-600/40 shadow-sm"
      } ${className}`}
    >
      {isDark ? (
        // Radiant Sun Logo (Switches to Light Mode on click)
        <svg
          className="w-5 h-5 text-amber-300 transition-transform duration-300 hover:rotate-45"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.25" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        // Crescent Moon Logo (Switches to Dark Mode on click)
        <svg
          className="w-4 h-4 text-amber-800 transition-transform duration-300 hover:-rotate-12"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

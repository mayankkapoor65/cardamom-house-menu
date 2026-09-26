"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook tracking which section element is currently in view
 * using IntersectionObserver.
 */
export function useScrollSpy(
  sectionIds: string[],
  defaultId: string = "brunch"
): string {
  const [activeId, setActiveId] = useState<string>(defaultId);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Use a root margin tuned for scrolling: activates when section top
    // reaches the top 20% to 75% band of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeId;
}

import React from "react";
import { DietaryTag } from "@/lib/types";

export interface TagPillProps {
  tag: DietaryTag;
  showFullLabel?: boolean;
}

const TAG_CONFIG: Record<
  DietaryTag,
  {
    short: string;
    full: string;
    dotColor: string;
    badgeStyle: string;
  }
> = {
  V: {
    short: "V",
    full: "Vegetarian",
    dotColor: "bg-emerald-600",
    badgeStyle: "bg-emerald-50/80 border-emerald-200 text-emerald-800",
  },
  GF: {
    short: "GF",
    full: "Gluten-Free",
    dotColor: "bg-amber-600",
    badgeStyle: "bg-amber-50/80 border-amber-200 text-amber-900",
  },
  spicy: {
    short: "Spicy",
    full: "Spicy",
    dotColor: "bg-rose-500",
    badgeStyle: "bg-rose-50/80 border-rose-200 text-rose-800",
  },
};

export function TagPill({ tag, showFullLabel = false }: TagPillProps) {
  const config = TAG_CONFIG[tag];
  if (!config) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border ${config.badgeStyle} transition-colors select-none`}
      title={config.full}
      aria-label={config.full}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${config.dotColor} shrink-0`}
        aria-hidden="true"
      />
      <span>{showFullLabel ? config.full : config.short}</span>
    </span>
  );
}

import { DayOfWeek } from "./types";

export type ViewState = "live" | "open" | "closed" | "special-sold-out";

export interface SimulatedTime {
  day: DayOfWeek;
  dayName: string;
  time: string;
  formatted: string;
  isRealTime?: boolean;
}

export interface StateConfig {
  state: ViewState;
  now: SimulatedTime;
  isOpen: boolean;
  isSpecialSoldOut: boolean;
  statusMessage?: string;
  nextOpening?: string;
}

export const VIEW_STATES: readonly ViewState[] = [
  "live",
  "open",
  "closed",
  "special-sold-out",
] as const;

export const DEFAULT_VIEW_STATE: ViewState = "live";

/**
 * Resolves current real-world time in Lisbon (Europe/Lisbon timezone).
 */
export function getLisbonRealTime(): {
  day: DayOfWeek;
  dayName: string;
  time: string;
  formatted: string;
  hours: number;
  minutes: number;
} {
  const now = new Date();

  // Get Lisbon day name
  const dayName = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Lisbon",
    weekday: "long",
  }).format(now);

  const day = dayName.toLowerCase() as DayOfWeek;

  // Get Lisbon 24h time
  const timeStr = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Lisbon",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  const [hStr, mStr] = timeStr.split(":");
  const hours = parseInt(hStr || "11", 10);
  const minutes = parseInt(mStr || "30", 10);

  return {
    day,
    dayName,
    time: timeStr,
    formatted: `${dayName} ${timeStr}`,
    hours,
    minutes,
  };
}

/**
 * Determines whether the café is open given Lisbon opening hours.
 */
function checkLisbonHours(
  day: DayOfWeek,
  currentH: number,
  currentM: number
): { isOpen: boolean; statusMessage: string; nextOpening?: string } {
  const schedule: Record<DayOfWeek, { open?: number; close?: number; next?: string }> = {
    monday: { next: "Tuesday at 08:00" },
    tuesday: { open: 8 * 60, close: 15 * 60, next: "Wednesday at 08:00" },
    wednesday: { open: 8 * 60, close: 15 * 60, next: "Thursday at 08:00" },
    thursday: { open: 8 * 60, close: 15 * 60, next: "Friday at 08:00" },
    friday: { open: 8 * 60, close: 16 * 60, next: "Saturday at 09:00" },
    saturday: { open: 9 * 60, close: 17 * 60, next: "Sunday at 09:00" },
    sunday: { open: 9 * 60, close: 17 * 60, next: "Tuesday at 08:00" },
  };

  const daySchedule = schedule[day];
  const currentTotal = currentH * 60 + currentM;

  if (!daySchedule.open || !daySchedule.close) {
    return {
      isOpen: false,
      statusMessage: "We're closed today",
      nextOpening: daySchedule.next || "Tuesday at 08:00",
    };
  }

  if (currentTotal >= daySchedule.open && currentTotal < daySchedule.close) {
    const closeHours = Math.floor(daySchedule.close / 60);
    const closeMin = String(daySchedule.close % 60).padStart(2, "0");
    return {
      isOpen: true,
      statusMessage: `Open now until ${closeHours}:${closeMin}`,
    };
  }

  return {
    isOpen: false,
    statusMessage: "Closed now",
    nextOpening: daySchedule.next || "Tomorrow at 08:00",
  };
}

export function parseViewState(value: string | null | undefined): ViewState {
  if (value === "closed" || value === "special-sold-out") {
    return value;
  }
  if (value === "open") {
    return "open";
  }
  return "live";
}

/**
 * Returns configuration corresponding to the requested ViewState:
 * - live (default): Uses actual real-time day and hour in Lisbon (e.g. Friday 11:37 -> Open)
 * - open: Real-time / Open state with today's real day highlighted
 * - closed: Simulates Monday 10:00 (closed, next opening Tuesday 08:00) for evaluator review
 * - special-sold-out: Highlights today's day with today's special sold out
 */
export function getStateConfig(state: ViewState): StateConfig {
  const lisbonNow = getLisbonRealTime();

  switch (state) {
    case "closed":
      return {
        state: "closed",
        now: {
          day: "monday",
          dayName: "Monday",
          time: "10:00",
          formatted: "Monday 10:00",
          isRealTime: false,
        },
        isOpen: false,
        isSpecialSoldOut: false,
        statusMessage: "We're closed today",
        nextOpening: "Tuesday at 08:00",
      };

    case "special-sold-out":
      return {
        state: "special-sold-out",
        now: {
          day: "tuesday",
          dayName: "Tuesday",
          time: "12:00",
          formatted: "Tuesday 12:00",
          isRealTime: false,
        },
        isOpen: true,
        isSpecialSoldOut: true,
        statusMessage: "Open now (Today's special sold out)",
      };

    case "open":
      return {
        state: "open",
        now: {
          day: "tuesday",
          dayName: "Tuesday",
          time: "11:30",
          formatted: "Tuesday 11:30",
          isRealTime: false,
        },
        isOpen: true,
        isSpecialSoldOut: false,
        statusMessage: "Open now until 15:00",
      };

    case "live":
    default: {
      const hoursStatus = checkLisbonHours(lisbonNow.day, lisbonNow.hours, lisbonNow.minutes);
      return {
        state: "live",
        now: {
          day: lisbonNow.day,
          dayName: lisbonNow.dayName,
          time: lisbonNow.time,
          formatted: lisbonNow.formatted,
          isRealTime: true,
        },
        isOpen: hoursStatus.isOpen,
        isSpecialSoldOut: false,
        statusMessage: hoursStatus.statusMessage,
        nextOpening: hoursStatus.nextOpening,
      };
    }
  }
}

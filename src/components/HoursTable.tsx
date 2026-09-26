import React from "react";
import { DayOfWeek, Hours } from "@/lib/types";

export interface HoursTableProps {
  hours: Hours;
  currentDay: DayOfWeek;
  className?: string;
}

const DAYS_ORDER: { key: DayOfWeek; label: string; note?: string }[] = [
  { key: "monday", label: "Monday", note: "Closed (Roasting & Sourcing)" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

export function HoursTable({
  hours,
  currentDay,
  className = "",
}: HoursTableProps) {
  return (
    <section
      id="hours"
      aria-labelledby="hours-heading"
      className={`scroll-mt-28 my-10 sm:my-12 rounded-3xl bg-[#181410] border border-amber-900/30 p-5 sm:p-8 shadow-2xl animate-fade-in-rise ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Service Timetable (7 cols) */}
        <div className="lg:col-span-7">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 mb-1">
              <span aria-hidden="true">★</span>
              <span>Service Timetable</span>
            </div>
            <h2
              id="hours-heading"
              className="font-serif text-2xl sm:text-3xl text-[#FAF5ED] font-medium tracking-tight"
            >
              Weekly Opening Hours
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Walk-ins warmly welcomed. Kitchen operates continuously until closing time.
            </p>
          </div>

          {/* Timetable Rows */}
          <div className="space-y-2">
            {DAYS_ORDER.map(({ key, label, note }) => {
              const value = hours[key];
              const isToday = key === currentDay;
              const isClosed = value.toLowerCase().includes("closed");

              return (
                <div
                  key={key}
                  className={`px-4 py-3 rounded-xl transition-all flex items-center justify-between border ${
                    isToday
                      ? "bg-amber-500/10 border-amber-500 shadow-md shadow-amber-950/40"
                      : "bg-[#1E1914] border-white/5 hover:border-amber-900/30"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        isToday ? "text-[#FAF5ED] font-bold" : "text-stone-300"
                      }`}
                    >
                      {label}
                    </span>
                    {isToday && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-amber-600 text-white">
                        Today
                      </span>
                    )}
                  </div>

                  <div>
                    {isClosed ? (
                      <span className="text-xs sm:text-sm font-mono text-stone-500 italic">
                        {note || "Closed"}
                      </span>
                    ) : (
                      <span
                        className={`font-mono text-xs sm:text-sm ${
                          isToday
                            ? "text-amber-400 font-bold"
                            : "text-stone-300 font-medium"
                        }`}
                      >
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Finding Us in Lisbon Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#1E1914] border border-amber-900/30 rounded-2xl p-5 sm:p-7 flex flex-col justify-between h-full shadow-lg">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-amber-500 mb-1">
              Visit Us
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#FAF5ED] font-medium mb-3">
              Our Lisbon Corner
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
              Situated on sun-washed <strong className="text-white font-semibold">Rua da Boavista 84</strong>, just a 4-minute stroll from Cais do Sodré, bordering the historic Santos and Bica neighborhoods.
            </p>

            <ul className="space-y-3 text-xs sm:text-sm mb-6 border-t border-white/10 pt-4">
              <li>
                <span className="text-amber-400 font-bold mr-2 text-[11px] uppercase">
                  Address:
                </span>
                <span className="text-stone-200">
                  Rua da Boavista 84, 1200-066 Lisboa, Portugal
                </span>
              </li>
              <li>
                <span className="text-amber-400 font-bold mr-2 text-[11px] uppercase">
                  Transit:
                </span>
                <span className="text-stone-300">
                  Tram 25E / 28E or Metro Cais do Sodré
                </span>
              </li>
              <li>
                <span className="text-amber-400 font-bold mr-2 text-[11px] uppercase">
                  Phone:
                </span>
                <a
                  href="tel:+351211234567"
                  className="font-mono text-stone-200 hover:text-amber-400 transition-colors"
                >
                  +351 21 123 4567
                </a>
              </li>
              <li>
                <span className="text-amber-400 font-bold mr-2 text-[11px] uppercase">
                  Instagram:
                </span>
                <a
                  href="https://instagram.com/cardamomhouse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-200 hover:text-amber-400 transition-colors font-medium"
                >
                  @cardamomhouse
                </a>
              </li>
            </ul>
          </div>

          <a
            href="https://maps.google.com/?q=Cardamom+House+Rua+da+Boavista+84+Lisboa"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 text-white shadow-lg shadow-amber-950/60 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Get Maps Directions
          </a>
        </div>
      </div>
    </section>
  );
}

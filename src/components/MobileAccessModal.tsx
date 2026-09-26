"use client";

import React, { useState, useEffect } from "react";

export function MobileAccessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [localIpUrl, setLocalIpUrl] = useState("http://192.168.1.36:3000");

  useEffect(() => {
    // If the window is running on a hostname, update it dynamically
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      const port = window.location.port ? `:${window.location.port}` : "";
      if (host !== "localhost" && host !== "127.0.0.1") {
        setLocalIpUrl(`http://${host}${port}`);
      }
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(localIpUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // QR Code URL using standard qr service
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    localIpUrl
  )}&bgcolor=FAF5ED&color=110E0C&margin=1`;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all active:scale-95 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        title="Open menu on your mobile phone"
      >
        <span aria-hidden="true">📱</span>
        <span>Open on Phone</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-rise"
        >
          {/* Backdrop click to dismiss */}
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-sm rounded-3xl bg-[#1A1612] border border-amber-500/30 p-6 sm:p-7 shadow-2xl text-stone-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Close dialog"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 text-2xl mb-3 border border-amber-500/30">
                📱
              </div>
              <h3
                id="mobile-modal-title"
                className="font-serif text-xl sm:text-2xl font-bold text-[#FAF5ED]"
              >
                Open on Mobile
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Connect your phone to the same Wi-Fi network and scan the QR code
                with your camera:
              </p>
            </div>

            {/* QR Code Container */}
            <div className="flex justify-center mb-5">
              <div className="p-3 bg-[#FAF5ED] rounded-2xl shadow-lg border border-amber-900/20">
                <img
                  src={qrCodeUrl}
                  alt={`QR code pointing to ${localIpUrl}`}
                  width={200}
                  height={200}
                  className="rounded-lg block"
                  loading="eager"
                />
              </div>
            </div>

            {/* URL Display & 1-Click Copy */}
            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                Local Network URL
              </label>
              <div className="flex items-center gap-2 bg-[#120E0B] p-2 rounded-xl border border-amber-900/40">
                <input
                  type="text"
                  readOnly
                  value={localIpUrl}
                  className="flex-1 bg-transparent text-xs font-mono text-stone-200 focus:outline-none px-2 select-all"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="min-h-[36px] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-600 hover:bg-amber-500 text-white transition-all shrink-0 active:scale-95"
                >
                  {copied ? "Copied! ✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* Mobile Wi-Fi Tip */}
            <p className="text-[11px] text-stone-400 text-center leading-normal">
              💡 Ensure your phone is connected to the same Wi-Fi network (or
              hotspot) as this computer.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

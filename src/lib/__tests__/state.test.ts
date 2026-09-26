import { describe, it, expect } from "vitest";
import { parseViewState, getStateConfig, getLisbonRealTime } from "../state";

describe("State & Time-Zone Domain Logic", () => {
  describe("parseViewState()", () => {
    it("correctly parses valid simulation states", () => {
      expect(parseViewState("closed")).toBe("closed");
      expect(parseViewState("special-sold-out")).toBe("special-sold-out");
      expect(parseViewState("open")).toBe("open");
      expect(parseViewState("live")).toBe("live");
    });

    it("gracefully falls back to 'live' on invalid or malformed URL query params", () => {
      expect(parseViewState(null)).toBe("live");
      expect(parseViewState(undefined)).toBe("live");
      expect(parseViewState("")).toBe("live");
      expect(parseViewState("invalid-state-123")).toBe("live");
      expect(parseViewState("<script>alert(1)</script>")).toBe("live");
    });
  });

  describe("getStateConfig()", () => {
    it("provides the simulated 'closed' state on Monday", () => {
      const config = getStateConfig("closed");
      expect(config.isOpen).toBe(false);
      expect(config.now.day).toBe("monday");
      expect(config.nextOpening).toBe("Tuesday at 08:00");
      expect(config.isSpecialSoldOut).toBe(false);
    });

    it("provides the simulated 'special-sold-out' state with special marked sold out", () => {
      const config = getStateConfig("special-sold-out");
      expect(config.isOpen).toBe(true);
      expect(config.isSpecialSoldOut).toBe(true);
    });

    it("provides the simulated 'open' state with café open", () => {
      const config = getStateConfig("open");
      expect(config.isOpen).toBe(true);
      expect(config.isSpecialSoldOut).toBe(false);
    });

    it("resolves the real-time 'live' state with Europe/Lisbon timezone metadata", () => {
      const config = getStateConfig("live");
      expect(config.now).toBeDefined();
      expect(config.now.dayName).toBeTruthy();
      expect(typeof config.isOpen).toBe("boolean");
    });
  });

  describe("getLisbonRealTime()", () => {
    it("returns valid Lisbon 24h formatted time and day", () => {
      const lisbon = getLisbonRealTime();
      expect(lisbon.day).toMatch(/monday|tuesday|wednesday|thursday|friday|saturday|sunday/);
      expect(lisbon.hours).toBeGreaterThanOrEqual(0);
      expect(lisbon.hours).toBeLessThanOrEqual(23);
      expect(lisbon.minutes).toBeGreaterThanOrEqual(0);
      expect(lisbon.minutes).toBeLessThanOrEqual(59);
      expect(lisbon.formatted).toContain(":");
    });
  });
});

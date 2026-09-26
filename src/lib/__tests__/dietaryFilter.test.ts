import { describe, it, expect } from "vitest";
import { menuData } from "../data";
import { MenuItem } from "../types";

function filterItemsByTag(items: MenuItem[], tag: "all" | "V" | "GF"): MenuItem[] {
  if (tag === "all") return items;
  return items.filter((item) => item.tags?.includes(tag));
}

describe("Dietary Filter Logic", () => {
  const allItems = menuData.categories.flatMap((cat) => cat.items);

  it("returns all items when 'all' filter is active", () => {
    const result = filterItemsByTag(allItems, "all");
    expect(result.length).toBe(allItems.length);
  });

  it("returns only Vegetarian items when 'V' filter is active", () => {
    const result = filterItemsByTag(allItems, "V");
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThan(allItems.length);
    result.forEach((item) => {
      expect(item.tags).toContain("V");
    });
  });

  it("returns only Gluten-Free items when 'GF' filter is active", () => {
    const result = filterItemsByTag(allItems, "GF");
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThan(allItems.length);
    result.forEach((item) => {
      expect(item.tags).toContain("GF");
    });
  });
});

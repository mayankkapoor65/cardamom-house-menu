import { describe, it, expect } from "vitest";
import { menuData } from "../data";

describe("Menu Data & Integrity Model", () => {
  it("contains valid restaurant contact and location metadata", () => {
    expect(menuData.restaurant.name).toBe("Cardamom House");
    expect(menuData.restaurant.address).toContain("Lisboa");
    expect(menuData.restaurant.brand_color).toBe("#B45309");
    expect(menuData.restaurant.phone).toMatch(/^\+351/);
  });

  it("defines weekly hours for all 7 days with Monday closed", () => {
    const hours = menuData.restaurant.hours;
    expect(hours.monday.toLowerCase()).toContain("closed");
    expect(hours.tuesday).toContain("08:00");
    expect(hours.saturday).toContain("09:00");
    expect(hours.sunday).toContain("09:00");
  });

  it("today_special links to an existing menu item in categories", () => {
    const allItems = menuData.categories.flatMap((cat) => cat.items);
    const specialItem = allItems.find(
      (item) => item.id === menuData.today_special.item_id
    );

    expect(specialItem).toBeDefined();
    expect(specialItem?.name).toBeTruthy();
    expect(specialItem?.price).toBeGreaterThan(0);
  });

  it("all menu items have positive prices and valid names", () => {
    menuData.categories.forEach((category) => {
      expect(category.items.length).toBeGreaterThan(0);
      category.items.forEach((item) => {
        expect(item.id).toBeTruthy();
        expect(item.name.trim().length).toBeGreaterThan(0);
        expect(item.price).toBeGreaterThan(0);
        if (item.tags) {
          item.tags.forEach((tag) => {
            expect(["V", "GF", "spicy"]).toContain(tag);
          });
        }
      });
    });
  });
});

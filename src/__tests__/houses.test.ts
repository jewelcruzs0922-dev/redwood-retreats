import { describe, it, expect } from "vitest";
import { houses, featuredHouses, getHouseByName } from "@/data/houses";

describe("houses data", () => {
  it("has all 9 houses", () => {
    expect(houses.length).toBe(9);
  });

  it("featured houses returns subset", () => {
    expect(featuredHouses.length).toBeLessThanOrEqual(4);
    expect(featuredHouses.length).toBeGreaterThan(0);
  });

  it("getHouseByName finds existing house", () => {
    const house = getHouseByName("The Oak");
    expect(house).toBeDefined();
    expect(house?.name).toBe("The Oak");
  });

  it("getHouseByName returns undefined for unknown", () => {
    expect(getHouseByName("Nonexistent")).toBeUndefined();
  });

  it("every house has required fields", () => {
    houses.forEach((h) => {
      expect(h.name).toBeTruthy();
      expect(h.price).toBeGreaterThan(0);
      expect(h.guests).toBeGreaterThan(0);
      expect(h.image).toBeTruthy();
    });
  });
});

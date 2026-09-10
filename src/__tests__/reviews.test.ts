import { describe, it, expect } from "vitest";
import { reviews } from "@/data/reviews";

describe("reviews data", () => {
  it("has reviews", () => {
    expect(reviews.length).toBeGreaterThan(0);
  });

  it("every review has required fields", () => {
    reviews.forEach((r) => {
      expect(r.name).toBeTruthy();
      expect(r.rating).toBeGreaterThanOrEqual(1);
      expect(r.rating).toBeLessThanOrEqual(5);
      expect(r.text).toBeTruthy();
    });
  });
});

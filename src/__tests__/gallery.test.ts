import { describe, it, expect } from "vitest";
import { images } from "@/data/gallery";

describe("gallery data", () => {
  it("has images", () => {
    expect(images.length).toBeGreaterThan(0);
  });

  it("every image has required fields", () => {
    images.forEach((img) => {
      expect(img.src).toBeTruthy();
      expect(img.alt).toBeTruthy();
      expect(img.category).toBeTruthy();
    });
  });

  it("has all 4 categories", () => {
    const categories = [...new Set(images.map((i) => i.category))];
    expect(categories).toContain("Interior");
    expect(categories).toContain("Exterior");
    expect(categories).toContain("Amenities");
    expect(categories).toContain("Nature");
  });
});

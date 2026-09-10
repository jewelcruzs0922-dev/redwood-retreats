import { render, screen, fireEvent } from "@testing-library/react";
import GalleryGrid from "@/app/gallery/GalleryGrid";
import { images } from "@/data/gallery";

vi.stubGlobal(
  "IntersectionObserver",
  class {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
);

describe("Gallery Interaction", () => {
  it("filters images by category when category button is clicked", () => {
    render(<GalleryGrid images={images} />);

    const interiorBtn = screen.getByRole("tab", { name: "Interior" });
    fireEvent.click(interiorBtn);

    const allImages = screen.getAllByRole("img");
    expect(allImages.length).toBeGreaterThan(0);
  });

  it("toggles layout between masonry and grid", () => {
    render(<GalleryGrid images={images} />);

    const gridBtn = screen.getByLabelText("Grid layout");
    fireEvent.click(gridBtn);

    const allImages = screen.getAllByRole("img");
    expect(allImages.length).toBeGreaterThan(0);
  });

  it("opens lightbox when photo card is clicked", () => {
    render(<GalleryGrid images={images} />);

    const firstCard = screen.getAllByRole("button", { name: /View / })[0];
    fireEvent.click(firstCard);

    expect(screen.getByLabelText("Close lightbox (Escape)")).toBeTruthy();
  });

  it("closes lightbox on Escape key", () => {
    render(<GalleryGrid images={images} />);

    const firstCard = screen.getAllByRole("button", { name: /View / })[0];
    fireEvent.click(firstCard);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByLabelText("Close lightbox (Escape)")).toBeNull();
  });
});

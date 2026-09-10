import { render, screen, fireEvent } from "@testing-library/react";
import Navigation from "@/components/Navigation";

vi.stubGlobal(
  "IntersectionObserver",
  class {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
);

vi.stubGlobal("scrollTo", vi.fn());

describe("Navigation Interaction", () => {
  it("opens mobile menu when hamburger is clicked", () => {
    render(<Navigation />);

    const hamburger = screen.getByLabelText("Open menu");
    fireEvent.click(hamburger);

    expect(screen.getByText("Book Your Stay")).toBeTruthy();
  });

  it("closes mobile menu when close button is clicked", () => {
    render(<Navigation />);

    fireEvent.click(screen.getByLabelText("Open menu"));
    fireEvent.click(screen.getByLabelText("Close menu"));

    const mobileNav = screen.getByLabelText("Mobile navigation");
    expect(mobileNav.parentElement?.parentElement?.className).toContain("opacity-0");
  });

  it("adds scroll background when page is scrolled", () => {
    render(<Navigation />);

    fireEvent.scroll(window, { target: { scrollY: 200 } });

    const header = document.querySelector("header");
    expect(header?.className).toContain("bg-bg/95");
  });
});

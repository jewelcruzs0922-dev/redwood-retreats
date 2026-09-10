import { render, screen } from "@testing-library/react";
import Hero from "@/components/Hero";

vi.stubGlobal("IntersectionObserver", vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})));

describe("Hero", () => {
  it("renders the main heading", () => {
    render(<Hero />);
    expect(screen.getByText("Where")).toBeTruthy();
    expect(screen.getByText("Nature Feels")).toBeTruthy();
    expect(screen.getByText("Like Home.")).toBeTruthy();
  });

  it("renders the tagline", () => {
    render(<Hero />);
    expect(screen.getByText(/Modern A-frame houses/)).toBeTruthy();
  });

  it("renders Book Your Stay CTA", () => {
    render(<Hero />);
    expect(screen.getByText("Book Your Stay")).toBeTruthy();
  });

  it("renders Explore CTA", () => {
    render(<Hero />);
    expect(screen.getByText("Explore")).toBeTruthy();
  });

  it("renders scroll indicator", () => {
    render(<Hero />);
    expect(screen.getByText("Scroll")).toBeTruthy();
  });
});

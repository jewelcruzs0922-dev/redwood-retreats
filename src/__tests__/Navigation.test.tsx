import { render, screen } from "@testing-library/react";
import Navigation from "@/components/Navigation";

vi.stubGlobal(
  "IntersectionObserver",
  vi.fn().mockImplementation(function () {
    return { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() };
  })
);

vi.stubGlobal("scrollTo", vi.fn());

describe("Navigation", () => {
  it("renders the logo", () => {
    render(<Navigation />);
    expect(screen.getByText("Redwood")).toBeTruthy();
    expect(screen.getByText("Retreats")).toBeTruthy();
  });

  it("renders all nav links", () => {
    render(<Navigation />);
    expect(screen.getAllByText("Homes").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Gallery").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Amenities").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Location").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Reviews").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Contact").length).toBeGreaterThanOrEqual(1);
  });

  it("renders Book Now button", () => {
    render(<Navigation />);
    expect(screen.getByText("Book Now")).toBeTruthy();
  });

  it("renders phone number", () => {
    render(<Navigation />);
    expect(screen.getAllByText("(800) 555-1234").length).toBeGreaterThanOrEqual(1);
  });
});

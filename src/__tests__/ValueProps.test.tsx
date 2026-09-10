import { render, screen } from "@testing-library/react";
import ValueProps from "@/components/ValueProps";

vi.stubGlobal(
  "IntersectionObserver",
  vi.fn().mockImplementation(function () {
    return { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() };
  })
);

describe("ValueProps", () => {
  it("renders all 4 value propositions", () => {
    render(<ValueProps />);
    expect(screen.getByText("Private")).toBeTruthy();
    expect(screen.getByText("Self Check-in")).toBeTruthy();
    expect(screen.getByText("Hidden Fees")).toBeTruthy();
    expect(screen.getByText("Rated")).toBeTruthy();
  });

  it("renders the numbers", () => {
    render(<ValueProps />);
    expect(screen.getByText("100%")).toBeTruthy();
    expect(screen.getByText("24/7")).toBeTruthy();
    expect(screen.getByText("Zero")).toBeTruthy();
    expect(screen.getByText("#1")).toBeTruthy();
  });
});

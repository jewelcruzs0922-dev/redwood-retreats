import { render, screen, fireEvent } from "@testing-library/react";
import Booking from "@/components/Booking";

vi.stubGlobal(
  "IntersectionObserver",
  class {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
);

describe("Booking Form Interaction", () => {
  it("updates total when dates change", () => {
    render(<Booking />);

    const checkin = screen.getByLabelText(/Check-in/i);
    const checkout = screen.getByLabelText(/Check-out/i);

    fireEvent.change(checkin, { target: { value: "2025-03-15" } });
    fireEvent.change(checkout, { target: { value: "2025-03-18" } });

    expect(screen.getByText("$189 × 3 nights")).toBeTruthy();
  });

  it("updates total when house selection changes", () => {
    render(<Booking />);

    const houseSelect = screen.getByLabelText(/A-Frame/i);
    fireEvent.change(houseSelect, { target: { value: "The Ember A-Frame" } });

    const checkin = screen.getByLabelText(/Check-in/i);
    const checkout = screen.getByLabelText(/Check-out/i);
    fireEvent.change(checkin, { target: { value: "2025-03-15" } });
    fireEvent.change(checkout, { target: { value: "2025-03-18" } });

    expect(screen.getByText("$279 × 3 nights")).toBeTruthy();
  });

  it("shows confirmation modal with correct details", () => {
    render(<Booking />);

    fireEvent.change(screen.getByLabelText(/Check-in/i), { target: { value: "2025-03-15" } });
    fireEvent.change(screen.getByLabelText(/Check-out/i), { target: { value: "2025-03-18" } });
    fireEvent.change(screen.getByLabelText(/A-Frame/i), { target: { value: "The Pine A-Frame" } });

    fireEvent.click(screen.getByText("Reserve Now"));

    expect(screen.getByText("Reservation Confirmed!")).toBeTruthy();
    expect(screen.getAllByText("The Pine A-Frame").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("3 nights")).toBeTruthy();
  });

  it("closes confirmation modal when close button is clicked", () => {
    render(<Booking />);

    fireEvent.change(screen.getByLabelText(/Check-in/i), { target: { value: "2025-03-15" } });
    fireEvent.change(screen.getByLabelText(/Check-out/i), { target: { value: "2025-03-18" } });
    fireEvent.click(screen.getByText("Reserve Now"));

    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByText("Reservation Confirmed!")).toBeNull();
  });

  it("prevents reserve without dates", () => {
    render(<Booking />);

    fireEvent.click(screen.getByText("Reserve Now"));

    expect(screen.queryByText("Reservation Confirmed!")).toBeNull();
  });
});

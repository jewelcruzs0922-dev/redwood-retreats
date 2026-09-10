import { render, screen, fireEvent } from "@testing-library/react";
import Booking from "@/components/Booking";

vi.stubGlobal(
  "IntersectionObserver",
  vi.fn().mockImplementation(function () {
    return { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() };
  })
);

describe("Booking", () => {
  it("renders the booking form", () => {
    render(<Booking />);
    expect(screen.getByText("Reserve Now")).toBeTruthy();
    expect(screen.getByText("Check-in")).toBeTruthy();
    expect(screen.getByText("Check-out")).toBeTruthy();
    expect(screen.getByText("Guests")).toBeTruthy();
    expect(screen.getByText("A-Frame")).toBeTruthy();
  });

  it("renders the heading", () => {
    render(<Booking />);
    expect(screen.getByText("Book Your")).toBeTruthy();
    expect(screen.getByText("Escape.")).toBeTruthy();
  });

  it("renders trust signals", () => {
    render(<Booking />);
    expect(screen.getByText("Instant confirmation")).toBeTruthy();
    expect(screen.getByText("Free cancellation 48h before")).toBeTruthy();
    expect(screen.getByText("No hidden fees")).toBeTruthy();
    expect(screen.getByText("Secure payment")).toBeTruthy();
  });

  it("shows confirmation modal on reserve click with dates", () => {
    render(<Booking />);

    const checkinInput = screen.getByLabelText(/Check-in/i);
    const checkoutInput = screen.getByLabelText(/Check-out/i);

    fireEvent.change(checkinInput, { target: { value: "2025-03-15" } });
    fireEvent.change(checkoutInput, { target: { value: "2025-03-18" } });

    fireEvent.click(screen.getByText("Reserve Now"));

    expect(screen.getByText("Reservation Confirmed!")).toBeTruthy();
  });

  it("does not show modal without dates", () => {
    render(<Booking />);
    fireEvent.click(screen.getByText("Reserve Now"));
    expect(screen.queryByText("Reservation Confirmed!")).toBeNull();
  });
});

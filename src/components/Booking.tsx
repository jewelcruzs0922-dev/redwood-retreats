"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/lib/useInView";
import { CalendarDays, Users, Home, ChevronDown, Flame, Check } from "lucide-react";

const inputStyle = {
  borderRadius: "12px",
};

const housePrices: Record<string, number> = {
  "The Oak A-Frame": 189,
  "The Ember A-Frame": 279,
  "The Pine A-Frame": 399,
};

const CLEANING_FEE = 75;
const SERVICE_FEE = 45;

export default function Booking() {
  const { ref: leftRef, isVisible: leftVisible } = useInView(0.1);
  const { ref: rightRef, isVisible: rightVisible } = useInView(0.1);

  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("1 Guest");
  const [house, setHouse] = useState("The Oak A-Frame");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const pricePerNight = housePrices[house] ?? 189;

  const nights =
    checkin && checkout
      ? Math.max(0, Math.round((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000))
      : 0;

  const subtotal = pricePerNight * nights;
  const total = subtotal + CLEANING_FEE + SERVICE_FEE;

  useEffect(() => {
    if (showConfirmation) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showConfirmation]);

  const handleReserve = () => {
    if (!checkin || !checkout || nights === 0) {
      return;
    }
    setShowConfirmation(true);
  };

  return (
    <section id="booking" className="relative bg-bg-warm py-28 lg:py-36 wood-texture" style={{ scrollMarginTop: "80px" }}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16 relative z-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Left */}
          <div
            ref={leftRef}
            className={`lg:col-span-5 transition-all duration-1000 ${
              leftVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Flame className="h-4 w-4 text-accent flicker" />
              <span className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                Reservations
              </span>
            </div>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.9] tracking-tight">
              Book Your
              <br />
              <span className="italic text-accent" style={{ textShadow: "0 0 40px rgba(232, 145, 58, 0.2)" }}>Escape.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-text-muted">
              Check availability and reserve your perfect A-frame retreat.
              Free cancellation up to 48 hours before check-in.
            </p>

            <div className="mt-10 space-y-4 border-t border-accent/10 pt-10">
              {["Instant confirmation", "Free cancellation 48h before", "No hidden fees", "Secure payment"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 bg-accent rounded-full shadow-sm shadow-accent/50" />
                  <span className="text-sm text-text-muted">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div
            ref={rightRef}
            className={`lg:col-span-7 transition-all duration-1000 delay-200 ${
              rightVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div
              className="bg-bg-card p-8 lg:p-10 border border-accent/5 shadow-xl shadow-ember/5"
              style={{ borderRadius: "24px 4px 24px 4px" }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="checkin" className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-text-muted uppercase">
                    <CalendarDays className="h-3.5 w-3.5 text-accent" /> Check-in
                  </label>
                  <input
                    type="date"
                    id="checkin"
                    value={checkin}
                    onChange={(e) => setCheckin(e.target.value)}
                    style={inputStyle}
                    className="w-full border border-accent/10 bg-bg px-4 py-3.5 text-sm text-text transition-colors focus:border-accent focus:outline-none focus:shadow-lg focus:shadow-accent/10"
                  />
                </div>
                <div>
                  <label htmlFor="checkout" className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-text-muted uppercase">
                    <CalendarDays className="h-3.5 w-3.5 text-accent" /> Check-out
                  </label>
                  <input
                    type="date"
                    id="checkout"
                    value={checkout}
                    onChange={(e) => setCheckout(e.target.value)}
                    style={inputStyle}
                    className="w-full border border-accent/10 bg-bg px-4 py-3.5 text-sm text-text transition-colors focus:border-accent focus:outline-none focus:shadow-lg focus:shadow-accent/10"
                  />
                </div>
                <div>
                  <label htmlFor="guests" className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-text-muted uppercase">
                    <Users className="h-3.5 w-3.5 text-accent" /> Guests
                  </label>
                  <div className="relative">
                    <select
                      id="guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      style={inputStyle}
                      className="w-full appearance-none border border-accent/10 bg-bg px-4 py-3.5 text-sm text-text transition-colors focus:border-accent focus:outline-none"
                    >
                      <option className="bg-bg-card">1 Guest</option>
                      <option className="bg-bg-card">2 Guests</option>
                      <option className="bg-bg-card">3 Guests</option>
                      <option className="bg-bg-card">4 Guests</option>
                      <option className="bg-bg-card">5 Guests</option>
                      <option className="bg-bg-card">6 Guests</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  </div>
                </div>
                <div>
                  <label htmlFor="house" className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-text-muted uppercase">
                    <Home className="h-3.5 w-3.5 text-accent" /> A-Frame
                  </label>
                  <div className="relative">
                    <select
                      id="house"
                      value={house}
                      onChange={(e) => setHouse(e.target.value)}
                      style={inputStyle}
                      className="w-full appearance-none border border-accent/10 bg-bg px-4 py-3.5 text-sm text-text transition-colors focus:border-accent focus:outline-none"
                    >
                      <option className="bg-bg-card">The Oak A-Frame</option>
                      <option className="bg-bg-card">The Ember A-Frame</option>
                      <option className="bg-bg-card">The Pine A-Frame</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-accent/10 pt-8">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-text-muted">
                    <span>${pricePerNight} × {nights || 0} night{nights !== 1 ? "s" : ""}</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-text-muted">
                    <span>Cleaning</span><span>${CLEANING_FEE}</span>
                  </div>
                  <div className="flex justify-between text-sm text-text-muted">
                    <span>Service</span><span>${SERVICE_FEE}</span>
                  </div>
                  <div className="flex justify-between border-t border-accent/10 pt-4 text-lg font-bold">
                    <span>Total</span>
                    <span className="text-accent" style={{ textShadow: "0 0 20px rgba(232, 145, 58, 0.3)" }}>${total}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleReserve}
                className="mt-8 w-full bg-accent py-4 text-sm font-semibold tracking-[0.15em] text-bg uppercase transition-all duration-500 hover:bg-ember hover:shadow-xl hover:shadow-accent/20"
                style={{ borderRadius: "12px" }}
              >
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setShowConfirmation(false)}
        >
          <div
            className="bg-bg-card border border-accent/10 p-8 lg:p-10 max-w-md w-full shadow-2xl shadow-ember/10"
            style={{ borderRadius: "24px 4px 24px 4px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className="flex h-16 w-16 items-center justify-center bg-accent/10 mb-6"
                style={{ borderRadius: "50%" }}
              >
                <Check className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">Reservation Confirmed!</h3>
              <div className="mt-4 w-full space-y-2 text-sm text-text-muted">
                <div className="flex justify-between border-b border-accent/10 pb-2">
                  <span>A-Frame</span>
                  <span className="text-text font-medium">{house}</span>
                </div>
                <div className="flex justify-between border-b border-accent/10 pb-2">
                  <span>Guests</span>
                  <span className="text-text font-medium">{guests}</span>
                </div>
                <div className="flex justify-between border-b border-accent/10 pb-2">
                  <span>Check-in</span>
                  <span className="text-text font-medium">{checkin}</span>
                </div>
                <div className="flex justify-between border-b border-accent/10 pb-2">
                  <span>Check-out</span>
                  <span className="text-text font-medium">{checkout}</span>
                </div>
                <div className="flex justify-between border-b border-accent/10 pb-2">
                  <span>Duration</span>
                  <span className="text-text font-medium">{nights} night{nights !== 1 ? "s" : ""}</span>
                </div>
                <div className="flex justify-between pt-2 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-accent">${total}</span>
                </div>
              </div>
              <p className="mt-6 text-xs text-text-muted">
                You&apos;ll receive a confirmation email shortly.
              </p>
              <button
                onClick={() => setShowConfirmation(false)}
                className="mt-6 w-full bg-accent py-3.5 text-sm font-semibold tracking-[0.15em] text-bg uppercase transition-all duration-500 hover:bg-ember hover:shadow-xl hover:shadow-accent/20"
                style={{ borderRadius: "12px" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

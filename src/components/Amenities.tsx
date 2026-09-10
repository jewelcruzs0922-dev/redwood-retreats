"use client";

import { useInView } from "@/lib/useInView";
import { amenities } from "@/data/amenities";

function AmenityCard({ amenity, index }: { amenity: typeof amenities[0]; index: number }) {
  const { ref, isVisible } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: `${index * 80}ms`,
        borderRadius: "20px 4px 20px 4px",
      }}
    >
      {/* Card background */}
      <div className="absolute inset-0 bg-bg-card border border-accent/5 transition-all duration-500 group-hover:border-accent/15 group-hover:bg-bg-warm" />

      {/* Large decorative icon — background watermark */}
      <div className="absolute -right-4 -bottom-4 transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.08] opacity-[0.04]">
        <amenity.icon className="h-32 w-32 text-accent" strokeWidth={0.5} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-7">
        {/* Small icon with glow */}
        <div
          className="mb-5 flex h-12 w-12 items-center justify-center bg-accent/15 shadow-lg shadow-accent/20 transition-all duration-500"
          style={{ borderRadius: "12px 3px 12px 3px" }}
        >
          <amenity.icon className="h-5 w-5 text-accent transition-transform duration-500 group-hover:scale-110 flicker" />
        </div>

        {/* Label */}
        <h3 className="font-serif text-lg font-semibold mb-1">
          {amenity.label}
        </h3>
        <p className="text-sm text-text-muted">
          {amenity.detail}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-accent to-ember transition-all duration-700 group-hover:w-full" />
    </div>
  );
}

export default function Amenities() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="amenities" className="bg-bg py-24 lg:py-32" style={{ scrollMarginTop: "80px" }}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        {/* Header */}
        <div
          ref={ref}
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Amenities
          </span>
          <h2 className="mt-2 font-serif text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.9] tracking-tight">
            Everything You Need to{" "}
            <span className="italic text-accent" style={{ textShadow: "0 0 40px rgba(232, 145, 58, 0.2)" }}>
              Feel at Home.
            </span>
          </h2>
        </div>

        {/* Bento grid — asymmetric layout */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Row 1: Fireplace (large) + Premium Beds + Forest Deck */}
          <div className="col-span-2">
            <AmenityCard amenity={amenities[0]} index={0} />
          </div>
          <AmenityCard amenity={amenities[1]} index={1} />
          <AmenityCard amenity={amenities[2]} index={2} />

          {/* Row 2: Full Kitchen + Fast Wi-Fi + Parking (large) */}
          <AmenityCard amenity={amenities[3]} index={3} />
          <AmenityCard amenity={amenities[4]} index={4} />
          <div className="col-span-2">
            <AmenityCard amenity={amenities[5]} index={5} />
          </div>

          {/* Row 3: Soaking Tub (large) + Mountain Views (large) */}
          <div className="col-span-2">
            <AmenityCard amenity={amenities[6]} index={6} />
          </div>
          <div className="col-span-2">
            <AmenityCard amenity={amenities[7]} index={7} />
          </div>
        </div>
      </div>
    </section>
  );
}

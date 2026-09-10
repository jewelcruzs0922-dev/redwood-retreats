"use client";

import React, { useState, useRef, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "@/lib/useInView";
import { ArrowLeft, Users, BedDouble, Flame, MapPin, Star } from "lucide-react";
import { houses } from "@/data/houses";
import type { House } from "@/data/houses";

const filters = [
  { label: "All", value: "all" },
  { label: "1-2 Guests", value: "small" },
  { label: "3-4 Guests", value: "medium" },
  { label: "5+ Guests", value: "large" },
  { label: "Under $250", value: "budget" },
  { label: "Premium", value: "premium" },
];

const HouseCard = React.memo(function HouseCard({ house, index }: { house: House; index: number }) {
  const { ref, isVisible } = useInView(0.08);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const handleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -6, y: x * 6 });
  };

  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHover(false);
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      <Link
        href="/#booking"
        className="block focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-bg rounded-lg"
      >
        <div
          ref={cardRef}
          className="relative group cursor-pointer"
          onPointerMove={handleMove}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={handleLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: hover ? "transform 0.1s ease" : "transform 0.5s ease",
          }}
        >
          {/* Outer glow */}
          <div
            className="absolute -inset-2 rounded-2xl transition-opacity duration-500 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(232,145,58,0.1) 0%, transparent 70%)",
              opacity: hover ? 1 : 0,
            }}
          />

          {/* Card */}
          <div
            className="relative overflow-hidden bg-bg-card"
            style={{
              borderRadius: "20px 4px 20px 4px",
              boxShadow: hover
                ? "0 0 0 2px rgba(232,145,58,0.6), 0 0 35px rgba(232,145,58,0.25), 0 0 70px rgba(232,145,58,0.08), 0 25px 50px -12px rgba(0,0,0,0.5)"
                : "0 0 0 1.5px rgba(232,145,58,0.2), 0 0 15px rgba(232,145,58,0.06), 0 10px 30px -8px rgba(0,0,0,0.3)",
              transition: "box-shadow 0.4s ease",
            }}
          >
            {/* Image area */}
            <div className="relative overflow-hidden aspect-[3/4]">
              <Image
                src={house.image}
                alt={house.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-all duration-700"
                style={{
                  transform: hover ? "scale(1.08)" : "scale(1)",
                  filter: hover ? "brightness(1.15)" : "brightness(1)",
                }}
              />

              {/* Gradient overlay — always there, deepens on hover */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: hover
                    ? "linear-gradient(to top, rgba(15,12,9,0.9) 0%, rgba(15,12,9,0.3) 40%, transparent 70%)"
                    : "linear-gradient(to top, rgba(15,12,9,0.6) 0%, transparent 40%)",
                }}
              />

              {/* Accent line — draws on hover */}
              <div
                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-accent via-amber to-accent transition-all duration-600"
                style={{ width: hover ? "100%" : "0%" }}
              />

              {/* Large number watermark */}
              <div
                className="absolute top-3 right-4 font-serif text-[80px] sm:text-[100px] font-bold leading-none pointer-events-none select-none transition-colors duration-500"
                style={{ color: hover ? "rgba(232,145,58,0.15)" : "rgba(255,255,255,0.04)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Badge */}
              {house.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <div
                    className="px-3 py-1.5 bg-accent text-bg"
                    style={{ borderRadius: "8px 2px 8px 2px" }}
                  >
                    <span className="text-[10px] font-bold tracking-wider uppercase">{house.badge}</span>
                  </div>
                </div>
              )}

              {/* Price badge — top right */}
              <div
                className="absolute top-4 right-4 z-10 px-3 py-2 transition-all duration-300"
                style={{
                  borderRadius: "10px 3px 10px 3px",
                  background: hover ? "rgba(232,145,58,0.95)" : "rgba(30,25,20,0.85)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  className="font-serif text-xl font-bold transition-colors duration-300"
                  style={{ color: hover ? "#0f0c09" : "#e8913a" }}
                >
                  ${house.price}
                </span>
                <span
                  className="text-[10px] ml-1 transition-colors duration-300"
                  style={{ color: hover ? "rgba(15,12,9,0.6)" : "#b8a892" }}
                >
                  / night
                </span>
              </div>

              {/* Bottom content — slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                {/* Location */}
                <div
                  className="flex items-center gap-1.5 mb-2 transition-all duration-400"
                  style={{
                    transform: hover ? "translateY(0)" : "translateY(8px)",
                    opacity: hover ? 1 : 0.6,
                  }}
                >
                  <MapPin className="h-3 w-3 text-accent" />
                  <span className="text-[11px] text-text-muted/70">{house.location}</span>
                </div>

                {/* Name */}
                <h3
                  className="font-serif text-2xl font-bold text-white leading-tight mb-1 transition-all duration-400"
                  style={{
                    transform: hover ? "translateY(0)" : "translateY(6px)",
                    opacity: hover ? 1 : 0.9,
                  }}
                >
                  {house.name}
                </h3>

                {/* Tagline */}
                <p
                  className="text-xs text-accent/80 mb-3 transition-all duration-400"
                  style={{
                    transform: hover ? "translateY(0)" : "translateY(4px)",
                    opacity: hover ? 1 : 0.6,
                  }}
                >
                  {house.tagline}
                </p>

                {/* Description — hidden at rest, shows on hover */}
                <p
                  className="text-sm text-text-muted/70 line-clamp-2 mb-3 transition-all duration-400"
                  style={{
                    transform: hover ? "translateY(0)" : "translateY(10px)",
                    opacity: hover ? 1 : 0,
                    maxHeight: hover ? "60px" : "0px",
                  }}
                >
                  {house.description}
                </p>

                {/* Features + stats row */}
                <div
                  className="flex items-center justify-between transition-all duration-400"
                  style={{
                    transform: hover ? "translateY(0)" : "translateY(10px)",
                    opacity: hover ? 1 : 0,
                  }}
                >
                  <div className="flex gap-1.5">
                    {house.features.slice(0, 2).map((f) => (
                      <span
                        key={f}
                        className="text-[9px] bg-white/10 text-white/70 px-2 py-1"
                        style={{ borderRadius: "6px 2px 6px 2px" }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-white/50">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {house.guests}</span>
                    <span className="flex items-center gap-1"><BedDouble className="h-3 w-3" /> {house.beds}</span>
                  </div>
                </div>
              </div>

              {/* Rating — bottom left */}
              <div
                className="absolute bottom-5 left-5 z-10 flex items-center gap-1.5 px-2.5 py-1.5 transition-all duration-400"
                style={{
                  borderRadius: "8px 2px 8px 2px",
                  background: "rgba(30,25,20,0.8)",
                  backdropFilter: "blur(8px)",
                  transform: hover ? "translateY(20px)" : "translateY(0)",
                  opacity: hover ? 0 : 1,
                }}
              >
                <Star className="h-3 w-3 fill-accent text-accent" />
                <span className="text-[11px] font-semibold text-white/90">{house.rating}</span>
                <span className="text-[10px] text-white/40">({house.reviewCount})</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});

export default function HousesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { ref: headerRef, isVisible: headerVisible } = useInView(0.1);

  const filtered = houses.filter((h) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "small") return h.guests <= 2;
    if (activeFilter === "medium") return h.guests >= 3 && h.guests <= 4;
    if (activeFilter === "large") return h.guests >= 5;
    if (activeFilter === "budget") return h.price < 250;
    if (activeFilter === "premium") return h.price >= 350;
    return true;
  });

  return (
    <main className="bg-bg min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-warm to-bg" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(232,145,58,0.08) 0%, transparent 70%)" }} />

        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-16">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-10 focus:outline-none focus:ring-2 focus:ring-accent/50 rounded group">
            <span className="flex h-10 w-10 items-center justify-center bg-accent/10 border border-accent/25 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-bg" style={{ borderRadius: "10px 3px 10px 3px" }}>
              <ArrowLeft className="h-4 w-4" />
            </span>
            <span className="text-[11px] tracking-[0.2em] text-text-muted/60 uppercase group-hover:text-accent transition-colors">Back to Home</span>
          </Link>

          <div ref={headerRef} className={`text-center transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Flame className="h-4 w-4 text-accent flicker" />
              <span className="text-xs font-medium tracking-[0.3em] text-accent uppercase">All Retreats</span>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.9] tracking-tight mb-6">
              Find Your Perfect{" "}
              <span className="italic text-accent" style={{ textShadow: "0 0 40px rgba(232,145,58,0.25)" }}>A-Frame</span>
            </h1>
            <p className="max-w-xl mx-auto text-base text-text-muted">
              From intimate retreats to family adventures, discover our collection of modern A-frame houses.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeFilter === f.value
                    ? "bg-accent text-bg"
                    : "bg-bg-card border border-accent/10 text-text-muted hover:border-accent/30 hover:text-accent"
                }`}
                style={{ borderRadius: "10px 3px 10px 3px" }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((house, i) => (
              <HouseCard key={house.id} house={house} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-muted">No A-frames match your filters.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

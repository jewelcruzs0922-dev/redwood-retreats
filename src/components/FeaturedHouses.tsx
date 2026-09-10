"use client";

import React from "react";
import { useInView } from "@/lib/useInView";
import { Users, BedDouble, Bath, ArrowRight, Flame } from "lucide-react";
import { shadows } from "@/lib/styles";
import Link from "next/link";
import Image from "next/image";
import { featuredHouses } from "@/data/houses";
import type { House } from "@/data/houses";

const cardRadius = {
  image: "20px 4px 20px 4px",
  card: "4px 20px 4px 20px",
};

const HouseBlock = React.memo(function HouseBlock({ house, index }: { house: House; index: number }) {
  const { ref, isVisible } = useInView(0.1);
  const isReversed = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className={`grid gap-8 lg:gap-12 items-center transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${isReversed ? "lg:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.2fr_1fr]"}`}
    >
      {/* Image */}
      <div
        className={`group relative overflow-hidden cursor-pointer aspect-[4/5] ${isReversed ? "lg:order-2" : ""}`}
        style={{
          borderRadius: cardRadius.image,
          boxShadow: shadows.cardImage,
        }}
      >
        {/* Glow layer — intensifies on hover */}
        <div
          className="absolute -inset-1 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            borderRadius: cardRadius.image,
            boxShadow: shadows.cardImageHover,
          }}
        />

        <Image
          src={house.image}
          alt={house.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
        />

        {/* Warm overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Price badge */}
        <div className="absolute top-5 right-5 bg-bg-card/90 backdrop-blur-sm px-4 py-2 z-20 transition-all duration-300 group-hover:bg-accent group-hover:text-bg" style={{ borderRadius: "12px 4px 12px 4px" }}>
          <span className="font-serif text-xl font-bold text-accent group-hover:text-bg transition-colors duration-300">${house.price}</span>
          <span className="text-[10px] text-text-muted group-hover:text-bg/70 ml-1 transition-colors duration-300">/ night</span>
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-center ${isReversed ? "lg:order-1 lg:items-end lg:text-right" : ""}`}>
        <span className="text-[10px] font-semibold tracking-[0.3em] text-accent uppercase mb-3">
          {house.tagline}
        </span>
        <h3 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
          {house.name}
        </h3>
        <p className="text-base leading-relaxed text-text-muted max-w-md mb-8">
          {house.description}
        </p>

        {/* Features */}
        <div className={`flex flex-wrap gap-3 mb-8 ${isReversed ? "lg:justify-end" : ""}`}>
          {house.features.map((feature) => (
            <span
              key={feature}
              className="flex items-center gap-1.5 bg-accent/10 px-3 py-1.5 text-[11px] font-medium text-accent tracking-wider uppercase"
              style={{ borderRadius: "8px 2px 8px 2px" }}
            >
              {feature === "Fireplace" || feature === "Fire Pit" ? (
                <Flame className="h-3 w-3" />
              ) : null}
              {feature}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className={`flex items-center gap-6 text-sm text-text-muted mb-8 ${isReversed ? "lg:justify-end" : ""}`}>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-accent" /> {house.guests} Guests
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-accent" /> {house.beds} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-accent" /> {house.baths} Bath
          </span>
        </div>

        {/* CTA */}
        <Link
          href="#booking"
          className={`group inline-flex items-center gap-3 bg-accent px-8 py-4 text-sm font-semibold tracking-wider text-bg uppercase transition-all duration-500 hover:bg-ember hover:shadow-lg hover:shadow-accent/20 ${isReversed ? "lg:self-end" : ""}`}
          style={{ borderRadius: "14px 4px 14px 4px" }}
        >
          Book This A-Frame
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
});

export default function FeaturedHouses() {
  const { ref: headerRef, isVisible: headerVisible } = useInView(0.1);

  return (
    <section id="homes" className="bg-bg py-24 lg:py-32" style={{ scrollMarginTop: "80px" }}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-20 text-center transition-all duration-1000 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="h-4 w-4 text-accent flicker" />
            <span className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
              Our A-Frames
            </span>
          </div>
          <h2 className="mt-2 font-serif text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.9] tracking-tight">
            Find Your
            <br />
            <span className="italic text-accent" style={{ textShadow: "0 0 40px rgba(232, 145, 58, 0.2)" }}>
              Perfect
            </span>{" "}
            A-Frame.
          </h2>
        </div>

        {/* Houses — alternating layout */}
        <div className="space-y-24 lg:space-y-32">
          {featuredHouses.map((house, i) => (
            <HouseBlock key={house.name} house={house} index={i} />
          ))}
        </div>

        {/* View All button */}
        <div className="mt-16 text-center">
          <Link
            href="/houses"
            className="group inline-flex items-center gap-3 border border-accent/30 px-10 py-4 text-sm font-semibold tracking-wider text-accent uppercase transition-all duration-500 hover:bg-accent hover:text-bg hover:border-accent hover:shadow-lg hover:shadow-accent/20"
            style={{ borderRadius: "14px 4px 14px 4px" }}
          >
            View All A-Frames
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

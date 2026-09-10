"use client";

import Link from "next/link";
import Image from "next/image";
import { AFrameShape, WarmGlow } from "./Decorations";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[650px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.pexels.com/photos/14353714/pexels-photo-14353714.jpeg?w=1920&q=80"
        alt="Cozy A-frame cabin surrounded by forest"
        fill
        priority
        className="object-cover hero-fade-in"
      />
      {/* Warm gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-transparent" />
      {/* Orange glow from bottom — simulating warm window light */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(232, 145, 58, 0.15) 0%, rgba(212, 160, 84, 0.05) 40%, transparent 70%)",
        }}
      />

      {/* Decorative A-frame shapes */}
      <AFrameShape className="absolute top-20 right-10 w-32 h-32 text-accent opacity-20 hidden lg:block" />
      <AFrameShape className="absolute bottom-40 left-10 w-20 h-20 text-amber opacity-10 hidden lg:block" />

      {/* Warm glow orb */}
      <WarmGlow className="top-1/3 left-1/4 -translate-x-1/2" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end pb-24 px-6 lg:px-16">
        <div className="mx-auto w-full max-w-[1400px]">
          {/* Giant headline with warm accent */}
          <h1
            className="font-serif text-[clamp(3.5rem,11vw,9rem)] font-bold leading-[0.82] tracking-tight hero-slide-up"
          >
            <span className="block text-warmwhite">Where</span>
            <span className="block text-accent italic" style={{ textShadow: "0 0 60px rgba(232, 145, 58, 0.3)" }}>
              Nature Feels
            </span>
            <span className="block text-warmwhite">Like Home.</span>
          </h1>

          {/* Tagline + CTAs */}
          <div
            className="mt-14 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between hero-slide-up-delay"
          >
            <p className="max-w-md text-base leading-relaxed text-text-muted">
              Modern A-frame houses designed for slow mornings, peaceful nights,
              and unforgettable stays in the heart of nature.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="#booking"
                className="group relative overflow-hidden bg-accent px-10 py-4 text-sm font-semibold tracking-wider text-bg uppercase transition-all duration-500 hover:bg-ember ember-pulse"
              >
                <span className="relative z-10">Book Your Stay</span>
              </Link>
              <Link
                href="#homes"
                className="border border-text/20 px-10 py-4 text-sm font-semibold tracking-wider text-text uppercase transition-all duration-500 hover:border-accent hover:text-accent hover:bg-accent/5"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.5em] text-text-muted/60 uppercase">
            Scroll
          </span>
          <div className="relative h-12 w-px">
            <div className="absolute inset-0 bg-gradient-to-b from-accent/60 to-transparent" />
            <div
              className="absolute top-0 left-0 w-px h-4 bg-accent"
              style={{
                animation: "scrollPulse 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom warm fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}

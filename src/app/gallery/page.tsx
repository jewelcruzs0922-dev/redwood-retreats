import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import GalleryGrid from "./GalleryGrid";
import { images } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Full Gallery — Redwood Retreats",
  description:
    "Browse every angle of our A-frame cabins — interiors, exteriors, amenities, and the breathtaking surroundings that make Redwood Retreats unforgettable.",
};

/* ── A-frame decorative shape ── */
function AFrameDecor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={className} aria-hidden="true">
      <path d="M100 0L200 160H0L100 0Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M100 15L185 155H15L100 15Z" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.5" fill="none" />
    </svg>
  );
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* ── Hero — warm & inviting ── */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-end overflow-hidden">
        {/* Background image — warm interior with fireplace glow */}
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/7746106/pexels-photo-7746106.jpeg?w=1600&q=80"
            alt=""
            fill
            priority
            className="object-cover"
          />
          {/* Layered warm gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-bg/30 to-transparent" />
          {/* Warm amber tint */}
          <div className="absolute inset-0 bg-accent/[0.04] mix-blend-overlay" />
        </div>

        {/* Big warm glow from bottom — cabin window light */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(232, 145, 58, 0.25) 0%, rgba(196, 96, 42, 0.1) 30%, rgba(245, 200, 66, 0.03) 55%, transparent 75%)",
          }}
        />

        {/* Secondary glow — left */}
        <div
          className="absolute bottom-32 left-[10%] w-[500px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(245, 200, 66, 0.08) 0%, transparent 70%)",
          }}
        />

        {/* Tertiary glow — right */}
        <div
          className="absolute top-1/4 right-[5%] w-[350px] h-[350px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(232, 145, 58, 0.05) 0%, transparent 70%)",
          }}
        />

        {/* A-frame decorative shapes */}
        <AFrameDecor className="absolute top-16 right-[8%] w-28 sm:w-44 text-accent opacity-15 hidden lg:block" />
        <AFrameDecor className="absolute bottom-36 left-[4%] w-16 sm:w-24 text-amber opacity-[0.08] rotate-12 hidden lg:block" />

        {/* Floating embers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent/40 rounded-full"
              style={{
                left: `${15 + (i * 10) % 70}%`,
                bottom: "-5px",
                animation: `ps5Rise ${10 + i * 2}s ${i * 1.5}s linear infinite`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] w-full px-6 lg:px-16 pb-12 sm:pb-20">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 mb-12 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-bg rounded group"
          >
            <span className="flex h-10 w-10 items-center justify-center bg-accent/10 border border-accent/25 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-bg group-hover:border-accent" style={{ borderRadius: "10px 3px 10px 3px" }}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-[11px] tracking-[0.2em] text-text-muted/60 uppercase group-hover:text-accent transition-colors duration-300">
              Return to Home
            </span>
          </Link>

          {/* Giant title — warm and dramatic */}
          <h1 className="font-serif leading-[0.82] tracking-tight">
            <span className="block text-[clamp(1.2rem,3vw,1.8rem)] font-normal text-text/50 mb-2">The</span>
            <span className="block text-[clamp(3rem,9vw,7rem)] font-bold">
              <span className="text-text/90">Full </span>
              <span
                className="italic text-accent"
                style={{ textShadow: "0 0 40px rgba(232,145,58,0.35), 0 0 80px rgba(232,145,58,0.12), 0 2px 4px rgba(0,0,0,0.3)" }}
              >
                Gallery
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-sm text-text-muted/50 text-sm leading-relaxed">
            29 hand-picked photos across interiors, exteriors, amenities, and nature.
          </p>

          {/* Category preview pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {["Interior", "Exterior", "Amenities", "Nature"].map((c) => (
              <span
                key={c}
                className="px-3 py-1.5 text-[9px] font-medium tracking-[0.15em] uppercase text-accent/60 border border-accent/15 bg-accent/[0.03]"
                style={{ borderRadius: "8px 2px 8px 2px" }}
              >
                {c}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="py-12 sm:py-20 relative" aria-label="Photo gallery">
        {/* Warm ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] pointer-events-none opacity-40"
          style={{
            background: "radial-gradient(ellipse, rgba(232,145,58,0.04) 0%, transparent 70%)",
          }}
        />
        <GalleryGrid images={images} />
      </section>
    </main>
  );
}

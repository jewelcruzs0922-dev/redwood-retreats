"use client";

import { useInView } from "@/lib/useInView";
import Link from "next/link";
import EmberGrass from "./EmberGrass";

export default function CtaBand() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section className="relative py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-ember to-accent" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "repeating-linear-gradient(87deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)"
      }} />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-warmwhite/10 rounded-full blur-3xl" />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-[1400px] px-6 lg:px-16 text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.9] tracking-tight text-bg">
          Ready to Escape
          <br />
          the Everyday?
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-bg/70">
          Your perfect A-frame is waiting. Book now and experience the
          quiet luxury of modern cabin living.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Link
            href="#booking"
            className="group relative overflow-hidden bg-bg px-12 py-[18px] text-sm font-bold tracking-[0.15em] text-text uppercase transition-all duration-500 hover:shadow-2xl hover:shadow-black/40"
            style={{ borderRadius: "14px 4px 14px 4px" }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center gap-3">
              Book Your Stay
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
          <Link
            href="#homes"
            className="group relative overflow-hidden border-2 border-bg/40 px-12 py-[18px] text-sm font-bold tracking-[0.15em] text-bg uppercase transition-all duration-500 hover:border-bg hover:bg-bg/10 hover:shadow-lg hover:shadow-bg/10"
            style={{ borderRadius: "14px 4px 14px 4px" }}
          >
            <span className="relative z-10 flex items-center gap-3">
              View A-Frames
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      <EmberGrass />
    </section>
  );
}

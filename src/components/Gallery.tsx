"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "@/lib/useInView";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { galleryPreview as images } from "@/data/gallery";

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, isVisible: headerVisible } = useInView(0.1);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.7;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="gallery" className="bg-bg-warm py-24 lg:py-32" style={{ scrollMarginTop: "80px" }}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-12 flex flex-col items-center text-center transition-all duration-1000 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Gallery
          </span>
          <h2 className="mt-2 font-serif text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.9] tracking-tight">
            A Glimpse of{" "}
            <span className="italic text-accent" style={{ textShadow: "0 0 40px rgba(232, 145, 58, 0.2)" }}>
              Your Stay.
            </span>
          </h2>
        </div>

        {/* Horizontal scroll gallery */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center bg-bg-card/90 backdrop-blur-sm border border-accent/10 text-text-muted transition-all duration-300 hover:bg-accent hover:text-bg hover:border-accent -ml-4 hidden md:flex"
            style={{ borderRadius: "14px 4px 14px 4px" }}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center bg-bg-card/90 backdrop-blur-sm border border-accent/10 text-text-muted transition-all duration-300 hover:bg-accent hover:text-bg hover:border-accent -mr-4 hidden md:flex"
            style={{ borderRadius: "4px 14px 4px 14px" }}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar"
          >
            {images.map((img, i) => (
              <article
                key={img.alt}
                className="group relative flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] snap-center"
              >
                {/* Image container */}
                <div
                  className="relative overflow-hidden aspect-[4/3]"
                  style={{ borderRadius: "20px 4px 20px 4px" }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 35vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Warm overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Number indicator */}
                  <div className="absolute top-5 left-5 flex h-8 w-8 items-center justify-center bg-bg-card/60 backdrop-blur-sm">
                    <span className="text-[11px] font-semibold text-text">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Caption overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="block text-[10px] font-medium tracking-[0.2em] text-accent uppercase mb-1">
                      {img.location}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {img.caption}
                    </h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-8 flex items-center justify-center gap-2 text-text-muted/50">
          <div className="h-px w-8 bg-accent/30" />
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="h-px w-8 bg-accent/30" />
        </div>

        {/* View Full Gallery button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 bg-accent/10 border border-accent/20 px-8 py-4 text-sm font-medium tracking-wider text-accent uppercase transition-all duration-500 hover:bg-accent hover:text-bg hover:border-accent"
            style={{ borderRadius: "14px 4px 14px 4px" }}
          >
            View Full Gallery
            <svg
              className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

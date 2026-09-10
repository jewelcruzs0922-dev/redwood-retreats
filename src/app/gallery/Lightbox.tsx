"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import MagneticBtn from "./MagneticBtn";
import type { Img } from "./MagneticBtn";

export default function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: Img[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", h);
    return () => {
      document.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const img = images[index];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/98 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${images.length}: ${img.caption}`}
      style={{ animation: "lbIn 0.3s ease" }}
    >
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-3">
          <Camera className="h-4 w-4 text-accent" aria-hidden="true" />
          <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-medium tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
        </div>

        {/* Category pills — scrollable thumbnails */}
        <div className="hidden md:flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
          {images.map((im, i) => (
            <button
              key={im.caption}
              onClick={() => {
                /* parent will handle index change */
              }}
              className={`w-8 h-6 rounded-sm overflow-hidden transition-all duration-200 ${
                i === index ? "ring-1 ring-accent opacity-100 scale-110" : "opacity-30 hover:opacity-60"
              }`}
              aria-label={`Go to ${im.caption}`}
            >
              <Image src={im.src} alt="" width={32} height={24} className="w-full h-full object-cover" aria-hidden="true" />
            </button>
          ))}
        </div>

        <MagneticBtn
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 text-[11px] tracking-wider text-white/40 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 rounded"
          ariaLabel="Close lightbox (Escape)"
        >
          <X className="h-4 w-4" />
          <span className="hidden sm:inline text-white/30">ESC</span>
        </MagneticBtn>
      </header>

      {/* Image */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 relative">
        <MagneticBtn
          onClick={onPrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center bg-white/5 hover:bg-white/10 text-white/30 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-full z-10"
          ariaLabel="Previous photo"
        >
          <ChevronLeft className="h-5 w-5" />
        </MagneticBtn>

        <div className="relative max-w-full max-h-[75vh] overflow-hidden rounded">
          <Image
            src={img.src}
            alt={img.alt}
            width={1200}
            height={800}
            className="max-w-full max-h-[75vh] object-contain"
            key={img.src}
            style={{ animation: `imgSlide 0.4s ease` }}
          />
        </div>

        <MagneticBtn
          onClick={onNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center bg-white/5 hover:bg-white/10 text-white/30 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-full z-10"
          ariaLabel="Next photo"
        >
          <ChevronRight className="h-5 w-5" />
        </MagneticBtn>
      </main>

      {/* Bottom info — slides up */}
      <footer className="px-4 sm:px-8 py-5 border-t border-white/5 text-center" style={{ animation: "slideUp 0.4s ease 0.1s both" }}>
        <span className="text-[9px] tracking-[0.25em] text-accent uppercase font-medium">
          {img.category}
        </span>
        <h3 className="font-serif text-lg sm:text-xl font-bold text-white/90 mt-1">
          {img.caption}
        </h3>
      </footer>
    </div>
  );
}

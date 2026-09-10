"use client";

import { useState } from "react";
import { Grid3X3, LayoutList } from "lucide-react";
import MagneticBtn from "./MagneticBtn";
import Lightbox from "./Lightbox";
import PhotoCard from "./PhotoCard";
import type { Img } from "./MagneticBtn";

const cats = ["All", "Interior", "Exterior", "Amenities", "Nature"] as const;

export default function GalleryGrid({ images }: { images: Img[] }) {
  const [cat, setCat] = useState<string>("All");
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const [layout, setLayout] = useState<"grid" | "masonry">("masonry");

  const filtered = cat === "All" ? images : images.filter((i) => i.category === cat);

  const openLb = (i: number) => setLbIndex(i);
  const closeLb = () => setLbIndex(null);
  const prevLb = () => setLbIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : 0));
  const nextLb = () => setLbIndex((i) => (i !== null ? (i + 1) % filtered.length : 0));

  const by = (c: string) => images.filter((i) => i.category === c);
  const globalIdx = (img: Img) => {
    const idx = images.findIndex((x) => x.caption === img.caption);
    return idx >= 0 ? idx : 0;
  };

  return (
    <>
      {/* Skip link */}
      <a
        href="#gallery-grid"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-bg focus:rounded focus:outline-none"
      >
        Skip to gallery
      </a>

      {/* Stats */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16 mb-12">
        <div className="flex items-center justify-center gap-8 sm:gap-16 py-8 border-y border-accent/10" role="group" aria-label="Gallery statistics">
          {[
            { l: "Photos", v: "29" },
            { l: "Categories", v: "4" },
            { l: "Cabins", v: "9" },
          ].map((s, i) => (
            <div key={s.l} className="flex items-center gap-8 sm:gap-16">
              {i > 0 && <div className="w-px h-8 bg-accent/10 hidden sm:block" aria-hidden="true" />}
              <div className="text-center">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-accent" style={{ textShadow: "0 0 20px rgba(232,145,58,0.2)" }}>{s.v}</span>
                <span className="text-[9px] tracking-[0.2em] text-text-muted/50 uppercase">{s.l}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs + layout toggle */}
      <div className="mb-10 sm:mb-14 px-6 lg:px-16">
        <div className="flex items-center justify-between">
          <nav aria-label="Gallery categories">
            <div className="flex gap-1 overflow-x-auto" role="tablist" style={{ scrollbarWidth: "none" }}>
              {cats.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={cat === c}
                  aria-controls="gallery-grid"
                  onClick={() => setCat(c)}
                  className={`relative flex-shrink-0 px-5 sm:px-6 py-2.5 text-[11px] font-medium tracking-wider uppercase rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-bg ${
                    cat === c
                      ? "bg-accent text-bg"
                      : "text-text-muted/50 hover:text-text-muted hover:bg-white/[0.03] border border-transparent"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </nav>

          {/* Layout toggle */}
          <div className="flex items-center gap-1 bg-white/[0.03] rounded p-0.5" role="radiogroup" aria-label="Gallery layout">
            <MagneticBtn
              onClick={() => setLayout("masonry")}
              className={`p-2 rounded transition-all ${layout === "masonry" ? "bg-accent/10 text-accent" : "text-text-muted/30 hover:text-text-muted/60"}`}
              ariaLabel="Masonry layout"
            >
              <LayoutList className="h-4 w-4" />
            </MagneticBtn>
            <MagneticBtn
              onClick={() => setLayout("grid")}
              className={`p-2 rounded transition-all ${layout === "grid" ? "bg-accent/10 text-accent" : "text-text-muted/30 hover:text-text-muted/60"}`}
              ariaLabel="Grid layout"
            >
              <Grid3X3 className="h-4 w-4" />
            </MagneticBtn>
          </div>
        </div>
      </div>

      {/* Photo count */}
      <div className="sr-only" aria-live="polite">
        Showing {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
        {cat !== "All" ? ` in ${cat}` : ""}
      </div>

      {/* Gallery */}
      <div id="gallery-grid" role="tabpanel" className="mx-auto max-w-[1400px] px-6 lg:px-16">
        {cat === "All" ? (
          <div className="space-y-16 sm:space-y-24">
            {(["Interior", "Exterior", "Amenities", "Nature"] as const).map((category) => {
              const items = by(category);
              if (items.length === 0) return null;
              return (
                <section key={category} aria-labelledby={`heading-${category}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-px bg-gradient-to-r from-accent/50 to-transparent" aria-hidden="true" />
                    <h2 id={`heading-${category}`} className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-text/90">
                      {category}
                    </h2>
                    <span className="text-[10px] tracking-wider text-accent/40 ml-1">{items.length}</span>
                  </div>

                  <div
                    className={
                      layout === "masonry"
                        ? "columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
                        : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    }
                  >
                    {items.map((img, i) => (
                      <div key={img.caption} className={layout === "masonry" ? "break-inside-avoid" : ""}>
                        <PhotoCard img={img} index={i} onOpen={() => openLb(globalIdx(img))} />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div
            className={
              layout === "masonry"
                ? "columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            }
          >
            {filtered.map((img, i) => (
              <div key={img.caption} className={layout === "masonry" ? "break-inside-avoid" : ""}>
                <PhotoCard img={img} index={i} onOpen={() => openLb(globalIdx(img))} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lbIndex !== null && (
        <Lightbox
          images={filtered}
          index={lbIndex >= filtered.length ? 0 : lbIndex}
          onClose={closeLb}
          onPrev={prevLb}
          onNext={nextLb}
        />
      )}

      <style jsx global>{`
        @keyframes lbIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes imgSlide { from { opacity: 0; transform: scale(0.96) } to { opacity: 1; transform: scale(1) } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </>
  );
}

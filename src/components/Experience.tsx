"use client";

import { useInView } from "@/lib/useInView";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const moments = [
  {
    image: "https://images.pexels.com/photos/29514087/pexels-photo-29514087.jpeg?w=600&q=80",
    label: "Morning Light",
  },
  {
    image: "https://images.pexels.com/photos/33012598/pexels-photo-33012598.jpeg?w=600&q=80",
    label: "Warm Interiors",
  },
  {
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    label: "Forest Moments",
  },
];

const cardRadius = "20px 4px 20px 4px";

export default function Experience() {
  const { ref: quoteRef, isVisible: quoteVisible } = useInView(0.1);
  const { ref: imagesRef, isVisible: imagesVisible } = useInView(0.1);
  const { ref: textRef, isVisible: textVisible } = useInView(0.1);

  return (
    <section id="experience" className="bg-bg py-24 lg:py-32 overflow-hidden" style={{ scrollMarginTop: "80px" }}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        {/* Large statement quote */}
        <div
          ref={quoteRef}
          className={`mb-20 text-center transition-all duration-1000 ${
            quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <span className="mb-6 inline-block text-xs font-medium tracking-[0.3em] text-accent uppercase">
            The Experience
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.85] tracking-tight">
            Slow Down.
            <br />
            <span className="italic text-accent" style={{ textShadow: "0 0 60px rgba(232, 145, 58, 0.25)" }}>
              Stay Awhile.
            </span>
          </h2>
        </div>

        {/* Three moments — staggered images */}
        <div
          ref={imagesRef}
          className={`grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20 transition-all duration-1000 ${
            imagesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {moments.map((moment, i) => (
            <div
              key={moment.label}
              className="group relative overflow-hidden aspect-[3/4]"
              style={{
                borderRadius: cardRadius,
                marginTop: i === 1 ? "40px" : "0",
              }}
            >
              <Image
                src={moment.image}
                alt={moment.label}
                fill
                sizes="(max-width: 768px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-xs font-medium tracking-[0.15em] text-white/80 uppercase">
                  {moment.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Text + Stats row */}
        <div
          ref={textRef}
          className={`grid gap-12 lg:grid-cols-2 lg:items-center transition-all duration-1000 ${
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Text */}
          <div>
            <p className="text-lg leading-relaxed text-text-muted mb-6">
              Leave the noise behind and settle into a space designed for comfort.
              Wake up surrounded by nature, spend your evenings beneath warm lights,
              and enjoy the simple luxury of having nowhere else to be.
            </p>
            <p className="text-base leading-relaxed text-text-muted mb-8">
              Every detail of our modern A-frame houses has been considered —
              from the dramatic vaulted ceilings and floor-to-ceiling windows to
              the hand-selected furnishings that make every stay feel like a retreat.
            </p>
            <Link
              href="#booking"
              className="group inline-flex items-center gap-3 bg-accent px-8 py-4 text-sm font-semibold tracking-wider text-bg uppercase transition-all duration-500 hover:bg-ember hover:shadow-lg hover:shadow-accent/20"
              style={{ borderRadius: "14px 4px 14px 4px" }}
            >
              Book Your Experience
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <span className="block font-serif text-4xl lg:text-5xl font-bold text-accent" style={{ textShadow: "0 0 30px rgba(232, 145, 58, 0.2)" }}>4.9</span>
              <span className="text-[11px] text-text-muted uppercase tracking-wider mt-2 block">Guest Rating</span>
            </div>
            <div className="text-center">
              <span className="block font-serif text-4xl lg:text-5xl font-bold text-accent" style={{ textShadow: "0 0 30px rgba(232, 145, 58, 0.2)" }}>500+</span>
              <span className="text-[11px] text-text-muted uppercase tracking-wider mt-2 block">Happy Guests</span>
            </div>
            <div className="text-center">
              <span className="block font-serif text-4xl lg:text-5xl font-bold text-accent" style={{ textShadow: "0 0 30px rgba(232, 145, 58, 0.2)" }}>3</span>
              <span className="text-[11px] text-text-muted uppercase tracking-wider mt-2 block">Unique A-Frames</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

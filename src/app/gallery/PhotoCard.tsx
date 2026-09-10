"use client";

import React, { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { useInView } from "@/lib/useInView";
import { ArrowUpRight } from "lucide-react";
import type { Img } from "./MagneticBtn";

function PhotoCard({
  img,
  index,
  onOpen,
}: {
  img: Img;
  index: number;
  onOpen: () => void;
}) {
  const { ref, isVisible } = useInView(0.08);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  };

  const sizes = ["aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[5/4]", "aspect-[3/4]"];
  const aspect = sizes[index % sizes.length];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${(index % 8) * 70}ms` }}
    >
      <div
        ref={cardRef}
        className="photo-card group relative cursor-pointer"
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={handlePointerLeave}
        onClick={onOpen}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(); }}
        role="button"
        tabIndex={0}
        aria-label={`View ${img.caption}`}
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovering ? "transform 0.1s ease" : "transform 0.4s ease",
        }}
      >
        {/* Glow behind card on hover */}
        <div
          className={`absolute -inset-3 rounded-lg transition-opacity duration-500 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(232,145,58,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Image container */}
        <div
          className={`relative ${aspect} overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent/50`}
          style={{
            borderRadius: "16px 3px 16px 3px",
            boxShadow: isHovering
              ? "0 0 0 2px rgba(232,145,58,0.7), 0 0 30px rgba(232,145,58,0.3), 0 0 60px rgba(232,145,58,0.1), 0 20px 40px -10px rgba(0,0,0,0.5)"
              : "0 0 0 1.5px rgba(232,145,58,0.35), 0 0 18px rgba(232,145,58,0.12), 0 0 35px rgba(232,145,58,0.04), 0 8px 24px -6px rgba(0,0,0,0.4)",
            transition: "box-shadow 0.4s ease",
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-all duration-500"
            style={{
              transform: isHovering ? "scale(1.08)" : "scale(1)",
              filter: isHovering ? "brightness(1.1)" : "brightness(1)",
            }}
          />

          {/* Animated gradient overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: isHovering
                ? "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)"
                : "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 30%)",
            }}
          />

          {/* Accent line that draws on hover */}
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-500"
            style={{ width: isHovering ? "100%" : "0%" }}
          />

          {/* Corner number */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="font-serif text-[40px] sm:text-[56px] font-bold leading-none transition-colors duration-500"
              style={{ color: isHovering ? "rgba(232,145,58,0.2)" : "rgba(255,255,255,0.05)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10">
            <div
              className="transition-all duration-400"
              style={{
                transform: isHovering ? "translateY(0)" : "translateY(8px)",
                opacity: isHovering ? 1 : 0.7,
              }}
            >
              <span className="text-[8px] tracking-[0.25em] text-accent uppercase font-medium">
                {img.category}
              </span>
            </div>
            <h3
              className="font-serif text-sm sm:text-base font-bold text-white leading-tight transition-all duration-400"
              style={{
                transform: isHovering ? "translateY(0)" : "translateY(4px)",
                opacity: isHovering ? 1 : 0.85,
              }}
            >
              {img.caption}
            </h3>
          </div>

          {/* Arrow icon — pops in on hover */}
          <div
            className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center bg-accent rounded-full transition-all duration-300"
            style={{
              transform: isHovering ? "scale(1) rotate(0deg)" : "scale(0) rotate(-45deg)",
              opacity: isHovering ? 1 : 0,
            }}
          >
            <ArrowUpRight className="h-4 w-4 text-bg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PhotoCard);

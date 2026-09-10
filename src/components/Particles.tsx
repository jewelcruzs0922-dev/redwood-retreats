"use client";

import { useMemo } from "react";

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function Particles() {
  const particles = useMemo(() => {
    const rand = seededRandom(42);
    return [
      /* Far background — reduced count */
      ...Array.from({ length: 12 }, (_, i) => ({
        id: `far${i}`,
        className: "absolute",
        style: {
          left: `${rand() * 100}%`,
          bottom: `${-10 + rand() * 20}%`,
          width: `${2 + rand() * 1.5}px`,
          height: `${2 + rand() * 1.5}px`,
          borderRadius: "50%" as const,
          background: "#d4a054",
          opacity: 0.2 + rand() * 0.15,
          animation: `ps5Rise ${16 + rand() * 8}s linear ${rand() * 2}s infinite`,
          filter: "blur(0.5px)",
        },
      })),
      /* Mid ground — reduced count */
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `mid${i}`,
        className: "absolute",
        style: {
          left: `${rand() * 100}%`,
          bottom: `${-5 + rand() * 15}%`,
          width: `${2.5 + rand() * 2}px`,
          height: `${2.5 + rand() * 2}px`,
          borderRadius: "50%" as const,
          background: i % 3 === 0 ? "#e8913a" : "#d4a054",
          opacity: 0.3 + rand() * 0.25,
          animation: `ps5Rise ${12 + rand() * 6}s linear ${rand() * 1.5}s infinite`,
        },
      })),
      /* Foreground — reduced count */
      ...Array.from({ length: 8 }, (_, i) => ({
        id: `near${i}`,
        className: "absolute",
        style: {
          left: `${rand() * 100}%`,
          bottom: `${-5 + rand() * 10}%`,
          width: `${3 + rand() * 2}px`,
          height: `${3 + rand() * 2}px`,
          borderRadius: "50%" as const,
          background: i % 3 === 0 ? "#f5c842" : i % 3 === 1 ? "#e8913a" : "#c4602a",
          opacity: 0.5 + rand() * 0.3,
          animation: `ps5Rise ${9 + rand() * 5}s linear ${rand() * 1.5}s infinite`,
        },
      })),
      /* Accent glow — reduced count */
      ...Array.from({ length: 6 }, (_, i) => ({
        id: `accent${i}`,
        className: "absolute",
        style: {
          left: `${10 + rand() * 80}%`,
          bottom: `${-5 + rand() * 10}%`,
          width: `${3 + rand() * 2.5}px`,
          height: `${3 + rand() * 2.5}px`,
          borderRadius: "50%" as const,
          background: i % 2 === 0 ? "#e8913a" : "#f5c842",
          opacity: 0.6 + rand() * 0.3,
          animation: `ps5RiseGlow ${10 + rand() * 5}s linear ${rand() * 1.5}s infinite`,
          boxShadow: "0 0 10px rgba(232, 145, 58, 0.6)",
        },
      })),
    ];
  }, []);

  return (
    <>
      {/* Fixed warm glow orbs — breathing in place */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute"
          style={{
            top: "5%",
            left: "0%",
            width: "700px",
            height: "600px",
            background: "radial-gradient(circle, rgba(232, 145, 58, 0.09) 0%, rgba(196, 96, 42, 0.03) 40%, transparent 70%)",
            animation: "breathe 7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "40%",
            right: "-5%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(212, 160, 84, 0.08) 0%, rgba(232, 145, 58, 0.03) 40%, transparent 70%)",
            animation: "breathe 9s ease-in-out 0.5s infinite",
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: "0%",
            left: "10%",
            width: "800px",
            height: "500px",
            background: "radial-gradient(ellipse, rgba(232, 145, 58, 0.07) 0%, rgba(245, 200, 66, 0.02) 45%, transparent 70%)",
            animation: "breathe 11s ease-in-out 1s infinite",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "60%",
            left: "40%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(196, 96, 42, 0.04) 0%, transparent 60%)",
            animation: "breathe 13s ease-in-out 1.5s infinite",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        {particles.map((p) => (
          <div key={p.id} className={p.className} style={p.style} />
        ))}
      </div>
    </>
  );
}

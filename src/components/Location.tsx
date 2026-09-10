"use client";

import { useInView } from "@/lib/useInView";
import { MapPin, Clock, TreePine, Mountain, Waves, Footprints, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const attractions = [
  { icon: TreePine, name: "Redwood National Forest", time: "5 min", distance: "2.3 km", desc: "Ancient trails through towering trees", image: "https://images.unsplash.com/photo-1502252430442-aac78f397426?w=600&q=80" },
  { icon: Mountain, name: "Eagle Peak Lookout", time: "15 min", distance: "12 km", desc: "360° mountain panorama", image: "https://images.unsplash.com/photo-1471733091092-73a03861dea7?w=600&q=80" },
  { icon: Waves, name: "Crystal Creek", time: "10 min", distance: "6.8 km", desc: "Swimming & fishing spots", image: "https://images.unsplash.com/photo-1656740978179-91ed1b1e745b?w=600&q=80" },
  { icon: Footprints, name: "Pine Ridge Trail", time: "Walk", distance: "800 m", desc: "Scenic forest hiking", image: "https://images.unsplash.com/photo-1773289339063-4fdb59958b1e?w=600&q=80" },
];

const sectionRadius = "24px 4px 24px 4px";
const cardRadius = "16px 4px 16px 4px";

export default function Location() {
  const { ref: headerRef, isVisible: headerVisible } = useInView(0.1);
  const { ref: imageRef, isVisible: imageVisible } = useInView(0.1);
  const { ref: contentRef, isVisible: contentVisible } = useInView(0.1);

  return (
    <section id="location" className="bg-bg py-24 lg:py-32" style={{ scrollMarginTop: "80px" }}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-16 text-center transition-all duration-1000 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Location
          </span>
          <h2 className="mt-2 font-serif text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.9] tracking-tight">
            Your Escape Starts{" "}
            <span className="italic text-accent" style={{ textShadow: "0 0 40px rgba(232, 145, 58, 0.2)" }}>
              Here.
            </span>
          </h2>
        </div>

        {/* Split layout */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 mb-16">
          {/* Image */}
          <div
            ref={imageRef}
            className={`relative overflow-hidden aspect-[4/3] transition-all duration-1000 ${
              imageVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
            style={{ borderRadius: sectionRadius }}
          >
            <Image
              src="https://images.unsplash.com/photo-1757137910873-504d97aa80de?w=1000&q=80"
              alt="Golden mountain peaks at sunrise"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3 bg-bg-card/90 backdrop-blur-sm px-4 py-3 inline-flex" style={{ borderRadius: "12px 4px 12px 4px" }}>
                <MapPin className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-serif text-lg font-bold">Pine Valley, CA</p>
                  <p className="text-xs text-text-muted">2 hours from San Francisco</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className={`flex flex-col justify-center transition-all duration-1000 delay-200 ${
              contentVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <p className="text-base leading-relaxed text-text-muted mb-10 max-w-md">
              Nestled in the Pacific Northwest, our A-frames offer the perfect
              balance of seclusion and accessibility. Just 2 hours from the city,
              yet a world away from the everyday.
            </p>

            {/* Big travel stats */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-bg-card p-6 border border-accent/5" style={{ borderRadius: cardRadius }}>
                <span className="block font-serif text-5xl font-bold text-accent" style={{ textShadow: "0 0 30px rgba(232, 145, 58, 0.2)" }}>2h</span>
                <span className="text-[11px] text-text-muted uppercase tracking-wider mt-2 block">From San Francisco</span>
              </div>
              <div className="bg-bg-card p-6 border border-accent/5" style={{ borderRadius: cardRadius }}>
                <span className="block font-serif text-5xl font-bold text-accent" style={{ textShadow: "0 0 30px rgba(232, 145, 58, 0.2)" }}>5m</span>
                <span className="text-[11px] text-text-muted uppercase tracking-wider mt-2 block">To Nearest Trail</span>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 bg-bg-card/50 p-4 border border-accent/5" style={{ borderRadius: cardRadius }}>
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
              <div>
                <p className="text-sm font-semibold">Redwood Retreats</p>
                <p className="text-xs text-text-muted">1234 Forest Lodge Road, Pine Valley, CA 95521</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby attractions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {attractions.map((a, i) => (
            <AttractionCard key={a.name} attraction={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AttractionCard({ attraction, index }: { attraction: typeof attractions[0]; index: number }) {
  const { ref, isVisible } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        borderRadius: cardRadius,
      }}
    >
      {/* Background image */}
      <Image
        src={attraction.image}
        alt={attraction.name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 transition-colors duration-500 group-hover:bg-black/50" />

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[180px]">
        {/* Top */}
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center bg-accent/20 backdrop-blur-sm" style={{ borderRadius: "10px 3px 10px 3px" }}>
            <attraction.icon className="h-5 w-5 text-accent" />
          </div>
          <div className="flex items-center gap-1.5 bg-bg-card/60 backdrop-blur-sm px-2.5 py-1">
            <Clock className="h-3 w-3 text-accent" />
            <span className="text-xs font-semibold text-accent">{attraction.time}</span>
          </div>
        </div>

        {/* Bottom */}
        <div>
          <h4 className="font-serif text-lg font-bold text-white mb-1">{attraction.name}</h4>
          <p className="text-xs text-white/60 mb-3">{attraction.desc}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/50">
              <span className="font-semibold text-white/80">{attraction.distance}</span> away
            </span>
            <div className="flex h-8 w-8 items-center justify-center bg-accent/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-accent" style={{ borderRadius: "8px 2px 8px 2px" }}>
              <ArrowUpRight className="h-4 w-4 text-accent group-hover:text-bg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

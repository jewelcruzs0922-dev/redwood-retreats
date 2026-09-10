"use client";

import { useInView } from "@/lib/useInView";
import { Shield, Clock, Leaf, Award } from "lucide-react";

const props = [
  {
    icon: Shield,
    number: "100%",
    title: "Private",
    description: "Each A-frame is entirely yours. No shared walls, no shared spaces.",
  },
  {
    icon: Clock,
    number: "24/7",
    title: "Self Check-in",
    description: "Arrive on your schedule. Smart lock access, no waiting.",
  },
  {
    icon: Leaf,
    number: "Zero",
    title: "Hidden Fees",
    description: "The price you see is the price you pay. Always.",
  },
  {
    icon: Award,
    number: "#1",
    title: "Rated",
    description: "Top-rated A-frame rentals in the Pacific Northwest.",
  },
];

export default function ValueProps() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section className="bg-bg-warm py-24 lg:py-32 border-y border-accent/5">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        <div
          ref={ref}
          className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {props.map((prop, i) => (
            <div
              key={prop.title}
              className="text-center group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center bg-accent/5 transition-all duration-500 group-hover:bg-accent/10 group-hover:shadow-lg group-hover:shadow-accent/10">
                <prop.icon className="h-6 w-6 text-accent" />
              </div>
              <span
                className="block font-serif text-4xl font-bold text-accent"
                style={{ textShadow: "0 0 30px rgba(232, 145, 58, 0.15)" }}
              >
                {prop.number}
              </span>
              <h3 className="mt-2 font-serif text-lg font-semibold">{prop.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

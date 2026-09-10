"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "@/lib/useInView";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { reviews } from "@/data/reviews";

const cardRadius = "24px 4px 24px 4px";

export default function Reviews() {
  const [active, setActive] = useState(0);
  const { ref, isVisible } = useInView(0.1);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setActive((prev) => (prev + 1) % reviews.length);
      }
    }, 6000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => { pausedRef.current = false; };

  const prev = () => setActive((a) => (a - 1 + reviews.length) % reviews.length);
  const next = () => setActive((a) => (a + 1) % reviews.length);

  return (
    <section id="reviews" className="bg-bg-warm py-24 lg:py-32" style={{ scrollMarginTop: "80px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Redwood Retreats",
            review: reviews.map((r) => ({
              "@type": "Review",
              author: { "@type": "Person", name: r.name },
              reviewRating: { "@type": "Rating", ratingValue: r.rating },
              reviewBody: r.text,
            })),
          }),
        }}
      />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        {/* Header */}
        <div
          ref={ref}
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="mb-4 inline-block text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Testimonials
          </span>
          <h2 className="mt-2 font-serif text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.9] tracking-tight">
            Loved by Our{" "}
            <span className="italic text-accent" style={{ textShadow: "0 0 40px rgba(232, 145, 58, 0.2)" }}>
              Guests.
            </span>
          </h2>
        </div>

        {/* Featured quote — large */}
        <div
          className="relative mb-12"
          style={{ borderRadius: cardRadius }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative overflow-hidden bg-bg-card p-8 lg:p-16 border border-accent/5"
            style={{ borderRadius: cardRadius }}
          >
            {/* Decorative quote mark */}
            <Quote className="absolute top-8 left-8 h-16 w-16 text-accent/10" />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: reviews[active].rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>

            {/* Quote text — large */}
            <blockquote className="relative z-10">
              <p className="font-serif text-2xl lg:text-3xl leading-relaxed text-text/90 mb-8">
                &ldquo;{reviews[active].text}&rdquo;
              </p>
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="h-14 w-14 bg-cover bg-center ring-2 ring-accent/30"
                  style={{
                    backgroundImage: `url('${reviews[active].avatar}')`,
                    borderRadius: "14px 4px 14px 4px",
                  }}
                />
                <div>
                  <p className="font-serif text-lg font-bold">{reviews[active].name}</p>
                  <p className="text-sm text-text-muted">{reviews[active].detail}</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center border border-accent/20 text-text-muted transition-all duration-300 hover:bg-accent hover:text-bg hover:border-accent"
                  style={{ borderRadius: "10px 3px 10px 3px" }}
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center border border-accent/20 text-text-muted transition-all duration-300 hover:bg-accent hover:text-bg hover:border-accent"
                  style={{ borderRadius: "3px 10px 3px 10px" }}
                  aria-label="Next review"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === active
                      ? "w-8 bg-accent"
                      : "w-2 bg-accent/20 hover:bg-accent/40"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Other reviews — horizontal row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {reviews.filter((_, i) => i !== active).map((review, i) => (
            <MiniReview key={review.name} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniReview({ review, index }: { review: typeof reviews[0]; index: number }) {
  const { ref, isVisible } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`group bg-bg-card p-6 border border-accent/5 transition-all duration-500 hover:border-accent/15 hover:bg-bg-warm ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        borderRadius: "16px 4px 16px 4px",
      }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: review.rating }).map((_, j) => (
          <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm leading-relaxed text-text/70 mb-4 line-clamp-3">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="h-9 w-9 bg-cover bg-center"
          style={{
            backgroundImage: `url('${review.avatar}')`,
            borderRadius: "8px 2px 8px 2px",
          }}
        />
        <div>
          <p className="text-xs font-semibold">{review.name}</p>
          <p className="text-[10px] text-text-muted">{review.detail}</p>
        </div>
      </div>
    </div>
  );
}

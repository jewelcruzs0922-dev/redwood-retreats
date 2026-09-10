"use client";

import { useState } from "react";
import { useInView } from "@/lib/useInView";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What time is check-in and check-out?",
    answer: "Check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request.",
  },
  {
    question: "Are the A-frames pet-friendly?",
    answer: "Yes! Well-behaved dogs are welcome at all three A-frames. There's a $50 pet fee per stay. We provide bowls and a blanket for your furry friend.",
  },
  {
    question: "Is there Wi-Fi?",
    answer: "Yes, all A-frames have high-speed Wi-Fi. That said, many guests come here to disconnect — the choice is yours.",
  },
  {
    question: "What's the cancellation policy?",
    answer: "Free cancellation up to 48 hours before check-in. Within 48 hours, the first night is non-refundable.",
  },
  {
    question: "Are there restaurants nearby?",
    answer: "Pine Valley has a charming downtown with cafes and restaurants, all within a 10-minute drive. Each A-frame also has a fully equipped kitchen.",
  },
  {
    question: "Can I host events or parties?",
    answer: "Our A-frames are designed for quiet retreats. Events and parties are not permitted, but small gatherings of your group are always welcome.",
  },
];

function FaqItem({ faq, id }: { faq: typeof faqs[0]; id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const answerId = `faq-answer-${id}`;

  return (
    <div className="border-b border-accent/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left group"
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <span className="font-serif text-lg font-semibold pr-4 group-hover:text-accent transition-colors">{faq.question}</span>
        <span
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-accent/10 text-text-muted transition-all duration-300 group-hover:border-accent group-hover:text-accent group-hover:bg-accent/5"
          style={{ borderRadius: "10px 2px 10px 2px" }}
        >
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <div
        id={answerId}
        role="region"
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? "200px" : "0", opacity: isOpen ? 1 : 0, paddingBottom: isOpen ? "24px" : "0" }}
      >
        <p className="text-sm leading-relaxed text-text-muted">{faq.answer}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="faq" className="bg-bg py-28 lg:py-36" style={{ scrollMarginTop: "80px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div
            ref={ref}
            className={`lg:col-span-5 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <span className="mb-4 inline-block text-xs font-medium tracking-[0.3em] text-accent uppercase">
              FAQ
            </span>
            <h2 className="mt-2 font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.9] tracking-tight">
              Common
              <br />
              <span className="italic text-accent" style={{ textShadow: "0 0 40px rgba(232, 145, 58, 0.2)" }}>Questions.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-text-muted">
              Everything you need to know before your stay. Can&apos;t find
              your answer? Reach out — we&apos;re happy to help.
            </p>
          </div>

          <div className="lg:col-span-7">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} faq={faq} id={faq.question} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  retreats: [
    { label: "The Oak A-Frame", href: "#homes" },
    { label: "The Ember A-Frame", href: "#homes" },
    { label: "The Pine A-Frame", href: "#homes" },
  ],
  explore: [
    { label: "About Us", href: "#experience" },
    { label: "Gallery", href: "#gallery" },
    { label: "Location", href: "#location" },
    { label: "Amenities", href: "#amenities" },
  ],
  info: [
    { label: "FAQ", href: "#faq" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-bg">
      <div className="mx-auto max-w-[1400px] px-6 pt-24 pb-8 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex items-center gap-3">
              <div className="relative">
                <svg width="36" height="32" viewBox="0 0 36 32" fill="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="18" y1="0" x2="18" y2="32" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#f5c842" />
                      <stop offset="50%" stopColor="#e8913a" />
                      <stop offset="100%" stopColor="#c4602a" />
                    </linearGradient>
                  </defs>
                  <path d="M18 2L34 30H2L18 2Z" stroke="url(#footerLogoGrad)" strokeWidth="1.5" fill="none" />
                  <path d="M18 7L29 28H7L18 7Z" stroke="url(#footerLogoGrad)" strokeWidth="0.5" fill="none" opacity="0.4" />
                  <path d="M18 10L22 18H20L23 24H13L16 18H14L18 10Z" fill="url(#footerLogoGrad)" opacity="0.8" />
                  <rect x="16" y="24" width="4" height="4" rx="0.5" fill="url(#footerLogoGrad)" opacity="0.6" />
                  <circle cx="18" cy="14" r="1.5" fill="#f5c842" opacity="0.7" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight leading-none">Redwood</span>
                <span className="text-[8px] tracking-[0.35em] text-accent/50 uppercase font-medium mt-0.5">Retreats</span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-text-muted">
              Modern A-frame houses designed for slow mornings, peaceful nights,
              and unforgettable stays in the heart of nature.
            </p>
            <div className="mt-8 space-y-3">
              <a href="mailto:hello@redwoodretreats.com" className="flex items-center gap-2.5 text-sm text-text-muted transition-colors hover:text-accent">
                <Mail className="h-4 w-4" /> hello@redwoodretreats.com
              </a>
              <a href="tel:+15551234567" className="flex items-center gap-2.5 text-sm text-text-muted transition-colors hover:text-accent">
                <Phone className="h-4 w-4" /> (555) 123-4567
              </a>
              <p className="flex items-center gap-2.5 text-sm text-text-muted">
                <MapPin className="h-4 w-4" /> Pine Valley, California
              </p>
              <a href="mailto:hello@redwoodretreats.com" className="text-sm text-text-muted transition-colors hover:text-accent">Contact Us</a>
              <p className="text-xs text-text-muted/50">Cancellation: Free up to 48h before check-in</p>
              <p className="text-xs text-text-muted/50">Privacy: We never sell your data.</p>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-2">
              <h3 className="mb-5 text-[11px] font-semibold tracking-[0.2em] text-text uppercase">{title.charAt(0).toUpperCase() + title.slice(1)}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-text-muted transition-colors hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-accent/10 pt-8 sm:flex-row">
          <p className="text-xs text-text-muted/50">© {new Date().getFullYear()} Redwood Retreats. All rights reserved.</p>
          <div className="flex gap-6">
            {[
              { name: "Instagram", url: "https://instagram.com/redwoodretreats" },
              { name: "Twitter", url: "https://twitter.com/redwoodretreats" },
              { name: "Facebook", url: "https://facebook.com/redwoodretreats" },
            ].map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-wider text-text-muted/40 uppercase transition-colors hover:text-accent">
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

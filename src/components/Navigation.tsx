"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Homes", href: "/houses" },
  { label: "Gallery", href: "/gallery" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location", href: "#location" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#booking" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-bg/95 backdrop-blur-xl border-b border-accent/5 shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-16">
          {/* Logo */}
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-accent/50 rounded">
            {/* Logo mark — A-frame with tree + warm glow */}
            <div className="relative">
              <svg width="36" height="32" viewBox="0 0 36 32" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="logoGrad" x1="18" y1="0" x2="18" y2="32" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f5c842" />
                    <stop offset="50%" stopColor="#e8913a" />
                    <stop offset="100%" stopColor="#c4602a" />
                  </linearGradient>
                  <linearGradient id="treeGrad" x1="18" y1="8" x2="18" y2="26" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f5c842" />
                    <stop offset="100%" stopColor="#e8913a" />
                  </linearGradient>
                </defs>
                {/* A-frame outline */}
                <path d="M18 2L34 30H2L18 2Z" stroke="url(#logoGrad)" strokeWidth="1.5" fill="none" />
                {/* Inner A-frame */}
                <path d="M18 7L29 28H7L18 7Z" stroke="url(#logoGrad)" strokeWidth="0.5" fill="none" opacity="0.4" />
                {/* Pine tree inside */}
                <path d="M18 10L22 18H20L23 24H13L16 18H14L18 10Z" fill="url(#treeGrad)" opacity="0.8" />
                {/* Door */}
                <rect x="16" y="24" width="4" height="4" rx="0.5" fill="url(#logoGrad)" opacity="0.6" />
                {/* Glow dot */}
                <circle cx="18" cy="14" r="1.5" fill="#f5c842" opacity="0.7" className="animate-pulse" />
              </svg>
              {/* Ambient glow behind logo */}
              <div
                className="absolute -inset-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle, rgba(232,145,58,0.15) 0%, transparent 70%)",
                }}
              />
            </div>
            {/* Wordmark */}
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-text/90 leading-none">
                Redwood
              </span>
              <span className="text-[8px] tracking-[0.35em] text-accent/60 uppercase font-medium mt-0.5">
                Retreats
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative text-[11px] font-medium tracking-[0.18em] text-text-muted/70 uppercase transition-colors hover:text-text focus:outline-none focus:ring-2 focus:ring-accent/50 rounded px-1 py-0.5"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+18005551234"
              className="flex items-center gap-2 text-[11px] tracking-wider text-text-muted/50 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 rounded px-2 py-1"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">(800) 555-1234</span>
            </a>
            <Link
              href="#booking"
              className="bg-accent px-6 py-2.5 text-[11px] font-semibold tracking-[0.15em] text-bg uppercase transition-all duration-300 hover:bg-ember hover:shadow-lg hover:shadow-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-bg"
              style={{ borderRadius: "10px 3px 10px 3px" }}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center text-text lg:hidden focus:outline-none focus:ring-2 focus:ring-accent/50 rounded"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col lg:hidden transition-all duration-500 ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-bg/98 backdrop-blur-2xl"
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Content */}
        <div className="relative flex flex-col justify-center items-center h-full px-6">
          {/* Nav links */}
          <nav className="flex flex-col items-center gap-2" aria-label="Mobile navigation">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="group flex items-center gap-3 font-serif text-3xl sm:text-4xl font-bold text-text/80 transition-all duration-300 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/50 rounded px-4 py-2"
                style={{
                  transitionDelay: isMobileOpen ? `${i * 60}ms` : "0ms",
                  transform: isMobileOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: isMobileOpen ? 1 : 0,
                }}
              >
                {link.label}
                <ChevronRight className="h-5 w-5 text-accent/0 group-hover:text-accent/60 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div
            className="mt-10 flex flex-col items-center gap-4"
            style={{
              transitionDelay: isMobileOpen ? "400ms" : "0ms",
              transform: isMobileOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isMobileOpen ? 1 : 0,
            }}
          >
            <Link
              href="#booking"
              onClick={() => setIsMobileOpen(false)}
              className="bg-accent px-10 py-4 text-sm font-semibold tracking-wider text-bg uppercase transition-all duration-300 hover:bg-ember focus:outline-none focus:ring-2 focus:ring-accent/50"
              style={{ borderRadius: "14px 4px 14px 4px" }}
            >
              Book Your Stay
            </Link>
            <a
              href="tel:+18005551234"
              className="flex items-center gap-2 text-sm text-text-muted/50 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 rounded px-3 py-2"
            >
              <Phone className="h-4 w-4" />
              (800) 555-1234
            </a>
          </div>

          {/* Decorative A-frame */}
          <svg
            viewBox="0 0 200 160"
            fill="none"
            className="absolute bottom-10 right-10 w-20 text-accent opacity-[0.05] pointer-events-none"
            aria-hidden="true"
          >
            <path d="M100 0L200 160H0L100 0Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </>
  );
}

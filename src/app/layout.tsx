import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#13100c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Redwood Retreats | Modern A-Frame House Rentals",
  description:
    "Modern A-frame houses designed for slow mornings, peaceful nights, and unforgettable stays in the heart of nature. Warm fireplaces, forest views, and cozy living.",
  icons: {
    icon: "/favicon.svg",
  },
  keywords: [
    "a-frame house",
    "a-frame rental",
    "modern cabin",
    "cozy retreat",
    "nature getaway",
    "vacation rental",
    "fireplace cabin",
    "forest retreat",
  ],
  openGraph: {
    title: "Redwood Retreats | Modern A-Frame House Rentals",
    description:
      "Modern A-frame houses designed for slow mornings, peaceful nights, and unforgettable stays.",
    type: "website",
    url: "https://redwoodretreats.com",
    images: [
      {
        url: "https://redwoodretreats.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Redwood Retreats - Modern A-Frame House Rentals",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "Redwood Retreats",
              description: "Modern A-frame houses designed for slow mornings, peaceful nights, and unforgettable stays in the heart of nature.",
              url: "https://redwoodretreats.com",
              priceRange: "$189-$399 per night",
              image: "https://images.pexels.com/photos/14353714/pexels-photo-14353714.jpeg?w=1200&q=80",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Redwood National Forest",
                addressRegion: "California",
                addressCountry: "US"
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "347"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-bg text-text antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-bg focus:px-4 focus:py-2 focus:rounded">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

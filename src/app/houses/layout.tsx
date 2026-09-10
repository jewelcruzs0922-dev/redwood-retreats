import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our A-Frames — Redwood Retreats",
  description: "Browse all 9 A-frame cabins at Redwood Retreats. Filter by capacity, price, and amenities to find your perfect forest retreat.",
};

export default function HousesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

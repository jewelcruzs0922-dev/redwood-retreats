import type { ComponentType, SVGProps } from "react";
import {
  Flame,
  BedDouble,
  TreePine,
  Coffee,
  Wifi,
  Car,
  Bath,
  Sunrise,
} from "lucide-react";

export interface Amenity {
  icon: ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;
  label: string;
  detail: string;
  glow: boolean;
}

export const amenities: Amenity[] = [
  { icon: Flame, label: "Fireplace", detail: "Wood-burning warmth", glow: true },
  { icon: BedDouble, label: "Premium Beds", detail: "Organic linens", glow: false },
  { icon: TreePine, label: "Forest Deck", detail: "Private outdoor space", glow: false },
  { icon: Coffee, label: "Full Kitchen", detail: "Chef-quality tools", glow: false },
  { icon: Wifi, label: "Fast Wi-Fi", detail: "If you need it", glow: false },
  { icon: Car, label: "Parking", detail: "Private & secure", glow: false },
  { icon: Bath, label: "Soaking Tub", detail: "Heated rainfall", glow: false },
  { icon: Sunrise, label: "Mountain Views", detail: "From every window", glow: false },
];

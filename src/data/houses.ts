export interface House {
  id: number;
  name: string;
  tagline: string;
  description: string;
  guests: number;
  beds: number;
  baths: number;
  price: number;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
  features: string[];
  badge: string | null;
}

export const houses: House[] = [
  {
    id: 1,
    name: "The Oak",
    tagline: "Intimate A-Frame for Two",
    description:
      "Floor-to-ceiling windows frame the forest. A private deck. A fireplace. Everything you need, nothing you don't.",
    guests: 2,
    beds: 1,
    baths: 1,
    price: 189,
    rating: 4.9,
    reviewCount: 127,
    location: "North Forest",
    image:
      "https://images.pexels.com/photos/29589452/pexels-photo-29589452.jpeg?w=1000&q=80",
    features: ["Fireplace", "Forest Deck", "King Bed"],
    badge: "Most Popular",
  },
  {
    id: 2,
    name: "The Ember",
    tagline: "Family A-Frame",
    description:
      "Two bedrooms beneath a vaulted ceiling. A full kitchen. An outdoor fire pit under the pines.",
    guests: 4,
    beds: 2,
    baths: 1,
    price: 279,
    rating: 4.8,
    reviewCount: 89,
    location: "Pine Valley",
    image:
      "https://images.pexels.com/photos/9222075/pexels-photo-9222075.jpeg?w=1000&q=80",
    features: ["Fire Pit", "Full Kitchen", "2 Bedrooms"],
    badge: "Guest Favorite",
  },
  {
    id: 3,
    name: "The Pine",
    tagline: "Group Luxury A-Frame",
    description:
      "Three bedrooms. Chef's kitchen. Hot tub. Panoramic views through the glass facade.",
    guests: 6,
    beds: 3,
    baths: 2,
    price: 399,
    rating: 4.9,
    reviewCount: 64,
    location: "Mountain Ridge",
    image:
      "https://images.pexels.com/photos/30018177/pexels-photo-30018177.jpeg?w=1000&q=80",
    features: ["Hot Tub", "Chef's Kitchen", "Mountain Views"],
    badge: "Premium",
  },
  {
    id: 4,
    name: "The Cedar",
    tagline: "Romantic Getaway",
    description:
      "Private sauna, outdoor hot tub, and stunning sunset views for two.",
    guests: 2,
    beds: 1,
    baths: 1,
    price: 249,
    rating: 4.9,
    reviewCount: 156,
    location: "Sunset Point",
    image:
      "https://images.pexels.com/photos/19737827/pexels-photo-19737827.jpeg?w=800&q=80",
    features: ["Private Sauna", "Hot Tub", "Sunset Views"],
    badge: "New",
  },
  {
    id: 5,
    name: "The Birch",
    tagline: "Artist's Retreat",
    description:
      "Light-filled A-frame with a loft studio and panoramic forest views.",
    guests: 2,
    beds: 1,
    baths: 1,
    price: 219,
    rating: 4.7,
    reviewCount: 73,
    location: "Birch Grove",
    image:
      "https://images.pexels.com/photos/38089746/pexels-photo-38089746.jpeg?w=800&q=80",
    features: ["Loft Studio", "Natural Light", "Forest Views"],
    badge: null,
  },
  {
    id: 6,
    name: "The Spruce",
    tagline: "Family Adventure",
    description:
      "Spacious for the whole family. Bunk beds, game room, and trail access.",
    guests: 8,
    beds: 4,
    baths: 2,
    price: 449,
    rating: 4.8,
    reviewCount: 45,
    location: "Trail Head",
    image:
      "https://images.pexels.com/photos/34041503/pexels-photo-34041503.jpeg?w=800&q=80",
    features: ["Game Room", "Bunk Beds", "Trail Access"],
    badge: null,
  },
  {
    id: 7,
    name: "The Willow",
    tagline: "Couples Paradise",
    description:
      "Secluded and intimate. Clawfoot tub, fireplace, and private garden path.",
    guests: 2,
    beds: 1,
    baths: 1,
    price: 229,
    rating: 4.9,
    reviewCount: 201,
    location: "Garden Walk",
    image:
      "https://images.pexels.com/photos/35224510/pexels-photo-35224510.jpeg?w=800&q=80",
    features: ["Clawfoot Tub", "Private Garden", "Fireplace"],
    badge: "Best Seller",
  },
  {
    id: 8,
    name: "The Aspen",
    tagline: "Mountain Lodge",
    description:
      "Rustic elegance meets modern comfort. Stone fireplace, wraparound deck.",
    guests: 6,
    beds: 3,
    baths: 2,
    price: 379,
    rating: 4.8,
    reviewCount: 92,
    location: "Ski Ridge",
    image:
      "https://images.pexels.com/photos/8112680/pexels-photo-8112680.jpeg?w=800&q=80",
    features: ["Stone Fireplace", "Wraparound Deck", "Ski Access"],
    badge: null,
  },
  {
    id: 9,
    name: "The Hemlock",
    tagline: "Zen Retreat",
    description:
      "Minimalist design meets forest serenity. Meditation loft and soaking tub.",
    guests: 2,
    beds: 1,
    baths: 1,
    price: 259,
    rating: 4.9,
    reviewCount: 118,
    location: "Quiet Hollow",
    image:
      "https://images.pexels.com/photos/14353714/pexels-photo-14353714.jpeg?w=800&q=80",
    features: ["Meditation Loft", "Soaking Tub", "Japanese Garden"],
    badge: null,
  },
];

export const featuredHouses = houses.slice(0, 3);

export function getHouseByName(name: string): House | undefined {
  return houses.find((h) => h.name === name);
}

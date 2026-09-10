export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  category: string;
  location?: string;
}

export const galleryPreview: GalleryImage[] = [
  { src: "https://images.pexels.com/photos/14295344/pexels-photo-14295344.jpeg?w=1200&q=80", alt: "A-frame cabins in autumn forest", caption: "Autumn Retreat", category: "Exterior", location: "Pine Valley, CA" },
  { src: "https://images.pexels.com/photos/31854904/pexels-photo-31854904.jpeg?w=1200&q=80", alt: "Cozy living room with fireplace", caption: "The Living Room", category: "Interior", location: "Warm & Inviting" },
  { src: "https://images.pexels.com/photos/14495872/pexels-photo-14495872.jpeg?w=1200&q=80", alt: "Stylish bedroom with warm lighting", caption: "Your Bedroom", category: "Interior", location: "Peaceful Nights" },
  { src: "https://images.pexels.com/photos/6773805/pexels-photo-6773805.jpeg?w=1200&q=80", alt: "Outdoor deck with wooden furniture", caption: "The Deck", category: "Amenities", location: "Fresh Air" },
  { src: "https://images.pexels.com/photos/37719121/pexels-photo-37719121.jpeg?w=1200&q=80", alt: "Modern kitchen counter", caption: "The Kitchen", category: "Interior", location: "Cook & Gather" },
  { src: "https://images.pexels.com/photos/29030243/pexels-photo-29030243.jpeg?w=1200&q=80", alt: "Misty forest with tall pines", caption: "The Forest", category: "Nature", location: "Your Backyard" },
];

export const images: GalleryImage[] = [
  /* ── Interior (10) ── */
  { src: "https://images.pexels.com/photos/37331259/pexels-photo-37331259.jpeg?w=1200&q=80", alt: "Cozy living room with modern fireplace in Helsinki", caption: "The Fireside Room", category: "Interior" },
  { src: "https://images.pexels.com/photos/36777509/pexels-photo-36777509.jpeg?w=1200&q=80", alt: "Elegant living room interior with warm fireplace", caption: "Ember Lounge", category: "Interior" },
  { src: "https://images.pexels.com/photos/29973813/pexels-photo-29973813.jpeg?w=1200&q=80", alt: "Cozy cabin interior with plaid armchair and natural light", caption: "The Reading Nook", category: "Interior" },
  { src: "https://images.pexels.com/photos/7746106/pexels-photo-7746106.jpeg?w=1200&q=80", alt: "Warm chalet interior with wooden finish and fireplace", caption: "Chalet Warmth", category: "Interior" },
  { src: "https://images.pexels.com/photos/30983728/pexels-photo-30983728.jpeg?w=1200&q=80", alt: "Cozy winter room with fireplace and snowy view", caption: "Snow View Suite", category: "Interior" },
  { src: "https://images.unsplash.com/photo-1761782791727-3994283faa88?w=1200&q=80", alt: "Modern A-frame living room with forest view", caption: "Forest Lounge", category: "Interior" },
  { src: "https://images.unsplash.com/photo-1758983065583-9cea714214f9?w=1200&q=80", alt: "A-frame cabin bedroom with scenic landscape view", caption: "Landscape Bedroom", category: "Interior" },
  { src: "https://images.pexels.com/photos/14495872/pexels-photo-14495872.jpeg?w=1200&q=80", alt: "Stylish bedroom with warm ambient lighting", caption: "Amber Nights", category: "Interior" },
  { src: "https://images.pexels.com/photos/37719121/pexels-photo-37719121.jpeg?w=1200&q=80", alt: "Modern kitchen counter with warm tones", caption: "The Kitchen", category: "Interior" },
  { src: "https://images.pexels.com/photos/38089746/pexels-photo-38089746.jpeg?w=1200&q=80", alt: "Cozy A-frame cabin interior with wood stove", caption: "Wood Stove Corner", category: "Interior" },

  /* ── Exterior (8) ── */
  { src: "https://images.unsplash.com/photo-1759304732338-74869baf0876?w=1200&q=80", alt: "Modern white cabin nestled in dense pine forest", caption: "White Pines", category: "Exterior" },
  { src: "https://images.unsplash.com/photo-1752404735560-7e9f0f3d216b?w=1200&q=80", alt: "Wooden A-frame cabins nestled among trees", caption: "Twin Cabins", category: "Exterior" },
  { src: "https://images.unsplash.com/photo-1723663561534-9b129f182785?w=1200&q=80", alt: "A-frame cabin in the woods surrounded by tall trees", caption: "Tall Pines", category: "Exterior" },
  { src: "https://images.unsplash.com/photo-1771065999704-e133689927d0?w=1200&q=80", alt: "Modern cabin with large windows in forest setting", caption: "Glass Cabin", category: "Exterior" },
  { src: "https://images.unsplash.com/photo-1768578927091-2f02d499ac61?w=1200&q=80", alt: "Modern A-frame house with large windows and wooden accents", caption: "Timber Frame", category: "Exterior" },
  { src: "https://images.pexels.com/photos/12955121/pexels-photo-12955121.jpeg?w=1200&q=80", alt: "Mountain cabin at sunset with rolling landscape", caption: "Sunset Ridge", category: "Exterior" },
  { src: "https://images.pexels.com/photos/7885258/pexels-photo-7885258.jpeg?w=1200&q=80", alt: "Outdoor deck overlooking mountains at sunrise", caption: "Dawn Deck", category: "Exterior" },
  { src: "https://images.pexels.com/photos/32945128/pexels-photo-32945128.jpeg?w=1200&q=80", alt: "Sunlit balcony with wooden chair and mountain view", caption: "Solitude Seat", category: "Exterior" },

  /* ── Amenities (6) ── */
  { src: "https://images.pexels.com/photos/29887394/pexels-photo-29887394.jpeg?w=1200&q=80", alt: "Rustic cabin with outdoor seating and hot tub", caption: "Hot Tub Nights", category: "Amenities" },
  { src: "https://images.pexels.com/photos/6550332/pexels-photo-6550332.jpeg?w=1200&q=80", alt: "Couple enjoying bonfire by A-frame cabin", caption: "Fireside Stories", category: "Amenities" },
  { src: "https://images.pexels.com/photos/30302449/pexels-photo-30302449.jpeg?w=1200&q=80", alt: "Wooden hot tub with mountain view", caption: "Mountain Soak", category: "Amenities" },
  { src: "https://images.pexels.com/photos/26837125/pexels-photo-26837125.jpeg?w=1200&q=80", alt: "Outdoor bathtub in front of wooden cabin in winter", caption: "Forest Bath", category: "Amenities" },
  { src: "https://images.pexels.com/photos/35789939/pexels-photo-35789939.jpeg?w=1200&q=80", alt: "Traditional rustic kitchen with open fire cooking", caption: "Open Flame", category: "Amenities" },
  { src: "https://images.pexels.com/photos/10787953/pexels-photo-10787953.jpeg?w=1200&q=80", alt: "Family eating and cooking in wooden house", caption: "Gathering Table", category: "Amenities" },

  /* ── Nature (5) ── */
  { src: "https://images.pexels.com/photos/29030243/pexels-photo-29030243.jpeg?w=1200&q=80", alt: "Misty forest with tall pines", caption: "Misty Pines", category: "Nature" },
  { src: "https://images.pexels.com/photos/33891352/pexels-photo-33891352.jpeg?w=1200&q=80", alt: "Scenic mountain hiking trail in dense forest", caption: "Mountain Trail", category: "Nature" },
  { src: "https://images.pexels.com/photos/35554840/pexels-photo-35554840.jpeg?w=1200&q=80", alt: "Serene autumn forest trail pathway", caption: "Autumn Walk", category: "Nature" },
  { src: "https://images.pexels.com/photos/37459245/pexels-photo-37459245.jpeg?w=1200&q=80", alt: "Scenic forest path beside tranquil lake", caption: "Lakeside Path", category: "Nature" },
  { src: "https://images.pexels.com/photos/35904998/pexels-photo-35904998.jpeg?w=1200&q=80", alt: "Hikers ascending mountain trail to remote lodge", caption: "High Altitude", category: "Nature" },
];

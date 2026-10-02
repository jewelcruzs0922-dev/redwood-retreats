import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://redwood-retreats.vercel.app", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://redwood-retreats.vercel.app/houses", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://redwood-retreats.vercel.app/gallery", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}

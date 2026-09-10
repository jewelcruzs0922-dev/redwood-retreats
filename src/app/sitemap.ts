import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://redwoodretreats.com", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://redwoodretreats.com/houses", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://redwoodretreats.com/gallery", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}

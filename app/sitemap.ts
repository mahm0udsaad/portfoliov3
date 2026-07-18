import type { MetadataRoute } from "next";

const SITE_URL = "https://www.mahmoudsaad.art";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, priority: 1, changeFrequency: "weekly" },
    { url: `${SITE_URL}/ar`, lastModified, priority: 0.9, changeFrequency: "weekly" },
    {
      url: `${SITE_URL}/book`,
      lastModified,
      priority: 0.9,
      changeFrequency: "weekly",
    },
  ];
}

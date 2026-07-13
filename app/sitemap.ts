import type { MetadataRoute } from "next";

const SITE_URL = "https://www.mahmoudsaad.art";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified },
    { url: `${SITE_URL}/ar`, lastModified },
    { url: `${SITE_URL}/book`, lastModified },
  ];
}

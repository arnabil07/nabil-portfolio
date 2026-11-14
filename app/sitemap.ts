import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: profile.siteUrl, lastModified: now, priority: 1 },
    ...projects
      .filter((p) => !p.placeholder)
      .map((p) => ({
        url: `${profile.siteUrl}/projects/${p.slug}`,
        lastModified: now,
        priority: 0.7,
      })),
  ];
}

import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...["projects", "about", "services", "contact"].map((path) => ({
      url: `${site.url}/${path}/`,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}/`,
      priority: 0.7,
    })),
  ];
}

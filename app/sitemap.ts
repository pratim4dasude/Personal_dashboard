import type { MetadataRoute } from "next";
import { experience, navLinks } from "./data";
import { projects } from "./projects";

// TODO: set NEXT_PUBLIC_SITE_URL once the site has a real domain.
const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...navLinks.map((l) => l.href), ...projects.map((p) => `/projects/${p.slug}`),
    ...experience.map((e) => `/experience/${e.slug}`),
  ];
  return paths.map((p) => ({ url: `${base}${p}` }));
}

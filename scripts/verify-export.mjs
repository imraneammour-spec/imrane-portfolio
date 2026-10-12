import { readFile, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { projects } from "../src/data/projects.ts";
const root = resolve("out");
const pages = [
  "/",
  "/projects/",
  "/about/",
  "/services/",
  "/contact/",
  ...projects.map((project) => `/projects/${project.slug}/`),
  "/404.html",
];
let references = 0;
for (const route of pages) {
  const path = resolve(
    root,
    "." + route + (route.endsWith("/") ? "index.html" : ""),
  );
  const html = await readFile(path, "utf8");
  if (!html.includes("<h1") || !html.includes('name="description"'))
    throw new Error(`Missing page metadata or primary heading: ${route}`);
  for (const tag of html.matchAll(/<(?:a|img|script|source|link)\b[^>]*>/g)) {
    for (const attr of tag[0].matchAll(/\s(?:href|src)="([^"#]+)"/g)) {
      const value = attr[1].replaceAll("&amp;", "&");
      if (/^[a-z]+:|^\/\//i.test(value)) continue;
      let target = resolve(
        value.startsWith("/") ? root : dirname(path),
        "." + (value.startsWith("/") ? value : "/" + value.split("#")[0]),
      );
      if (value.endsWith("/")) target = resolve(target, "index.html");
      try {
        await stat(target.split("?")[0]);
      } catch {
        throw new Error(`Broken exported reference ${value} in ${route}`);
      }
      references++;
    }
  }
}
for (const filename of ["sitemap.xml", "robots.txt", "_redirects"])
  await stat(resolve(root, filename));
console.log(
  `Export verified: ${pages.length} pages including custom 404, ${references} local links/assets, sitemap and robots.`,
);

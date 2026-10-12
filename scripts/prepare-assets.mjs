import { cp, mkdir, copyFile } from "node:fs/promises";
import { resolve } from "node:path";
await mkdir(resolve("public"), { recursive: true });
await cp(resolve("assets"), resolve("public/assets"), {
  recursive: true,
  force: true,
});
for (const name of [
  "favicon.ico",
  "favicon.svg",
  "favicon-48x48.png",
  "favicon-32x32.png",
  "favicon-16x16.png",
  "apple-touch-icon.png",
]) {
  await copyFile(resolve(name), resolve("public", name));
}
console.log("Authentic project assets prepared for Next.js.");

import { copyFile, readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const outputDir = resolve(root, "dist/client");
const cnamePath = resolve(outputDir, "CNAME");
const fallbackSource = resolve(root, "public/404.html");
const fallbackPath = resolve(outputDir, "404.html");

await access(resolve(outputDir, "index.html"));
await copyFile(fallbackSource, fallbackPath);

const cname = (await readFile(cnamePath, "utf8")).trim();
if (cname !== "elena.shamraeva.co.uk") {
  throw new Error(`Unexpected CNAME value: ${JSON.stringify(cname)}`);
}

const fallback = await readFile(fallbackPath, "utf8");
if (!fallback.includes("ghp-path")) {
  throw new Error("GitHub Pages fallback marker is missing from dist/client/404.html");
}

console.log("Prepared dist/client for GitHub Pages.");

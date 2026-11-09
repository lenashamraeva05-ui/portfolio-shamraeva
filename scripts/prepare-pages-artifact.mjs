import { copyFile, readFile, access, readdir, unlink } from "node:fs/promises";
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

// Authoring PNGs stay in public for editing; ship only the ones referenced by the site.
async function filesUnder(directory) {
  const files = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const file = resolve(directory, item.name);
    if (item.isDirectory()) files.push(...await filesUnder(file));
    else files.push(file);
  }
  return files;
}
const files = await filesUnder(outputDir);
const text = (await Promise.all(files.filter(file => /\.(?:html|rsc|js|css|json)$/.test(file)).map(file => readFile(file, "utf8")))).join("\n");
let removed = 0;
for (const file of files.filter(file => file.endsWith(".png"))) {
  const url = "/" + file.slice(outputDir.length + 1).replaceAll("\\", "/");
  if (!text.includes(url)) { await unlink(file); removed++; }
}
console.log(`Excluded ${removed} unreferenced authoring PNGs from the Pages artifact.`);

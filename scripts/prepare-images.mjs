import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const root = process.cwd();
const output = path.join(root, "public/optimized");
await fs.mkdir(output, { recursive: true });
const urls = new Set();
async function scan(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await scan(file);
    else if (/\.(?:tsx|jsx|css)$/.test(entry.name) && entry.name !== "ResponsiveImage.tsx") {
      const source = await fs.readFile(file, "utf8");
      for (const match of source.matchAll(/["'(](\/[a-zA-Z0-9_./-]+\.webp)["')]/g)) if (!match[1].startsWith("/optimized/")) urls.add(match[1]);
    }
  }
}
await scan(path.join(root, "app"));
await scan(path.join(root, "components"));
const manifest = {};
let generated = 0;
for (const url of [...urls].sort()) {
  const input = path.join(root, "public", url.slice(1));
  const bytes = await fs.readFile(input);
  const metadata = await sharp(bytes).metadata();
  if (!metadata.width || !metadata.height) continue;
  const hash = createHash("sha256").update(bytes).update("responsive-v2-q76-cap1600").digest("hex").slice(0, 10);
  const stem = path.basename(url, ".webp");
  const sources = [];
  const widths = [...new Set([160, 360, 640, 960, 1280, 1600].filter(width => width < metadata.width).concat(Math.min(metadata.width, 1600)))].sort((a, b) => a - b);
  for (const width of widths) {
    const filename = `${stem}-${hash}-${width}.webp`;
    const destination = path.join(output, filename);
    try { await sharp(destination).metadata(); }
    catch { await sharp(bytes).resize({ width, withoutEnlargement: true }).webp({ quality: 76, effort: 4 }).toFile(destination); generated++; }
    sources.push({ width, src: `/optimized/${filename}` });
  }
  manifest[url] = { width: metadata.width, height: metadata.height, sources };
}
await fs.writeFile(path.join(root, "lib/image-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

// Retain geometry and UVs while replacing the embedded PNG with a WebP texture.
const original = await fs.readFile(path.join(root, "public/card.glb"));
const modelHash = createHash("sha256").update(original).update("webp-texture-v1-q88").digest("hex").slice(0, 10);
const modelName = `card-${modelHash}.glb`;
const modelFile = path.join(output, modelName);
try { await fs.access(modelFile); }
catch {
  const jsonLength = original.readUInt32LE(12);
  const model = JSON.parse(original.subarray(20, 20 + jsonLength).toString("utf8"));
  const binaryStart = 20 + jsonLength + 8;
  const binary = original.subarray(binaryStart);
  const replacements = new Map();
  for (const [index, image] of (model.images ?? []).entries()) {
    if (image.bufferView === undefined) continue;
    const view = model.bufferViews[image.bufferView];
    const texture = binary.subarray(view.byteOffset ?? 0, (view.byteOffset ?? 0) + view.byteLength);
    replacements.set(image.bufferView, await sharp(texture).webp({ quality: 88, effort: 5 }).toBuffer());
    image.mimeType = "image/webp";
    for (const textureInfo of model.textures ?? []) {
      if (textureInfo.source === index) {
        textureInfo.extensions = { ...textureInfo.extensions, EXT_texture_webp: { source: index } };
        delete textureInfo.source;
      }
    }
  }
  model.extensionsUsed = [...new Set([...(model.extensionsUsed ?? []), "EXT_texture_webp"])];
  model.extensionsRequired = [...new Set([...(model.extensionsRequired ?? []), "EXT_texture_webp"])];
  const pieces = [];
  let offset = 0;
  for (const [index, view] of model.bufferViews.entries()) {
    const data = replacements.get(index) ?? binary.subarray(view.byteOffset ?? 0, (view.byteOffset ?? 0) + view.byteLength);
    const padding = (4 - offset % 4) % 4;
    if (padding) { pieces.push(Buffer.alloc(padding)); offset += padding; }
    view.byteOffset = offset;
    view.byteLength = data.length;
    pieces.push(data);
    offset += data.length;
  }
  model.buffers[0].byteLength = offset;
  let json = Buffer.from(JSON.stringify(model));
  json = Buffer.concat([json, Buffer.alloc((4 - json.length % 4) % 4, 0x20)]);
  let bin = Buffer.concat(pieces);
  bin = Buffer.concat([bin, Buffer.alloc((4 - bin.length % 4) % 4)]);
  const header = Buffer.alloc(20);
  header.writeUInt32LE(0x46546c67, 0); header.writeUInt32LE(2, 4); header.writeUInt32LE(12 + 8 + json.length + 8 + bin.length, 8);
  header.writeUInt32LE(json.length, 12); header.writeUInt32LE(0x4e4f534a, 16);
  const binaryHeader = Buffer.alloc(8); binaryHeader.writeUInt32LE(bin.length, 0); binaryHeader.writeUInt32LE(0x004e4942, 4);
  await fs.writeFile(modelFile, Buffer.concat([header, json, binaryHeader, bin]));
}
await fs.writeFile(path.join(root, "lib/model-manifest.json"), JSON.stringify({ card: `/optimized/${modelName}` }, null, 2) + "\n");
console.log(`Prepared ${Object.keys(manifest).length} responsive image sources (${generated} new variants).`);
console.log(`Card model: ${original.length} -> ${(await fs.stat(modelFile)).size} bytes.`);

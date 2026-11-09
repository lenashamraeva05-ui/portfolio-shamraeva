import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

// Keep the physics engine unchanged; let the browser stream its binary directly.
export function rapierWasm() {
  const require = createRequire(import.meta.url);
  const entry = require.resolve("@dimforge/rapier3d-compat").replace(/rapier\.cjs$/, "rapier.mjs");
  const source = readFileSync(entry, "utf8");
  const match = source.match(/lg\.toByteArray\("(AGFzb[A-Za-z0-9+/=]+)"\)/);
  if (!match) throw new Error("Review Rapier WASM extraction after upgrading the physics engine");
  const bytes = Buffer.from(match[1], "base64");
  const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
  const filename = `rapier-${hash}.wasm`;
  mkdirSync("public/optimized", { recursive: true });
  writeFileSync(path.join("public/optimized", filename), bytes);
  writeFileSync("lib/physics-manifest.json", JSON.stringify({ wasm: `/optimized/${filename}` }) + "\n");
  return {
    name: "stream-rapier-wasm",
    enforce: "pre",
    transform(code, id) {
      if (!id.replaceAll("\\", "/").split("?")[0].endsWith("/rapier3d-compat/rapier.mjs")) return;
      if (!code.includes(match[0])) throw new Error("Rapier WASM source no longer matches");
      return { code: code.replace(match[0] + ".buffer", `{module_or_path: fetch("/optimized/${filename}")}`), map: null };
    },
  };
}

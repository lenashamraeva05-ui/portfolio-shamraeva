import physics from "./physics-manifest.json";
import model from "./model-manifest.json";
import { imageSource } from "./image-sources";
let pending: Promise<unknown> | undefined;
export function prewarmAbout() {
  if (pending || !window.matchMedia("(min-width: 761px)").matches) return;
  for (const href of [physics.wasm, model.card, imageSource("/product-designer-card.webp", 720)]) {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = (href.endsWith(".glb") || href.endsWith(".wasm")) ? "fetch" : "image";
    link.href = href;
    if (link.as === "fetch") link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }
  pending = import("../components/Lanyard").catch(() => { pending = undefined; });
}

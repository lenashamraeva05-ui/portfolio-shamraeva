import data from "./image-manifest.json";

export type ImageSource = { width: number; src: string };
export const imageManifest = data as Record<string, { width: number; height: number; placeholder?: string; sources: ImageSource[]; avifSources?: ImageSource[] }>;
export function imageSource(src: string, width: number, format: "webp" | "avif" = "webp") {
  const image = imageManifest[src];
  const sources = format === "avif" ? image?.avifSources ?? image?.sources : image?.sources;
  return sources?.find(source => source.width >= width)?.src ?? sources?.at(-1)?.src ?? src;
}

// Match the displayed image's srcset so warming a tab reuses the same request.
const warmedImages = new Set<string>();
export function warmImage(src: string, sizes: string) {
  if (typeof window === "undefined" || warmedImages.has(src)) return;
  warmedImages.add(src);
  const variants = imageManifest[src]?.avifSources ?? imageManifest[src]?.sources;
  const sources = window.innerWidth <= 760 ? variants?.filter(source => source.width <= 640) : variants;
  const image = new window.Image();
  image.decoding = "async";
  image.fetchPriority = "low";
  if (sources?.length) {
    image.sizes = sizes;
    image.srcset = sources.map(source => `${source.src} ${source.width}w`).join(", ");
  }
  image.src = sources?.[sources.length - 1]?.src ?? src;
}

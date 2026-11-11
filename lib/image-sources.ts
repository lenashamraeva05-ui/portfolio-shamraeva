import data from "./image-manifest.json";

export type ImageSource = { width: number; src: string };
export const imageManifest = data as Record<string, { width: number; height: number; sources: ImageSource[]; avifSources?: ImageSource[] }>;
export function imageSource(src: string, width: number) {
  return imageManifest[src]?.sources.find((source) => source.width >= width)?.src ?? imageManifest[src]?.sources.at(-1)?.src ?? src;
}

// Match the displayed image's srcset so warming a tab reuses the same request.
const warmedImages = new Set<string>();
export function warmImage(src: string, sizes: string) {
  if (typeof window === "undefined" || warmedImages.has(src)) return;
  warmedImages.add(src);
  const sources = imageManifest[src]?.avifSources ?? imageManifest[src]?.sources;
  const image = new window.Image();
  image.decoding = "async";
  image.fetchPriority = "low";
  if (sources?.length) {
    image.sizes = sizes;
    image.srcset = sources.map(source => `${source.src} ${source.width}w`).join(", ");
  }
  image.src = sources?.[sources.length - 1]?.src ?? src;
}

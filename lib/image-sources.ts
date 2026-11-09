import data from "./image-manifest.json";

export type ImageSource = { width: number; src: string };
export const imageManifest = data as Record<string, { width: number; height: number; sources: ImageSource[] }>;
export function imageSource(src: string, width: number) {
  return imageManifest[src]?.sources.find((source) => source.width >= width)?.src ?? src;
}

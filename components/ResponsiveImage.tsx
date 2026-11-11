import type { ImgHTMLAttributes } from "react";
import { imageManifest } from "@/lib/image-sources";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { src: string; alt: string; fill?: boolean; priority?: boolean; unoptimized?: boolean };

export default function ResponsiveImage({ src, alt, fill = false, priority = false, unoptimized, sizes, style, loading, fetchPriority, decoding, ...rest }: Props) {
  void unoptimized; // Static variants are generated at build time; no image proxy is used.
  const image = imageManifest[src];
  const srcSet = image?.sources.length && image.sources.length > 1 ? image.sources.map(source => `${source.src} ${source.width}w`).join(", ") : undefined;
  // Native srcset keeps the image visible in server HTML without waiting for hydration.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...rest} src={image?.sources[image.sources.length - 1]?.src ?? src} alt={alt} srcSet={srcSet} sizes={srcSet ? sizes ?? (fill ? "100vw" : `${rest.width ?? image?.width ?? 720}px`) : undefined} style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : style} loading={priority ? "eager" : loading ?? "lazy"} fetchPriority={priority ? "high" : fetchPriority} decoding={decoding ?? "async"} />;
}

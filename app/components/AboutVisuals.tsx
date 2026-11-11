"use client";

import Image from "@/components/ResponsiveImage";
import { imageSource } from "@/lib/image-sources";
import { Component, lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const Lanyard = lazy(() => import("../../components/Lanyard"));
const InfiniteMenu = lazy(() => import("../../components/InfiniteMenu"));

class VisualBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function DeferredVisual({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect(); }
    }, { rootMargin: "200px" });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} style={{ width: "100%", height: "100%" }}>
    <VisualBoundary fallback={fallback}>
      <Suspense fallback={fallback}>{ready ? children : fallback}</Suspense>
    </VisualBoundary>
  </div>;
}

const subscribeDesktop = (listener: () => void) => {
  const media = window.matchMedia("(min-width: 761px)");
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
};
export function ProfileCard() {
  const desktop = useSyncExternalStore(subscribeDesktop, () => window.matchMedia("(min-width: 761px)").matches, () => false);
  return desktop ? <DesktopProfileCard /> : null;
}
function DesktopProfileCard() {
  const [interactive, setInteractive] = useState(false);
  const handleReady = useCallback(() => setInteractive(true), []);
  // Native image is also the no-WebGL/error fallback for the interactive card.
  const fallback = <Image priority sizes="180px" src="/product-designer-card.webp" alt="Helen Shamraeva, product designer" width={1024} height={1536} className="profile-card-poster" style={{ position: "absolute", top: "42%", left: "50%", width: "44%", height: "auto", maxHeight: "34%", objectFit: "contain", transform: "translateX(-50%)" }} />;
  return <div style={{ position: "relative", width: "100%", height: "100%" }}>
    {!interactive && fallback}
    <DeferredVisual fallback={null}><Lanyard onReady={handleReady} position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage={imageSource("/product-designer-card.webp", 640, "avif")} imageFit="cover" showLanyardLogo={false} /></DeferredVisual>
  </div>;
}

type Item = { image: string; link: string; title: string; description: string };
export function OutsideWorkGallery({ items }: { items: Item[] }) {
  const desktop = useSyncExternalStore(subscribeDesktop, () => window.matchMedia("(min-width: 761px)").matches, () => false);
  const optimizedItems = useMemo(() => items.map(item => ({ ...item, image: imageSource(item.image, 640, "avif") })), [items]);
  const fallback = <div className="about-photo-gallery">{items.map(item => <a key={item.image} href={item.link} target="_blank" rel="noreferrer" className="about-photo-card">
    <Image src={item.image} alt={item.title} loading="lazy" sizes="(max-width: 760px) 85vw, 600px" width={720} height={720} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
  </a>)}</div>;
  if (!desktop) return fallback;
  return <DeferredVisual fallback={fallback}><InfiniteMenu items={optimizedItems} backgroundColor="#0e0f10" /></DeferredVisual>;
}

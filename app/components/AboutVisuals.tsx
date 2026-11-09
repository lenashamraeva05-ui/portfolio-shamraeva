"use client";

import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";

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

export function ProfileCard() {
  // Native image is also the no-WebGL/error fallback for the interactive card.
  // eslint-disable-next-line @next/next/no-img-element
  const fallback = <img src="/product-designer-card.webp" alt="Elena Shamraeva, product designer" width={1024} height={1536} className="profile-card-poster" style={{ position: "absolute", top: "42%", left: "50%", width: "44%", height: "auto", maxHeight: "34%", objectFit: "contain", transform: "translateX(-50%)" }} />;
  return <DeferredVisual fallback={fallback}><Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage="/product-designer-card.webp" imageFit="cover" showLanyardLogo={false} /></DeferredVisual>;
}

type Item = { image: string; link: string; title: string; description: string };
export function OutsideWorkGallery({ items }: { items: Item[] }) {
  const fallback = <div style={{ display: "flex", height: "100%", overflowX: "auto" }}>{items.map(item => <a key={item.image} href={item.link} target="_blank" rel="noreferrer" style={{ flex: "0 0 75%" }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={item.image} alt={item.title} loading="lazy" className="profile-card-poster" style={{ position: "absolute", top: "42%", left: "50%", width: "44%", height: "auto", maxHeight: "34%", objectFit: "contain", transform: "translateX(-50%)" }} />
  </a>)}</div>;
  return <DeferredVisual fallback={fallback}><InfiniteMenu items={items} backgroundColor="#0e0f10" /></DeferredVisual>;
}

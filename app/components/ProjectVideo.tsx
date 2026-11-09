"use client";

import { useEffect, useRef, useState } from "react";

export default function ProjectVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let visible = false;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (visible && !document.hidden && !media.matches) {
        setReady(true);
        if (ready) void video.play().catch(() => { /* Poster remains visible when autoplay is unavailable. */ });
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { rootMargin: "200px" });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", sync);
      video.pause();
    };
  }, [ready]);
  return <video ref={ref} src={ready ? src : undefined} poster={poster} loop muted playsInline preload="none" aria-label={label} />;
}

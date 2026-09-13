"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function SlowLoadingFallback() {
  const [visible, setVisible] = useState(false);
  const animationRef = useRef<{ destroy?: () => void } | undefined>(undefined);
  const pathname = usePathname();
  const timerRef = useRef<number | undefined>(undefined);

  const cancelPending = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = undefined;
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    const script = document.createElement("script");
    script.src = "/lottie.js";
    script.onload = () => {
      const lottie = (window as Window & { lottie?: { loadAnimation: (options: Record<string, unknown>) => { destroy?: () => void } } }).lottie;
      const container = document.querySelector<HTMLDivElement>(".slow-loading-animation");
      if (cancelled || !lottie || !container) return;
      animationRef.current = lottie.loadAnimation({ container, renderer: "svg", loop: true, autoplay: true, path: "/loading.json" });
    };
    document.head.appendChild(script);
    return () => {
      cancelled = true;
      script.remove();
      animationRef.current?.destroy?.();
      animationRef.current = undefined;
    };
  }, [visible]);

  useEffect(() => {
    const startPending = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      setVisible(false);
      timerRef.current = window.setTimeout(() => setVisible(true), 10_000);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin === window.location.origin && url.pathname !== window.location.pathname) startPending();
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", startPending);
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", startPending);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const resetTimer = window.setTimeout(cancelPending, 0);
    return () => window.clearTimeout(resetTimer);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="slow-loading-fallback" role="status" aria-live="polite">
      <div className="slow-loading-animation" aria-hidden="true" />
      <p>Loading is taking longer than expected…</p>
    </div>
  );
}

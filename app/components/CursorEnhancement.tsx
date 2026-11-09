"use client";

import { lazy, Suspense, useEffect, useState } from "react";
const TargetCursor = lazy(() => import("@/components/TargetCursor").catch(() => ({ default: () => null })));

export default function CursorEnhancement() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 769px) and (prefers-reduced-motion: no-preference)");
    let timer: ReturnType<typeof setTimeout>;
    const update = () => { clearTimeout(timer); timer = setTimeout(() => setEnabled(media.matches), 700); };
    update(); media.addEventListener("change", update);
    return () => { clearTimeout(timer); media.removeEventListener("change", update); };
  }, []);
  if (!enabled) return null;
  return <Suspense fallback={null}><TargetCursor targetSelector="a, button, [role='button'], [tabindex='0'], .cursor-target" spinDuration={2} hideDefaultCursor parallaxOn cursorColor="#ffffff" cursorColorOnTarget="#ffffff" /></Suspense>;
}

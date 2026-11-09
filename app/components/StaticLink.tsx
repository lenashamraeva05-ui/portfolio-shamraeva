"use client";

import { useEffect, type AnchorHTMLAttributes } from "react";

const documents = new Set<string>();
function warmDocument(href: string) {
  if (typeof window === "undefined") return;
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return;
  url.hash = "";
  if (documents.has(url.href)) return;
  documents.add(url.href);
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "document";
  link.href = url.href;
  document.head.appendChild(link);
}

// This static export has complete HTML documents. Native links also work before hydration.
export default function StaticLink({ href = "/", prefetch = false, onPointerEnter, onFocus, onTouchStart, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { prefetch?: boolean }) {
  const canonical = /^\/(about|resume|blog)$/.test(href) ? `${href}/` : href;
  useEffect(() => {
    if (!prefetch) return;
    const timer = window.setTimeout(() => warmDocument(canonical), 300);
    return () => window.clearTimeout(timer);
  }, [canonical, prefetch]);
  return <a {...props} href={canonical} data-static-navigation="true"
    onPointerEnter={event => { warmDocument(canonical); onPointerEnter?.(event); }}
    onFocus={event => { warmDocument(canonical); onFocus?.(event); }}
    onTouchStart={event => { warmDocument(canonical); onTouchStart?.(event); }} />;
}

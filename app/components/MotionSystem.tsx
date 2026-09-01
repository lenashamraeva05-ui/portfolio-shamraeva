"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function MotionSystem() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    document.documentElement.classList.add("motion-ready");

    if (reduceMotion) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return () => document.documentElement.classList.remove("motion-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9%", threshold: 0.08 },
    );
    revealNodes.forEach((node) => observer.observe(node));

    const sceneNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-scene]"));
    const panelNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-panel]"));
    const parallaxNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;

    const updateMotion = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const sceneValues = sceneNodes.map((node) => {
        const rect = node.getBoundingClientRect();
        const progress = clamp((viewport * 0.94 - rect.top) / (viewport * 1.14));
        return {
          node,
          progress,
          scale: 0.82 + progress * 0.18,
          y: (1 - progress) * 44,
        };
      });
      const panelValues = panelNodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { node, progress: clamp((viewport * 0.86 - rect.top) / (viewport * 1.06)) };
      });
      const parallaxValues = parallaxNodes.map((node) => {
        const rect = node.getBoundingClientRect();
        const centerDelta = viewport / 2 - (rect.top + rect.height / 2);
        return { node, amount: clamp(centerDelta / viewport, -1, 1) };
      });

      sceneValues.forEach(({ node, progress, scale, y }) => {
        node.style.setProperty("--scene", progress.toFixed(4));
        node.style.setProperty("--scene-scale", scale.toFixed(4));
        node.style.setProperty("--scene-y", `${y.toFixed(2)}px`);
      });
      panelValues.forEach(({ node, progress }) => node.style.setProperty("--panel", progress.toFixed(4)));
      parallaxValues.forEach(({ node, amount }) => node.style.setProperty("--parallax", amount.toFixed(4)));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateMotion);
    };

    updateMotion();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("load", requestUpdate);

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("load", requestUpdate);
      document.documentElement.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}

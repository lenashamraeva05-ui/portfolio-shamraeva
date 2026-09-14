"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-welcome-sticker-dismissed";

export default function WelcomeSticker() {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        setIsVisible(window.localStorage.getItem(STORAGE_KEY) !== "true");
      } catch {
        setIsVisible(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Dismissal still applies for the current visit when storage is unavailable.
    }
  };

  if (isVisible !== true) return null;

  return (
    <aside className="welcome-sticker" aria-label="Welcome">
      <button
        type="button"
        className="welcome-sticker-close"
        onClick={dismiss}
        aria-label="Close welcome illustration"
        title="Close"
      >
        <span aria-hidden="true">×</span>
      </button>
      <Image
        unoptimized
        src="/welcome-sticker.png"
        alt="Hey! Let’s get to know each other better"
        width={1536}
        height={1024}
        priority
        sizes="(max-width: 560px) 74vw, (max-width: 900px) 42vw, 380px"
        className="welcome-sticker-image"
      />
    </aside>
  );
}

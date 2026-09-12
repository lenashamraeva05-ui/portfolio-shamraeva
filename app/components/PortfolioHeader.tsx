"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MotionSystem from "./MotionSystem";

export default function PortfolioHeader() {
  const pathname = usePathname();
  const [contactOpen, setContactOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setContactOpen(false);
      setNavOpen(false);
    };
    const closeOutside = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      setContactOpen(false);
      setNavOpen(false);
    };
    window.addEventListener("keydown", closeMenu);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      window.removeEventListener("keydown", closeMenu);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, []);

  return (
    <>
      <MotionSystem />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header ref={headerRef} className={`site-header ${scrolled ? "is-scrolled" : ""} ${navOpen ? "is-menu-open" : ""}`}>
        <Link className="mark" href="/" aria-label="Elena Shamraeva — home">
          <span className="mark-greeting">Hey, I&apos;m</span>
          <span className="intro-avatar" aria-hidden="true" />
          <span className="mark-name">Elena</span>
        </Link>

        <nav aria-label="Primary navigation" id="primary-navigation">
          <Link href="/#work" aria-current={pathname === "/" ? "page" : undefined} onClick={() => setNavOpen(false)}>Work</Link>
          <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined} onClick={() => setNavOpen(false)}>About</Link>
          <Link href="/resume" aria-current={pathname === "/resume" ? "page" : undefined} onClick={() => setNavOpen(false)}>Resume</Link>
          <Link href="/#contact" onClick={() => setNavOpen(false)}>Contact</Link>
        </nav>

        <div className="header-actions">
          <button
            className="mobile-nav-trigger"
            type="button"
            aria-label={navOpen ? "Close navigation" : "Open navigation"}
            aria-controls="primary-navigation"
            aria-expanded={navOpen}
            onClick={() => {
              setNavOpen((value) => !value);
              setContactOpen(false);
            }}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>

          <div
            className={`contact-menu ${contactOpen ? "is-open" : ""}`}
            onMouseEnter={() => setContactOpen(true)}
            onMouseLeave={() => setContactOpen(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setContactOpen(false);
            }}
          >
            <button
              className="contact-trigger"
              type="button"
              aria-controls="contact-options"
              aria-expanded={contactOpen}
              onClick={() => {
                setContactOpen((value) => !value);
                setNavOpen(false);
              }}
            >
              <span>Let&apos;s chat</span><b aria-hidden="true">↗</b>
            </button>
            <div className="contact-popover" id="contact-options">
              <a href="mailto:lena.shamraeva.05@gmail.com" onClick={() => setContactOpen(false)}>
                <i aria-hidden="true">@</i><span>Email me</span>
              </a>
              <a href="https://www.linkedin.com/in/elena-shamraeva-a73464393" target="_blank" rel="noreferrer" onClick={() => setContactOpen(false)}>
                <i aria-hidden="true">in</i><span>LinkedIn</span>
              </a>
              <a href="https://t.me/ftr0ys_emmm" target="_blank" rel="noreferrer" onClick={() => setContactOpen(false)}>
                <i aria-hidden="true">tg</i><span>Telegram</span>
              </a>
              <a href="https://wa.me/qr/WSCQFRDF6LCQI1" target="_blank" rel="noreferrer" onClick={() => setContactOpen(false)}>
                <i aria-hidden="true">wa</i><span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

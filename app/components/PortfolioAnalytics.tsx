"use client";

import { useEffect, useState } from "react";
import { installClarity, readConsent, saveConsent, type AnalyticsConsent } from "@/lib/analytics";

export default function PortfolioAnalytics() {
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const saved = readConsent();
      setConsent(saved);
      setOpen(saved === null);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (consent === "granted") return installClarity(consent);
  }, [consent]);
  const choose = (value: AnalyticsConsent) => {
    saveConsent(value);
    setOpen(false);
    setConsent(value);
    if (consent === "granted" && value === "denied") {
      window.clarity?.("consentv2", { analytics_Storage: "denied", ad_Storage: "denied" });
      // Reload after withdrawal so the vendor script is no longer running.
      window.location.reload();
    }
  };
  return <div className="analytics-controls" data-clarity-mask="true">
    {open ? <section className="analytics-consent" aria-labelledby="analytics-consent-title">
      <h2 id="analytics-consent-title">Help improve this portfolio?</h2>
      <p>With your permission, Microsoft Clarity uses cookies and records clicks, scrolling and page interactions to help me understand what works. Form entries are masked. Advertising tracking is disabled. You can change your choice at any time.</p>
      <a href="https://www.microsoft.com/privacy/privacystatement" target="_blank" rel="noreferrer">Microsoft privacy statement ↗</a>
      <div className="analytics-consent-actions">
        <button type="button" onClick={() => choose("denied")}>Decline</button>
        <button type="button" onClick={() => choose("granted")}>Allow analytics</button>
        {consent !== null && <button type="button" onClick={() => setOpen(false)}>Close</button>}
      </div>
    </section> : <button className="analytics-settings" type="button" onClick={() => setOpen(true)}>Analytics settings</button>}
  </div>;
}
